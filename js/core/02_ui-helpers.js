      function updateGradeUI(){
        $('#gradeStatus').textContent=`Grade ${gradeNames[state.grade]}`;
        $$('.grade-btn').forEach(b=>b.classList.toggle('selected',Number(b.dataset.grade)===state.grade));
        $$('.game-grade-btn').forEach(b=>b.classList.toggle('selected',Number(b.dataset.gameGrade)===state.grade));
        $$('.quest-card').forEach(card=>{let chip=$('.menu-grade-chip',card);if(!chip){chip=document.createElement('span');chip.className='menu-grade-chip grade-chip';card.appendChild(chip);}chip.className=`menu-grade-chip grade-chip ${gradeClass(state.grade)}`;chip.textContent=`Grade ${gradeNames[state.grade]}`;});
        /* Grade-gated stops (arraybake/fairshare hide below Grade 2/3); recount each world's visible games. */
        $$('#mapRegions .quest-category').forEach(section=>{
          let visible=0;
          $$('.quest-grid .quest-card',section).forEach(card=>{
            const show=kqGameVisible(card.dataset.game);
            card.style.display=show?'':'none';
            if(show)visible++;
          });
          const label=$('.category-copy small',section);
          if(label){label.dataset.gameCount=String(visible);label.textContent=kqWorldSummaryText(section,visible);}
        });
        const surprise=$('.questy-pick');if(surprise)surprise.setAttribute('aria-label',`Questy's Pick! Tap for a surprise game for Grade ${gradeNames[state.grade]}.`);
        // Journey marks follow grade visibility: badges, footprints, keep-playing chip
        kqRefreshStopBadges();kqRefreshFootprints();kqRefreshKeepPlaying();
      }
      function setGrade(grade, restart=false){state.grade=grade;state.usedProblems=new Set();state.monsters=[];updateGradeUI();if(restart&&state.game){state.round=0;state.pathStep=0;state.seriesScore=0;startCurrentGame();}toast(`Grade ${gradeNames[state.grade]} ready!`);}
      function pickAt(items,index=lessonIndex()){return items[((index%items.length)+items.length)%items.length];}
      function deterministicOptions(correct,pool,count=4,index=lessonIndex()){const clean=[...new Set(pool.filter(x=>String(x)!==String(correct)))];const out=[correct],start=clean.length?(index*3)%clean.length:0;for(let n=0;out.length<count&&n<clean.length;n++)out.push(clean[(start+n)%clean.length]);return shuffle(out);}
      // Build-time curriculum invariant: every game exposes 4 bands × 36 unique challenge IDs.
      gameIds.forEach(game=>curriculum[game].forEach((band,grade)=>{if(band.length!==36||new Set(band.map(x=>x.id)).size!==36)throw new Error(`Curriculum integrity failed: ${game}, grade ${grade}`);}));

      const icons = {
        star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m12 2.5 2.9 5.9 6.5 1-4.7 4.5 1.1 6.4-5.8-3-5.8 3 1.1-6.4-4.7-4.5 6.5-1z"/></svg>',
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
        map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 4 3.5 5.8v13.4L9 17.4l6 1.8 5.5-1.8V4L15 5.8 9 4z"/><path d="M9 4v13.4M15 5.8v13.4"/></svg>'
      };
      const $ = (s, root=document) => root.querySelector(s);
      const $$ = (s, root=document) => [...root.querySelectorAll(s)];
      const panel = $('#gamePanel');
      const feedback = $('#feedback');
      let feedbackTimer;
      let audioCtx;
      function cleanSpeechText(text){return String(text||'').replace(/🔊/g,'').replace(/[×]/g,' times ').replace(/[−]/g,' minus ').replace(/\s+/g,' ').trim();}
      /* Voice warm-up: Android/WebView often starts with zero TTS voices loaded, so speak()
         silently fails. Trigger loading early, cache the best English voice, and retry once
         if voices aren't ready yet when speech is requested. */
      let kqVoice=null, kqVoicesReady=false;
      function kqPickVoice(){
        try{
          const vs=window.speechSynthesis?window.speechSynthesis.getVoices():[];
          if(!vs||!vs.length)return null;
          kqVoicesReady=true;
          /* Grown-up's saved voice choice wins (Voice picker in Grown-ups). */
          try{const saved=KQ&&KQ.settings&&KQ.settings.voiceName;if(saved){const m=vs.find(v=>v.name===saved);if(m)return m;}}catch(e){}
          return vs.find(v=>/en[-_]US/i.test(v.lang)&&/google|natural|samantha|zira|aria/i.test(v.name))
              || vs.find(v=>/^en/i.test(v.lang))
              || vs[0];
        }catch(e){return null;}
      }
      function kqWarmVoices(){kqVoice=kqPickVoice();if(!kqVoicesReady){try{window.speechSynthesis.getVoices();}catch(e){}}}
      if('speechSynthesis' in window){
        kqWarmVoices();
        try{window.speechSynthesis.onvoiceschanged=()=>{kqVoice=kqPickVoice();};}catch(e){}
        document.addEventListener('pointerdown',()=>kqWarmVoices(),{passive:true});
      }
      function queueSpeech(parts){
        if(!state.sound)return;
        const texts=parts.filter(Boolean).map(cleanSpeechText).filter(Boolean);
        if(!texts.length)return;
        /* Prefer native Android TTS bridge (reliable) over WebView speechSynthesis (flaky). */
        try{
          if(window.AndroidTTS&&window.AndroidTTS.isReady()){
            try{window.AndroidTTS.stop();}catch(e){}
            texts.forEach(t=>{try{window.AndroidTTS.speak(t);}catch(e){}});
            return;
          }
        }catch(e){}
        if(!('speechSynthesis' in window))return;
        kqWarmVoices();
        const speakNow=()=>{
          try{
            window.speechSynthesis.cancel();
            parts.filter(Boolean).forEach(text=>{
              const u=new SpeechSynthesisUtterance(cleanSpeechText(text));
              u.rate=.76;u.pitch=1.08;
              if(kqVoice)u.voice=kqVoice;
              window.speechSynthesis.speak(u);
            });
          }catch(e){}
        };
        if(!kqVoicesReady){
          /* Voices not loaded yet — wait briefly for voiceschanged, then speak once. */
          let done=false;
          const fallback=setTimeout(()=>{if(!done){done=true;kqWarmVoices();speakNow();}},1200);
          try{
            const onchg=()=>{if(done)return;done=true;clearTimeout(fallback);kqVoice=kqPickVoice();speakNow();};
            window.speechSynthesis.onvoiceschanged=onchg;
            window.speechSynthesis.getVoices();
          }catch(e){if(!done){done=true;clearTimeout(fallback);speakNow();}}
        } else speakNow();
      }
      const kqSpokenSel='.answer,.choice,.sort-item,.sort-zone,.island,.coin,.memory-tile,.static-object,.planet-choice,.safety-answer,.sky-bin,.drop-predict button,.circuit-part,.word-sort-card,.word-bin,.maze-quiz-answer,.kq-tab-btn,.kq-wear-btn,.kq-slot-tap,.kq-item-name,.kq-buy-btn,.kq-char-btn,.kq-tryon-btn,.kq-tryoff-btn,.char-feed-btn,.char-treat-btn,.char-garb-btn,.kq-flavor-speak,.category-games .quest-card,.frog-pad,.frog-go,.dino-cookie,.dino-finish,.ab-row,.ab-slot,.ab-bake,.sh-cookie,.sh-plate,.sh-apple,.sh-deal,.sh-check,.kq-numkey,.arith-step-btn,.carpet-mode-card,.carpet-tab,.band-control,.sf-dragcard,.sf-pad,.mf-done,.mf-magnet,.ss-seg-btn,.ss-days-btn,.cm-pot,.cm-blob,.im-lane,.im-start,.sd-sun,.sd-predict-btn,.sd-check,.bb-part,.bb-zone,.wc-drop,.wc-mini,.wc-dest,.wc-quiz-a,.wc-cloudbtn,.fd-tile,.fd-pick,.fd-creature,.rs-rock,.rs-cat,.rs-half,.rs-scrape,.rs-check,.rs-shinebox,.rs-slot,.maze-hint-btn,.maze-undo-btn,.studio-action-btn,.studio-look-btn,.next-up,.bu-bubble,.bu-hint,.tt-coin,.tt-take,.cm-coin,.cm-back,.cm-give,.tk-card,.tk-clear,.tk-check,.tk-step-btn,.ff-cell,.ff-clear,.ff-check';
      function decoratePrompts(root){
        if(!root||!root.querySelector)root=panel;
        $$('.prompt',root).forEach(p=>{if($('.speak-prompt',p))return;const text=p.dataset.speak||p.textContent.trim();const b=document.createElement('button');b.type='button';b.className='speak-prompt';b.setAttribute('aria-label','Read this prompt aloud');b.textContent='🔊';b.addEventListener('click',e=>{e.stopPropagation();speak(text);toast('Questy is reading it!');});p.appendChild(b);});
        const choices=$$(kqSpokenSel,root).filter(b=>!b.dataset.kqSpoken);choices.forEach(b=>{const text=b.dataset.speak||b.dataset.name||b.dataset.value||b.textContent.replace('?','').trim();if(!text)return;b.dataset.kqSpoken='1';b.classList.add('choice-hear');b.setAttribute('aria-label',`Hear and choose ${cleanSpeechText(text)}`);b.addEventListener('click',()=>speak(text),true);});
        const prompt=$('.prompt',root),token=prompt?`${state.game}:${state.grade}:${state.round}:${state.q}:${prompt.textContent}`:'';
        if(prompt&&window.KQState&&(state.grade===0||window.KQState.narration==='read')&&root.dataset.readToken!==token){root.dataset.readToken=token;const parts=[prompt.dataset.speak||prompt.textContent];if(state.grade===0)parts.push(...$$(kqSpokenSel,root).filter(b=>!b.dataset.quietRead).map(b=>b.dataset.speak||b.dataset.name||b.dataset.value||b.textContent));setTimeout(()=>queueSpeech(parts),80);}
      }
      new MutationObserver(()=>decoratePrompts(panel)).observe(panel,{childList:true,subtree:true});
      new MutationObserver(()=>decoratePrompts($('#kqFeatureBody'))).observe($('#kqFeatureBody'),{childList:true,subtree:true});

      function shuffle(items) {
        const a = [...items];
        for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
        return a;
      }
      function sample(items) { return items[Math.floor(Math.random()*items.length)]; }
      function kqTrackChip(emoji,name,sub){return `<div class="track-chip" aria-label="Current track: ${name}">${emoji} ${name}${sub?` · ${sub}`:''}</div>`;}
      function kqPhaseIntro(ph){return state.q===0?`<p class="flavor-line">🦊 Questy says: “${ph.intro}”</p>`:'';}
      function kqTapBuilder(promptHTML,chip,units,distractorPool,speakWord,next){
        // Tap-in-order builder (letters or chunks). Shared by words.js and builder.js.
        const extras=state.level>=2?2:state.level>=1?1:0;
        let choices=shuffle([...units]);
        if(extras&&distractorPool&&distractorPool.length){
          const dpool=shuffle(distractorPool.filter(d=>!units.includes(d)));
          choices=shuffle([...choices,...dpool.slice(0,extras)]);
        }
        let built=[];
        panel.innerHTML=progressMarkup()+chip+promptHTML+`<div class="build-word">${units.map(()=>'<div class="letter-slot"></div>').join('')}</div><div class="letter-bank">${choices.map((u,ix)=>`<button class="answer" type="button" data-unit="${u}" data-ix="${ix}" data-speak="${u}">${u}</button>`).join('')}</div>`;setProgress();
        if(speakWord&&state.grade!==0)speak(speakWord); // grade K auto-reads the prompt via decoratePrompts
        $$('.letter-bank .answer',panel).forEach(btn=>btn.addEventListener('click',()=>{
          if(state.locked||btn.disabled)return;
          if(btn.dataset.unit===units[built.length]){
            built.push(btn.dataset.unit);btn.disabled=true;btn.classList.add('correct');
            const slots=$$('.letter-slot',panel);slots[built.length-1].textContent=btn.dataset.unit;slots[built.length-1].classList.add('filled');beep('good');
            if(built.length===units.length)correctThen(next);
          }else wrong(btn);
        }));
      }
      function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
      function skillArea(game=state.game){if(['tenframe','duel','clockset','coinshop','frogadd','dinomunch','arraybake','fairshare','bubbleup','treasuretake','factfarm','changemaker','timetrek'].includes(game))return 'math';if(['words','builder','stories','storybooks','monsters','rhymematch','families','miaswordsort','readingcarpet'].includes(game))return 'reading';if(['rhythmrepeat','sounddetectives','tempo','band'].includes(game))return 'music';if(['science','animalhomes','weatherwatch','livingornot','planets','bulb','staticzap','dropit','daysky','safezap','sinkfloat','magnetfish','seedsprout','colormix','icemelt','shadowsundial','buildbug','watercycle','fossildig','rocksorter'].includes(game))return 'science';if(['dress','art','coloring','mazeescape'].includes(game))return 'creative';return 'creative';}
