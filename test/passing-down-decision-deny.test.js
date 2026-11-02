'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const fn = html.match(/function updateDecisionResult\(\) \{[\s\S]*?\n        \}/);
assert.ok(fn, 'updateDecisionResult must exist');
assert.ok(
  !/Cover 3 Match/.test(fn[0]),
  'DENY must not recommend Cover 3 Match; it is not on either passing-down coverage menu'
);

const gpStart = html.indexOf('const gamePlanData = {');
const gpEnd = html.indexOf('\n/*\n// Hash Mark Adjustments', gpStart);
assert.ok(gpStart >= 0 && gpEnd > gpStart, 'gamePlanData block must be locatable');
const gamePlanData = vm.runInNewContext(html.slice(gpStart, gpEnd) + '; gamePlanData');

function primary(situation, name, frequency) {
  const play = gamePlanData[situation].plays.find((p) => p.name === name);
  assert.ok(play, `${situation} must include ${name}`);
  assert.strictEqual(play.frequency, frequency, `${situation} ${name} frequency`);
  assert.strictEqual(play.isPrimary, true, `${situation} ${name} must be a primary call`);
}

for (const situation of ['passingDownsMedium', 'passingDownsObvious']) {
  assert.ok(
    !gamePlanData[situation].plays.some((p) => p.name === 'Cover 3 Match'),
    `${situation} coverage menu must not include Cover 3 Match`
  );
}

primary('passingDownsMedium', 'Cover 4 Palms', '35%');
primary('passingDownsMedium', 'Tampa 2', '25%');
primary('passingDownsObvious', 'Cover 4 Quarters', '35%');
primary('passingDownsObvious', 'Tampa 2', '25%');

const store = { decisionResult: { innerHTML: '' } };
const sandbox = {
  currentSituation: '',
  decisionState: {},
  document: {
    getElementById(id) {
      return store[id];
    }
  }
};
vm.createContext(sandbox);
vm.runInContext(fn[0], sandbox);

function deny(situation) {
  sandbox.currentSituation = situation;
  sandbox.decisionState = { qbQuality: 'elite', lastPlays: 'zones', rushWorking: 'no' };
  sandbox.updateDecisionResult();
  return store.decisionResult.innerHTML;
}

const medium = deny('passingDownsMedium');
assert.ok(medium.includes('Cover 4 Palms (35%)'), medium);
assert.ok(medium.includes('Tampa 2 (25%)'), medium);
assert.ok(!medium.includes('Cover 3 Match'), medium);

const obvious = deny('passingDownsObvious');
assert.ok(obvious.includes('Cover 4 Quarters (35%)'), obvious);
assert.ok(obvious.includes('Tampa 2 (25%)'), obvious);
assert.ok(!obvious.includes('Cover 3 Match'), obvious);

const checks = html.match(/function renderDecisionTree\(\) \{[\s\S]*?\n        \}/);
assert.ok(checks, 'renderDecisionTree must exist');
assert.ok(
  checks[0].includes('3rd & 4-10, 2nd & 10-12'),
  'medium decision-tree down label must match the situation subtitle'
);
assert.ok(
  checks[0].includes('3rd & 11+, 2nd & 13+'),
  'obvious decision-tree down label must match the situation subtitle'
);
assert.ok(!checks[0].includes('3rd & 7-10'), 'stale 3rd & 7-10 label must be gone');

console.log('passing-down-decision-deny.test.js: ok');
