#!/usr/bin/env bash
# Copies inmate-profile-wireframe to your local Unified Command folder.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DEST_ROOT="${UNIFIED_COMMAND_DIR:-$HOME/Unified Command}"
DEST_DIR="$DEST_ROOT/inmate-profile-wireframe"

mkdir -p "$DEST_ROOT"
if [[ -d "$DEST_DIR" ]]; then
  echo "Backing up existing folder to ${DEST_DIR}.bak.$(date +%s)"
  mv "$DEST_DIR" "${DEST_DIR}.bak.$(date +%s)"
fi

cp -R "$SOURCE_DIR" "$DEST_DIR"
echo "Copied wireframe to: $DEST_DIR"
echo ""
echo "Figma plugin manifest: $DEST_DIR/figma-plugin/manifest.json"
echo "HTML preview: cd \"$DEST_DIR/wireframe\" && python3 -m http.server 8080"
