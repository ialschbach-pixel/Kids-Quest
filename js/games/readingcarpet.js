      function carpetClearSpeech(){if('speechSynthesis'in window)try{window.speechSynthesis.cancel();}catch(e){}}
      function carpetKillKeyHandler(){if(carpetKeyHandlerRef){document.removeEventListener('keydown',carpetKeyHandlerRef);carpetKeyHandlerRef=null;}}
      function carpetPassageWords(text){
        return text.split(' ').map((tok,n)=>{
          const say=tok.replace(/[.,!?;:'"()]/g,'');
          return `<button class="carpet-word" type="button" data-say="${kqEsc(say)}" aria-label="Word ${n+1}: ${kqEsc(say)}">${kqEsc(tok)}</button>`;
        }).join(' ');
      }
      function renderReadingCarpetIntro(){
        if(state.game!=='readingcarpet')return;
        carpetKillKeyHandler();carpetClearSpeech();carpetDone=false;carpetReadAlongOn=false;
        panel.innerHTML=`<div class="mia-intro">${gradeChipMarkup()}<img src="${questyArt.celebrating}" alt="Questy the fox celebrating Isaiah's reading idea"><span class="mia-credit">💡 Isaiah’s idea!</span><h2>This game was invented by Isaiah!</h2><p>Spread out on the magic carpet and read with Questy! Tap <strong>any</strong> word to hear it, or let Questy read everything to you.</p><div class="carpet-mode-pick"><button class="carpet-mode-card" type="button" data-mode="words" data-speak="Word Cards. Tap each word to hear it."><span class="carpet-mode-emoji" aria-hidden="true">🗂</span><strong>Word Cards</strong><small>Tap each word to hear it</small></button><button class="carpet-mode-card" type="button" data-mode="sentences" data-speak="Sentences. Read one decodable sentence."><span class="carpet-mode-emoji" aria-hidden="true">💬</span><strong>Sentences</strong><small>Read a sentence</small></button><button class="carpet-mode-card" type="button" data-mode="stories" data-speak="Stories. Read cozy little stories."><span class="carpet-mode-emoji" aria-hidden="true">📚</span><strong>Stories</strong><small>Read a cozy story</small></button><button class="carpet-mode-card" type="button" data-mode="decodable" data-speak="Decodable. Sound-it-out lines."><span class="carpet-mode-emoji" aria-hidden="true">🔤</span><strong>Decodable</strong><small>Sound-it-out lines</small></button></div></div>`;
        $$('.carpet-mode-card',panel).forEach(card=>card.addEventListener('click',()=>{carpetMode=card.dataset.mode;window.kqCarpetMode=carpetMode;startCurrentGame();}));
        const line=carpetPraiseSpoken?"Let's snuggle in on Isaiah's reading carpet!":"Isaiah's reading carpet is ready! Isaiah, you invented a wonderful game!";
        setTimeout(()=>{speak(line);if(state.sound)carpetPraiseSpoken=true;},120);
      }
      function carpetTabsMarkup(){
        const tabs=[['words','🗂','Word Cards'],['sentences','💬','Sentences'],['stories','📚','Stories'],['decodable','🔤','Decodable']];
        return `<div class="carpet-tabs" role="tablist" aria-label="Reading mode">${tabs.map(([id,emoji,label])=>`<button class="carpet-tab" type="button" role="tab" data-mode="${id}" aria-selected="${carpetMode===id}" data-speak="${label}. Switch to ${label}.">${emoji} ${label}</button>`).join('')}</div>`;
      }
      function renderReadingCarpet(){
        if(state.game!=='readingcarpet')return;
        carpetKillKeyHandler();carpetClearSpeech();carpetDone=false;carpetReadAlongOn=false;
        const i=lessonIndex(),band=carpetBand(),heard=new Set();
        let body,prompt,speakText;
        if(carpetMode==='words'){
          const words=carpetWords[band].slice(i*4,i*4+4);
          prompt='Tap each word to hear it!';speakText='Tap each word to hear it. Tap all four.';
          body=`<div class="carpet-words" role="group" aria-label="Four word cards">${words.map((w,n)=>`<button class="carpet-word" type="button" data-say="${w}" aria-label="Word ${n+1}: ${w}"><span aria-hidden="true">${w}</span><span class="carpet-check" aria-hidden="true"></span></button>`).join('')}</div>`;
        }else if(carpetMode==='sentences'){
          const sentence=carpetSentences[band][i];
          prompt='Read this sentence!';speakText='Read this sentence. Tap any word to hear it.';
          body=`<p class="carpet-passage">${carpetPassageWords(sentence)}</p><button class="carpet-readalong primary-btn" type="button">🎧 Read it to me</button>`;
        }else if(carpetMode==='decodable'){
          const phases={0:[2],1:[3,4,5],2:[6,7,8,9,10],3:[11,12,13]}[state.grade];
          if(!phases.includes(carpetDecPhase))carpetDecPhase=phases[0];
          const ph=kqPhonicsPhases[carpetDecPhase],lines=kqDecodableBanks[carpetDecPhase];
          prompt='Sound it out!';speakText=`Sound it out! Phase ${carpetDecPhase}: ${ph.name}. Tap any word to hear it.`;
          body=`<div class="carpet-phase-row" role="group" aria-label="Phonics phase">${phases.map(n=>`<button class="carpet-phase${n===carpetDecPhase?' active':''}" type="button" data-phase="${n}" data-speak="Phase ${n}: ${kqPhonicsPhases[n].name}">${n===carpetDecPhase?'● ':''}Phase ${n}</button>`).join('')}</div><p class="flavor-line">🦊 Questy says: “${ph.intro}”</p>${lines.map(line=>`<p class="carpet-passage">${carpetPassageWords(line)}</p>`).join('')}<button class="carpet-readalong primary-btn" type="button">🎧 Read it to me</button>`;
        }else{
          const story=carpetStories[band][i%6];
          prompt='Read this story!';speakText=`Read: ${story.t}. Tap any word to hear it.`;
          body=`<h3 class="carpet-story-title">${kqEsc(story.t)}</h3><p class="carpet-passage">${carpetPassageWords(story.s.join(' '))}</p><button class="carpet-readalong primary-btn" type="button">🎧 Read it to me</button>`;
        }
        panel.innerHTML=progressMarkup()+`<div class="carpet-shell"><h2 class="prompt" data-speak="${kqEsc(speakText)}">${prompt}</h2><div class="carpet-stripes" aria-hidden="true"></div>${carpetTabsMarkup()}${body}<p class="carpet-help">Tap any word to hear it · <b>1–9</b> reads a word · <b>R</b> reads along · <b>M</b> switches mode</p></div>`;
        setProgress();state.usedProblems.add('readingcarpet:'+state.grade+':'+carpetMode+':'+(carpetMode==='decodable'?carpetDecPhase:lessonIndex()));
        const wordBtns=$$('.carpet-word',panel);
        const markHeard=el=>{
          el.classList.add('carpet-heard');
          const check=$('.carpet-check',el);if(check)check.textContent='✓';
          heard.add(el);
          if(wordBtns.length&&heard.size===wordBtns.length)carpetComplete();
        };
        wordBtns.forEach(el=>el.addEventListener('click',()=>carpetTapWord(el,()=>markHeard(el))));
        $$('.carpet-tab',panel).forEach(b=>b.addEventListener('click',()=>{
          carpetClearSpeech();carpetDone=false;carpetReadAlongOn=false;
          carpetMode=b.dataset.mode;window.kqCarpetMode=carpetMode;renderReadingCarpet();
        }));
        $$('.carpet-phase',panel).forEach(b=>b.addEventListener('click',()=>{
          carpetClearSpeech();carpetDone=false;carpetReadAlongOn=false;
          carpetDecPhase=+b.dataset.phase;renderReadingCarpet();
        }));
        const rl=$('.carpet-readalong',panel);if(rl)rl.addEventListener('click',()=>carpetReadAlong());
        const keyHandler=e=>{
          if(state.game!=='readingcarpet'||state.locked||e.repeat)return;
          if(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
          const numEl=n=>wordBtns[n];
          if(e.key>='1'&&e.key<='9'){const el=numEl(Number(e.key)-1);if(el){e.preventDefault();el.focus();carpetTapWord(el,()=>markHeard(el));}return;}
          if(e.key==='0'){const el=numEl(9);if(el){e.preventDefault();el.focus();carpetTapWord(el,()=>markHeard(el));}return;}
          if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='ArrowLeft'||e.key==='ArrowUp'){
            const rl=$('.carpet-readalong',panel);
            const els=[...wordBtns,...$$('.carpet-tab',panel)];if(rl)els.push(rl);
            const ix=els.indexOf(document.activeElement);
            const step=(e.key==='ArrowRight'||e.key==='ArrowDown')?1:-1;
            e.preventDefault();
            const next=ix<0?els[0]:els[(ix+step+els.length)%els.length];
            if(next)next.focus();
            return;
          }
          if(e.key==='r'||e.key==='R'){const b=$('.carpet-readalong',panel);if(b){e.preventDefault();b.click();}return;}
          if(e.key==='m'||e.key==='M'){const order=['words','sentences','stories','decodable'];const tab=$(`.carpet-tab[data-mode="${order[(order.indexOf(carpetMode)+1)%4]}"]`,panel);if(tab){e.preventDefault();tab.click();}}
        };
        carpetKeyHandlerRef=keyHandler;
        document.addEventListener('keydown',keyHandler);
      }
      function carpetTapWord(el,onHeard){
        if(state.locked)return;
        carpetReadAlongOn=false;
        const token=++carpetSayToken;
        $$('.carpet-word.carpet-speaking',panel).forEach(x=>x.classList.remove('carpet-speaking'));
        el.classList.add('carpet-speaking');
        const done=()=>{if(carpetSayToken!==token)return;el.classList.remove('carpet-speaking');if(onHeard)onHeard();};
        if(!state.sound||!('speechSynthesis'in window)){done();return;}
        window.speechSynthesis.cancel();
        try{
          const u=new SpeechSynthesisUtterance(cleanSpeechText(el.dataset.say||el.textContent.trim()));
          u.rate=.76;u.pitch=1.08;u.onend=done;u.onerror=done;
          window.speechSynthesis.speak(u);
        }catch(e){done();}
      }
      function carpetReadAlong(){
        if(state.locked||carpetReadAlongOn)return;
        const wordBtns=$$('.carpet-word',panel);
        if(!wordBtns.length)return;
        carpetReadAlongOn=true;
        const paintAll=()=>wordBtns.forEach(w=>{w.classList.add('carpet-heard');const c=$('.carpet-check',w);if(c)c.textContent='✓';});
        const finish=()=>{carpetReadAlongOn=false;paintAll();carpetComplete();};
        if(!state.sound||!('speechSynthesis'in window)){
          wordBtns.forEach((el,ix)=>setTimeout(()=>{if(!carpetReadAlongOn||state.game!=='readingcarpet')return;$$('.carpet-word.carpet-speaking',panel).forEach(x=>x.classList.remove('carpet-speaking'));el.classList.add('carpet-speaking');},ix*300));
          setTimeout(()=>{if(carpetReadAlongOn)finish();},wordBtns.length*300+350);
          return;
        }
        const token=++carpetSayToken;let idx=0;
        carpetClearSpeech();
        const step=()=>{
          if(!carpetReadAlongOn||carpetSayToken!==token||state.game!=='readingcarpet'||state.locked){carpetReadAlongOn=false;return;}
          if(idx>=wordBtns.length){finish();return;}
          const el=wordBtns[idx],say=el.dataset.say||el.textContent.trim();
          $$('.carpet-word.carpet-speaking',panel).forEach(x=>x.classList.remove('carpet-speaking'));
          el.classList.add('carpet-speaking');
          try{
            const u=new SpeechSynthesisUtterance(cleanSpeechText(say));
            u.rate=.82;u.pitch=1.08;
            u.onend=u.onerror=()=>{if(!carpetReadAlongOn||carpetSayToken!==token){carpetReadAlongOn=false;return;}el.classList.remove('carpet-speaking');idx++;step();};
            window.speechSynthesis.speak(u);
          }catch(e){carpetReadAlongOn=false;}
        };
        step();
      }
      function carpetComplete(){
        if(carpetDone||state.locked)return;
        carpetDone=true;carpetReadAlongOn=false;
        carpetClearSpeech();
        correctThen(renderReadingCarpet);
      }
      const mazeWorlds=[
        {id:'forest',name:'Enchanted Forest',icon:'🌲',deco:'🍄',snack:'🍎',hat:'🍃',scene:'radial-gradient(circle at 18% 25%,#fff7 0 5px,transparent 6px),linear-gradient(145deg,#bce6bd,#e8f7c7)'},
        {id:'sea',name:'Deep Sea',icon:'🌊',deco:'🐚',snack:'🫐',hat:'🤿',scene:'radial-gradient(circle at 20% 35%,#fff8 0 6px,transparent 7px),linear-gradient(145deg,#78d7e8,#d8fbff)'},
        {id:'space',name:'Outer Space',icon:'🚀',deco:'🪐',snack:'⭐',hat:'🛰️',scene:'radial-gradient(circle at 18% 22%,#fff 0 3px,transparent 4px),radial-gradient(circle at 75% 60%,#fff9 0 2px,transparent 3px),linear-gradient(145deg,#45357d,#9990df)'},
        {id:'candy',name:'Candy Land',icon:'🍭',deco:'🍬',snack:'🍓',hat:'🎀',scene:'radial-gradient(circle at 20% 30%,#fff9 0 7px,transparent 8px),linear-gradient(145deg,#ffb2d2,#fff0a8)'},
        {id:'pirate',name:'Pirate Cove',icon:'🏴‍☠️',deco:'⚓',snack:'🥨',hat:'🏴‍☠️',scene:'radial-gradient(circle at 22% 70%,#fff6 0 7px,transparent 8px),linear-gradient(145deg,#71c6d0,#f1cf83)'},
        {id:'snow',name:'Snowy Peaks',icon:'❄️',deco:'⛄',snack:'🫐',hat:'🧣',scene:'radial-gradient(circle at 24% 22%,#fff 0 5px,transparent 6px),linear-gradient(145deg,#a8daf1,#f5fcff)'}
      ];
