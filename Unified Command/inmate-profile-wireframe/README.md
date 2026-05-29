# Inmate Profile — Wireframe Deliverable

Low-to-mid fidelity grayscale wireframe for a 1440px desktop **Inmate Profile** admin experience, per the product spec.

**Location:** `Unified Command/inmate-profile-wireframe/` (copy to your machine with [`scripts/copy-to-local.sh`](scripts/copy-to-local.sh)).

## Figma MCP note

The Cursor **Figma MCP server** was unavailable in the cloud build environment (no `use_figma` / `create_new_file` tools). This folder provides two equivalent paths:

1. **Figma plugin (recommended)** — generates pages, components, shell, and all 11 section frames inside Figma.
2. **HTML preview** — browser reference at the same structure and spacing; useful for review and screenshots.

## 1. Generate in Figma (plugin)

**Target file:** [Unified Command — Activities](https://www.figma.com/design/DzbyDszCqh5R0FzdL1etra/Unified-Command---Activities?node-id=831-1067&m=dev) — wireframe is placed under node **`831:1067`**. See [TARGET.md](TARGET.md).

1. Open that file in **Figma Desktop**.
2. **Plugins → Development → Import plugin from manifest…**
3. Select [`figma-plugin/manifest.json`](figma-plugin/manifest.json).
4. Run **Inmate Profile Wireframe Generator**.
5. Wait for completion — anchored layout under node `831:1067`, or four standalone pages if the node is not found.

### File structure created

| Page | Contents |
|------|----------|
| `00 — Components` | Input, Dropdown, ToggleRow, Card, Badge, NavItem, Collapsible, TwoColumnForm, etc. |
| `01 — Shell` | 1440×1024 shell: 240px nav, main slot, collapsed utility strip |
| `02 — Sections` | One frame per nav section (11 total) |
| `03 — Annotations` | Sticky-note style dependency callouts |

### After generation

- Link section frames with **Prototype** → nav items (optional; wireframe uses separate frames per section).
- Tweak copy and spacing using the 8pt grid already applied via Auto Layout.

## 2. HTML preview

```bash
cd design/inmate-profile-wireframe/wireframe
python3 -m http.server 8080
```

Open `http://localhost:8080` — use left nav to switch sections. Collapsibles and visitor-list dependency states are interactive.

## Design tokens (grayscale)

| Token | Hex |
|-------|-----|
| Background | `#F5F5F5` |
| Surface | `#FFFFFF` |
| Border | `#E0E0E0` |
| Text | `#1A1A1A` |
| Muted | `#666666` |
| Disabled | `#BDBDBD` |

Spacing: **8pt** base; section gaps **24–32px**; card padding **16–24px**.

## Handoff checklist

- [x] Component set (input, toggle, dropdown, card, badge, nav, collapsible, two-column form)
- [x] 1440 shell with 240px left nav
- [x] 11 section layouts
- [x] Collapsed defaults: Overview IDs, Location advanced, Monitoring
- [x] Visitation parent/child variants (master ON → children disabled)
- [x] Annotation notes for dependencies
