/**
 * Inmate Profile Wireframe Generator
 * Creates grayscale low-fi wireframe per spec (1440 desktop, 8pt grid, Auto Layout).
 */

const C = {
  bg: { r: 0.96, g: 0.96, b: 0.96 },
  surface: { r: 1, g: 1, b: 1 },
  border: { r: 0.88, g: 0.88, b: 0.88 },
  text: { r: 0.1, g: 0.1, b: 0.1 },
  muted: { r: 0.4, g: 0.4, b: 0.4 },
  disabled: { r: 0.74, g: 0.74, b: 0.74 },
  activeNav: { r: 0.92, g: 0.92, b: 0.92 },
  dot: { r: 0.55, g: 0.55, b: 0.55 },
};

const NAV_ITEMS = [
  "Overview",
  "Personal Details",
  "Identifiers & Credentials",
  "Location",
  "Access & Permissions",
  "Call Settings",
  "Call Restrictions",
  "Visitation Settings",
  "Visit Restrictions",
  "Monitoring",
  "Notes",
];

const SP = { xs: 8, sm: 16, md: 24, lg: 32 };

let components = {};

async function loadFonts() {
  const styles = ["Regular", "Medium", "Semi Bold", "Bold"];
  for (const style of styles) {
    await figma.loadFontAsync({ family: "Inter", style });
  }
}

function solid(fill, stroke, sw = 1) {
  const paints = [{ type: "SOLID", color: fill }];
  const strokes =
    stroke != null
      ? [{ type: "SOLID", color: stroke }]
      : [];
  return { fills: paints, strokes, strokeWeight: sw };
}

function textNode(chars, size, style, color = C.text) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style };
  t.fontSize = size;
  t.fills = [{ type: "SOLID", color }];
  t.characters = chars;
  return t;
}

function frame(name, w, h, mode, gap, pad) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.fills = [{ type: "SOLID", color: C.surface }];
  if (mode) {
    f.layoutMode = mode;
    f.itemSpacing = gap || 0;
    f.primaryAxisSizingMode = "AUTO";
    f.counterAxisSizingMode = "AUTO";
    const p = pad || SP.sm;
    f.paddingLeft = f.paddingRight = f.paddingTop = f.paddingBottom = p;
  }
  return f;
}

function applyStroke(node) {
  node.strokes = [{ type: "SOLID", color: C.border }];
  node.strokeWeight = 1;
}

function toggleTrack(on) {
  const t = frame("Toggle", 40, 22, "HORIZONTAL", 0, 2);
  t.resize(40, 22);
  t.cornerRadius = 11;
  t.fills = [{ type: "SOLID", color: on ? C.text : C.border }];
  const knob = figma.createEllipse();
  knob.resize(18, 18);
  knob.fills = [{ type: "SOLID", color: C.surface }];
  t.appendChild(knob);
  t.layoutAlign = "CENTER";
  return t;
}

function createBadge(label, variant) {
  const comp = figma.createComponent();
  comp.name = `Badge/${variant}`;
  comp.layoutMode = "HORIZONTAL";
  comp.paddingLeft = comp.paddingRight = 10;
  comp.paddingTop = comp.paddingBottom = 4;
  comp.itemSpacing = 4;
  comp.cornerRadius = 12;
  comp.fills = [
    {
      type: "SOLID",
      color: variant === "released" ? C.bg : C.activeNav,
    },
  ];
  applyStroke(comp);
  comp.appendChild(textNode(label, 12, "Medium", C.text));
  return comp;
}

function createInput(label, value, opts = {}) {
  const comp = figma.createComponent();
  comp.name = `Input/${opts.readOnly ? "ReadOnly" : "Default"}`;
  comp.layoutMode = "VERTICAL";
  comp.itemSpacing = 4;
  comp.resize(280, 56);
  comp.appendChild(textNode(label, 12, "Regular", C.muted));
  const field = frame("Field", 280, 36, "HORIZONTAL", 8, 10);
  field.resize(280, 36);
  applyStroke(field);
  field.cornerRadius = 4;
  if (opts.readOnly) field.fills = [{ type: "SOLID", color: C.bg }];
  field.appendChild(
    textNode(value || "", 14, "Regular", opts.readOnly ? C.muted : C.text)
  );
  if (opts.tooltip) {
    const tip = figma.createEllipse();
    tip.resize(14, 14);
    tip.fills = [{ type: "SOLID", color: C.border }];
    field.appendChild(tip);
  }
  comp.appendChild(field);
  if (opts.helper) {
    comp.appendChild(textNode(opts.helper, 11, "Regular", C.muted));
  }
  return comp;
}

