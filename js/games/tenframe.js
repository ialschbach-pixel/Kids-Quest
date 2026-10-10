      function tenFrame(n){return `<div class="ten-frame" aria-label="ten frame with ${n} dots">${Array.from({length:10},(_,i)=>`<span class="ten-cell ${i<n?'filled':''}"></span>`).join('')}</div>`;}
      /* ---- Place-value retrofit (§9.2): every grade gets a STRUCTURALLY different track, not just
         bigger numbers. Tabs are labeled visibly; classic Ten-Frame Pop stays untouched. ---- */
      let tfTrack='classic';
      const TF_TRACKS=[
        {id:'classic',grades:[0,1,2,3],emoji:'🔢',name:'Ten-Frame Pop',desc:'Classic number matching'},
        {id:'pv1',grades:[0],emoji:'🌟',name:'Ten and Some More',desc:'11 to 19: a full ten plus more'},
        {id:'pv2',grades:[1],emoji:'🥢',name:'Ten-Stick Counting',desc:'To 40: bundles of ten'},
        {id:'pv3',grades:[1],emoji:'🎁',name:'Bundle It!',desc:'To 100: drag frames to build ten-sticks'},
        {id:'pvchart',grades:[1],emoji:'📊',name:'Place-Value Chart',desc:'Tens and ones columns'},
        {id:'pvcompare',grades:[1,2],emoji:'⚖️',name:'Which Is Bigger?',desc:'Compare block-built numbers'},
        {id:'pvhund',grades:[2],emoji:'🏔️',name:'Hundreds Chart',desc:'To 1,000: hundreds, tens, ones'},
        {id:'pvunbundle',grades:[2],emoji:'🔨',name:'Unbundle It',desc:'Break a ten to subtract'},
        {id:'pvdetective',grades:[3],emoji:'🔎',name:'Place-Value Detective',desc:'Missing digits and expanded form'}
      ];
      /* Block visuals: inline styles only (no core CSS changes). */
      function tenStick(){return `<div style="display:inline-block;width:30px;height:118px;border-radius:9px;border:3px solid #1d7a9e;background:repeating-linear-gradient(to bottom,#8ecae6 0px,#8ecae6 9px,#eaf7fd 9px,#eaf7fd 11.8px);margin:2px;vertical-align:bottom" role="img" aria-label="one ten-stick"></div>`;}
      function hundredFlat(){return `<div style="display:inline-grid;grid-template-columns:repeat(10,11px);grid-auto-rows:11px;gap:2px;padding:6px;border:3px solid #7b5bc1;border-radius:10px;background:#f1eafe;vertical-align:bottom" role="img" aria-label="one hundred-flat">${'<span style="background:#b79df0;border-radius:3px;display:block"></span>'.repeat(100)}</div>`;}
      function pvBlocks(n,withHundreds){
        const h=Math.floor(n/100),t=Math.floor(n%100/10),o=n%10;let s='';
        if(withHundreds)for(let k=0;k<h;k++)s+=hundredFlat();
        for(let k=0;k<t;k++)s+=tenStick();
        if(o>0||(!h&&!t))s+=tenFrame(o);
        return `<div style="display:flex;align-items:flex-end;justify-content:center;gap:6px;flex-wrap:wrap" role="img" aria-label="${n} built from blocks">${s||tenFrame(0)}</div>`;
      }
      function tfTabsHTML(){
        const avail=TF_TRACKS.filter(t=>t.grades.includes(state.grade));
        return `<div class="kq-tabs" role="tablist" aria-label="Place-value tracks">${avail.map(t=>`<button class="kq-mini-btn${t.id===tfTrack?'':' alt'} kq-tab-btn${t.id===tfTrack?' selected':''}" type="button" role="tab" aria-selected="${t.id===tfTrack}" data-track="${t.id}" data-speak="${t.emoji} ${t.name}. ${t.desc}.">${t.emoji} ${t.name}</button>`).join('')}</div>`;
      }
      const TF_RENDER={};
      function renderTenFrame(){
        const avail=TF_TRACKS.filter(t=>t.grades.includes(state.grade));
        if(!avail.some(t=>t.id===tfTrack))tfTrack='classic';
        const track=TF_TRACKS.find(t=>t.id===tfTrack);
        panel.innerHTML=progressMarkup()+tfTabsHTML()+`<p class="lab-instruction" style="text-align:center;margin-top:-8px"><strong>${track.emoji} ${track.name}:</strong> ${track.desc}</p><div id="tfTrackBody"></div>`;
        $$('.kq-tab-btn',panel).forEach(b=>b.addEventListener('click',()=>{tfTrack=b.dataset.track;beep('good');renderTenFrame();}));
        setProgress();
        TF_RENDER[tfTrack]($('#tfTrackBody'));
      }
      /* Track renderers live on TF_RENDER below. */
      /* Classic game, preserved exactly (now one track among many). */
      TF_RENDER.classic=function(body){
        const i=lessonIndex(),limits=[10,20,30,40],answer=1+((i*(state.grade+2)+state.round)%limits[state.grade]),phrases=[`Show ${answer}`,`One more than ${answer-1}`,`The number after ${Math.max(0,answer-1)}`,`${answer} in frames`,`Count to ${answer}`,`Build ${answer}`],prompt=phrases[state.round];
        const opts=deterministicOptions(answer,Array.from({length:limits[state.grade]},(_,n)=>n+1),4,i),make=n=>Array.from({length:Math.ceil(n/10)},(_,f)=>tenFrame(Math.min(10,Math.max(0,n-f*10)))).join('');
        body.innerHTML=`<h2 class="prompt" data-speak="${prompt}">${prompt}</h2><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}" data-speak="${o}" aria-label="${o} dots">${make(o)}</button>`).join('')}</div>`;speak(prompt);$$('.answer',body).forEach(b=>b.addEventListener('click',()=>Number(b.dataset.value)===answer?correctThen(renderTenFrame,b):wrong(b)));
      };
      /* PV-1 (K): 11–19 as one full ten-frame plus some more. */
      TF_RENDER.pv1=function(body){
        const i=lessonIndex(),ones=1+((i*7+state.round*3)%9),answer=10+ones;
        const prompt=`10 and ${ones} more make…?`;
        const opts=deterministicOptions(answer,[11,12,13,14,15,16,17,18,19],4,i);
        body.innerHTML=`<h2 class="prompt" data-speak="${prompt}">${prompt}</h2><div class="visual-prompt"><div style="display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap">${tenFrame(10)}<span style="font-size:2rem;font-weight:900" aria-hidden="true">+</span>${tenFrame(ones)}</div></div><p class="lab-instruction">One whole ten-frame is 10. Count the extra dots, then add!</p><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}" data-speak="${o}">${o}</button>`).join('')}</div>`;
        speak(prompt);$$('.answer',body).forEach(b=>b.addEventListener('click',()=>{if(Number(b.dataset.value)===answer){correctThen(renderTenFrame,b);speak('10 and '+ones+' more make '+answer+'!');}else wrong(b);}));
      };
      /* PV-2 (1st): ten-stick counting to 40. */
      TF_RENDER.pv2=function(body){
        const i=lessonIndex(),round=state.round;
        if(round%2===0){
          const n=21+((i*13+round*5)%20),sticks=Math.floor(n/10),ones=n%10,answer=n;
          const prompt=`How many? Count the ten-sticks, then the ones.`;
          const opts=deterministicOptions(answer,Array.from({length:20},(_,k)=>21+k),4,i);
          body.innerHTML=`<h2 class="prompt" data-speak="${prompt}">${prompt}</h2><div class="visual-prompt">${pvBlocks(n,false)}</div><p class="lab-instruction">Each stick is one ten: ${sticks} ten${sticks>1?'s':''} and ${ones} one${ones===1?'':'s'}.</p><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}" data-speak="${o}">${o}</button>`).join('')}</div>`;
          speak(prompt);$$('.answer',body).forEach(b=>b.addEventListener('click',()=>{if(Number(b.dataset.value)===answer)correctThen(renderTenFrame,b);else{wrong(b);toast('Count the ten-sticks first, then the loose ones.');}}));
        }else{
          const n=21+((i*11+round*7)%20),sticks=Math.floor(n/10),ones=n%10,answer=n;
          const prompt=`Which picture shows ${n}?`;
          const near=[n,sticks*10+((ones+3)%10),Math.max(21,(sticks-1)*10+ones),Math.min(40,(sticks+1)*10+ones)].filter((v,k,a)=>a.indexOf(v)===k).slice(0,4);
          const opts=deterministicOptions(answer,near.length>1?near:Array.from({length:20},(_,k)=>21+k),4,i);
          body.innerHTML=`<h2 class="prompt" data-speak="${prompt}">${prompt}</h2><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}" data-speak="${o} sticks and ones picture" aria-label="picture of ${o}">${pvBlocks(o,false)}</button>`).join('')}</div>`;
          speak(prompt);$$('.answer',body).forEach(b=>b.addEventListener('click',()=>{if(Number(b.dataset.value)===answer)correctThen(renderTenFrame,b);else{wrong(b);toast('Count the ten-sticks first, then the loose ones.');}}));
        }
      };
      /* PV-3 (1st): Bundle It! — drag full ten-frames into the bundle box to build ten-sticks. */
      TF_RENDER.pv3=function(body){
        const i=lessonIndex(),round=state.round;
        if(round%3===2){tfHundredChallenge(body,i,round);return;}
        const sticks=2+((i*5+round)%3),ones=1+((i*3+round*2)%9),target=sticks*10+ones;
        let sticksDone=0,onesDone=0;
        const frames=Array.from({length:sticks+1},(_,k)=>`<button class="answer tf-part" type="button" data-part="frame" data-key="f${k}" data-speak="Full ten-frame, ten dots" aria-label="full ten-frame">${tenFrame(10)}</button>`).join('');
        const dots=Array.from({length:10},(_,k)=>`<button class="answer tf-part" type="button" data-part="dot" data-key="d${k}" data-speak="One loose dot" aria-label="one loose dot" style="min-height:52px;font-size:1.6rem">🔵</button>`).join('');
        body.innerHTML=`<h2 class="prompt" data-speak="Build ${target}! Bundle ${sticks} ten-sticks, then add ${ones} ones.">Build ${target}! Bundle <strong>${sticks} ten-stick${sticks>1?'s':''}</strong>, then add <strong>${ones} one${ones===1?'':'s'}</strong>.</h2><p class="lab-instruction">Drag a <strong>full</strong> ten-frame into the bundle box — 10 dots snap into one ten-stick! You can also tap. Watch out: there is one extra frame.</p><div class="lab-stage"><div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap"><div><p class="lab-instruction">🎁 Bundle box <span id="tfStickCount">(0 ten-sticks)</span></p><div id="tfBundleZone" data-accept="frame" style="min-height:150px;min-width:150px;border:3px dashed var(--line);border-radius:16px;display:flex;align-items:flex-end;justify-content:center;gap:4px;padding:8px;flex-wrap:wrap"></div></div><div><p class="lab-instruction">🔵 Ones tray <span id="tfOnesCount">(0 of ${ones})</span></p><div id="tfOnesZone" data-accept="dot" style="min-height:150px;min-width:150px;border:3px dashed var(--line);border-radius:16px;display:flex;align-items:flex-start;justify-content:center;gap:4px;padding:8px;flex-wrap:wrap;font-size:1.6rem"></div></div></div><p class="lab-instruction">Frames</p><div class="parts-tray" id="tfFrameTray">${frames}</div><p class="lab-instruction">Loose dots</p><div class="parts-tray" id="tfDotTray">${dots}</div><p class="science-result" id="tfBundleMsg">Build ${target}: ${sticks} ten-sticks and ${ones} ones.</p></div>`;
        speak(`Build ${target}. Bundle ${sticks} ten-sticks, then add ${ones} ones.`);
        const zone1=$('#tfBundleZone',body),zone2=$('#tfOnesZone',body);
        const parts=$$('.tf-part',body);
        const refresh=()=>{const sc=$('#tfStickCount',body),oc=$('#tfOnesCount',body);if(sc)sc.textContent=`(${sticksDone} ten-stick${sticksDone===1?'':'s'})`;if(oc)oc.textContent=`(${onesDone} of ${ones})`;};
        const win=()=>{if(sticksDone===sticks&&onesDone===ones){beep('good');toast(`🎉 ${target} = ${sticks} tens and ${ones} ones!`);speak(`${target}! ${sticks} tens and ${ones} ones!`);correctThen(renderTenFrame,null);}};
        bindDragAndTap(parts,[zone1,zone2],(part,zone)=>{
          if(state.locked||part.disabled)return;
          if(part.dataset.part==='frame'){
            if(!zone||zone!==zone1){wrong(part);toast('Full ten-frames go in the bundle box!');return;}
            if(sticksDone>=sticks){wrong(part);const m=$('#tfBundleMsg',body);if(m)m.textContent=`You only need ${sticks} ten-sticks — that frame is extra!`;speak(`You only need ${sticks} ten-sticks.`);return;}
            part.disabled=true;part.style.visibility='hidden';sticksDone++;
            zone1.insertAdjacentHTML('beforeend',tenStick());beep('good');refresh();win();
          }else{
            if(!zone||zone!==zone2){wrong(part);toast('Loose dots go in the ones tray!');return;}
            if(onesDone>=ones){wrong(part);const m=$('#tfBundleMsg',body);if(m)m.textContent=`You only need ${ones} ones!`;return;}
            part.disabled=true;part.style.visibility='hidden';onesDone++;
            zone2.insertAdjacentHTML('beforeend','<span>🔵</span>');beep('good');refresh();win();
          }
        });
      };
      /* PV-3 capstone: bundle 10 ten-sticks into one hundred-flat. */
      function tfHundredChallenge(body,i,round){
        let done=0;
        const frames=Array.from({length:10},(_,k)=>`<button class="answer tf-part" type="button" data-part="frame" data-key="f${k}" data-speak="Full ten-frame" aria-label="full ten-frame">${tenFrame(10)}</button>`).join('');
        body.innerHTML=`<h2 class="prompt" data-speak="The Hundred Challenge! Bundle 10 ten-sticks to build 100.">🏆 The Hundred Challenge! Bundle <strong>10 ten-sticks</strong> to build <strong>100</strong>.</h2><p class="lab-instruction">Drag every full ten-frame into the bundle box. Ten tens make one hundred!</p><div class="lab-stage"><div id="tfHundZone" data-accept="frame" style="min-height:170px;border:3px dashed var(--line);border-radius:16px;display:flex;align-items:flex-end;justify-content:center;gap:4px;padding:10px;flex-wrap:wrap"></div><p class="lab-instruction"><span id="tfHundCount">0</span> of 10 ten-sticks bundled</p><div class="parts-tray">${frames}</div><p class="science-result" id="tfHundMsg">Ten tens = one hundred. Go!</p></div>`;
        speak('The Hundred Challenge! Bundle ten ten-sticks to build one hundred.');
        const zone=$('#tfHundZone',body),parts=$$('.tf-part',body);
        bindDragAndTap(parts,[zone],(part,z)=>{
          if(state.locked||part.disabled||!z)return;
          part.disabled=true;part.style.visibility='hidden';done++;
          const c=$('#tfHundCount',body);if(c)c.textContent=done;
          if(done<10){zone.insertAdjacentHTML('beforeend',tenStick());beep('good');}
          else{zone.innerHTML=hundredFlat();beep('good');const m=$('#tfHundMsg',body);if(m)m.textContent='🎉 10 tens = 100! One hundred-flat!';toast('🎉 10 tens make 100!');speak('Ten tens make one hundred! Amazing bundling!');correctThen(renderTenFrame,null);}
        });
      }
      /* Place-value chart: drag digits into columns; Questy reads the number back. Grade 1: tens/ones. */
      TF_RENDER.pvchart=function(body){tfChart(body,1);};
      TF_RENDER.pvhund=function(body){tfChart(body,2);};
      function tfChart(body,grade){
        const i=lessonIndex();
        const N=grade===1?10+((i*37+state.round*11)%90):100+((i*37+state.round*11)%900);
        const digits=String(N).split('').map(Number);
        const cols=grade===1?['Tens','Ones']:['Hundreds','Tens','Ones'];
        const colWord={Hundreds:'hundreds',Tens:'tens',Ones:'ones'};
        const digitBtns=shuffle([0,1,2,3,4,5,6,7,8,9]).map(d=>`<button class="answer tf-part" type="button" data-part="${d}" data-speak="Digit ${d}" aria-label="digit ${d}" style="min-height:56px;min-width:56px">${d}</button>`).join('');
        const zones=cols.map((c,k)=>`<div><p class="lab-instruction"><strong>${c}</strong></p><div class="tf-colzone" data-accept="${digits[k]}" data-col="${k}" style="min-height:84px;min-width:84px;border:3px dashed var(--line);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:900"></div></div>`).join('');
        const filled=new Array(cols.length).fill(null);
        body.innerHTML=`<h2 class="prompt" data-speak="Build ${N} on the chart! Drag each digit to its column.">Build <strong>${N}</strong> on the chart! Drag each digit to its column.</h2><div class="visual-prompt">${pvBlocks(N,grade===2)}</div><div class="lab-stage"><div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:12px">${zones}</div><p class="lab-instruction">Digit cards — tap one, or drag it</p><div class="parts-tray">${digitBtns}</div><p class="science-result" id="tfChartMsg">Which column does each digit belong in?</p></div>`;
        speak(`Build ${N} on the chart. Drag each digit to its column.`);
        const parts=$$('.tf-part',body),zoneEls=$$('.tf-colzone',body);
        bindDragAndTap(parts,zoneEls,(part,zone)=>{
          if(state.locked||part.disabled||!zone)return;
          const col=Number(zone.dataset.col);
          if(String(part.dataset.part)!==zone.dataset.accept||filled[col]!==null){wrong(part);const m=$('#tfChartMsg',body);if(m)m.textContent=`${part.dataset.part} does not belong in the ${cols[col]} column. Look at the blocks!`;return;}
          filled[col]=part.dataset.part;
          zone.textContent=part.dataset.part;zone.classList.add('filled');zone.style.borderStyle='solid';beep('good');
          if(filled.every(Boolean)){
            const read=cols.map((c,k)=>`${digits[k]} ${colWord[c]}`).join(', ');
            const line=`${read} make ${N}!`;
            const m=$('#tfChartMsg',body);if(m)m.textContent=`🎉 ${line}`;
            toast(`🎉 ${line}`);speak(line);correctThen(renderTenFrame,null);
          }
        });
      }
      /* Compare track (grades 1–2): two block-built numbers, pick <, >, =. */
      TF_RENDER.pvcompare=function(body){
        const i=lessonIndex(),grade=state.grade,max=grade===1?99:999;
        let a=10+((i*53+state.round*17)%(max-9)),b=10+((i*29+state.round*23)%(max-9));
        if(state.round%4===3)b=a;else if(a===b)b=a===max?a-1:a+1;
        const correct=a>b?'>':a<b?'<':'=';
        const sym={'>':'greater than','<':'less than','=':'equal to'};
        const prompt=`Which is bigger? Compare the blocks!`;
        body.innerHTML=`<h2 class="prompt" data-speak="${prompt}">${prompt}</h2><div class="visual-prompt"><div style="display:flex;gap:18px;justify-content:center;align-items:flex-end;flex-wrap:wrap"><div><p class="lab-instruction"><strong>A</strong></p>${pvBlocks(a,grade===2)}</div><div style="font-size:2.4rem;font-weight:900" aria-hidden="true">?</div><div><p class="lab-instruction"><strong>B</strong></p>${pvBlocks(b,grade===2)}</div></div></div><p class="lab-instruction">Is A ${'&gt;'}, ${'&lt;'}, or = B?</p><div class="answer-grid" style="grid-template-columns:repeat(3,1fr)">${['<','>','='].map(s=>`<button class="answer" type="button" data-value="${s}" data-speak="${sym[s]}" aria-label="${sym[s]}" style="font-size:2rem">${s==='<'?'&lt;':s==='>'?'&gt;':'='}</button>`).join('')}</div>`;
        speak(prompt);$$('.answer',body).forEach(x=>x.addEventListener('click',()=>x.dataset.value===correct?correctThen(renderTenFrame,x):wrong(x)));
      };
      /* PV-4 (2nd): Unbundle It — break a ten-stick to subtract. */
      TF_RENDER.pvunbundle=function(body){
        const i=lessonIndex();
        const tens=3+((i+state.round)%3),ones=2+((i*3+state.round)%4);
        const take=ones+1+((i*7+state.round)%(9-ones)),N=tens*10+ones,answer=N-take;
        let removed=0;
        const drawStep1=()=>{
          body.innerHTML=`<h2 class="prompt" data-speak="Take away ${take} from ${N}! But there are only ${ones} ones. Break a ten-stick first.">Take away <strong>${take}</strong> from <strong>${N}</strong>! But there are only ${ones} ones…</h2><div class="visual-prompt">${pvBlocks(N,false)}</div><div class="answer-grid" style="grid-template-columns:1fr"><button class="answer" type="button" id="tfBreak" data-speak="Break a ten-stick into ten ones">🔨 Break a ten-stick into 10 ones</button></div>`;
          speak(`Take away ${take} from ${N}. Break a ten-stick first.`);
          $('#tfBreak',body).addEventListener('click',()=>{if(state.locked)return;beep('good');toast('💥 One ten became 10 ones!');drawStep2();});
        };
        const drawStep2=()=>{
          const totalOnes=ones+10;
          let dots='';
          for(let k=0;k<totalOnes;k++)dots+=`<button class="answer tf-one" type="button" data-k="${k}" data-speak="One" aria-label="one, tap to take away" style="min-height:52px;min-width:52px;font-size:1.5rem">🔵</button>`;
          let sticks='';for(let k=0;k<tens-1;k++)sticks+=tenStick();
          body.innerHTML=`<h2 class="prompt" data-speak="Now tap ${take} ones to take them away.">Now tap <strong>${take}</strong> ones to take them away. <span id="tfTook">(0 of ${take})</span></h2><div class="visual-prompt"><div style="display:flex;align-items:flex-end;justify-content:center;gap:6px;flex-wrap:wrap">${sticks}</div><div class="parts-tray" style="margin-top:8px">${dots}</div></div>`;
          speak(`Now tap ${take} ones to take them away.`);
          $$('.tf-one',body).forEach(d=>d.addEventListener('click',()=>{
            if(state.locked||d.disabled)return;d.disabled=true;d.style.opacity='0.18';removed++;beep('try');
            const t=$('#tfTook',body);if(t)t.textContent=`(${removed} of ${take})`;
            if(removed>=take)drawStep3();
          }));
        };
        const drawStep3=()=>{
          const pool=[answer-10,answer-1,answer+1,answer+10].filter(v=>v>0&&v!==answer);
          const opts=deterministicOptions(answer,pool.length?pool:[answer+2,answer-2,answer+12],4,i);
          body.innerHTML=`<h2 class="prompt" data-speak="You broke a ten and took ${take} away. How many are left?">You broke a ten and took <strong>${take}</strong> away. How many are left?</h2><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}" data-speak="${o}">${o}</button>`).join('')}</div>`;
          speak(`How many are left?`);$$('.answer',body).forEach(b=>b.addEventListener('click',()=>{if(Number(b.dataset.value)===answer)correctThen(renderTenFrame,b);else{wrong(b);toast('You broke a ten and took '+take+' away — count what is left!');}}));
        };
        drawStep1();
      };
      /* Grade 3 capstone: Place-Value Detective — missing digits and expanded form. */
      TF_RENDER.pvdetective=function(body){
        const i=lessonIndex(),kind=state.round%3;
        let prompt,answer,pool;
        if(kind===0){
          const h=1+((i*3+state.round)%8),t=(i*5+state.round)%10,o=(i*7+state.round*2)%10;
          answer=h*100+t*10+o;prompt=`${h*100} + ${t*10} + ${o} = ?`;
          pool=[answer-10,answer+10,answer-100,answer+100,answer-1,answer+1].filter(v=>v>0&&v!==answer);
        }else if(kind===1){
          const h=2+((i*3+state.round)%7),t=(i*5+state.round*3)%10,o=(i*7+state.round)%10;
          const N=h*100+t*10+o;answer=t;prompt=`${h} hundreds, _ tens, ${o} one${o===1?'':'s'} make ${N}. Which tens digit is missing?`;
          pool=[0,1,2,3,4,5,6,7,8,9].filter(v=>v!==answer);
        }else{
          const N=100+((i*41+state.round*13)%900),place=['hundreds','tens','ones'][(i+state.round)%3];
          const digits=String(N).split('').map(Number);
          answer=place==='hundreds'?digits[0]:place==='tens'?digits[1]:digits[2];
          prompt=`In ${N}, which digit is in the ${place} place?`;
          pool=[0,1,2,3,4,5,6,7,8,9].filter(v=>v!==answer);
        }
        const opts=deterministicOptions(answer,pool.length>=3?pool:[answer+1,answer+2,answer+3],4,i);
        body.innerHTML=`<h2 class="prompt" data-speak="${prompt}">🔎 ${prompt}</h2><p class="lab-instruction">Detective work: read the place values like clues!</p><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}" data-speak="${o}">${o}</button>`).join('')}</div>`;
        speak(prompt);$$('.answer',body).forEach(b=>b.addEventListener('click',()=>Number(b.dataset.value)===answer?correctThen(renderTenFrame,b):wrong(b)));
      };
