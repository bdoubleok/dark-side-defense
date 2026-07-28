'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const start = html.indexOf('function classifyDefensiveFront');
const end = html.indexOf('function setHashPosition');
assert.ok(start >= 0 && end > start, 'DL alignment helpers must exist in index.html');

const ctx = {};
vm.createContext(ctx);
vm.runInContext(html.slice(start, end), ctx);

const {
  classifyDefensiveFront,
  adaptDlAlignmentForFormation,
  getDLAlignment
} = ctx;

assert.strictEqual(classifyDefensiveFront('4-3 Over'), 'fourDown');
assert.strictEqual(classifyDefensiveFront('Nickel 3-3 Mint'), 'threeDown');
assert.strictEqual(classifyDefensiveFront('Dime 1-5-5'), 'dime');
assert.strictEqual(classifyDefensiveFront('Nickel 2-4 Load'), 'fourDown');

// Adapter: 4-3 keeps valid 4-man techniques but drops Nickel front label
{
  const adapted = adaptDlAlignmentForFormation(
    '4-3 Over',
    'Nickel 2-4 Over',
    ['3T to strength', '1T weak', 'DE: 5-tech']
  );
  assert.strictEqual(adapted.front, '4-3 Over');
  assert.deepStrictEqual(adapted.dl, ['3T to strength', '1T weak', 'DE: 5-tech']);
}

// Adapter: Nickel 2-4 Load inherits Over/Under/Balanced from table front
{
  const adapted = adaptDlAlignmentForFormation(
    'Nickel 2-4 Load',
    'Nickel 2-4 Under',
    ['3T to boundary']
  );
  assert.strictEqual(adapted.front, 'Nickel 2-4 Load Under');
}

// Adapter: 3-down fronts never keep 3T/1T technique lines
{
  const adapted = adaptDlAlignmentForFormation(
    '3-3-5 Over Flex',
    'Nickel 2-4 Over',
    ['3T to field', '1T to boundary', 'DE: 5-tech']
  );
  assert.strictEqual(adapted.front, '3-3-5 Over Flex');
  assert.ok(adapted.dl.every((line) => !/\b3T\b|\b1T\b/.test(line)));
  assert.ok(adapted.dl.some((line) => /4i-tech/.test(line)));
}

// Critical trigger: vs Heavy/Jumbo → 4-3 Over / Cover 3 Sky must not show Nickel
{
  const alignment = getDLAlignment('Cover 3 Sky', '4-3 Over', 'none', 'none', 'middle');
  assert.ok(alignment, 'Cover 3 Sky should resolve an alignment');
  assert.strictEqual(alignment.front, '4-3 Over');
  assert.ok(!/nickel/i.test(alignment.front));
}

// Critical trigger: Dime package must not invent a 4-man Nickel front
{
  const alignment = getDLAlignment('Cover 2 Man', 'Dime 1-5-5', 'empty', 'none', 'left');
  assert.ok(alignment);
  assert.strictEqual(alignment.front, 'Dime 1-5-5');
  assert.ok(alignment.dl.every((line) => !/\b3T\b|\b1T\b/.test(line)));
}

// Short yardage Mint Cover 3 Sky must use 3-down techniques
{
  const alignment = getDLAlignment('Cover 3 Sky', 'Nickel 3-3 Mint', 'none', 'none', 'middle');
  assert.ok(alignment);
  assert.strictEqual(alignment.front, 'Nickel 3-3 Mint');
  assert.ok(alignment.dl.some((line) => /4i-tech/.test(line)));
}

// Unchanged happy path for base Nickel 2-4
{
  const alignment = getDLAlignment('Cover 6', 'Nickel 2-4', 'trips', 'field', 'left');
  assert.ok(alignment);
  assert.strictEqual(alignment.front, 'Nickel 2-4 Over');
}

console.log('dl-alignment-formation.test.js: ok');