function createDropdown(label, value) {
  const comp = figma.createComponent();
  comp.name = "Dropdown/Default";
  comp.layoutMode = "VERTICAL";
  comp.itemSpacing = 4;
  comp.resize(280, 56);
  comp.appendChild(textNode(label, 12, "Regular", C.muted));
  const field = frame("Dropdown", 280, 36, "HORIZONTAL", 8, 10);
  field.resize(280, 36);
  applyStroke(field);
  field.cornerRadius = 4;
  field.appendChild(textNode(value, 14, "Regular", C.text));
  field.appendChild(textNode("▾", 12, "Regular", C.muted));
  comp.appendChild(field);
  return comp;
}

function createToggleRow(title, desc, on) {
  const comp = figma.createComponent();
  comp.name = `ToggleRow/${on ? "On" : "Off"}`;
  comp.layoutMode = "HORIZONTAL";
  comp.itemSpacing = SP.sm;
  comp.resize(400, 48);
  comp.counterAxisAlignItems = "CENTER";
  comp.appendChild(toggleTrack(on));
  const col = frame("Copy", 320, 40, "VERTICAL", 2, 0);
  col.fills = [];
  col.appendChild(textNode(title, 14, "Medium", C.text));
  col.appendChild(textNode(desc, 12, "Regular", C.muted));
  comp.appendChild(col);
  return comp;
}

function createCard(title) {
  const comp = figma.createComponent();
  comp.name = "Card/Default";
  comp.layoutMode = "VERTICAL";
  comp.itemSpacing = SP.sm;
  comp.resize(960, 120);
  comp.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(comp);
  comp.cornerRadius = 8;
  if (title) comp.appendChild(textNode(title, 14, "Semi Bold", C.text));
  const slot = frame("Slot", 920, 60, "VERTICAL", SP.sm, 0);
  slot.fills = [];
  slot.name = "Content";
  comp.appendChild(slot);
  return comp;
}

function createNavItem(label, state) {
  const comp = figma.createComponent();
  comp.name = `NavItem/${state}`;
  comp.layoutMode = "HORIZONTAL";
  comp.itemSpacing = SP.xs;
  comp.resize(208, 36);
  comp.paddingLeft = SP.sm;
  comp.paddingRight = SP.sm;
  comp.cornerRadius = 4;
  if (state === "active") comp.fills = [{ type: "SOLID", color: C.activeNav }];
  else comp.fills = [];
  const icon = figma.createRectangle();
  icon.resize(16, 16);
  icon.cornerRadius = 2;
  icon.fills = [{ type: "SOLID", color: C.border }];
  comp.appendChild(icon);
  const style =
    state === "secondary" ? "Regular" : state === "active" ? "Medium" : "Regular";
  const color = state === "secondary" ? C.muted : C.text;
  comp.appendChild(textNode(label, 13, style, color));
  return comp;
}

function createSectionHeader(title, level) {
  const comp = figma.createComponent();
  comp.name = level === 2 ? "SectionHeader/H2" : "SectionHeader/H3";
  comp.appendChild(
    textNode(title, level === 2 ? 18 : 14, level === 2 ? "Semi Bold" : "Medium", C.text)
  );
  return comp;
}

function createTwoColumnForm() {
  const comp = figma.createComponent();
  comp.name = "TwoColumnForm/Default";
  comp.layoutMode = "VERTICAL";
  comp.itemSpacing = SP.sm;
  comp.resize(960, 200);
  comp.fills = [];
  const row = frame("Row", 960, 56, "HORIZONTAL", SP.sm, 0);
  row.fills = [];
  row.layoutGrow = 1;
  row.appendChild(createInput("Field A", "Value").createInstance());
  row.appendChild(createInput("Field B", "Value").createInstance());
  comp.appendChild(row);
  return comp;
}

