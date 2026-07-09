const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

class FakeClassList {
  constructor(element) {
    this.element = element;
    this.classes = new Set();
  }

  add(...classNames) {
    classNames.forEach((className) => this.classes.add(className));
    this.element.className = Array.from(this.classes).join(' ');
  }

  remove(...classNames) {
    classNames.forEach((className) => this.classes.delete(className));
    this.element.className = Array.from(this.classes).join(' ');
  }

  toggle(className, force) {
    const shouldAdd = force === undefined ? !this.classes.has(className) : force;
    if (shouldAdd) {
      this.add(className);
    } else {
      this.remove(className);
    }
    return shouldAdd;
  }

  contains(className) {
    return this.classes.has(className);
  }
}

class FakeElement {
  constructor(id = '') {
    this.id = id;
    this.children = [];
    this.style = {};
    this.checked = false;
    this.disabled = false;
    this.parentElement = null;
    this.previousElementSibling = null;
    this.textContent = '';
    this.onclick = null;
    this._className = '';
    this._innerHTML = '';
    this.classList = new FakeClassList(this);
  }

  get className() {
    return this._className;
  }

  set className(value) {
    this._className = value;
    this.classList.classes = new Set(String(value).split(/\s+/).filter(Boolean));
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(value) {
    this._innerHTML = String(value);
    this.children = [];
  }

  appendChild(child) {
    child.parentElement = this;
    child.previousElementSibling = this.children[this.children.length - 1] || null;
    this.children.push(child);
    return child;
  }

  querySelectorAll() {
    return [];
  }
}

function makeChoiceEvent(context) {
  const selected = new FakeElement();
  const sibling = new FakeElement();
  const parent = {
    querySelectorAll: () => [selected, sibling],
  };
  selected.parentElement = parent;
  context.event = { target: selected };
}

function createApp() {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
  assert(scriptMatch, 'index.html should contain an inline script');

  const elements = new Map();
  const strengthInputs = ['strengthField', 'strengthBoundary', 'strengthNone'].map((id) => {
    const input = new FakeElement(id);
    input.parentElement = new FakeElement(`${id}-parent`);
    return input;
  });

  const document = {
    createElement: () => new FakeElement(),
    getElementById: (id) => {
      if (!elements.has(id)) {
        elements.set(id, new FakeElement(id));
      }
      return elements.get(id);
    },
    querySelectorAll: (selector) => {
      if (selector === 'input[name="strength"]') {
        return strengthInputs;
      }
      return [];
    },
  };

  strengthInputs.forEach((input) => elements.set(input.id, input));

  const context = {
    document,
    localStorage: {
      getItem: () => null,
      setItem: () => {},
    },
    window: {
      scrollTo: () => {},
    },
    confirm: () => true,
    prompt: () => null,
    console,
  };

  vm.createContext(context);
  vm.runInContext(scriptMatch[1], context, { filename: 'index.html' });

  return { context, elements };
}

function clickSituation(elements, labelText) {
  const selector = elements.get('situationSelector');
  const button = selector.children.find((child) => child.innerHTML.includes(labelText));
  assert(button, `Expected to find situation button for ${labelText}`);
  button.onclick();
}

function testPressureViewIgnoresCoverageFilters() {
  const { context, elements } = createApp();

  context.switchView('pressures');
  const grid = elements.get('playsGrid');

  assert.strictEqual(elements.get('hashFilter').style.display, 'none');
  assert.strictEqual(elements.get('formationSelector').style.display, 'none');
  assert(grid.children.length > 0, 'Expected pressure cards to render');
  assert(
    grid.children.every((child) => child.className.includes('pressure-card')),
    'Pressures view should render pressure cards'
  );

  context.setHashPosition('left');

  assert.strictEqual(elements.get('decisionTree').style.display, 'block');
  assert.strictEqual(elements.get('pressureTracker').style.display, 'block');
  assert(
    grid.children.every((child) => child.className.includes('pressure-card')),
    'Changing a hidden hash filter must not repaint coverage cards into the Pressures tab'
  );
}

function testDecisionTreeClearsWhenChangingToGenericPressureSituation() {
  const { context, elements } = createApp();

  clickSituation(elements, 'Passing Downs');
  context.switchView('pressures');
  makeChoiceEvent(context);
  context.setQBQuality('backup');
  makeChoiceEvent(context);
  context.setLastPlays('zones');
  makeChoiceEvent(context);
  context.setRushWorking('no');
  assert(elements.get('decisionResult').innerHTML.includes('PRESSURE NOW'));

  clickSituation(elements, 'vs Air Raid');
  context.switchView('pressures');

  assert.strictEqual(elements.get('decisionChecks').innerHTML, '');
  assert(!elements.get('decisionResult').innerHTML.includes('PRESSURE NOW'));
  assert(elements.get('decisionResult').innerHTML.includes('SITUATIONAL PRESSURE ONLY'));
}

function testPassingDownsDoNotReusePriorAnswers() {
  const { context, elements } = createApp();

  clickSituation(elements, 'Passing Downs');
  context.switchView('pressures');
  makeChoiceEvent(context);
  context.setQBQuality('backup');
  makeChoiceEvent(context);
  context.setLastPlays('zones');
  makeChoiceEvent(context);
  context.setRushWorking('no');
  assert(elements.get('decisionResult').innerHTML.includes('PRESSURE NOW'));

  clickSituation(elements, 'Obvious');
  context.switchView('pressures');

  assert(elements.get('decisionResult').innerHTML.includes('COMPLETE ALL CHECKS ABOVE'));
  assert(!elements.get('decisionResult').innerHTML.includes('PRESSURE NOW'));
}

testPressureViewIgnoresCoverageFilters();
testDecisionTreeClearsWhenChangingToGenericPressureSituation();
testPassingDownsDoNotReusePriorAnswers();

console.log('UI state regression tests passed');
