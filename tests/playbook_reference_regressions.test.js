const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');

function readHtml(fileName) {
  return readFileSync(new URL(`../${fileName}`, `file://${__filename}`), 'utf8');
}

function sectionById(html, id) {
  const match = html.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`));
  assert.ok(match, `Missing section #${id}`);
  return match[0];
}

function chipFilters(html, chipsId) {
  const chips = html.match(new RegExp(`<div class="filter-chips" id="${chipsId}">[\\s\\S]*?</div>`));
  assert.ok(chips, `Missing chips container #${chipsId}`);
  return Array.from(chips[0].matchAll(/data-f="([^"]+)"/g), function (match) {
    return match[1];
  }).filter(function (filter) {
    return filter !== 'all';
  });
}

function taggedListItems(html) {
  return Array.from(html.matchAll(/<li\s+[^>]*data-tags="([^"]+)"/g), function (match) {
    return match[1].split(/\s+/);
  });
}

function assertEveryChipHasTaggedItem(fileName, chipsId, filteredSectionIds) {
  const html = readHtml(fileName);
  const filteredHtml = filteredSectionIds.map(function (id) {
    return sectionById(html, id);
  }).join('\n');
  const items = taggedListItems(filteredHtml);

  chipFilters(html, chipsId).forEach(function (filter) {
    assert.ok(
      items.some(function (tags) { return tags.includes(filter); }),
      `${fileName}: filter "${filter}" has no matching filtered play rows`
    );
  });
}

test('embedded playbook filter chips all match at least one filtered row', function () {
  assertEveryChipHasTaggedItem('index.html', 'pb-chips', [
    'pb-playbook',
    'pb-callsheet',
    'pb-redzone',
  ]);
});

test('standalone playbook filter chips all match at least one filtered row', function () {
  assertEveryChipHasTaggedItem('dark-side-defense-playbook.html', 'chips', [
    'playbook',
    'callsheet',
    'redzone',
  ]);
});

test('copy actions only include rows visible under the active filters', function () {
  ['index.html', 'dark-side-defense-playbook.html'].forEach(function (fileName) {
    const html = readHtml(fileName);
    const visibleRowFilters = html.match(
      /\.filter\(function \(li\) \{ return !li\.classList\.contains\('hidden'\); \}\)/g
    ) || [];

    assert.ok(
      visibleRowFilters.length >= 2,
      `${fileName}: formation and full-call-sheet copy handlers must filter hidden rows`
    );
  });
});