function buildComponentsPage(page) {
  figma.currentPage = page;
  components.badgeActive = createBadge("Active", "active");
  components.badgeReleased = createBadge("Released", "released");
  components.input = createInput("Label", "Value");
  components.inputRO = createInput("Label", "Read only", { readOnly: true });
  components.dropdown = createDropdown("Label", "Select option");
  components.toggleOn = createToggleRow("Setting name", "Helper description text", true);
  components.toggleOff = createToggleRow("Setting name", "Helper description text", false);
  components.card = createCard("Card title");
  components.navDefault = createNavItem("Nav item", "default");
  components.navActive = createNavItem("Nav item", "active");
  components.navSecondary = createNavItem("Monitoring", "secondary");
  components.h2 = createSectionHeader("Section title", 2);
  components.h3 = createSectionHeader("Sub-section", 3);

  const row = frame("Component row", 1200, 400, "HORIZONTAL", SP.md, SP.md);
  row.fills = [{ type: "SOLID", color: C.bg }];
  Object.values(components).forEach((c) => row.appendChild(c));
  page.appendChild(row);

  const label = textNode("00 — Components", 24, "Bold", C.text);
  label.x = 40;
  label.y = 40;
  page.appendChild(label);
}

function buildLeftNav(activeIndex, secondaryIndex) {
  const nav = frame("LeftNav", 240, 1024, "VERTICAL", 4, SP.sm);
  nav.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(nav);
  nav.layoutAlign = "STRETCH";
  nav.primaryAxisSizingMode = "FIXED";
  nav.resize(240, 1024);

  nav.appendChild(textNode("Inmate Profile", 16, "Semi Bold", C.text));

  NAV_ITEMS.forEach((item, i) => {
    let state = "default";
    if (i === activeIndex) state = "active";
    if (i === secondaryIndex) state = "secondary";
    const inst = components[
      state === "active"
        ? "navActive"
        : state === "secondary"
          ? "navSecondary"
          : "navDefault"
    ].createInstance();
    inst.findOne((n) => n.type === "TEXT").characters = item;
    nav.appendChild(inst);
  });

  if (secondaryIndex === 9) {
    const adv = textNode("ADVANCED", 10, "Medium", C.muted);
    nav.insertChild(10, adv);
  }

  return nav;
}

function buildUtilityPanel(collapsed) {
  if (collapsed) {
    const strip = frame("UtilityCollapsed", 40, 1024, "VERTICAL", SP.xs, 8);
    strip.fills = [{ type: "SOLID", color: C.bg }];
    applyStroke(strip);
    strip.appendChild(textNode("›", 16, "Medium", C.muted));
    return strip;
  }
  const panel = frame("UtilityPanel", 240, 1024, "VERTICAL", SP.sm, SP.sm);
  panel.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(panel);
  panel.appendChild(textNode("Quick actions", 14, "Semi Bold", C.text));
  panel.appendChild(textNode("Recent activity placeholder", 12, "Regular", C.muted));
  return panel;
}

function shellFrame(name, activeNav, contentBuilder, height) {
  const root = frame(name, 1440, height || 1024, "HORIZONTAL", 0, 0);
  root.fills = [{ type: "SOLID", color: C.bg }];
  root.paddingLeft = root.paddingRight = root.paddingTop = root.paddingBottom = 0;
  root.primaryAxisSizingMode = "FIXED";
  root.counterAxisSizingMode = "FIXED";

  const secIdx =
    activeNav === "Monitoring" ? 9 : NAV_ITEMS.indexOf(activeNav);
  const nav = buildLeftNav(secIdx, secIdx === 9 ? 9 : -1);

  const main = frame("Main", 1040, height || 1024, "VERTICAL", SP.md, SP.md);
  main.fills = [];
  main.layoutGrow = 1;
  main.primaryAxisSizingMode = "AUTO";
  main.clipsContent = true;
  contentBuilder(main);

  root.appendChild(nav);
  root.appendChild(main);
  root.appendChild(buildUtilityPanel(true));
  return root;
}

function instInput(label, value, opts) {
  const c = opts && opts.readOnly ? components.inputRO : components.input;
  const i = c.createInstance();
  const texts = i.findAll((n) => n.type === "TEXT");
  if (texts[0]) texts[0].characters = label;
  if (texts[1]) texts[1].characters = value || "";
  return i;
}

