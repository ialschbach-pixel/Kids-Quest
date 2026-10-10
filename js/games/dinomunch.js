/* ══════════════════════════════════════════════════════════════════════
         Dino Munch (subtraction, K–1). Tap cookies to feed the dino, then tap
         the leftovers to count them. 'change' rounds: feed until R remain,
         then say how many were munched.
         ══════════════════════════════════════════════════════════════════════ */
      const dinoStories=[['Mia','cookies'],['Isaiah','cherries'],['Questy','blueberries'],['a bunny','carrots'],['a fox','grapes']];
      function dinoBand(){return Math.min(state.grade,1);}
      function dinoPick(){
        const band=dinoBand(),level=clamp(state.level||0,0,2),round=state.round,q=state.q;
        let kind;
        if(band===0)kind='feed';
        else kind=['feed','change','story','feed','story','change'][(q+round)%6];
        const maxN=band===0?(level===0?6:10):(level===0?14:level===1?17:20);
        for(let a=0;a<90;a++){
          const N=2+Math.floor(Math.random()*(maxN-1));
          const B=1+Math.floor(Math.random()*(N-1));
          const key=`dinomunch:${band}:${kind}:n${N}b${B}`;
          if(state.usedProblems.has(key))continue;
          state.usedProblems.add(key);
          return{kind,N,B,R:N-B,band};
        }
        const fbN=2+Math.floor(Math.random()*(maxN-1));const fbB=1+Math.floor(Math.random()*(fbN-1));return{kind:'feed',N:fbN,B:fbB,R:fbN-fbB,band};
      }
      let dinoPopTimer=0;
      function renderDinoMunch(){
        const p=dinoPick();
        const story=dinoStories[(state.round*6+state.q)%dinoStories.length];
        let phase='feed',fed=0,tally=0,stepApi=null;
        const eatenStack=[];
        const speakLine={
          feed:`The tray has ${p.N} cookies. Tap ${p.B} cookie${p.B===1?'':'s'} to feed the hungry dino!`,
          story:`${kqEsc(story[0])} baked ${p.N} ${story[1]}. Tap ${p.B} of them to feed the hungry dino!`,
          change:`The tray had ${p.N} cookies. Keep feeding until ${p.R} cookie${p.R===1?' is':'s are'} left!`
        }[p.kind];
        const promptHtml={
          feed:`🍪 The tray has <b>${p.N}</b> cookies. Tap <b>${p.B}</b> cookies to feed the hungry dino!`,
          story:`🍪 ${kqEsc(story[0])} baked <b>${p.N}</b> ${kqEsc(story[1])}. Tap <b>${p.B}</b> of them to feed the hungry dino!`,
          change:`🍪 The tray had <b>${p.N}</b> cookies. Tap cookies to feed the dino until <b>${p.R}</b> cookie${p.R===1?'is':'s are'} left!`
        }[p.kind];
        const cookies=Array.from({length:p.N},(_,i)=>
          `<button class="dino-cookie" type="button" data-i="${i}" data-speak="cookie" data-quiet-read="1" aria-label="Cookie ${i+1}"><span class="cookie-emoji" aria-hidden="true">🍪</span></button>`
        ).join('');
        panel.innerHTML=`<div class="dino-game">
          ${progressMarkup()}
          <h2 class="prompt" id="dinoPrompt" data-speak="${kqEsc(speakLine)}"><span id="dinoPromptText">${promptHtml}</span></h2>
          <div class="dino-hud">
            <span class="kq-chip dino-chip">🍪 Tray: <b>${p.N}</b></span>
            <span class="kq-chip dino-chip">🦖 Fed: <b id="dinoFed">0</b>${p.kind==='change'?'':' / '+p.B}</span>
            <span class="kq-chip dino-chip" id="dinoLeftChip">🍽 Left: <b id="dinoLeft">${p.N}</b>${p.kind==='change'?' — stop at <b>'+p.R+'</b>':''}</span>
          </div>
          <div class="dino-stage">
            <div class="dino-buddy" aria-hidden="true"><span class="dino-face" id="dinoFace">🦖</span><span class="dino-bubble" id="dinoBubble">Chomp chomp!</span></div>
            <div class="dino-tray" id="dinoTray" role="group" aria-label="Cookies on the tray">${cookies}</div>
          </div>
          <div class="dino-actions" id="dinoActions">
            <button class="secondary-btn dino-half" id="dinoUndo" type="button">↩ Put one back</button>
            <button class="primary-btn dino-finish" id="dinoDone" type="button">Done feeding! 🦖</button>
          </div>
          <p class="studio-note">Tap each cookie once. Feed ${p.kind==='change'?'until only '+p.R+(p.R===1?' is left':' are left'):'exactly '+p.B+(p.B===1?' cookie':' cookies')}. Wrong cookie? Tap "↩ Put one back". Keyboard: Tab to a cookie, press Enter.</p>
        </div>`;
        setProgress();
        const trayEl=$('#dinoTray');
        const face=$('#dinoFace');
        const cookieEls=[...trayEl.querySelectorAll('.dino-cookie')];
        const left=()=>p.N-fed;
        const drawHud=()=>{$('#dinoFed').textContent=fed;$('#dinoLeft').textContent=left();
          const chip=$('#dinoLeftChip');
          if(p.kind==='change')chip.classList.toggle('dino-target-hit',left()===p.R);};
        const chomp=()=>{
          face.classList.remove('chomping');void face.offsetWidth;face.classList.add('chomping');
          clearTimeout(dinoPopTimer);dinoPopTimer=setTimeout(()=>face.classList.remove('chomping'),420);
        };
        let fullWarnedAt=0;
        cookieEls.forEach(c=>{
          c.addEventListener('click',()=>{
            if(state.locked)return;
            const i=+c.dataset.i;
            if(phase==='feed'){
              if(c.classList.contains('eaten'))return;
              if(p.kind!=='change'&&fed>=p.B){
                const now=Date.now();
                if(now-fullWarnedAt>1200){fullWarnedAt=now;toast('The dino is full! Tap "Done feeding!"',false);}
                return;
              }
              c.classList.add('eaten');c.disabled=true;
              eatenStack.push(c);
              fed++;chomp();beep('good');drawHud();
            }else if(phase==='count'){
              if(c.classList.contains('eaten'))return;
              const marked=c.classList.toggle('counted');
              tally+=marked?1:-1;
              beep(marked?'good':'try');
              $('#countChip').innerHTML=`🔢 Counted: <b>${tally}</b>`;
            }
          });
        });
        $('#dinoUndo').onclick=()=>{if(state.locked||phase!=='feed'||!eatenStack.length)return;const c=eatenStack.pop();c.classList.remove('eaten');c.disabled=false;fed--;beep('try');drawHud();};
        $('#dinoDone').onclick=()=>{
          if(state.locked||phase!=='feed')return;
          if(p.kind==='change'&&left()!==p.R){
            toast(left()>p.R?`Feed ${left()-p.R} more cookies!`:`Too many fed! Tap "Put one back".`,false);
            const chip=$('#dinoLeftChip');chip.classList.remove('dino-target-miss');void chip.offsetWidth;chip.classList.add('dino-target-miss');
            setTimeout(()=>chip.classList.remove('dino-target-miss'),500);
            return;
          }
          if(p.kind!=='change'&&fed!==p.B){toast(`Feed exactly ${p.B} cookie${p.B===1?'':'s'} first!`,false);return;}
          cookieEls.forEach(c=>{if(!c.classList.contains('eaten'))c.classList.add('leftover');});
          phase='count';
          drawHud();
          if(p.kind==='change'){
            phase='stepper';
            const pt=$('#dinoPromptText');pt.innerHTML=`🤔 The tray had <b>${p.N}</b> cookies, and <b>${p.R}</b> ${p.R===1?'is':'are'} left. <b>How many</b> did the dino munch?`;
            $('#dinoPrompt').dataset.speak=`The tray had ${p.N} cookies, and ${p.R} ${p.R===1?'is':'are'} left. How many did the dino munch? Set the counter to your count.`;
            $('#dinoActions').innerHTML=`<div class="dino-answer">${arithStepperHTML('dinoStep',p.N,'How many cookies did the dino munch')}</div><button class="primary-btn dino-finish" id="dinoFinal" type="button">Munch answer! 🦖</button>`;
            stepApi=arithStepperWire($('#dinoStep'),p.N);
            $('#dinoFinal').onclick=()=>{
              if(state.locked)return;
              if(stepApi.value===p.B){speak(`The dino munched ${p.B} cookies! ${p.N} minus ${p.B} is ${p.R}.`);correctThen(renderDinoMunch,$('#dinoFinal'));}
              else{wrong($('#dinoFinal'));toast(`Count the munched cookies again! Tray: ${p.N}. Left: ${p.R}.`,false);}
            };
            speak($('#dinoPrompt').dataset.speak);
          }else{
            const pt=$('#dinoPromptText');pt.innerHTML=`🔢 Now tap each cookie that is <b>still on the tray</b> and count them. Then tap "I counted!"`;
            $('#dinoPrompt').dataset.speak='Now tap each cookie that is still on the tray and count them. Then tap: I counted!';
            $('#dinoActions').innerHTML=`<span class="kq-chip dino-chip" id="countChip">🔢 Counted: <b>0</b></span> <button class="primary-btn dino-finish" id="dinoFinal" type="button">I counted! ✨</button>`;
            speak($('#dinoPrompt').dataset.speak);
            $('#dinoFinal').onclick=()=>{
              if(state.locked)return;
              if(tally===p.R){speak(`${p.R} cookies left! ${p.N} minus ${p.B} is ${p.R}.`);correctThen(renderDinoMunch,$('#dinoFinal'));}
              else{wrong($('#dinoFinal'));toast('Tap every cookie left again — count slowly!',false);}
            };
          }
        };
      }

      