      let mfTrack='fish';
      function mfTabs(){return `<div class="kq-tabs" role="tablist" aria-label="Magnet Fishing tracks"><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${mfTrack==='fish'}" data-track="fish" type="button">🧲 Magnet Fishing</button><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${mfTrack==='pole'}" data-track="pole" type="button">🧲 Pole Flip</button></div>`;}
      function mfBindTabs(){$$('.kq-tab-btn[data-track]',panel).forEach(b=>b.onclick=()=>{mfTrack=b.dataset.track;renderMagnetFish();});}
      function mfPoleBadge(p){return `<span class="mf-pole" style="background:${p==='N'?'#e63946':'#3a86ff'}" aria-hidden="true">${p}</span>`;}
      function renderPoleFlip(){
        const i=lessonIndex(),g=state.grade,names=mfMag[g];
        const picks=[0,1,2].map(k=>names[(i*3+k)%12]);
        const poles=picks.map((_,k)=>((i+k)%2?'N':'S'));
        let facing=(i%2?'N':'S'),phase='collect',stuck=0;
        const items=picks.map((name,k)=>({name,pole:poles[k],stuck:false}));
        panel.innerHTML=progressMarkup()+mfTabs()+`<h2 class="prompt">Every magnet has two ends! <span style="color:#e63946">N</span> and <span style="color:#3a86ff">S</span> pull together — but the SAME ends PUSH apart!</h2><p class="lab-instruction">Tap the magnet to flip it. Then tap a treasure: opposite ends <strong>CLINK</strong>, same ends <strong>PUSH away</strong>!</p><div class="lab-stage"><div class="mf-stage" id="mfStage"><div id="mfMagnet" class="mf-magnet" role="button" tabindex="0" aria-label="Magnet, facing ${facing}. Activate to flip it." style="left:50%;top:74%;${facing==='S'?'transform:rotate(180deg)':''}">${mfMagnetSVG}<span class="mf-facing">${mfPoleBadge(facing)}</span></div></div><div class="mf-tray" id="mfTray"><p>Treasure tray</p><div class="mf-trayitems" id="mfTrayItems"></div></div><p class="mf-count" id="mfCount" role="status">Flipped to: ${facing} · Stuck: 0 of ${items.length}</p><button class="answer" id="mfFlip" type="button">🔄 Flip the magnet!</button> <button class="lab-action mf-done" id="mfDone" type="button">Check my tray!</button><p class="science-result" id="mfResult" role="status">Same ends push, different ends pull!</p></div>`;
        setProgress();mfBindTabs();
        const stage=$('#mfStage',panel),magnet=$('#mfMagnet',panel),done=$('#mfDone',panel),flip=$('#mfFlip',panel),result=$('#mfResult',panel),countEl=$('#mfCount',panel),trayItems=$('#mfTrayItems',panel);
        items.forEach((t,k)=>{
          const el=document.createElement('button');
          el.className='mf-toy answer';el.type='button';el.dataset.name=t.name;
          el.setAttribute('aria-label',`${t.name}, pole ${t.pole==='N'?'north':'south'}`);
          const spots=[[14,14],[46,12],[78,16]][k%3];
          el.style.left=spots[0]+'%';el.style.top=spots[1]+'%';
          el.innerHTML=mfShape(t.name)+mfPoleBadge(t.pole)+`<span class="mf-toy-name">${t.name}</span>`;
          el.addEventListener('click',()=>{
            if(state.locked||t.stuck||phase!=='collect')return;
            const sr=stage.getBoundingClientRect(),r=el.getBoundingClientRect();
            magnet.style.transition='left .45s ease,top .45s ease';
            magnet.style.left=clamp((r.left+r.width/2-sr.left)/sr.width*100,4,86)+'%';
            magnet.style.top=clamp((r.top-sr.top)/sr.height*100,4,78)+'%';
            setTimeout(()=>{
              magnet.style.transition='';magnet.style.transform=facing==='S'?'rotate(180deg)':'';
              if(t.stuck)return;
              if(facing!==t.pole){
                t.stuck=true;stuck++;sciClink(stuck);
                el.classList.add('stuck');el.style.left='';el.style.top='';
                const chip=document.createElement('span');chip.className='mf-tchip';chip.textContent=t.name;trayItems.appendChild(chip);
                countEl.textContent=`Flipped to: ${facing} · Stuck: ${stuck} of ${items.length}`;
                if(stuck===items.length){
                  if(g===3){renderMfLatch();}
                  else{result.innerHTML=`<strong>All treasures!</strong> Opposite ends pull together every time. Tap “Check my tray!”`;speak('All treasures! Opposite ends pull together.');}
                }else result.textContent=`Clink! ${facing} pulled ${t.pole} — opposites attract! ${stuck} of ${items.length}.`;
              }else{
                el.style.transition='transform .3s ease';el.style.transform='translateY(-46px)';
                setTimeout(()=>{el.style.transform='';setTimeout(()=>{el.style.transition='';},320);},340);
                result.textContent=`Push! ${facing} pushes ${t.pole} away. Same ends push apart — flip your magnet!`;
                speak(`${facing} pushes ${t.pole} away. Flip the magnet!`);
              }
            },470);
          });
          t.el=el;stage.appendChild(el);
        });
        function doFlip(){
          if(state.locked)return;
          facing=facing==='N'?'S':'N';
          magnet.setAttribute('aria-label',`Magnet, facing ${facing}. Activate to flip it.`);
          magnet.querySelector('.mf-facing').innerHTML=mfPoleBadge(facing);
          magnet.style.transition='transform .35s ease';magnet.style.transform=`rotate(${facing==='S'?180:360}deg)`;
          setTimeout(()=>{magnet.style.transition='';magnet.style.transform=facing==='S'?'rotate(180deg)':'';},380);
          countEl.textContent=`Flipped to: ${facing} · Stuck: ${stuck} of ${items.length}`;
          result.textContent=`Magnet flipped to ${facing}! Now ${facing==='N'?'S':'N'} treasures will cling.`;
          speak(`Flipped to ${facing}.`);
        }
        flip.addEventListener('click',doFlip);
        magnet.addEventListener('click',doFlip);
        magnet.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!state.locked){e.preventDefault();doFlip();}});
        done.addEventListener('click',()=>{
          if(state.locked||phase!=='collect')return;
          if(stuck===items.length){
            const msg=`You did it! ${items.length} treasures, all by matching N to S. Same ends push, different ends pull!`;
            result.innerHTML=`<strong>Pole master!</strong> ${msg}`;speak(msg);
            labOutcome(renderMagnetFish,true,done,msg);
          }else{result.textContent=`${items.length-stuck} treasures still waiting. Flip the magnet so opposites face each treasure!`;speak(`${items.length-stuck} treasures still waiting.`);wrong(done);}
        });
        function renderMfLatch(){
          phase='latch';
          let a='N',b='N';
          panel.innerHTML=progressMarkup()+mfTabs()+`<h2 class="prompt">Latch lab! Build a magnetic latch that holds the treasure chest shut — without touching!</h2><p class="lab-instruction">Tap each magnet to flip it. The latch holds when the two facing ends are <strong>opposites</strong>.</p><div class="lab-stage"><div class="mf-latch"><div class="mf-chest">🧰<span>treasure chest</span></div><div class="mf-latchrow"><button class="answer mf-latchmag" data-side="a" type="button" aria-label="Left magnet, facing ${a}">${mfPoleBadge(a)}<span>left magnet</span></button><span class="mf-gap" aria-hidden="true">⟷</span><button class="answer mf-latchmag" data-side="b" type="button" aria-label="Right magnet, facing ${b}">${mfPoleBadge(b)}<span>right magnet</span></button></div><button class="answer" id="mfLatchTest" type="button">Test the latch! 🧲</button><p class="science-result" id="mfResult" role="status">N and S pull together — N and N push apart!</p></div></div>`;
          setProgress();mfBindTabs();
          const result2=()=> $('#mfResult',panel);
          $$('.mf-latchmag',panel).forEach(btn=>btn.onclick=()=>{
            if(state.locked)return;
            if(btn.dataset.side==='a')a=a==='N'?'S':'N';else b=b==='N'?'S':'N';
            btn.querySelector('.mf-pole').outerHTML=mfPoleBadge(btn.dataset.side==='a'?a:b);
            btn.setAttribute('aria-label',`${btn.dataset.side==='a'?'Left':'Right'} magnet, facing ${btn.dataset.side==='a'?a:b}`);
            sciPop();
          });
          $('#mfLatchTest',panel).onclick=e=>{
            if(state.locked)return;
            const btn=e.currentTarget;
            if(a!==b){
              const msg=`Latched! ${a} and ${b} are opposites, so they pull together and hold the chest shut — without even touching!`;
              result2().innerHTML=`<strong>It holds!</strong> ${msg}`;speak(msg);
              labOutcome(renderMagnetFish,true,btn,msg);
            }else{
              wrong(btn);
              result2().textContent=`POP! It flew open — ${a} pushes ${a} away. Flip ONE magnet so the ends are opposites!`;
              speak('It popped open! Same ends push apart. Flip one magnet.');
            }
          };
        }
      }
      function mfChallenge(i,g){
        const magN=mfMagN[g],trickN=mfTrickN[g];
        const magStart=(i*3+g)%12,trickStart=(i*4+2)%12;
        const mag=[];for(let k=0;k<magN;k++)mag.push({name:mfMag[g][(magStart+k)%12],mag:true});
        const trick=[];for(let k=0;k<trickN;k++)trick.push({name:mfTrick[g][(trickStart+k)%12],mag:false});
        return {mag,trick,n:magN+trickN};
      }
      function mfShape(name){
        const inner='';const gap='';
        const gm=['fill="#c9d1dc" stroke="#6a7485" stroke-width="3"','fill="#8d97a8" stroke="#5b636e" stroke-width="3"','fill="#aeb6c2" stroke="#6a7485" stroke-width="3"'];
        function ring(cx,cy,r,inner_r){return `<circle cx='${cx}' cy='${cy}' r='${r}' ${gm[0]}/><circle cx='${cx}' cy='${cy}' r='${inner_r}' fill='#eef1f6' stroke='#6a7485' stroke-width='2'/>`;}
        if(/iron key|key|brass|doorbell|bell|clasp/.test(name)&&!/(socket|hex)/.test(name)){
          if(/bell|doorbell/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M48 18c10 0 16 8 16 20v12l8 10H24l8-10V38c0-12 6-20 16-20z' ${gm[0]}/><circle cx='48' cy='70' r='5' fill='#d99f3a'/><rect x='44' y='12' width='8' height='8' rx='4' ${gm[1]}/></svg>`;
          return `<svg viewBox='0 0 96 96' class='mf-art'>${ring(36,38,15,6)}<path d='M50 38h26M64 38v10M74 38v10' stroke='#6a7485' stroke-width='6' stroke-linecap='round'/></svg>`;
        }
        if(/padlock|lock|clasp|gate latch/.test(name)&&!/(washer|drum)/.test(name)&&!/key/.test(name)){
          return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='28' y='42' width='40' height='32' rx='6' ${gm[0]}/><path d='M36 42v-8a12 12 0 0 1 24 0v8' fill='none' stroke='#6a7485' stroke-width='6'/><circle cx='48' cy='56' r='5' fill='#2b2d42'/><rect x='46' y='58' width='4' height='10' fill='#2b2d42'/></svg>`;
        }
        if(/hinge|lock striker|plate/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='22' y='32' width='30' height='34' rx='4' ${gm[0]}/><rect x='54' y='32' width='30' height='34' rx='4' ${gm[2]}/><circle cx='48' cy='38' r='3' fill='#2b2d42'/><circle cx='48' cy='50' r='3' fill='#2b2d42'/><circle cx='48' cy='62' r='3' fill='#2b2d42'/></svg>`;
        if(/chain|spring/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><ellipse cx='32' cy='48' rx='10' ry='16' fill='none' stroke='#8d97a8' stroke-width='6'/><ellipse cx='52' cy='48' rx='10' ry='16' fill='none' stroke='#aeb6c2' stroke-width='6'/><ellipse cx='72' cy='48' rx='10' ry='16' fill='none' stroke='#8d97a8' stroke-width='6'/></svg>`;
        if(/washer|latch|striker/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'>${ring(48,48,26,13)}</svg>`;
        if(/thumbtack|pushpin/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='34' y='30' width='28' height='16' rx='8' ${gm[0]}/><path d='M48 46l-5 30 10 0z' fill='#8d97a8'/></svg>`;
        if(/safety pin|pin(?!\b)|barrette/.test(name)&&!/bobby/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><ellipse cx='52' cy='52' rx='20' ry='12' fill='none' stroke='#c9d1dc' stroke-width='6'/><path d='M32 52h30' stroke='#8d97a8' stroke-width='7' stroke-linecap='round'/><circle cx='30' cy='48' r='6' fill='#9aa3b2'/></svg>`;
        if(/bobby|clothes pin/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M30 30q18 2 34 10-16 8-34 10z' ${gm[0]}/></svg>`;
        if(/hook|anchor/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M48 18v34a14 14 0 0 0 28 0v-6' fill='none' stroke='#8d97a8' stroke-width='8' stroke-linecap='round'/><circle cx='48' cy='18' r='7' fill='none' stroke='#8d97a8' stroke-width='6'/></svg>`;
        if(/anchor/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='44' y='18' width='8' height='44' rx='4' ${gm[1]}/><rect x='30' y='26' width='36' height='8' rx='4' ${gm[1]}/><path d='M24 48q0 20 24 22 24-2 24-22' fill='none' stroke='#8d97a8' stroke-width='8' stroke-linecap='round'/></svg>`;
        if(/curtain/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M30 24q18 0 18 18v10a10 10 0 0 0 20 0v-6' fill='none' stroke='#8d97a8' stroke-width='7' stroke-linecap='round'/></svg>`;
        if(/fish hook/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='44' y='16' width='6' height='40' rx='3' fill='#8d97a8'/><path d='M47 54a10 10 0 0 0 20 0v-8' fill='none' stroke='#8d97a8' stroke-width='7' stroke-linecap='round'/></svg>`;
        if(/sprocket/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='48' r='18' ${gm[1]}/>${[0,45,90,135,180,225,270,315].map(a=>`<rect x='44' y='16' width='8' height='14' rx='4' fill='#8d97a8' transform='rotate(${a} 48 48)'/>`).join('')}<circle cx='48' cy='48' r='6' fill='#2b2d42'/></svg>`;
        if(/scissors/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='36' cy='64' r='9' fill='none' stroke='#c9d1dc' stroke-width='6'/><circle cx='62' cy='64' r='9' fill='none' stroke='#c9d1dc' stroke-width='6'/><path d='M40 56L60 24M56 56L36 24' stroke='#9aa3b2' stroke-width='8' stroke-linecap='round'/><circle cx='48' cy='48' r='4' fill='#2b2d42'/></svg>`;
        if(/hole punch/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='30' y='40' width='36' height='20' rx='8' ${gm[0]}/><circle cx='48' cy='50' r='6' fill='#2b2d42'/><rect x='42' y='26' width='12' height='14' rx='4' ${gm[1]}/></svg>`;
        if(/tweezers/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M42 26l-6 42h6zM54 26l6 42h-6z' fill='#c9d1dc' stroke='#6a7485' stroke-width='2'/><rect x='38' y='18' width='20' height='10' rx='5' fill='#8d97a8'/></svg>`;
        if(/binder clip/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M36 40a8 8 0 0 1 16 0v20a8 8 0 0 1-16 0z' ${gm[1]}/><path d='M44 40l-8-14M44 40l8-14' stroke='#6a7485' stroke-width='5' stroke-linecap='round'/></svg>`;
        if(/can opener/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='30' y='42' width='34' height='14' rx='7' ${gm[0]}/><circle cx='60' cy='49' r='9' ${gm[1]}/><rect x='66' y='30' width='6' height='38' rx='3' fill='#8d97a8'/></svg>`;
        if(/needle/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M30 66l34-34' stroke='#c9d1dc' stroke-width='6' stroke-linecap='round'/><ellipse cx='66' cy='28' rx='4' ry='6' fill='#eef1f6' stroke='#6a7485' stroke-width='2'/></svg>`;
        if(/wrench/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='42' y='36' width='12' height='42' rx='6' ${gm[0]}/><path d='M36 30a12 12 0 0 1 24 0l-6 8h-12z' ${gm[1]}/></svg>`;
        if(/ruler|hex key/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='22' y='40' width='52' height='16' rx='3' ${gm[2]}/><path d='M30 40v8M40 40v11M50 40v8M60 40v11M70 40v8' stroke='#6a7485' stroke-width='3'/></svg>`;
        if(/zipper/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='44' y='24' width='8' height='20' fill='#8d97a8'/><path d='M48 44q-12 6-12 18a12 12 0 0 0 24 0q0-12-12-18z' ${gm[0]}/></svg>`;
        if(/nut/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M48 22l20 12v24l-20 12-20-12V34z' ${gm[0]}/><circle cx='48' cy='48' r='9' fill='#eef1f6' stroke='#6a7485' stroke-width='2'/></svg>`;
        if(/cotter/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='30' y='42' width='30' height='10' rx='5' ${gm[0]}/><circle cx='64' cy='47' r='9' fill='none' stroke='#8d97a8' stroke-width='6'/></svg>`;
        if(/piano/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M24 60q24-28 48 0' fill='none' stroke='#8d97a8' stroke-width='6'/><circle cx='24' cy='60' r='5' fill='#6a7485'/><circle cx='72' cy='60' r='5' fill='#6a7485'/></svg>`;
        if(/drill|bob/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='43' y='26' width='10' height='34' rx='5' ${gm[0]}/><path d='M43 60l5 22 5-22' fill='#8d97a8'/><path d='M46 32l2 22M50 32l-2 22' stroke='#2b2d42' stroke-width='2'/></svg>`;
        if(/ball/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='48' r='24' ${gm[0]}/><ellipse cx='40' cy='40' rx='8' ry='6' fill='#eef1f6'/></svg>`;
        if(/fishing reel/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='42' cy='52' r='18' ${gm[0]}/><circle cx='42' cy='52' r='7' fill='#2b2d42'/><rect x='56' y='30' width='8' height='40' rx='4' fill='#8d97a8'/></svg>`;
        if(/tire iron/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M30 26h36' stroke='#8d97a8' stroke-width='9' stroke-linecap='round'/><rect x='43' y='26' width='10' height='52' rx='5' ${gm[1]}/></svg>`;
        if(/hitch/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='22' y='42' width='52' height='14' rx='7' ${gm[0]}/><circle cx='72' cy='49' r='11' fill='none' stroke='#8d97a8' stroke-width='7'/></svg>`;
        if(/barbell/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='18' y='45' width='60' height='7' rx='3' fill='#8d97a8'/><ellipse cx='30' cy='48' rx='8' ry='18' ${gm[1]}/><ellipse cx='66' cy='48' rx='8' ry='18' ${gm[1]}/></svg>`;
        if(/axle|cable|rod/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='20' y='44' width='56' height='10' rx='5' ${gm[0]}/><path d='M24 44q12 10 24 0t24 0' stroke='#6a7485' stroke-width='2' fill='none'/></svg>`;
        if(/pipe/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M28 66h30V40' fill='none' stroke='#8d97a8' stroke-width='12' stroke-linecap='round'/><circle cx='58' cy='40' r='8' fill='#2b2d42'/></svg>`;
        if(/gear/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='48' r='16' ${gm[1]}/>${[0,60,120,180,240,300].map(a=>`<rect x='44' y='20' width='8' height='12' rx='3' fill='#8d97a8' transform='rotate(${a} 48 48)'/>`).join('')}<circle cx='48' cy='48' r='5' fill='#eef1f6'/></svg>`;
        if(/winch spring/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M30 60q8-22 18 0t18 0' fill='none' stroke='#8d97a8' stroke-width='7'/><path d='M34 78h28' stroke='#6a7485' stroke-width='6' stroke-linecap='round'/></svg>`;
        /* ── tricks: bright, friendly, non-magnetic ── */
        if(/felt/.test(name))return /diamond/.test(name)?`<svg viewBox='0 0 96 96' class='mf-art'><path d='M48 20l18 28-18 28-18-28z' fill='#70b51c' stroke='#4d7c12' stroke-width='3'/></svg>`:`<svg viewBox='0 0 96 96' class='mf-art'><rect x='24' y='30' width='48' height='36' rx='8' fill='#70b51c' stroke='#4d7c12' stroke-width='3'/><circle cx='48' cy='48' r='9' fill='#d9f0c8'/></svg>`;
        if(/yo-yo/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='52' r='22' fill='#e63946' stroke='#a62639' stroke-width='3'/><circle cx='48' cy='52' r='7' fill='#ffd60a'/><path d='M48 14v16' stroke='#8d6e63' stroke-width='3'/></svg>`;
        if(/domino/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='36' y='12' width='24' height='72' rx='8' fill='#fdfcf8' stroke='#444' stroke-width='3'/><path d='M36 48h24' stroke='#444' stroke-width='3'/><circle cx='44' cy='30' r='4' fill='#2b2d42'/><circle cx='52' cy='30' r='4' fill='#2b2d42'/><circle cx='48' cy='66' r='4' fill='#e63946'/></svg>`;
        if(/pencil box/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='20' y='34' width='56' height='30' rx='6' fill='#3a86ff' stroke='#1e5cb8' stroke-width='3'/><rect x='20' y='28' width='56' height='10' rx='5' fill='#5ea0ff'/></svg>`;
        if(/kaleidoscope/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M26 60l34-24 14 20-34 24z' fill='#9d4edd'/><path d='M44 40l8 10M52 34l6 12' stroke='#ffd60a' stroke-width='3'/></svg>`;
        if(/jump rope/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M30 24q18 48 36 0' fill='none' stroke='#e63946' stroke-width='6'/><circle cx='30' cy='22' r='8' fill='#ffd60a'/><circle cx='66' cy='22' r='8' fill='#ffd60a'/></svg>`;
        if(/golf tee/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='26' r='12' fill='#fdfcf8' stroke='#bbb' stroke-width='2'/><path d='M40 40h16l-3 32h-10z' fill='#4d7c3a'/></svg>`;
        if(/pompom/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='48' r='26' fill='#8ecae6'/><circle cx='38' cy='40' r='8' fill='#cdf0fd'/><circle cx='58' cy='58' r='7' fill='#cdf0fd'/><circle cx='46' cy='60' r='6' fill='#cdf0fd'/></svg>`;
        if(/toothbrush/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='30' y='50' width='34' height='9' rx='4' fill='#4d80ff'/><rect x='58' y='42' width='16' height='12' rx='6' fill='#4d80ff'/><path d='M62 42v-6M66 42v-6M70 42v-6' stroke='#cfe4ff' stroke-width='3' stroke-linecap='round'/></svg>`;
        if(/ribbon/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M20 30q14 6 0 24 14 6 0 24 20 4 40 0' fill='none' stroke='#7b2cbf' stroke-width='9' stroke-linecap='round'/></svg>`;
        if(/sweatband/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='48' r='24' fill='none' stroke='#4dabf7' stroke-width='13'/><circle cx='48' cy='48' r='24' fill='none' stroke='#1971c2' stroke-width='3' stroke-dasharray='5 6'/></svg>`;
        if(/sock|mitten/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M36 18v30l-12 10a10 10 0 0 0 14 14l22-16V18z' fill='#ffd60a' stroke='#d9a700' stroke-width='3'/></svg>`;
        if(/oven mitt/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M34 78V44a14 14 0 0 1 28 0v34z' fill='#90be6d' stroke='#4d7c3a' stroke-width='3'/></svg>`;
        if(/velcro/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='22' y='40' width='52' height='16' rx='8' fill='#f4a261' stroke='#c96f2e' stroke-width='3'/><circle cx='36' cy='48' r='3' fill='#c96f2e'/><circle cx='48' cy='48' r='3' fill='#c96f2e'/><circle cx='60' cy='48' r='3' fill='#c96f2e'/></svg>`;
        if(/stamp/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='34' y='56' width='28' height='12' rx='4' fill='#7f5539'/><rect x='40' y='36' width='16' height='22' rx='6' fill='#dd6e42'/><ellipse cx='48' cy='34' rx='12' ry='7' fill='#7f5539'/><circle cx='48' cy='74' r='4' fill='#e63946'/></svg>`;
        if(/sharpener/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='32' y='38' width='32' height='24' rx='8' fill='#e63946' stroke='#a62639' stroke-width='3'/><rect x='42' y='44' width='12' height='10' rx='4' fill='#2b2d42'/></svg>`;
        if(/chopstick/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='40' y='18' width='7' height='60' rx='3' fill='#d9a066' transform='rotate(8 43 48)'/><rect x='50' y='18' width='7' height='60' rx='3' fill='#c0804f' transform='rotate(-8 53 48)'/></svg>`;
        if(/ticket/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='20' y='36' width='56' height='26' rx='4' fill='#ffca3a' stroke='#d9a700' stroke-width='3'/><path d='M32 36v26' stroke='#d9a700' stroke-width='3' stroke-dasharray='4 4'/><circle cx='48' cy='49' r='4' fill='#e63946'/></svg>`;
        if(/pie plate/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><ellipse cx='48' cy='52' rx='30' ry='12' fill='#e7e9ec' stroke='#9aa3b2' stroke-width='3'/><ellipse cx='48' cy='46' rx='22' ry='10' fill='#d9a066'/><path d='M30 42l6-6 8 6M48 42l6-6 8 6' stroke='#c96f2e' stroke-width='2'/></svg>`;
        if(/charger/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='36' y='22' width='24' height='22' rx='6' fill='#2b2d42'/><path d='M42 22v-8M54 22v-8' stroke='#9aa3b2' stroke-width='4' stroke-linecap='round'/><path d='M48 44q-8 10 0 22 6 8-2 12' stroke='#2b2d42' stroke-width='5' fill='none' stroke-linecap='round'/></svg>`;
        if(/basket/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M24 44l6 28h36l6-28z' fill='#d9a066' stroke='#9c6b30' stroke-width='3'/><path d='M26 56h44M30 64h36' stroke='#9c6b30' stroke-width='2'/><path d='M30 44a18 18 0 0 1 36 0' fill='none' stroke='#9c6b30' stroke-width='4'/></svg>`;
        if(/soldier/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='24' r='10' fill='#ffd6a5'/><rect x='30' y='34' width='8' height='10' rx='4' fill='#2b2d42'/><rect x='58' y='34' width='8' height='10' rx='4' fill='#2b2d42'/><rect x='40' y='36' width='16' height='28' rx='4' fill='#e63946' stroke='#a62639' stroke-width='3'/><rect x='40' y='64' width='7' height='18' rx='3' fill='#2b2d42'/><rect x='49' y='64' width='7' height='18' rx='3' fill='#2b2d42'/></svg>`;
        if(/straw hat/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><ellipse cx='48' cy='62' rx='32' ry='10' fill='#f1cf8f' stroke='#c99a4a' stroke-width='3'/><path d='M34 62a14 16 0 0 1 28 0' fill='#f1cf8f' stroke='#c99a4a' stroke-width='3'/><path d='M36 56h24' stroke='#c96f2e' stroke-width='4'/></svg>`;
        if(/yardstick/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='20' y='42' width='56' height='13' rx='3' fill='#f1cf8f' stroke='#c99a4a' stroke-width='3'/><path d='M30 42v7M40 42v10M50 42v7M60 42v10M70 42v7' stroke='#8a5a14' stroke-width='2'/></svg>`;
        if(/garden hose/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M30 66q-2-30 26-30 22 0 20 26' fill='none' stroke='#43aa8b' stroke-width='10' stroke-linecap='round'/><rect x='70' y='52' width='10' height='14' rx='3' fill='#ffca3a'/></svg>`;
        if(/teacup/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M30 38h32v14a16 16 0 0 1-32 0z' fill='#fdfcf8' stroke='#bbb' stroke-width='3'/><path d='M62 42a9 9 0 0 1 0 16' fill='none' stroke='#bbb' stroke-width='3'/><path d='M30 30a16 4 0 0 0 32 0' fill='#d9a066'/></svg>`;
        if(/gold ring/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='54' r='20' fill='none' stroke='#ffd60a' stroke-width='8'/><path d='M40 32l8-10 8 10-4 8h-8z' fill='#b8f2ff' stroke='#7ea6c9' stroke-width='2'/></svg>`;
        if(/sinker/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='52' r='18' fill='#b8bdc7' stroke='#6a7485' stroke-width='3'/><path d='M48 26v8' stroke='#6a7485' stroke-width='5'/></svg>`;
        if(/ceramic bell/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M48 18c10 0 16 8 16 20v12l8 10H24l8-10V38c0-12 6-20 16-20z' fill='#fdfcf8' stroke='#c43a72' stroke-width='3'/><circle cx='48' cy='70' r='5' fill='#c43a72'/></svg>`;
        if(/doorknob/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='30' y='28' width='12' height='40' rx='6' fill='#ffd60a' stroke='#d9a700' stroke-width='3'/><circle cx='56' cy='48' r='16' fill='#ffd60a' stroke='#d9a700' stroke-width='3'/><ellipse cx='50' cy='42' rx='5' ry='4' fill='#fff3b0'/></svg>`;
        if(/medal/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M38 16l10 16 10-16' fill='none' stroke='#c96f2e' stroke-width='8'/><circle cx='48' cy='58' r='18' fill='#c9762f' stroke='#8f4e1d' stroke-width='3'/><path d='M48 48l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z' fill='#ffe08a'/></svg>`;
        if(/phone case|phone\b/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='32' y='20' width='32' height='56' rx='8' fill='#70d6ff' stroke='#1e6fa0' stroke-width='3'/><circle cx='48' cy='66' r='4' fill='#1e6fa0'/></svg>`;
        if(/lid|comb|strap/.test(name)&&!/velcro/.test(name))return /lid/.test(name)?`<svg viewBox='0 0 96 96' class='mf-art'><ellipse cx='48' cy='50' rx='26' ry='12' fill='#ffafcc' stroke='#c43a72' stroke-width='3'/><circle cx='48' cy='40' r='6' fill='#c43a72'/></svg>`:/comb/.test(name)?`<svg viewBox='0 0 96 96' class='mf-art'><rect x='26' y='32' width='44' height='10' rx='5' fill='#7f5539'/><path d='M34 42v14M42 42v14M50 42v14M58 42v14' stroke='#7f5539' stroke-width='4' stroke-linecap='round'/></svg>`:`<svg viewBox='0 0 96 96' class='mf-art'><rect x='24' y='42' width='48' height='12' rx='6' fill='#90be6d' stroke='#4d7c3a' stroke-width='3'/><rect x='60' y='38' width='10' height='20' rx='4' fill='#4d7c3a'/></svg>`;
        if(/drawstring/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M34 36q14-8 28 0l4 30q-18 10-36 0z' fill='#c8b6ff' stroke='#7b68c4' stroke-width='3'/><path d='M34 36q14 8 28 0' fill='none' stroke='#7b68c4' stroke-width='3'/></svg>`;
        if(/pinboard/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='22' y='30' width='52' height='40' rx='6' fill='#d9a066' stroke='#9c6b30' stroke-width='3'/><circle cx='36' cy='44' r='4' fill='#e63946'/><circle cx='58' cy='58' r='4' fill='#3a86ff'/><rect x='42' y='46' width='14' height='10' fill='#fdfcf8'/></svg>`;
        if(/glasses/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='36' cy='50' r='13' fill='none' stroke='#2b2d42' stroke-width='4'/><circle cx='60' cy='50' r='13' fill='none' stroke='#2b2d42' stroke-width='4'/><path d='M49 50h-2M23 48l-9-4M73 48l9-4' stroke='#2b2d42' stroke-width='4'/></svg>`;
        if(/mallet/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='30' y='22' width='36' height='22' rx='10' fill='#d9a066' stroke='#9c6b30' stroke-width='3'/><rect x='43' y='44' width='10' height='34' rx='5' fill='#9c6b30'/></svg>`;
        if(/tent rope/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M26 66L56 26' stroke='#d9a066' stroke-width='7' stroke-linecap='round'/><path d='M68 30l10 38' stroke='#d9a066' stroke-width='7' stroke-linecap='round'/><path d='M50 56l20 2' stroke='#9c6b30' stroke-width='5'/></svg>`;
        if(/porcelain/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M34 30h26v26a13 13 0 0 1-26 0z' fill='#fdfcf8' stroke='#7ea6c9' stroke-width='3'/><path d='M60 36a10 10 0 0 1 0 18' fill='none' stroke='#7ea6c9' stroke-width='3'/><path d='M38 44h18' stroke='#7ea6c9' stroke-width='2'/></svg>`;
        if(/cork/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='28' y='36' width='40' height='26' rx='6' fill='#e0b56a' stroke='#b07727' stroke-width='3'/><circle cx='42' cy='48' r='3' fill='#b07727'/><circle cx='56' cy='44' r='2' fill='#b07727'/></svg>`;
        if(/bucket/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M32 38h32l-4 30H36z' fill='#ff595e' stroke='#a62639' stroke-width='3'/><path d='M32 38a16 16 0 0 1 32 0' fill='none' stroke='#a62639' stroke-width='4'/></svg>`;
        if(/clay tile/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='28' y='36' width='40' height='26' rx='4' fill='#cf6f4a' stroke='#8f4e1d' stroke-width='3'/><path d='M36 36v26M48 36v26M60 36v26' stroke='#8f4e1d' stroke-width='2'/></svg>`;
        if(/tube/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='30' y='24' width='16' height='48' rx='8' fill='#c98d4f' stroke='#9c6b30' stroke-width='3'/><ellipse cx='38' cy='24' rx='8' ry='5' fill='#9c6b30'/></svg>`;
        if(/keepsake/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><rect x='24' y='42' width='48' height='26' rx='5' fill='#9d4edd' stroke='#6a2bbf' stroke-width='3'/><rect x='24' y='34' width='48' height='10' rx='4' fill='#c77dff'/><circle cx='48' cy='55' r='5' fill='#ffd60a'/></svg>`;
        if(/door stop/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M26 66l34-24v24z' fill='#4d4f57' stroke='#23242b' stroke-width='3'/></svg>`;
        if(/paper clip|coach|zipper pull/.test(name))return `<svg viewBox='0 0 96 96' class='mf-art'><path d='M36 26v30a5 5 0 0 0 10 0V36a9 9 0 0 1 18 0v30a11 11 0 0 1-22 0' stroke='#c9d1dc' stroke-width='5' fill='none' stroke-linecap='round'/></svg>`;
        return `<svg viewBox='0 0 96 96' class='mf-art'><circle cx='48' cy='48' r='26' fill='#dfe8ff'/></svg>`;
      }
      const mfMagnetSVG=`<svg viewBox='0 0 120 96' class='mf-magnet-art'><path d='M30 10v42a30 30 0 0 0 60 0V10h-22v42a8 8 0 0 1-16 0V10z' fill='#e63946' stroke='#a62639' stroke-width='3'/><rect x='30' y='10' width='22' height='16' fill='#f8f9fa'/><rect x='68' y='10' width='22' height='16' fill='#f8f9fa'/></svg>`;
      function renderMagnetFish(){
        if(mfTrack==='pole'){renderPoleFlip();return;}
        const i=lessonIndex(),g=state.grade,ch=mfChallenge(i,g);
        const items=[...ch.mag,...ch.trick].map((t,k)=>({...t,key:k,stuck:false,nope:false}));
        const order=shuffle(items);
        const stuck=new Map();
        let stuckCount=0,finished=false,lastNopeSpeech=0;
        const prompt=`Some toys stick to magnets! Drag the big magnet through the toy box to discover which ones cling.`;
        panel.innerHTML=progressMarkup()+mfTabs()+`<h2 class="prompt" data-speak="Drag the magnet near each toy. Magnetic toys will cling to it.">${prompt}</h2><p class="lab-instruction">Bring the magnet near a toy. Iron and steel will cling with a <em>clink</em>. Other things will slide away!</p><div class="lab-stage"><div class="mf-stage" id="mfStage"><div class="mf-box"></div><div id="mfMagnet" class="mf-magnet" role="button" tabindex="0" aria-label="Horseshoe magnet. Drag it, or move it with the arrow keys." style="left:50%;top:74%">${mfMagnetSVG}</div></div><div class="mf-tray" id="mfTray"><p>Treasure tray</p><div class="mf-trayitems" id="mfTrayItems"></div></div><p class="mf-count" id="mfCount" role="status">Stuck to your magnet: 0 of ${ch.mag.length} treasures</p><button class="lab-action mf-done" id="mfDone" type="button">Check my tray!</button><p class="science-result" id="mfResult" role="status">Wave the magnet close to each toy to test it.</p></div>`;
        setProgress();mfBindTabs();
        const stage=$('#mfStage',panel),magnet=$('#mfMagnet',panel),done=$('#mfDone',panel),result=$('#mfResult',panel),countEl=$('#mfCount',panel),trayItems=$('#mfTrayItems',panel);
        let mx=44,my=64;
        order.forEach((t,k)=>{
          const el=document.createElement('button');
          el.className='mf-toy';el.type='button';el.dataset.mag=t.mag?'1':'0';el.dataset.name=t.name;
          el.setAttribute('aria-label',t.name+' toy');
          const spots=order.length<=5?[[12,16],[40,14],[68,18],[26,48],[54,46]]:[[8,16],[32,12],[56,14],[80,18],[20,48],[44,46],[68,48],[92,48]];
          const spot=spots[k%spots.length];
          el.style.left=spot[0]+'%';el.style.top=spot[1]+'%';
          el.innerHTML=mfShape(t.name)+`<span class="mf-toy-name">${t.name}</span>`;
          el.addEventListener('click',()=>{
            if(finished||t.stuck||state.locked)return;
            const stageRect=stage.getBoundingClientRect();
            const rect=el.getBoundingClientRect();
            mx=clamp((rect.left-rect.width/2-stageRect.left)/stageRect.width*100+8,4,86);
            my=clamp((rect.top-rect.height/2-stageRect.top)/stageRect.height*100,4,80);
            magnet.style.transition='left .45s ease,top .45s ease';
            magnet.style.left=mx+'%';magnet.style.top=my+'%';
            setTimeout(()=>{magnet.style.transition='';snapCheck(t,el);},470);
          });
          t.el=el;stage.appendChild(el);
        });
        function magnetRect(){return magnet.getBoundingClientRect();}
        function itemAt(px,py){
          let best=null,bestD=72;
          order.forEach(t=>{if(!t.el||t.stuck)return;const r=t.el.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;const d=Math.hypot(px-cx,py-cy);if(d<bestD){bestD=d;best=t;}});
          return best;
        }
        function snapCheck(t,el){
          if(!t||finished)return;
          el=el||t.el;
          if(!el)return;
          if(t.mag){
            t.stuck=true;stuckCount++;stuck.set(t.key,t);
            el.classList.add('stuck');
            const spots=[[52,24],[52,52],[-52,24],[-52,52],[0,84]];
            placeStuck(el,stuckCount-1,spots);
            sciClink(stuckCount);
            countEl.textContent=`Stuck to your magnet: ${stuckCount} of ${ch.mag.length} treasures`;
            const chip=document.createElement('span');chip.className='mf-tchip';chip.textContent=t.name;trayItems.appendChild(chip);
            if(stuckCount===ch.mag.length){
              result.innerHTML=`<strong>Treasure complete!</strong> All ${ch.mag.length} magnetic toys are clinging. Tap “Check my tray!” to tell Questy!`;
              speak(`All ${ch.mag.length} magnetic treasures are clinging! Press Check my tray!`);
            }else{
              result.textContent=`Clink! The ${t.name} clung on. ${stuckCount} of ${ch.mag.length} treasures.`;
            }
          }else if(!t.nope){
            t.nope=true;el.classList.add('nope');setTimeout(()=>el.classList.remove('nope'),520);setTimeout(()=>{t.nope=false;},4000);
            result.textContent=`The ${t.name} does not stick. No iron or steel in it!`;
            const now=Date.now();
            if(now-lastNopeSpeech>2600){lastNopeSpeech=now;speak(`The ${t.name} does not stick. It has no iron or steel.`);}
          }
        }
        function placeStuck(el,idx,spots){
          const s=spots[Math.min(idx,spots.length-1)];
          el.style.left=`calc(${mx}% + ${s[0]}px)`;el.style.top=`calc(${my}% + ${s[1]}px)`;
        }
        function moveStuckTogether(){
          const spots=[[52,24],[52,52],[-52,24],[-52,52],[0,84]];
          [...stuck.keys()].sort().forEach((k,idx)=>{const t=stuck.get(k);if(t&&t.el)t.el.style.left=`calc(${mx}% + ${spots[Math.min(idx,spots.length-1)][0]}px)`,t.el.style.top=`calc(${my}% + ${spots[Math.min(idx,spots.length-1)][1]}px)`;});
        }
        let drag=null;
        magnet.addEventListener('pointerdown',e=>{if(state.locked)return;drag=true;try{magnet.setPointerCapture(e.pointerId);}catch(err){}magnet.classList.add('dragging');});
        magnet.addEventListener('pointermove',e=>{
          if(!drag||state.locked)return;
          const rect=stage.getBoundingClientRect();
          mx=clamp((e.clientX-rect.left)/rect.width*100-3,3,84);my=clamp((e.clientY-rect.top)/rect.height*100-3,3,78);
          magnet.style.left=mx+'%';magnet.style.top=my+'%';moveStuckTogether();
          const r=magnetRect();snapCheck(itemAt(r.left+r.width/2,r.top+r.height/2),null);
        });
        magnet.addEventListener('pointerup',()=>{drag=false;magnet.classList.remove('dragging');});
        magnet.addEventListener('pointercancel',()=>{drag=false;magnet.classList.remove('dragging');});
        magnet.addEventListener('keydown',e=>{
          if(state.locked||finished)return;const step=5;
          if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();
            if(e.key==='ArrowLeft')mx=clamp(mx-step,3,84);if(e.key==='ArrowRight')mx=clamp(mx+step,3,84);
            if(e.key==='ArrowUp')my=clamp(my-step,3,78);if(e.key==='ArrowDown')my=clamp(my+step,3,78);
            magnet.style.left=mx+'%';magnet.style.top=my+'%';moveStuckTogether();
            const r=magnetRect();snapCheck(itemAt(r.left+r.width/2,r.top+r.height/2),null);
          }
        });
        const whyG=["Iron and steel love magnets — they cling on tight! They click because the magnet pulls them.","Magnets can pull iron and steel without even touching. A magnetic pull reaches across a small gap!","Magnets attract iron, nickel, and steel because those materials can become little magnets themselves.","Magnets can even attract through paper or plastic! Only iron-based materials care about the pull."];
        done.addEventListener('click',()=>{
          if(finished||state.locked)return;
          if(stuckCount===ch.mag.length){
            finished=true;
            const msg=`You found all ${ch.mag.length} magnetic treasures! ${whyG[g]}`;
            result.innerHTML=`<strong>Fantastic fishing!</strong> ${whyG[g]}`;speak(msg);
            labOutcome(renderMagnetFish,true,done,msg);
          }else{
            result.textContent=`Not quite! ${ch.mag.length-stuckCount} magnetic treasures are still hiding. Sweep the magnet slowly across the box.`;
            speak(`Still ${ch.mag.length-stuckCount} treasures hiding. Sweep the magnet slowly!`);
            wrong(done);
          }
        });
      }

      /* ── SEED SPROUT ── */
