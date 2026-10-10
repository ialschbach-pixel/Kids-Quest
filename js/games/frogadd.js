      function frogBand(){return Math.min(state.grade,1);}
      function frogMaxPad(){
        const level=clamp(state.level||0,0,2);
        return frogBand()===0?(level===0?5:10):(level===0?12:level===1?16:20);
      }
      function frogPick(){
        const band=frogBand(),level=clamp(state.level||0,0,2),round=state.round,q=state.q;
        const max=frogMaxPad();
        let kind;
        if(band===0)kind=(round>=4&&q>=3)?'maketen':'go';
        else kind=['go','story','hops','story','go','start'][(q+round)%6];
        /* make-10 needs pad 10 to exist: at the lowest adaptive level the
           board tops out below it, so fall back to a plain hop round. */
        if(kind==='maketen'&&max<10)kind='go';
        for(let a=0;a<90;a++){
          let S,J;
          if(kind==='maketen'){S=1+Math.floor(Math.random()*9);J=10-S;}
          else{
            S=band===0?Math.floor(Math.random()*(max+1)):Math.floor(Math.random()*Math.max(1,max-1));
            J=1+Math.floor(Math.random()*Math.max(1,max-S));
          }
          const E=S+J;if(E>max||E<1)continue;
          const key=`frogadd:${band}:${kind}:s${S}j${J}`;
          if(state.usedProblems.has(key))continue;
          state.usedProblems.add(key);
          return{kind,S,J,E,max,band};
        }
        (function(){const mx=frogMaxPad();const S=Math.floor(Math.random()*Math.max(2,mx));const J=1+Math.floor(Math.random()*Math.max(1,mx-S));return{kind:'go',S,J,E:S+J,max:mx,band};})();
      }
      let frogHopTimer=0,frogMoving=false;
      function renderFrogAdd(){
        clearTimeout(frogHopTimer);frogMoving=false;
        const p=frogPick(),kind=p.kind;
        const answerByCount=(kind==='hops'||kind==='maketen');
        let pos=kind==='start'?p.E:p.S;
        let hopCount=0;
        const story=frogStories[(state.round*6+state.q)%frogStories.length];
        const speakLine={
          go:`Hop from pad ${p.S} and make exactly ${p.J} hop${p.J===1?'':'s'} forward. Where does the frog land?`,
          story:`${kqEsc(story[0])} has ${p.S} ${story[1]} and gets ${p.J} more. Hop from pad ${p.S} and make ${p.J} hop${p.J===1?'':'s'} forward. ${p.S} plus ${p.J} is what number?`,
          hops:`The fly is on pad ${p.E}. Hop the frog from pad ${p.S} to catch the fly. Count every hop!`,
          maketen:`Hop the frog from pad ${p.S} to pad 10. Make it a make-10 leap! Count your hops.`,
          start:`The frog hopped ${p.J} time${p.J===1?'':'s'} and landed on pad ${p.E}. Drag him back ${p.J} hop${p.J===1?'':'s'}. Where did he start?`
        }[kind];
        const padMarker=n=>{
          if(kind==='hops'&&n===p.E)return'<span class="pad-mark" aria-hidden="true">🪰</span>';
          if(kind==='maketen'&&n===10)return'<span class="pad-mark" aria-hidden="true">✨</span>';
          if(kind==='start'&&n===p.E)return'<span class="pad-mark" aria-hidden="true">🏁</span>';
          if(n===p.S&&kind!=='start')return'<span class="pad-mark pad-start-mark" aria-hidden="true">🌿</span>';
          return'';
        };
        const pads=Array.from({length:p.max+1},(_,n)=>
          `<button class="frog-pad${n===pos?' on':''}${n===p.E&&kind==='hops'||n===10&&kind==='maketen'||n===p.E&&kind==='start'?' goal':''}" type="button" tabindex="-1" data-pad="${n}" data-speak="Pad ${n}" aria-label="Pad ${n}">${padMarker(n)}<span class="pad-num">${n}</span>${n===pos?'<span class="froggy" aria-hidden="true">🐸</span>':''}</button>`
        ).join('');
        const chipHop=answerByCount?'':` <span class="kq-chip frog-chip">Hops <b id="frogHops">0</b></span>`;
        const stepperHTML=answerByCount?`<div class="frog-answer"><span class="frog-answer-lbl">My hop count</span>${arithStepperHTML('frogStep',Math.max(10,p.max),'My hop count')}</div>`:'';
        const primaryId=kind==='start'?'frogStart':answerByCount?'frogCatch':'frogLand';
        const primaryLbl=kind==='start'?'That is where he started!':kind==='hops'?'Catch the fly!':kind==='maketen'?'Land the leap!':'Land the frog!';
        panel.innerHTML=`<div class="frog-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">${kind==='story'?`🫧 <span class="kq-story">${kqEsc(story[0])} has <b>${p.S}</b> ${story[1]} and gets <b>${p.J}</b> more!</span> `:''}${kind==='maketen'?'🌟 <b>Make-10 leap!</b> ':''}${kind==='start'?'🐸🏁 ':kind==='hops'?'🐸🪰':'🐸'} <span>${kind==='go'?`Hop from <b>${p.S}</b>. Make exactly <b>${p.J}</b> hop${p.J===1?'':'s'} forward — where does the frog land?`:kind==='story'?`Hop from <b>${p.S}</b>, make <b>${p.J}</b> hop${p.J===1?'':'s'}. Where does the frog land?`:kind==='hops'?`The fly is on pad <b>${p.E}</b>! Hop from <b>${p.S}</b> to catch it — <b>count your hops!</b>`:kind==='maketen'?`Hop from <b>${p.S}</b> to pad <b>10</b>! How many hops?`:`He hopped <b>${p.J}</b> times and landed on <b>${p.E}</b>. Drag him <b>back</b> ${p.J} hop${p.J===1?'':'s'}. Where did he start?`}</span></h2>
          <div class="frog-hud"><span class="kq-chip frog-chip">Frog on pad <b id="frogPos">${pos}</b></span>${chipHop}</div>
          <div class="frog-strip" role="group" tabindex="0" aria-label="Lily pad number line from 0 to ${p.max}. Use left and right arrow keys to hop the frog.">${pads}</div>
          <div class="frog-actions">${stepperHTML}<button class="primary-btn frog-go" id="${primaryId}" type="button">${primaryLbl}</button></div>
          <p class="studio-note">Drag the frog across pads, tap a pad, or use ← → keys. Nudge the answer buttons or press Enter when done.</p>
        </div>`;
        setProgress();
        const strip=panel.querySelector('.frog-strip');
        const padEls=[...strip.querySelectorAll('.frog-pad')];
        const stepApi=answerByCount?arithStepperWire($('#frogStep'),Math.max(10,p.max)):null;
        const updateHud=()=>{const m=$('#frogPos');if(m)m.textContent=pos;const hc=$('#frogHops');if(hc)hc.textContent=hopCount;};
        const hopOnce=dir=>{
          const next=clamp(pos+dir,0,p.max);
          if(next===pos)return false;
          const old=padEls[pos];old.classList.remove('on');const f=old.querySelector('.froggy');if(f)f.remove();
          pos=next;
          const el=padEls[pos];el.classList.add('on');
          el.insertAdjacentHTML('beforeend','<span class="froggy hop-pop" aria-hidden="true">🐸</span>');
          return true;
        };
        let target=pos;
        const loop=()=>{
          if(pos===target){frogMoving=false;return;}
          clearTimeout(frogHopTimer);
          const d=target>pos?1:-1;
          if(hopOnce(d)){
            if(kind==='start')hopCount+=d<0?1:-1;else hopCount+=d>0?1:-1;
            hopCount=Math.max(0,hopCount);updateHud();beep('try');
          }
          frogHopTimer=setTimeout(loop,dragging?75:130);
        };
        const goTo=t=>{t=clamp(t,0,p.max);if(t===pos)return;target=t;if(!frogMoving){frogMoving=true;loop();}};
        /* pointer drag across pads + tap-to-hop */
        let dragging=false;
        strip.addEventListener('pointerdown',e=>{
          const pel=e.target.closest?e.target.closest('.frog-pad'):null;
          if(!pel||state.locked)return;
          e.preventDefault();dragging=true;
          try{strip.setPointerCapture(e.pointerId);}catch(err){}
          goTo(+pel.dataset.pad);
        });
        strip.addEventListener('pointermove',e=>{
          if(!dragging||state.locked)return;
          const el=document.elementFromPoint(e.clientX,e.clientY);
          const pel=el&&el.closest?el.closest('.frog-pad'):null;
          if(pel)goTo(+pel.dataset.pad);
        });
        const endDrag=()=>{dragging=false;};
        strip.addEventListener('pointerup',endDrag);
        strip.addEventListener('pointercancel',endDrag);
        strip.addEventListener('keydown',e=>{
          const k=e.key;
          if(!['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Enter',' '].includes(k))return;
          e.preventDefault();
          if(k==='ArrowRight'||k==='ArrowUp')goTo(pos+1);
          else if(k==='ArrowLeft'||k==='ArrowDown')goTo(pos-1);
          else document.getElementById(primaryId).click();
        });
        const failShake=()=>{strip.classList.remove('frog-shake');void strip.offsetWidth;strip.classList.add('frog-shake');setTimeout(()=>strip.classList.remove('frog-shake'),450);};
        const doneBtn=$('#'+primaryId);
        doneBtn.onclick=()=>{
          if(state.locked||frogMoving)return;
          let ok;
          if(kind==='start')ok=(pos===p.S);
          else if(answerByCount)ok=(pos===p.E&&stepApi.value===p.J);
          else ok=(pos===p.E);
          if(ok){correctThen(renderFrogAdd,doneBtn);}
          else{
            wrong(doneBtn);failShake();
            const where=kind==='start'?`Count ${p.J} hops back from pad ${p.E}!`:kind==='hops'?`The frog is on pad ${pos} — the fly is on pad ${p.E}!`:kind==='maketen'?`Hop to pad 10, then double-check your hop count!`:`The frog is on pad ${pos}. He should hop ${p.J} forward from pad ${p.S}!`;
            toast(where,false,1800);
          }
        };
        updateHud();
      }

      