# KidQuest Academy — A/B Test Versions

Two versions of the KidQuest Academy source for kid testing.

## Branches

| Branch | Description |
|--------|-------------|
| `with-intro` | **Version A** — Grade → world intro flow. Grade picker on every open (K/1/2/3) → 7 world cards → grade-filtered games. Compact grade switcher. Reading/Math trail sections removed. |
| `without-intro` | **Version B** — Classic home screen. Full game grid, no grade picker gate. Pre-intro baseline for A/B comparison. |

## What's in each

Both versions include:
- 55 games (one JS file per game in `js/games/`)
- 17 core JS files in `js/core/`
- 392 WebP images in `assets/images/` + 55 Questy-style game tiles
- Shell in `parts/` (head.html + body.html)
- `MANIFEST.md` documents load order

Both are `src/`-only — build with `build-stream.py` / `build-singlefile.py` from the parent project.

## Switching versions

```bash
git checkout with-intro     # Version A
git checkout without-intro  # Version B
```

## Building

Copy the branch contents to `~/workspace/kidquest-academy/src/` and run the standard build:
```bash
python3 build-stream.py && python3 build-singlefile.py && python3 tools/verify.py
```
