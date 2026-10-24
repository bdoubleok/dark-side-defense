'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Default formation is "none", which has no strength. Field/Boundary must
// start disabled so the first click cannot check them while state stays none.
{
  const field = html.match(/<input type="radio" name="strength" id="strengthField"[^>]*>/);
  const boundary = html.match(/<input type="radio" name="strength" id="strengthBoundary"[^>]*>/);
  assert.ok(field, 'strengthField input must exist');
  assert.ok(boundary, 'strengthBoundary input must exist');
  assert.ok(/\sdisabled(?:\s|>)/.test(field[0]), 'strengthField must start disabled');
  assert.ok(/\sdisabled(?:\s|>)/.test(boundary[0]), 'strengthBoundary must start disabled');
}

const start = html.indexOf('function syncStrengthControls(');
const end = html.indexOf('\n        function updateHashFilter', start);
assert.ok(start >= 0 && end > start, 'strength control helpers must exist');

function harness(hashState) {
  const els = {};
  function make(id, checked) {
    els[id] = {
      id,
      checked: !!checked,
      disabled: false,
      parentElement: { style: {} }
    };
  }
  make('strengthField', false);
  make('strengthBoundary', false);
  make('strengthNone', hashState.strength === 'none');
  make('formTrips');
  make('formSpread');
  make('formTE');
  make('formEmpty');
  make('formNone', hashState.formationType === 'none');
  let paints = 0;
  const document = {
    getElementById(id) {
      if (!els[id]) throw new Error('missing ' + id);
      return els[id];
    },
    querySelectorAll() {
      return [els.strengthField, els.strengthBoundary, els.strengthNone];
    }
  };
  const api = new Function(
    'document',
    'hashState',
    'updateHashFilter',
    'renderPlays',
    html.slice(start, end) + '\nreturn { syncStrengthControls, setFormationType, setStrength };'
  )(document, hashState, () => { paints += 1; }, () => { paints += 1; });
  return { els, api, paints: () => paints };
}

// Clicking Field while formation is still None must not stick the radio on
// and must not change state. That desync made a later Trips selection show
// "To Field" while getDLAlignment still used strength none.
{
  const hashState = { formationType: 'none', strength: 'none' };
  const { els, api, paints } = harness(hashState);
  els.strengthField.checked = true;
  els.strengthNone.checked = false;
  const before = paints();
  api.setStrength('field');
  assert.strictEqual(hashState.strength, 'none');
  assert.strictEqual(els.strengthField.checked, false);
  assert.strictEqual(els.strengthNone.checked, true);
  assert.strictEqual(els.strengthField.disabled, true);
  assert.strictEqual(paints(), before, 'rejected strength click must not repaint calls');
}

// If Field was already checked and the user then picks Trips, the radios
// must follow state (none) instead of keeping the stale Field check.
{
  const hashState = { formationType: 'none', strength: 'none' };
  const { els, api } = harness(hashState);
  els.strengthField.checked = true;
  els.strengthNone.checked = false;
  api.setFormationType('trips');
  assert.strictEqual(hashState.formationType, 'trips');
  assert.strictEqual(hashState.strength, 'none');
  assert.strictEqual(els.strengthField.checked, false);
  assert.strictEqual(els.strengthNone.checked, true);
  assert.strictEqual(els.strengthField.disabled, false);
}

// After a formation that uses strength, Field must still apply.
{
  const hashState = { formationType: 'trips', strength: 'none' };
  const { els, api } = harness(hashState);
  api.setStrength('field');
  assert.strictEqual(hashState.strength, 'field');
  assert.strictEqual(els.strengthField.checked, true);
  assert.strictEqual(els.strengthNone.checked, false);
  assert.strictEqual(els.strengthField.disabled, false);
}

console.log('strength-filter-initial-lock.test.js: ok');
