# KidQuest Academy — source load order

`build.py` concatenates these in EXACTLY this order inside a single
`<script>` block (which itself sits inside the page's IIFE scope, opened in
`core/00_state.js` and closed at the end of `core/16_journey.js`).
Do not reorder without checking cross-file references.

## Order
- `js/core/00_state.js`
- `js/art.js`
- `js/core/01_registry.js`
- `js/core/02_ui-helpers.js`
- `js/core/03_audio.js`
- `js/core/04_shell.js`
- `js/core/05_world-flavor.js`
- `js/games/words.js`
- `js/games/builder.js`
- `js/games/stories.js`
- `js/games/storybooks.js`
- `js/games/monsters.js`
- `js/games/tenframe.js`
- `js/games/duel.js`
- `js/games/rhymematch.js`
- `js/games/clockset.js`
- `js/games/coinshop.js`
- `js/games/families.js`
- `js/games/miaswordsort.js`
- `js/games/readingcarpet.js`
- `js/games/mazeescape.js`
- `js/games/memory.js`
- `js/games/patterns.js`
- `js/games/science.js`
- `js/games/shapes.js`
- `js/core/06_arith-widgets.js`
- `js/games/frogadd.js`
- `js/games/dinomunch.js`
- `js/games/arraybake.js`
- `js/games/fairshare.js`
- `js/games/bubbleup.js`
- `js/games/treasuretake.js`
- `js/games/factfarm.js`
- `js/games/changemaker.js`
- `js/games/timetrek.js`
- `js/games/sequence.js`
- `js/games/dress.js`
- `js/games/art.js`
- `js/games/coloring.js`
- `js/games/commonmath.js`
- `js/core/07_kqesc.js`
- `js/games/planets.js`
- `js/core/08_dragtap.js`
- `js/games/bulb.js`
- `js/games/staticzap.js`
- `js/games/dropit.js`
- `js/games/daysky.js`
- `js/core/09_science-shared.js`
- `js/games/sinkfloat.js`
- `js/games/magnetfish.js`
- `js/games/seedsprout.js`
- `js/games/colormix.js`
- `js/games/icemelt.js`
- `js/core/10_science-shared2.js`
- `js/games/shadowsundial.js`
- `js/games/buildbug.js`
- `js/games/watercycle.js`
- `js/games/fossildig.js`
- `js/games/rocksorter.js`
- `js/core/11_ordinal-safety.js`
- `js/games/safezap.js`
- `js/core/12_music-helpers.js`
- `js/games/rhythmrepeat.js`
- `js/games/sounddetectives.js`
- `js/games/tempo.js`
- `js/games/band.js`
- `js/games/animalhomes.js`
- `js/games/weatherwatch.js`
- `js/games/livingornot.js`
- `js/core/13_session.js`
- `js/core/14_shop-avatar.js`
- `js/core/15_adventure-map.js`
- `js/core/16_journey.js`

## Notes
- `js/art.js` holds ALL standalone base64 art assets: `questyArt`,
  `charArt`, `kqCastArt` (cast art objects) and `kqAvatarAssets` (wardrobe).
  `kqAvatarAssets` originally sat mid-file; it was hoisted here because every
  reference is runtime-only (inside functions), so earlier initialization is
  behavior-neutral. One data URI remains inline in `core/02_ui-helpers.js`
  (`updateGradeUI`'s Questy's Pick tile) because it lives inside a template
  literal — moving it would mean editing code, not moving it.
- Game files each contain one game's render function(s) plus helpers used
  only by that game, in original relative order. Shared helpers (used by 2+
  games) live in core: `06_arith-widgets`, `07_kqesc`, `08_dragtap`,
  `09/10_science-shared*`, `11_ordinal-safety`, `12_music-helpers`.
- `05_world-flavor.js` sits between `timeMoney` and `words` exactly where the
  builders appended it.
