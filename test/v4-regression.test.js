const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.join(__dirname, "..");
const v4Source = fs.readFileSync(path.join(repoRoot, "v4-data.js"), "utf8");
const context = {};

vm.runInNewContext(
  v4Source + "\nthis.__v4 = { v4Formations, v4GetConceptForPlay, v4GetFilterTagsForPlay };",
  context,
  { filename: "v4-data.js" }
);

const { v4Formations, v4GetConceptForPlay, v4GetFilterTagsForPlay } = context.__v4;

assert.strictEqual(
  v4GetConceptForPlay("Cover 3 Buzz Mable"),
  "DANGER",
  "Cover 3 Buzz Mable should match the v4 formation tables"
);
assert.strictEqual(
  v4GetConceptForPlay("Cover 4 Palms"),
  "STUFF",
  "Cover 4 Palms should match the v4 formation tables"
);

const runtimeTags = new Set();
for (const formation of v4Formations) {
  for (const play of formation.plays) {
    for (const tag of v4GetFilterTagsForPlay(play)) {
      runtimeTags.add(tag);
    }
  }
}

for (const fileName of ["index.html", "dark-side-defense-playbook.html"]) {
  const html = fs.readFileSync(path.join(repoRoot, fileName), "utf8");
  const chips = Array.from(html.matchAll(/data-f="(cloud|squat|sand|robber)"/g)).map(
    (match) => match[1]
  );

  assert.deepStrictEqual(
    chips.sort(),
    ["cloud", "robber", "sand", "squat"],
    `${fileName} should expose the expected v4 filter chips`
  );

  for (const chip of chips) {
    assert(
      runtimeTags.has(chip),
      `${fileName} exposes a ${chip} chip, but no v4 play can receive that filter tag`
    );
  }
}

console.log("v4 regression checks passed");
