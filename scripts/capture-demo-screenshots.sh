#!/usr/bin/env bash
# Capture OceanData4AI demo screenshots for copy review.
# Usage: bash scripts/capture-demo-screenshots.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/docs/copy-review/screenshots"
PORT=8765
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

mkdir -p "$OUT"
cd "$ROOT"

if [[ ! -x "$CHROME" ]]; then
  echo "Google Chrome not found. Install Chrome or set CHROME path."
  exit 1
fi

python3 -m http.server "$PORT" >/tmp/oda-demo-server.log 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null || true' EXIT
sleep 1

shot() {
  local path="$1"
  local file="$2"
  local height="${3:-2400}"
  echo "→ $file"
  "$CHROME" --headless=new --disable-gpu \
    --window-size=1440,"$height" \
    --screenshot="$OUT/$file" \
    "http://127.0.0.1:$PORT/$path" >/dev/null 2>&1
}

# Global / Home sections (full pages)
shot "index.html" "home-full.png" 5200
shot "about.html" "about-full.png" 3200
shot "join.html" "join-full.png" 3600
shot "blog.html" "blog-full.png" 4800
shot "events.html" "events-full.png" 2800
shot "fellows.html" "fellows-full.png" 3600
shot "qa/oug-help.html" "qa-oug-full.png" 2400
shot "qa/ask.html" "qa-ask-signup.png" 2400
shot "m1/index.html" "m1-home-full.png" 4200

echo "Done. Screenshots saved to: $OUT"
