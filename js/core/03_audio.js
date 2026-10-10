      /* Audio unlock: browsers/WebView start AudioContext suspended until a user gesture.
         Resume on first interaction so beeps and speech actually play.
         (audioCtx is declared in 02_ui-helpers.js; reuse it here.) */
      function ensureAudio(){
        try {
          audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
          if (audioCtx.state === 'suspended') audioCtx.resume();
        } catch (e) {}
        return audioCtx;
      }
      document.addEventListener('pointerdown', () => ensureAudio(), { passive: true });
      document.addEventListener('touchstart', () => ensureAudio(), { passive: true });
      function beep(kind) {
        if (!state.sound) return;
        try {
          const ctx = ensureAudio(); if (!ctx) return;
          const area=skillArea(), base=area==='math'?440:area==='reading'?560:360;
          [0,1,2].forEach((n)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.type=kind==='good'?'sine':'triangle';o.frequency.value=kind==='good'?base+n*100:210-n*25;g.gain.setValueAtTime(.045,ctx.currentTime+n*.06);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.14+n*.06);o.start(ctx.currentTime+n*.06);o.stop(ctx.currentTime+.16+n*.06);});
        } catch (e) {}
      }
      function tapTone(){if(!state.sound)return;try{const ctx=ensureAudio();if(!ctx)return;const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=skillArea()==='math'?330:skillArea()==='reading'?390:300;g.gain.setValueAtTime(.018,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.055);o.start();o.stop(ctx.currentTime+.06);}catch(e){}}
      document.addEventListener('pointerdown',e=>{if(e.target.closest('button'))tapTone();});
      function speak(text){queueSpeech([text]);}
      function speakSegments(word){const parts=String(word).split('').join(' ... ');speak(`${parts}. ${word}`);}
