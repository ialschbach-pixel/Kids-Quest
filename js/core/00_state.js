
    (function () {
      'use strict';
      /* Multi-file image fallback (v2.0): if a packaged image fails to load,
         hide it instead of showing a broken-image icon. Storybooks already
         fall back to emoji art when img is unset; this covers load failures. */
      document.addEventListener('error', function (e) {
        var t = e.target;
        if (t && t.tagName === 'IMG' && !t.dataset.kqImgFb) {
          t.dataset.kqImgFb = '1';
          t.style.visibility = 'hidden';
        }
      }, true);
      window.KQState = window.KQState && typeof window.KQState === 'object' ? window.KQState : {};
      if (window.__KQLoad) { try { window.__KQLoad(); } catch (e) {} }
      window.KQState = window.KQState && typeof window.KQState === 'object' ? window.KQState : {};
      function KQsave(){ if(window.__KQSave){ try{ window.__KQSave(); }catch(e){} } }
