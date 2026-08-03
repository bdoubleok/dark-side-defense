'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Decision tree APPROVE path must name Sim Pressure 3.
{
  const fn = html.match(/function updateDecisionResult\(\) \{[\s\S]*?\n        \}/);
  assert.ok(fn, 'updateDecisionResult must exist');
  assert.ok(
    /Sim Pressure 3 \(10%\)/.test(fn[0]),
    'APPROVE recommendation must still mention Sim Pressure 3 (10%)'
  );
}

// Extract pressureData object from the inline script.
const pdStart = html.indexOf('const pressureData = {');
assert.ok(pdStart >= 0, 'pressureData must exist');
const pdEnd = html.indexOf('\n        function renderDecisionTree', pdStart);
assert.ok(pdEnd > pdStart, 'pressureData block end not found');

const pressureData = vm.runInNewContext(html.slice(pdStart, pdEnd) + '; pressureData');

for (const situation of ['passingDownsMedium', 'passingDownsObvious']) {
  const pressures = pressureData[situation] && pressureData[situation].pressures;
  assert.ok(Array.isArray(pressures), `${situation}.pressures must be an array`);
  const sim = pressures.find((p) => p.name === 'Sim Pressure 3');
  assert.ok(sim, `${situation} must include Sim Pressure 3 (decision-tree APPROVE names it)`);
  assert.strictEqual(sim.frequency, '10%', `${situation} Sim Pressure 3 frequency must be 10%`);
  assert.ok(sim.formation, `${situation} Sim Pressure 3 must have a formation`);
}

console.log('sim-pressure-decision-tree.test.js: ok');
