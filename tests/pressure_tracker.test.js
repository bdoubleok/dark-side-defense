const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
assert.ok(scriptMatch, 'index.html should contain the application script');

const appScript = scriptMatch[1].replace(/\n\s*init\(\);\s*$/, '\n');

function createElement(id) {
    return {
        id,
        textContent: '',
        innerHTML: '',
        style: {},
        classList: {
            add() {},
            remove() {},
            contains() {
                return false;
            }
        },
        appendChild() {},
        querySelectorAll() {
            return [];
        }
    };
}

function createApp(initialStorage = {}) {
    const storage = { ...initialStorage };
    const elements = new Map();

    const context = {
        console,
        localStorage: {
            getItem(key) {
                return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
            },
            setItem(key, value) {
                storage[key] = String(value);
            }
        },
        document: {
            getElementById(id) {
                if (!elements.has(id)) {
                    elements.set(id, createElement(id));
                }
                return elements.get(id);
            },
            querySelectorAll() {
                return [];
            },
            createElement(tagName) {
                return createElement(tagName);
            }
        },
        window: {
            scrollTo() {}
        },
        prompt() {
            return null;
        },
        confirm() {
            return true;
        }
    };

    vm.createContext(context);
    vm.runInContext(appScript, context);

    return { context, storage, elements };
}

{
    const { context, elements } = createApp();

    context.logDefensivePlay();

    assert.equal(elements.get('pressureCount').textContent, 0);
    assert.equal(elements.get('totalPlaysCount').textContent, 1);
    assert.equal(elements.get('pressureRate').textContent, '0.0%');
}

{
    const { context, elements } = createApp();

    context.logDefensivePlay();
    context.logDefensivePlay();
    context.logPressure('Tex Stunt', 1, '3:45', 'success');

    assert.equal(elements.get('pressureCount').textContent, 1);
    assert.equal(elements.get('totalPlaysCount').textContent, 3);
    assert.equal(elements.get('pressureRate').textContent, '33.3%');
    assert.equal(elements.get('successRate').textContent, '100%');
}

{
    const storedPressures = [
        { name: 'Tex Stunt', quarter: 1, time: '3:45', situation: 'standardDowns', success: 'success' },
        { name: 'Sim Pressure 3', quarter: 2, time: '8:12', situation: 'passingDownsMedium', success: 'neutral' },
        { name: 'Pirate Stunt', quarter: 3, time: '5:03', situation: 'shortYardage', success: 'failure' }
    ];
    const { context, storage, elements } = createApp({
        pressureLog: JSON.stringify(storedPressures),
        totalPlays: '1'
    });

    context.updatePressureTracker();

    assert.equal(elements.get('pressureCount').textContent, 3);
    assert.equal(elements.get('totalPlaysCount').textContent, 3);
    assert.equal(elements.get('pressureRate').textContent, '100.0%');
    assert.equal(storage.totalPlays, '3');
}