function instDropdown(label, value) {
  const i = components.dropdown.createInstance();
  const texts = i.findAll((n) => n.type === "TEXT");
  if (texts[0]) texts[0].characters = label;
  if (texts[1]) texts[1].characters = value;
  return i;
}

function instToggle(title, desc, on) {
  const i = (on ? components.toggleOn : components.toggleOff).createInstance();
  const texts = i.findAll((n) => n.type === "TEXT");
  if (texts[0]) texts[0].characters = title;
  if (texts[1]) texts[1].characters = desc;
  return i;
}

function sectionOverview(main) {
  const h = components.h2.createInstance();
  h.findOne((n) => n.type === "TEXT").characters = "Overview";
  main.appendChild(h);

  const hero = frame("HeroCard", 1000, 200, "HORIZONTAL", SP.md, SP.md);
  hero.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(hero);
  hero.cornerRadius = 8;

  const photo = figma.createRectangle();
  photo.resize(96, 96);
  photo.fills = [{ type: "SOLID", color: C.border }];
  photo.cornerRadius = 4;
  hero.appendChild(photo);

  const col = frame("HeroMeta", 840, 180, "VERTICAL", SP.sm, 0);
  col.fills = [];
  const r1 = frame("R1", 840, 32, "HORIZONTAL", SP.sm, 0);
  r1.fills = [];
  r1.appendChild(textNode("Jordan A. Martinez", 24, "Bold", C.text));
  r1.appendChild(components.badgeActive.createInstance());
  col.appendChild(r1);
  col.appendChild(
    textNode("DOB: 03/14/1989 (37)  ·  Facility: North Annex  ·  Room: B-204", 14, "Regular", C.muted)
  );
  col.appendChild(
    textNode("Tablet balance: $12.40  ·  Phone balance: $8.00", 14, "Regular", C.text)
  );
  const collapse = frame("IDs", 840, 80, "VERTICAL", SP.xs, 0);
  collapse.fills = [];
  collapse.appendChild(textNode("▾ View details", 13, "Medium", C.text));
  collapse.appendChild(textNode("Inmate ID: 8849201", 12, "Regular", C.muted));
  collapse.appendChild(textNode("Booking #: 2024-11829", 12, "Regular", C.muted));
  collapse.appendChild(textNode("Booking key: NA-B204-JM", 12, "Regular", C.muted));
  col.appendChild(collapse);
  hero.appendChild(col);
  main.appendChild(hero);
}

function sectionPersonalDetails(main) {
  main.appendChild(textNode("Personal Details", 18, "Semi Bold", C.text));
  const grid = frame("Form", 1000, 320, "VERTICAL", SP.sm, 0);
  grid.fills = [];
  const r1 = frame("R", 1000, 56, "HORIZONTAL", SP.sm, 0);
  r1.fills = [];
  r1.appendChild(instInput("First name", "Jordan"));
  r1.appendChild(instInput("Middle name", "A."));
  r1.appendChild(instInput("Last name", "Martinez"));
  grid.appendChild(r1);
  const r2 = frame("R", 1000, 56, "HORIZONTAL", SP.sm, 0);
  r2.fills = [];
  r2.appendChild(instInput("Date of birth", "03/14/1989"));
  r2.appendChild(instInput("Age", "37", { readOnly: true }));
  grid.appendChild(r2);
  const r3 = frame("R", 1000, 56, "HORIZONTAL", SP.sm, 0);
  r3.fills = [];
  r3.appendChild(instDropdown("Gender", "Male"));
  r3.appendChild(instDropdown("Race", "Decline to answer"));
  grid.appendChild(r3);
  const r4 = frame("R", 1000, 56, "HORIZONTAL", SP.sm, 0);
  r4.fills = [];
  r4.appendChild(instInput("Classification code", "MED"));
  r4.appendChild(instInput("Country of birth", "United States"));
  grid.appendChild(r4);
  grid.appendChild(instInput("Member type", "General population"));
  const card = frame("Card", 1000, 360, "VERTICAL", SP.sm, SP.md);
  card.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(card);
  card.cornerRadius = 8;
  card.appendChild(grid);
  main.appendChild(card);
}

