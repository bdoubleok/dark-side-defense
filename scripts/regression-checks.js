const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];

assert(script, 'expected inline script in index.html');

class FakeClassList {
    constructor() {
        this.values = new Set();
    }

    add(...values) {
        values.forEach(value => this.values.add(value));
    }

    remove(...values) {
        values.forEach(value => this.values.delete(value));
    }

    toggle(value, force) {
        if (force === true) {
            this.values.add(value);
            return true;
        }

        if (force === false) {
            this.values.delete(value);
            return false;
        }

        if (this.values.has(value)) {
            this.values.delete(value);
            return false;
        }

        this.values.add(value);
        return true;
    }

    contains(value) {
        return this.values.has(value);
    }
}

class FakeElement {
    constructor(tagName = 'div') {
        this.tagName = tagName.toUpperCase();
        this.children = [];
        this.classList = new FakeClassList();
        this.style = {};
        this.checked = false;
        this.disabled = false;
        this.parentElement = null;
        this.previousElementSibling = null;
        this.onclick = null;
        this.title = '';
        this.id = '';
        this._className = '';
        this._innerHTML = '';
        this._textContent = '';
    }

    get className() {
        return this._className;
    }

    set className(value) {
        this._className = String(value);
        this.classList = new FakeClassList();
        this._className.split(/\s+/).filter(Boolean).forEach(className => this.classList.add(className));
    }

    get innerHTML() {
        return this._innerHTML;
    }

    set innerHTML(value) {
        this._innerHTML = String(value);
        this._textContent = '';
        this.children = [];
    }

    get textContent() {
        return this._textContent + this.children.map(child => child.textContent ?? '').join('');
    }

    set textContent(value) {
        this._textContent = String(value);
        this._innerHTML = '';
        this.children = [];
    }

    appendChild(child) {
        child.parentElement = this;
        child.previousElementSibling = this.children.at(-1) ?? null;
        this.children.push(child);
        return child;
    }

    querySelectorAll() {
        return [];
    }
}

function createDocument() {
    const elements = new Map();

    return {
        createElement(tagName) {
            return new FakeElement(tagName);
        },
        createTextNode(text) {
            const node = new FakeElement('#text');
            node.textContent = text;
            return node;
        },
        getElementById(id) {
            if (!elements.has(id)) {
                const element = new FakeElement();
                element.id = id;
                elements.set(id, element);
            }

            return elements.get(id);
        },
        querySelectorAll() {
            return [];
        }
    };
}

function runApp(localStorage) {
    const document = createDocument();
    const sandbox = {
        console: { warn() {} },
        confirm: () => true,
        document,
        localStorage,
        prompt: () => null,
        window: { scrollTo() {} }
    };

    vm.runInNewContext(script, sandbox, { filename: 'index.html.inline.js' });
    return { document, sandbox };
}

function mapStorage(initialValues = {}) {
    const values = new Map(Object.entries(initialValues));
    return {
        getItem(key) {
            return values.has(key) ? values.get(key) : null;
        },
        setItem(key, value) {
            values.set(key, String(value));
        }
    };
}

function throwingStorage() {
    return {
        getItem() {
            throw new Error('SecurityError');
        },
        setItem() {
            throw new Error('SecurityError');
        }
    };
}

{
    const { document } = runApp(mapStorage({ pressureLog: '{not json' }));
    assert.equal(document.getElementById('playCountTitle').textContent, '10 Priority Calls');
}

{
    const { document, sandbox } = runApp(throwingStorage());
    assert.equal(document.getElementById('playCountTitle').textContent, '10 Priority Calls');
    assert.doesNotThrow(() => sandbox.logPressure('Tex Stunt', 1, '3:45', 'success'));
    assert.equal(document.getElementById('pressureCount').textContent, '1');
}

{
    const attack = '<img src=x onerror=alert(1)>';
    const { document } = runApp(mapStorage({
        pressureLog: JSON.stringify([{ name: attack, quarter: 2, time: '4:44', success: 'unknown' }]),
        totalPlays: '1'
    }));
    const logList = document.getElementById('pressureLogList');

    assert.equal(logList.innerHTML, '');
    assert.match(logList.textContent, /<img src=x onerror=alert\(1\)>/);
    assert.equal(document.getElementById('successRate').textContent, '0%');
}

console.log('regression checks passed');
