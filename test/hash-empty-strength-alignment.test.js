'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// setFormationType must treat empty like spread (no field/boundary strength).
{
  const fn = html.match(/function setFormationType\(type\) \{[\s\S]*?\n        \}/);
  assert.ok(fn, 'setFormationType must exist');
  assert.ok(
    /type === 'none' \|\| type === 'spread' \|\| type === 'empty'/.test(fn[0]),
    'setFormationType must reset/disable strength for empty'
  );
}

{
  const fn = html.match(/function setStrength\(str\) \{[\s\S]*?\n        \}/);
  assert.ok(fn, 'setStrength must exist');
  assert.ok(
    /formationType === 'empty'/.test(fn[0]),
    'setStrength must ignore clicks while Empty is selected'
  );
}

const start = html.indexOf('function getDLAlignment(');
const end = html.indexOf('\n        function setHashPosition', start);
assert.ok(start >= 0 && end > start, 'getDLAlignment must exist in index.html');

const getDLAlignment = new Function(html.slice(start, end) + '; return getDLAlignment;')();

// Critical trigger: Trips + Field, then Empty — leftover strength must not
// fall back to Cover 1 Hole *base* (Mint 4i/0) and must keep the Empty row
// (3-3-5 Over Flex speed-rush front).
for (const strength of ['field', 'boundary', 'none']) {
  const alignment = getDLAlignment('Cover 1 Hole', 'Nickel 3-3 Mint', 'empty', strength, 'left');
  assert.ok(alignment, `Cover 1 Hole empty/${strength} should resolve`);
  assert.strictEqual(
    alignment.front,
    '3-3-5 Over Flex',
    `empty/${strength} must use Empty front, not base Mint (got ${alignment.front})`
  );
  assert.ok(
    alignment.dl.some((line) => /3T/.test(line)),
    `empty/${strength} should keep Empty technique lines`
  );
  assert.ok(
    !alignment.dl.some((line) => /4i-tech/.test(line)),
    `empty/${strength} must not fall back to Mint 4i/0 base lines`
  );
}

// Cover 1 w/ Spy Empty row must likewise survive leftover strength.
{
  const alignment = getDLAlignment('Cover 1 w/ Spy', '3-3-5 Over Flex', 'empty', 'field', 'right');
  assert.ok(alignment);
  assert.strictEqual(alignment.front, '3-3-5 Over Flex');
  assert.ok(alignment.dl.some((line) => /contain rush/.test(line)));
}

console.log('hash-empty-strength-alignment.test.js: ok');