function sectionIdentifiers(main) {
  main.appendChild(textNode("Identifiers & Credentials", 18, "Semi Bold", C.text));
  const a = frame("System IDs", 1000, 220, "VERTICAL", SP.sm, SP.md);
  a.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(a);
  a.cornerRadius = 8;
  a.appendChild(textNode("System identifiers", 14, "Semi Bold", C.text));
  const g = frame("G", 960, 160, "HORIZONTAL", SP.sm, 0);
  g.fills = [];
  g.layoutWrap = "WRAP";
  g.itemSpacing = SP.sm;
  ["Inmate ID", "Booking #", "Booking key", "Alias", "Misc ID", "Card ID"].forEach(
    (l, i) => g.appendChild(instInput(l, `ID-${1000 + i}`, { readOnly: true }))
  );
  a.appendChild(g);
  main.appendChild(a);

  const b = frame("Credentials", 1000, 200, "VERTICAL", SP.sm, SP.md);
  b.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(b);
  b.cornerRadius = 8;
  b.appendChild(textNode("Access credentials", 14, "Semi Bold", C.text));
  const g2 = frame("G2", 960, 120, "HORIZONTAL", SP.sm, 0);
  g2.fills = [];
  g2.layoutWrap = "WRAP";
  ["Tablet PIN", "Backup PIN", "Call PIN", "Password"].forEach((l) =>
    g2.appendChild(instInput(l, "••••••"))
  );
  b.appendChild(g2);
  main.appendChild(b);

  const c = frame("PIN Controls", 1000, 72, "HORIZONTAL", SP.md, SP.md);
  c.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(c);
  c.cornerRadius = 8;
  c.counterAxisAlignItems = "CENTER";
  c.appendChild(instToggle("Sync PINs", "Keep tablet and call PINs aligned", true));
  const btn = frame("Reset PIN", 100, 36, "HORIZONTAL", 0, 12);
  btn.fills = [{ type: "SOLID", color: C.text }];
  btn.cornerRadius = 4;
  btn.appendChild(textNode("Reset PIN", 13, "Medium", C.surface));
  c.appendChild(btn);
  main.appendChild(c);
}

function sectionLocation(main) {
  main.appendChild(textNode("Location", 18, "Semi Bold", C.text));
  const card = frame("LocationCard", 1000, 280, "VERTICAL", SP.sm, SP.md);
  card.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(card);
  card.cornerRadius = 8;
  card.appendChild(instDropdown("Facility", "North Annex"));
  const indent = frame("Hierarchy", 960, 160, "VERTICAL", SP.sm, 0);
  indent.fills = [];
  indent.paddingLeft = SP.md;
  indent.strokes = [{ type: "SOLID", color: C.border }];
  indent.strokeLeftWeight = 2;
  indent.appendChild(instDropdown("Block", "B"));
  indent.appendChild(instDropdown("Room (housing)", "B-204"));
  indent.appendChild(instInput("Group(s)", "General population"));
  card.appendChild(indent);
  card.appendChild(textNode("▸ Advanced — raw location string", 12, "Medium", C.muted));
  main.appendChild(card);
}

function sectionAccess(main) {
  main.appendChild(textNode("Access & Permissions", 18, "Semi Bold", C.text));
  const card = frame("Access", 1000, 260, "VERTICAL", SP.sm, SP.md);
  card.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(card);
  card.cornerRadius = 8;
  card.appendChild(
    instToggle("Phone station access", "Controls access to facility phone stations", true)
  );
  card.appendChild(
    instToggle("Tablet access", "Controls access to tablet login", true)
  );
  card.appendChild(
    instToggle("Video visitation access", "Allows scheduling and joining video visits", false)
  );
  main.appendChild(card);
  const limits = frame("Limits", 1000, 120, "VERTICAL", SP.sm, SP.md);
  limits.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(limits);
  limits.cornerRadius = 8;
  limits.appendChild(textNode("Limits", 14, "Semi Bold", C.text));
  const lr = frame("LR", 960, 56, "HORIZONTAL", SP.sm, 0);
  lr.fills = [];
  lr.appendChild(instInput("Limit on grievances", "3"));
  lr.appendChild(instInput("Limit on requests", "5"));
  limits.appendChild(lr);
  main.appendChild(limits);
}

