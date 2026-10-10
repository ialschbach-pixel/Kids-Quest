/* ══════════════════════════════════════════════════════════════════════
         Array Bakery (multiplication, 2nd–3rd). Drag rows of cookies onto the
         sheet to build an A × B array, skip-count as rows land, then type the
         total on a number keypad. 2nd band: 2s/5s/10s; 3rd band: ≤100.
         ══════════════════════════════════════════════════════════════════════ */
      function arrayPick(){
        const band=state.grade>=3?3:2,level=clamp(state.level||0,0,2),round=state.round,q=state.q;
        for(let a=0;a<90;a++){
          let A,B;
          if(band===2){B=[2,5,10][Math.floor(Math.random()*3)];A=B===10?2+Math.floor(Math.random()*3):2+Math.floor(Math.random()*4);}
          else{const mx=level===0?6:level===1?8:10;A=2+Math.floor(Math.random()*(mx-1));B=2+Math.floor(Math.random()*(mx-1));}
          const key=`arraybake:${band}:a${A}b${B}`;
          if(state.usedProblems.has(key))continue;
          state.usedProblems.add(key);
          let distract=0,distrB=0;
          if(level>=1&&q>=2){
            const opts=[B-2,B-1,B+1,B+2].filter(x=>x>=1&&x<=11&&x!==B);
            distrB=opts.length?opts[Math.floor(Math.random()*opts.length)]:B;
            distract=distrB!==B?1:0;
          }
          return{A,B,band,distract,distrB};
        }
        let fbA=3,fbB=4;if(band===2){fbB=[2,5,10][Math.floor(Math.random()*3)];fbA=fbB===10?2+Math.floor(Math.random()*3):2+Math.floor(Math.random()*4);}else{const fmx=level===0?6:level===1?8:10;fbA=2+Math.floor(Math.random()*(fmx-1));fbB=2+Math.floor(Math.random()*(fmx-1));}return{A:fbA,B:fbB,band,distract:0,distrB:0};
      }
      let abCtx=null,abListenersAttached=false;
      function renderArrayBake(){
        const p=arrayPick();        const tokens=[];
        for(let i=0;i<p.A;i++)tokens.push({b:p.B,ok:true,key:'ok'+i});
        if(p.distract)tokens.push({b:p.distrB,ok:false,key:'distr'});
        shuffle(tokens);
        const rowsLanded=[];
        let selected=null,padApi=null;
        // Shared round context: panel listeners are attached ONCE (below) and
        // delegate to the current round via abCtx, so stale closures from
        // prior rounds can't corrupt state.
        abCtx={p,tokens,rowsLanded,get selected(){return selected;},set selected(v){selected=v;},dropOnSlot,draggedRow:null};
        const speakLine=p.band===2
          ?`Bake ${p.A} rows of ${p.B} cookies. Drag each row onto the sheet, then count by ${p.B}s and type the tray total.`
          :`Bake a tray of ${p.A} rows with ${p.B} cookies each. Drag every row onto the sheet, then type the grand total.`;
        const rowHTML=t=>`<button class="ab-row" type="button" data-key="${t.key}" data-b="${t.b}" data-speak="Row of ${t.b} cookies" data-quiet-read="1" aria-label="Row of ${t.b} cookies${t.ok?'':' — wrong size'}"></button>`;
        const slotHTML=i=>`<button class="ab-slot" type="button" data-slot="${i}" data-speak="Empty row slot" aria-label="Empty row slot" data-quiet-read="1"><span class="ab-slot-hint" aria-hidden="true">row ${i+1}</span></button>`;
        panel.innerHTML=`<div class="ab-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">🧁 Bake <b>${p.A}</b> rows of <b>${p.B}</b> cookies${p.distract?' (watch out — one tray row is the wrong size!)':''}! Drag each row onto the sheet, then type the tray total.</h2>
          <div class="ab-hud"><span class="kq-chip ab-chip">Rows placed: <b id="abCount">0</b> / ${p.A}</span><span class="kq-chip ab-chip" id="abSkipChip">🍪 Skip-count: <b id="abSkip">—</b></span></div>
          <div class="ab-scene">
            <div class="ab-tray" role="group" aria-label="Rows to drag"><div class="ab-tray-lbl">Ready rows</div><div class="ab-tray-items">${tokens.map(rowHTML).join('')}</div></div>
            <div class="ab-sheet" role="group" aria-label="Baking sheet" id="abSheet"><div class="ab-sheet-lbl">🧇 Baking sheet</div><div class="ab-slots">${Array.from({length:p.A},(_,i)=>slotHTML(i)).join('')}</div></div>
          </div>
          <div class="ab-final" id="abFinal" hidden>
            ${arithNumPadHTML()}
            <button class="primary-btn ab-bake" id="abBake" type="button">Bake! 🔥</button>
          </div>
          <p class="studio-note">Drag a row onto the sheet — or tap a row, then tap a slot. When all rows are on the sheet, the number keypad appears.</p>
        </div>`;
        setProgress();
        const scene=panel.querySelector('.ab-scene');
        const final=$('#abFinal');
        const drawRows=()=>{
          panel.querySelectorAll('.ab-row').forEach(r=>{
            if(r.querySelector('.ab-dot'))return;
            const b=+r.dataset.b;
            r.innerHTML=`<span class="ab-dots" aria-hidden="true">${'<span class="ab-dot">🍪</span>'.repeat(b)}</span><span class="ab-row-lbl">row of ${b}</span>`;
          });
        };
        drawRows();
        const drawHud=()=>{
          $('#abCount').textContent=rowsLanded.length;
          $('#abSkip').textContent=rowsLanded.length?rowsLanded.join(' · '):'—';
          if(rowsLanded.length===p.A){
            if(final.hidden){final.hidden=false;padApi=arithNumPadWire(panel.querySelector('.arith-numpad'),{maxDigits:3});
              toast('All rows placed! Count by '+p.B+'s, then bake!',true,1400);
              speak(`You built ${p.A} rows of ${p.B}. Count by ${p.B}s and type the total.`);
            }
          }
        };
        const dropOnSlot=(rowEl,slotEl)=>{
          const t=tokens.find(x=>x.key===rowEl.dataset.key);
          if(!t||rowEl.dataset.locked||slotEl.dataset.filled)return false;
          if(!t.ok){
            beep('try');slotEl.classList.add('ab-reject');setTimeout(()=>slotEl.classList.remove('ab-reject'),420);
            toast(`Questy says: that row has ${t.b} cookies, not ${p.B}!`,false,1400);
            speak(`That row has ${t.b} cookies, not ${p.B}. Find a row of ${p.B}.`);
            return false;
          }
          rowEl.dataset.locked='1';slotEl.dataset.filled='1';
          rowEl.classList.add('ab-plucked');
          slotEl.innerHTML=`<span class="ab-dots ab-slot-dots" aria-hidden="true">${'<span class="ab-dot">🍪</span>'.repeat(p.B)}</span>`;
          slotEl.dataset.speak=`Row with ${p.B} cookies`;// tap-to-hear the placed row
          slotEl.setAttribute('aria-label',`Row of ${p.B} cookies on the sheet`);slotEl.setAttribute('aria-pressed','true');
          setTimeout(()=>rowEl.remove(),350);
          rowsLanded.push(rowsLanded.length+1===1?p.B:rowsLanded[rowsLanded.length-1]+p.B);
          beep('good');speak(String(rowsLanded[rowsLanded.length-1]));
          slotEl.classList.add('ab-land');setTimeout(()=>slotEl.classList.remove('ab-land'),380);
          drawHud();
          return true;
        };
        /* pointer drag + tap handlers: attached ONCE to the persistent panel,
           delegating to abCtx so every round uses fresh state. */
        if(!abListenersAttached){
          abListenersAttached=true;
          arithDrag(panel,{
            itemSel:'.ab-row:not([data-locked])',
            targetSel:'#abSheet .ab-slot:not([data-filled])',
            onDown:(row)=>{if(abCtx)abCtx.draggedRow=row;},
            onHover:(slot)=>{panel.querySelectorAll('.ab-slot').forEach(s=>s.classList.remove('ab-target'));if(slot)slot.classList.add('ab-target');},
            onUp:()=>{panel.querySelectorAll('.ab-slot').forEach(s=>s.classList.remove('ab-target'));},
            onDrop:(slot)=>{if(!abCtx||state.game!=='arraybake')return;const which=abCtx.draggedRow||abCtx.selected;if(which)abCtx.dropOnSlot(which,slot);}
          });
          /* tap-to-pick-up then tap-slot (keyboard/mouse accessible path) */
          panel.addEventListener('click',e=>{
            if(!abCtx||state.game!=='arraybake')return;
            const row=e.target.closest?e.target.closest('.ab-row'):null;
            if(row&&!row.dataset.locked){
              e.stopPropagation();
              if(abCtx.selected)abCtx.selected.classList.remove('ab-selected');
              abCtx.selected=row;row.classList.add('ab-selected');
              speak(`Picked up a row of ${row.dataset.b} cookies. Tap a sheet slot.`);
              return;
            }
            const slot=e.target.closest?e.target.closest('.ab-slot'):null;
            if(slot){
              const which=abCtx.selected||panel.querySelector('.ab-row:not([data-locked])');
              if(!slot.dataset.filled&&which){const ok=abCtx.dropOnSlot(which,slot);if(ok&&abCtx.selected){abCtx.selected.classList.remove('ab-selected');abCtx.selected=null;}}
              else if(slot.dataset.filled)beep('try');
            }
          });
        }
        scene.addEventListener('keydown',e=>{
          if(e.key==='Escape'&&selected){selected.classList.remove('ab-selected');selected=null;}
        });
        $('#abBake').onclick=()=>{
          if(state.locked||!padApi)return;
          const v=padApi.value;
          if(v===''||Number(v)!==p.A*p.B){
            wrong($('#abBake'));
            speak(`Not quite. You built ${p.A} rows of ${p.B}. Count by ${p.B}s and try again.`);
            return;
          }
          speak(`Baked! ${p.A} rows of ${p.B} is ${p.A*p.B} cookies.`);
          correctThen(renderArrayBake,$('#abBake'));
        };
        drawHud();
      }

      