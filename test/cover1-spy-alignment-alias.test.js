'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const start = html.indexOf('function getDLAlignment(');
const end = html.indexOf('\n        function setHashPosition', start);
assert.ok(start >= 0 && end > start, 'getDLAlignment must exist in index.html');

const getDLAlignment = new Function(html.slice(start, end) + '; return getDLAlignment;')();

// Game-plan play name on vs Veer & Shoot must resolve the Empty DL row
// authored under the shorter table key 'Cover 1 w/ Spy'.
{
  const alignment = getDLAlignment(
    'Cover 1 w/ MLB Spy',
    '3-3-5 Over Flex',
    'empty',
    'none',
    'left'
  );
  assert.ok(alignment, 'Cover 1 w/ MLB Spy must resolve DL alignment (was null via name drift)');
  assert.strictEqual(alignment.front, '3-3-5 Over Flex');
  assert.ok(
    alignment.dl.some((line) => /contain rush/.test(line)),
    'Empty row for Spy must keep contain-rush technique lines'
  );
}

// Canonical table key and formation-adjustment label must keep working.
for (const name of ['Cover 1 w/ Spy', 'vs Empty → Cover 1 w/ Spy']) {
  const alignment = getDLAlignment(name, '3-3-5 Over Flex', 'empty', 'none', 'right');
  assert.ok(alignment, `${name} must resolve DL alignment`);
  assert.strictEqual(alignment.front, '3-3-5 Over Flex');
}

console.log('cover1-spy-alignment-alias.test.js: ok');
