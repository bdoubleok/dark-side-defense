# 03 — Annotations (handoff)

## Identifiers vs credentials

System identifiers (read-focused) are separated from access credentials (PINs/passwords) so operational users scan identity data without conflating sensitive auth fields.

## Visitor list master

When **Use approved visitor list** is ON, child visit-type toggles (video, face-to-face, internet video) are **visually disabled** — enforcement is centralized on the master toggle. The HTML preview and Figma frames `08 Visitation` / `08b Visitation` show both states.

## Location hierarchy

Facility is the top-level driver; Block → Room (housing) → Group(s) are nested with indentation. Engineering should implement dropdown cascade from facility selection.

## Monitoring

Advanced section defaults to **collapsed** to reduce cognitive load for daily operational workflows. Expand for system-level flags, hot PIN, and voice verification.

## Terminology

- **Tablet PIN** — facility tablet login (formerly “Inmate PIN”)
- **Call PIN** — debit & collect telephony
- Labels use full text in dropdowns, not internal codes

## Prototype suggestions (Figma)

1. Link each `NavItem` to its section frame on `02 — Sections`.
2. Overview **View details** → expand collapsible (optional smart animate).
3. Visitation master toggle → swap to `08b` frame or variant with disabled children.
