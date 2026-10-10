      /* Coloring Library — a standalone game for the full coloring library
         (2026-10-02, per Ian's request). This is a dedicated entry point that
         reuses the Art Studio's battle-tested coloring engine (tap-to-fill
         with touch fallback, zoom, undo/redo) but presents only the coloring
         collections — all 5 packs (costumes, adventures, cast, free library,
         classic tales) — without the draw/stamp/gallery tabs. */
      function renderColoring(){
        // Render the full Art Studio UI (builds the coloring engine + DOM)
        renderArt();
        // Hide the Draw / Gallery studio tabs — this game is coloring-only
        const modebar=document.querySelector('.studio-modebar');
        if(modebar)modebar.style.display='none';
        // Switch to the coloring studio panel
        const colorTab=document.querySelector('[data-studio="color"]');
        if(colorTab)colorTab.click();
        // Keep ALL collections visible (costumes, adventures, cast, freelibrary, classictales)
        // Default to the Free Library collection
        const libChip=document.querySelector('[data-collection="freelibrary"]');
        if(libChip)libChip.click();
        // Retitle for the standalone game
        const prompt=document.querySelector('.prompt');
        if(prompt)prompt.textContent='Coloring Library';
        const sub=document.querySelector('#activitySubtitle');
        if(sub)sub.innerHTML='Pick a picture, tap a color, then tap a shape to fill it.';
        if(window.speak)speak('Welcome to the Coloring Library. Pick a picture to color!');
      }
