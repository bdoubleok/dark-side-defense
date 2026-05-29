# Prototype links (Figma)

After running the wireframe generator plugin:

## Section navigation

1. Open `02 — Sections`.
2. Select the **Overview** frame → duplicate nav items are instances; set prototype flow from each section’s left nav to the matching frame (Overview → `01 Overview`, etc.).

## Collapsible interactions

| Element | Suggested behavior |
|---------|-------------------|
| Overview “View details” | Toggle collapsed/expanded ID block (or link to expanded variant) |
| Location Advanced | Expand raw location string |
| Monitoring | Default collapsed frame `10`; expanded variant `10b` |

## Visitation dependency

- Frame `08 Visitation (master OFF)` — children interactive
- Frame `08b Visitation (master ON)` — children at 45% opacity (disabled)

## HTML interactive preview

The browser wireframe implements:

- Left nav section switching
- Toggle click states
- Visitor list master → disables child rows when ON

Run: `python3 -m http.server 8080` in `wireframe/`.
