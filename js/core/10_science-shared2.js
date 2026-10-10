/* ═════════════════ SCIENCE GAMES BATCH 2 ═════════════════
         Shadow Sundial · Build-a-Bug · Water Cycle Ride · Fossil Dig · Rock Sorter
         Hands-on K–3 science: draggable sun, insect building, a droplet's ride,
         brush-away fossils, and rock testing. Art is hand-authored inline SVG
         only — zero raster bytes added. Content banks are unique per grade.
      ═══════════════════════════════════════════════════════════════ */

      /* shared batch-2 helpers */
      function b2Seed(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
      function b2Shuffle(a,seed){const r=b2Seed(seed);for(let n=a.length-1;n>0;n--){const j=Math.floor(r()*(n+1)),t=a[n];a[n]=a[j];a[j]=t;}return a;}
      function sciScrape(){if(!state.sound)return;try{const c=getMusicCtx(),t=c.currentTime;for(let n=0;n<3;n++)toneAt(230+Math.random()*170+n*90,t+n*.06,.07,'sawtooth',.045);}catch(e){}}

      /* ── SHADOW SUNDIAL ── */
      const sdScenes=['Sunny Meadow','Rose Patch','Park Lawn','Tulip Square','Clover Hill','Backyard'];
      const sdPropArt={
        ball:`<svg viewBox="0 0 48 48" class="sd-prop-art" aria-hidden="true"><circle cx="24" cy="24" r="15" fill="#ef5350" stroke="#b71c1c" stroke-width="3"/><path d="M24 9a15 15 0 0 1 12.6 23" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/></svg>`,
        bone:`<svg viewBox="0 0 48 48" class="sd-prop-art" aria-hidden="true"><circle cx="12" cy="16" r="5.5" fill="#fdfcf8" stroke="#8d6e63" stroke-width="3"/><circle cx="12" cy="32" r="5.5" fill="#fdfcf8" stroke="#8d6e63" stroke-width="3"/><circle cx="36" cy="16" r="5.5" fill="#fdfcf8" stroke="#8d6e63" stroke-width="3"/><circle cx="36" cy="32" r="5.5" fill="#fdfcf8" stroke="#8d6e63" stroke-width="3"/><rect x="11" y="18" width="26" height="12" rx="6" fill="#fdfcf8" stroke="#8d6e63" stroke-width="3"/></svg>`,
        watercan:`<svg viewBox="0 0 48 48" class="sd-prop-art" aria-hidden="true"><rect x="14" y="20" width="20" height="18" rx="5" fill="#4dabf7" stroke="#1971c2" stroke-width="3"/><path d="M34 24l10-10M14 26L4 20" stroke="#1971c2" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M8 34v8M13 34v8M18 34v8" stroke="#74c0fc" stroke-width="3" stroke-linecap="round"/></svg>`,
        flower:`<svg viewBox="0 0 48 48" class="sd-prop-art" aria-hidden="true"><path d="M24 28v14" stroke="#388e3c" stroke-width="4" stroke-linecap="round"/><g fill="#ff8fab" stroke="#c43a72" stroke-width="2"><circle cx="24" cy="11" r="6.5"/><circle cx="12" cy="20" r="6.5"/><circle cx="36" cy="20" r="6.5"/><circle cx="16" cy="29" r="6.5"/><circle cx="32" cy="29" r="6.5"/></g><circle cx="24" cy="20" r="5.5" fill="#ffd60a" stroke="#d9a700" stroke-width="2"/></svg>`
      };
      const sdProps=[{id:'ball',label:'the ball',side:'right',L:1.75},{id:'bone',label:'the bone',side:'right',L:2.90},{id:'watercan',label:'the watering can',side:'left',L:1.75},{id:'flower',label:'the flower',side:'left',L:2.90}];
      const sdKinds=[
        [{k:'long'},{k:'short'},{k:'long'},{k:'short'},{k:'long'},{k:'short'}],
        [{k:'touch',p:'ball'},{k:'short'},{k:'touch',p:'watercan'},{k:'long'},{k:'touch',p:'bone'},{k:'short'}],
        [{k:'touch',p:'bone'},{k:'touch',p:'flower'},{k:'short'},{k:'long'},{k:'touch',p:'watercan'},{k:'touch',p:'ball'}],
        [{k:'touch',p:'bone'},{k:'touch',p:'flower'},{k:'hide'},{k:'touch',p:'ball'},{k:'touch',p:'watercan'},{k:'long'}]
      ];
      const sdTols=[0.10,0.078,0.06,0.045];