function sectionCallSettings(main) {
  main.appendChild(textNode("Call Settings", 18, "Semi Bold", C.text));
  const groups = [
    {
      title: "Contact controls",
      rows: [
        ["Auto PAN", "Enabled — number 4025550182"],
        ["Max PAN", "4025550199"],
      ],
    },
    { title: "Usage limits", rows: [["Minutes between calls", "15"]] },
    {
      title: "Security",
      rows: [
        ["Threat group", "Standard"],
        ["Voice IQ", "● Verified"],
      ],
    },
    { title: "Features", rows: [["Voicemail", "On"]] },
  ];
  groups.forEach((g) => {
    const card = frame(g.title, 1000, 120, "VERTICAL", SP.sm, SP.md);
    card.fills = [{ type: "SOLID", color: C.surface }];
    applyStroke(card);
    card.cornerRadius = 8;
    card.appendChild(textNode(g.title, 14, "Semi Bold", C.text));
    g.rows.forEach(([l, v]) => {
      if (l === "Voicemail") card.appendChild(instToggle("Voicemail", "Enable voicemail box", true));
      else if (l === "Threat group") card.appendChild(instDropdown(l, v));
      else if (l === "Voice IQ")
        card.appendChild(textNode("Voice IQ  ● Verified", 14, "Regular", C.text));
      else card.appendChild(instInput(l, v));
    });
    main.appendChild(card);
  });
}

function sectionCallRestrictions(main) {
  main.appendChild(textNode("Call Restrictions", 18, "Semi Bold", C.text));
  const card = frame("CallRestr", 1000, 220, "VERTICAL", SP.sm, SP.md);
  card.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(card);
  card.cornerRadius = 8;
  const badge = components.badgeActive.createInstance();
  badge.findOne((n) => n.type === "TEXT").characters = "Active";
  card.appendChild(badge);
  const tl = frame("Timeline", 960, 56, "HORIZONTAL", SP.sm, 0);
  tl.fills = [];
  tl.appendChild(instInput("Lockout start", "05/01/2026 08:00"));
  tl.appendChild(instInput("Lockout end", "05/15/2026 08:00"));
  card.appendChild(tl);
  card.appendChild(instToggle("Allow free calls", "Override free call lockout", false));
  card.appendChild(instToggle("Allow private calls", "Override private call lockout", false));
  main.appendChild(card);
}

function sectionVisitation(masterOn) {
  return function (main) {
    main.appendChild(textNode("Visitation Settings", 18, "Semi Bold", C.text));
    const card = frame("Vis", 1000, 280, "VERTICAL", SP.sm, SP.md);
    card.fills = [{ type: "SOLID", color: C.surface }];
    applyStroke(card);
    card.cornerRadius = 8;
    card.appendChild(
      instToggle("Allow inmate to schedule visits", "Inmate can propose visit times", true)
    );
    card.appendChild(
      instToggle("Auto-record video visits", "Sessions stored per policy", false)
    );
    card.appendChild(
      instToggle(
        "Use approved visitor list",
        "When on, visit-type toggles are enforced centrally",
        masterOn
      )
    );
    const child = frame("Children", 920, 120, "VERTICAL", SP.xs, 0);
    child.fills = [];
    child.paddingLeft = SP.lg;
    ["Video visits", "Face-to-face visits", "Internet video visits"].forEach((t) => {
      const row = instToggle(t, "Controlled by approved list", false);
      if (masterOn) {
        row.opacity = 0.45;
        row.findAll((n) => n.type === "TEXT").forEach((tx) => {
          tx.fills = [{ type: "SOLID", color: C.disabled }];
        });
      }
      child.appendChild(row);
    });
    card.appendChild(child);
    main.appendChild(card);
    if (masterOn) {
      main.appendChild(
        textNode("Annotation: master ON → child toggles shown disabled", 11, "Regular", C.muted)
      );
    }
  };
}

