const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.join(__dirname, "..");
const v4Source = fs.readFileSync(path.join(repoRoot, "v4-data.js"), "utf8");
const context = {
  document: {
    createElement() {
      return {
        className: "",
        textContent: "",
        innerHTML: "",
      };
    },
  },
};

vm.runInNewContext(
  v4Source +
    "\nthis.__v4 = { v4Formations, v4GetConceptForPlay, v4GetFilterTagsForPlay, v4EnhanceFormationBlocks };",
  context,
  { filename: "v4-data.js" }
);

const {
  v4Formations,
  v4GetConceptForPlay,
  v4GetFilterTagsForPlay,
  v4EnhanceFormationBlocks,
} = context.__v4;

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

const palmsRow = {
  attributes: {
    "data-play": "Cover 4 Palms",
    "data-tags": "pound stuff",
  },
  firstChild: null,
  getAttribute(name) {
    return this.attributes[name] || "";
  },
  setAttribute(name, value) {
    this.attributes[name] = value;
  },
  insertBefore() {},
};

const formationBlock = {
  getAttribute(name) {
    return name === "data-formation" ? "nickel 3-3 over" : "";
  },
  querySelector(selector) {
    if (selector === ".v4-form-meta") return null;
    if (selector === "h4") return { insertAdjacentElement() {} };
    if (selector === ".copy-row") return null;
    return null;
  },
  querySelectorAll(selector) {
    return selector === ".play-list li" ? [palmsRow] : [];
  },
};

const root = {
  querySelectorAll(selector) {
    return selector === "#pb-playbook .form-block, #playbook .form-block"
      ? [formationBlock]
      : [];
  },
};

v4EnhanceFormationBlocks(root);
assert(
  palmsRow.getAttribute("data-tags").split(/\s+/).includes("squat"),
  "v4EnhanceFormationBlocks should make Cover 4 Palms discoverable by the SQUAT chip"
);

console.log("v4 regression checks passed");
