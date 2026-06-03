const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const test = require('node:test');

const INDEX_URL = pathToFileURL(path.resolve('index.html')).href;

function waitForChromeEndpoint(chrome) {
  return new Promise((resolve, reject) => {
    let stderr = '';
    const timer = setTimeout(() => {
      reject(new Error(`Timed out waiting for Chrome DevTools endpoint.\n${stderr}`));
    }, 10000);

    chrome.stderr.on('data', chunk => {
      stderr += chunk.toString();
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });

    chrome.on('error', error => {
      clearTimeout(timer);
      reject(error);
    });

    chrome.on('exit', code => {
      if (code !== 0) {
        clearTimeout(timer);
        reject(new Error(`Chrome exited before startup with code ${code}.\n${stderr}`));
      }
    });
  });
}

class CdpPage {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.loadWaiters = [];
    this.exceptions = [];

    this.ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) {
          reject(new Error(message.error.message));
        } else {
          resolve(message.result);
        }
        return;
      }

      if (message.method === 'Page.loadEventFired') {
        const waiters = this.loadWaiters.splice(0);
        waiters.forEach(resolve => resolve());
      }

      if (message.method === 'Runtime.exceptionThrown') {
        this.exceptions.push(message.params.exceptionDetails.text);
      }
    });
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  waitForLoad() {
    return new Promise(resolve => {
      this.loadWaiters.push(resolve);
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });

    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text);
    }

    return result.result.value;
  }

  close() {
    this.ws.close();
  }
}

async function openPlaybookPage() {
  const userDataDir = await mkdtemp(path.join(tmpdir(), 'dark-side-defense-chrome-'));
  const chrome = spawn('/usr/local/bin/google-chrome', [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    '--remote-debugging-port=0',
    'about:blank'
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const browserWs = await waitForChromeEndpoint(chrome);
  const browserOrigin = browserWs.replace(/^ws:/, 'http:').replace(/\/devtools\/browser\/.*$/, '');
  const response = await fetch(`${browserOrigin}/json/new?about:blank`, { method: 'PUT' });
  assert.equal(response.ok, true);

  const target = await response.json();
  const page = new CdpPage(target.webSocketDebuggerUrl);
  await page.open();
  await page.send('Page.enable');
  await page.send('Runtime.enable');
  const loadPromise = page.waitForLoad();
  await page.send('Page.navigate', { url: INDEX_URL });
  await loadPromise;

  return {
    page,
    async cleanup() {
      page.close();
      chrome.kill('SIGTERM');
      await new Promise(resolve => chrome.once('exit', resolve));
      await rm(userDataDir, { recursive: true, force: true });
    }
  };
}

test('pressures view hides coverage filters and ignores stale filter calls', async () => {
  const { page, cleanup } = await openPlaybookPage();
  try {
    const pressureView = await page.evaluate(`(() => {
      document.getElementById('pressuresToggle').click();
      return {
        title: document.getElementById('playCountTitle').textContent,
        pressureActive: document.getElementById('pressuresToggle').classList.contains('active'),
        hashDisplay: getComputedStyle(document.getElementById('hashFilter')).display,
        formationDisplay: getComputedStyle(document.getElementById('formationSelector')).display,
        pressureCards: document.querySelectorAll('#playsGrid .pressure-card').length
      };
    })()`);

    assert.deepEqual(pressureView, {
      title: '3 Pressure Options',
      pressureActive: true,
      hashDisplay: 'none',
      formationDisplay: 'none',
      pressureCards: 3
    });

    const afterStaleFilters = await page.evaluate(`(() => {
      window.setHashPosition('left');
      window.setFormationType('trips');
      window.setFormationFilter('Nickel 2-4');
      return {
        title: document.getElementById('playCountTitle').textContent,
        pressureActive: document.getElementById('pressuresToggle').classList.contains('active'),
        pressureCards: document.querySelectorAll('#playsGrid .pressure-card').length,
        coverageCards: document.querySelectorAll('#playsGrid .play-card:not(.pressure-card)').length
      };
    })()`);

    assert.deepEqual(afterStaleFilters, {
      title: '3 Pressure Options',
      pressureActive: true,
      pressureCards: 3,
      coverageCards: 0
    });
    assert.deepEqual(page.exceptions, []);
  } finally {
    await cleanup();
  }
});

test('corrupt pressure storage does not block app startup', async () => {
  const { page, cleanup } = await openPlaybookPage();
  try {
    const loadPromise = page.waitForLoad();
    await page.evaluate(`(() => {
      localStorage.setItem('pressureLog', 'not json');
      localStorage.setItem('totalPlays', 'not a number');
      location.reload();
    })()`);
    await loadPromise;

    const state = await page.evaluate(`(() => ({
      title: document.getElementById('playCountTitle').textContent,
      situationButtons: document.querySelectorAll('#situationSelector .situation-btn').length,
      pressureLog: localStorage.getItem('pressureLog'),
      totalPlaysText: document.getElementById('totalPlaysCount').textContent
    }))()`);

    assert.equal(state.title, '10 Priority Calls');
    assert.equal(state.situationButtons, 11);
    assert.equal(state.pressureLog, '[]');
    assert.equal(state.totalPlaysText, '0');
    assert.deepEqual(page.exceptions, []);
  } finally {
    await cleanup();
  }
});

test('decision tree buttons work without relying on global event', async () => {
  const { page, cleanup } = await openPlaybookPage();
  try {
    const result = await page.evaluate(`(() => {
      Array.from(document.querySelectorAll('#situationSelector .situation-btn'))
        .find(btn => btn.textContent.includes('Passing Downs (Medium)'))
        .click();
      document.getElementById('pressuresToggle').click();

      Array.from(document.querySelectorAll('#decisionChecks .quick-btn'))
        .find(btn => btn.textContent === 'Average')
        .click();
      Array.from(document.querySelectorAll('#decisionChecks .quick-btn'))
        .find(btn => btn.textContent === '3+ Zones')
        .click();
      Array.from(document.querySelectorAll('#decisionChecks .quick-btn'))
        .find(btn => btn.textContent === 'No')
        .click();

      return {
        selected: document.querySelectorAll('#decisionChecks .quick-btn.selected').length,
        resultText: document.getElementById('decisionResult').textContent.replace(/\\s+/g, ' ').trim()
      };
    })()`);

    assert.equal(result.selected, 3);
    assert.match(result.resultText, /ALL CHECKS PASS - PRESSURE NOW/);
    assert.deepEqual(page.exceptions, []);
  } finally {
    await cleanup();
  }
});