function sectionVisitRestrictions(main) {
  main.appendChild(textNode("Visit Restrictions", 18, "Semi Bold", C.text));
  const card = frame("VisitRestr", 1000, 320, "VERTICAL", SP.sm, SP.md);
  card.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(card);
  card.cornerRadius = 8;
  card.appendChild(instDropdown("Restriction type", "Temporary suspension"));
  const ta = frame("Reason", 960, 80, "VERTICAL", 4, 0);
  ta.fills = [];
  ta.appendChild(textNode("Restriction reason", 12, "Regular", C.muted));
  const box = frame("Textarea", 960, 64, "VERTICAL", 0, 10);
  box.resize(960, 64);
  applyStroke(box);
  box.appendChild(textNode("Documented incident on 04/12/2026…", 13, "Regular", C.text));
  ta.appendChild(box);
  card.appendChild(ta);
  card.appendChild(instInput("Authorized by", "Officer L. Chen"));
  const dr = frame("Dates", 960, 56, "HORIZONTAL", SP.sm, 0);
  dr.fills = [];
  dr.appendChild(instInput("Start date", "05/01/2026"));
  dr.appendChild(instInput("End date", "05/31/2026"));
  card.appendChild(dr);
  main.appendChild(card);
}

function sectionMonitoring(main, expanded) {
  main.appendChild(textNode("Monitoring (Advanced)", 18, "Semi Bold", C.text));
  const card = frame("Mon", 1000, expanded ? 280 : 48, "VERTICAL", SP.sm, SP.md);
  card.fills = [{ type: "SOLID", color: C.surface }];
  card.strokes = [{ type: "SOLID", color: C.muted }];
  card.strokeWeight = 1;
  card.cornerRadius = 8;
  card.appendChild(
    textNode(expanded ? "▾ Monitoring" : "▸ Monitoring (collapsed)", 14, "Medium", C.text)
  );
  if (expanded) {
    card.appendChild(textNode("Status flags", 13, "Semi Bold", C.text));
    card.appendChild(instToggle("Active status", "Monitoring enabled", true));
    card.appendChild(instInput("Hot PIN", "••••"));
    card.appendChild(instToggle("Currently in use", "Live session", false));
    card.appendChild(textNode("Voice & playback", 13, "Semi Bold", C.text));
    card.appendChild(instToggle("Restricted playback", "Limit recording playback", false));
    card.appendChild(instToggle("Voice verification — enrolled", "", true));
    card.appendChild(instToggle("Voice verification — exempt", "", false));
    const btn = frame("Reset", 160, 36, "HORIZONTAL", 0, 12);
    btn.fills = [{ type: "SOLID", color: C.text }];
    btn.cornerRadius = 4;
    btn.appendChild(textNode("Reset recorded name", 12, "Medium", C.surface));
    card.appendChild(btn);
  }
  main.appendChild(card);
}

function sectionNotes(main) {
  main.appendChild(textNode("Notes", 18, "Semi Bold", C.text));
  const edit = frame("Editable", 1000, 180, "VERTICAL", SP.sm, SP.md);
  edit.fills = [{ type: "SOLID", color: C.surface }];
  applyStroke(edit);
  edit.cornerRadius = 8;
  edit.appendChild(textNode("Editable notes", 14, "Semi Bold", C.text));
  const box = frame("Textarea", 960, 80, "VERTICAL", 0, 10);
  box.resize(960, 80);
  applyStroke(box);
  box.appendChild(textNode("Case manager notes…", 13, "Regular", C.text));
  edit.appendChild(box);
  const actions = frame("Actions", 200, 36, "HORIZONTAL", SP.xs, 0);
  actions.fills = [];
  ["Save", "Clear"].forEach((l, i) => {
    const b = frame(l, 72, 32, "HORIZONTAL", 0, 12);
    b.fills = [{ type: "SOLID", color: i ? C.bg : C.text }];
    applyStroke(b);
    b.cornerRadius = 4;
    b.appendChild(textNode(l, 12, "Medium", i ? C.text : C.surface));
    actions.appendChild(b);
  });
  edit.appendChild(actions);
  main.appendChild(edit);

  const ext = frame("External", 1000, 200, "VERTICAL", SP.xs, SP.md);
  ext.fills = [{ type: "SOLID", color: C.bg }];
  applyStroke(ext);
  ext.cornerRadius = 8;
  ext.appendChild(textNode("External notes (read-only)", 14, "Semi Bold", C.text));
  [
    "2026-05-28 14:02 — Visit request auto-denied (restriction active)",
    "2026-05-27 09:15 — PIN sync completed",
    "2026-05-20 11:00 — Transferred to North Annex B-204",
  ].forEach((line) => {
    const row = frame("Log", 960, 36, "VERTICAL", 2, 0);
    row.fills = [];
    row.appendChild(textNode(line.split(" — ")[0], 11, "Regular", C.muted));
    row.appendChild(textNode(line.split(" — ")[1], 12, "Regular", C.text));
    ext.appendChild(row);
  });
  main.appendChild(ext);
}

function buildAnnotationsPage(page) {
  figma.currentPage = page;
  const notes = [
    ["Identifiers vs credentials", "Separation reduces accidental PIN exposure when scanning."],
    ["Visitor list master", "When ON, child visit-type toggles are disabled — enforcement is centralized."],
    ["Location hierarchy", "Facility drives block/room — dropdown cascade for engineering."],
    ["Monitoring", "Collapsed by default to reduce cognitive load for daily ops."],
    ["Terminology", "Tablet PIN vs Call PIN labels normalized in copy."],
  ];
  let y = 80;
  notes.forEach(([title, body]) => {
    const n = frame(title, 400, 100, "VERTICAL", SP.xs, SP.sm);
    n.x = 80;
    n.y = y;
    n.fills = [{ type: "SOLID", color: { r: 1, g: 0.98, b: 0.8 } }];
    applyStroke(n);
    n.cornerRadius = 4;
    n.appendChild(textNode(title, 13, "Semi Bold", C.text));
    n.appendChild(textNode(body, 12, "Regular", C.muted));
    page.appendChild(n);
    y += 120;
  });
  const title = textNode("03 — Annotations", 24, "Bold", C.text);
  title.x = 80;
  title.y = 40;
  page.appendChild(title);
}

async function run() {
  await loadFonts();

  const pages = {
    components: figma.createPage(),
    shell: figma.createPage(),
    sections: figma.createPage(),
    annotations: figma.createPage(),
  };
  pages.components.name = "00 — Components";
  pages.shell.name = "01 — Shell";
  pages.sections.name = "02 — Sections";
  pages.annotations.name = "03 — Annotations";

  buildComponentsPage(pages.components);

  figma.currentPage = pages.shell;
  const shell = shellFrame("Shell / Inmate Profile", "Overview", sectionOverview, 1024);
  shell.x = 80;
  shell.y = 80;
  pages.shell.appendChild(shell);
  pages.shell.appendChild(textNode("01 — Shell", 24, "Bold", C.text));
  pages.shell.children[pages.shell.children.length - 1].x = 80;
  pages.shell.children[pages.shell.children.length - 1].y = 40;

  figma.currentPage = pages.sections;
  const builders = [
    ["01 Overview", "Overview", sectionOverview],
    ["02 Personal Details", "Personal Details", sectionPersonalDetails],
    ["03 Identifiers", "Identifiers & Credentials", sectionIdentifiers],
    ["04 Location", "Location", sectionLocation],
    ["05 Access", "Access & Permissions", sectionAccess],
    ["06 Call Settings", "Call Settings", sectionCallSettings],
    ["07 Call Restrictions", "Call Restrictions", sectionCallRestrictions],
    ["08 Visitation (master OFF)", "Visitation Settings", sectionVisitation(false)],
    ["08b Visitation (master ON)", "Visitation Settings", sectionVisitation(true)],
    ["09 Visit Restrictions", "Visit Restrictions", sectionVisitRestrictions],
    ["10 Monitoring (collapsed)", "Monitoring", (m) => sectionMonitoring(m, false)],
    ["10b Monitoring (expanded)", "Monitoring", (m) => sectionMonitoring(m, true)],
    ["11 Notes", "Notes", sectionNotes],
  ];

  let x = 80;
  let y = 120;
  builders.forEach(([frameName, nav, builder], idx) => {
    const f = shellFrame(frameName, nav, builder, 1100);
    f.x = x;
    f.y = y;
    pages.sections.appendChild(f);
    x += 1500;
    if ((idx + 1) % 3 === 0) {
      x = 80;
      y += 1200;
    }
  });
  const secLabel = textNode("02 — Sections", 24, "Bold", C.text);
  secLabel.x = 80;
  secLabel.y = 40;
  pages.sections.appendChild(secLabel);

  buildAnnotationsPage(pages.annotations);

  figma.currentPage = pages.sections;
  figma.viewport.scrollAndZoomIntoView(pages.sections.children);

  figma.closePlugin(
    "Inmate Profile wireframe created: 4 pages, components, shell, 12 section frames, annotations."
  );
}

figma.run(run);
