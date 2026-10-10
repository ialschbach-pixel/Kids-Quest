      function rsRockArt(color,rough,shine){
        const glint=shine?'<path d="M34 16l10 8M52 12l6 7" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity=".9"/>':'';
        const body=rough?'<polygon points="18,48 28,12 50,6 78,18 90,38 70,52 34,54" fill="'+color+'" stroke="#5d513f" stroke-width="3" stroke-linejoin="round"/><path d="M36 24l10 6M54 18l8 10" stroke="#5d513f" stroke-width="2" opacity=".5"/>':'<ellipse cx="52" cy="28" rx="36" ry="22" fill="'+color+'" stroke="#5d513f" stroke-width="3"/><ellipse cx="42" cy="22" rx="14" ry="7" fill="#ffffff" opacity=".28"/>';
        return '<svg viewBox="0 0 104 56" class="rs-rock-art" aria-hidden="true">'+body+glint+'</svg>';
      }
      function renderRockSorter(){
        const i=lessonIndex(),g=state.grade,n=g===0?4:6,cats=g===0?rsCatDef.slice(0,2):rsCatDef;
        const rocks=Array.from({length:n},(_,r)=>({idx:r,name:rsNames[g][r][0],color:rsNames[g][r][1],shine:rsCombos[r][0],rough:rsCombos[r][1],hard:rsCombos[r][2]}));
        const deck=b2Shuffle(rocks.slice(),i*7+5);
        const rockCards=deck.map(rk=>'<button type="button" class="rs-rock" data-part="rock" data-rid="'+rk.idx+'" data-shine="'+rk.shine+'" data-rough="'+rk.rough+'" data-hard="'+rk.hard+'" data-speak="'+kqEsc(rk.name)+'" aria-label="'+kqEsc(rk.name)+'">'+rsRockArt(rk.color,rk.rough,rk.shine)+'<span class="rs-rock-name">'+kqEsc(rk.name)+'</span><span class="rs-badges"></span></button>').join('');
        const catCards=cats.map(c=>'<button type="button" class="rs-cat" data-cat="'+c.prop+'" data-speak="Sort '+c.left.toLowerCase()+' or '+c.right.toLowerCase()+'"><span class="rs-cat-half">'+c.leftIcon+' '+c.left+'</span><span class="rs-cat-or">or</span><span class="rs-cat-half">'+c.rightIcon+' '+c.right+'</span></button>').join('');
        panel.innerHTML=progressMarkup()+'<h2 class="prompt" data-speak="Test rocks like real geologists, pick a sorting rule, then sort all '+n+' rocks!">Test rocks like real geologists, then sort them!</h2>'
        +'<p class="rs-instr">Tap a rock, then the <b>Shine Box</b> to learn if it is shiny or dull, rough or smooth. Drop two rocks in the slots and hit <b>Scrape!</b> to learn hard or soft.</p>'
        +'<div class="lab-stage"><div class="rs-stations">'
        +'<button type="button" class="rs-shinebox" id="rsShine" data-speak="Shine Box. Test a rock for shine." aria-label="Shine Box. Tap after choosing a rock."><span class="rs-shine-glow"></span><span class="rs-shine-label">🔦 Shine Box</span><span class="rs-shine-sub">tap rock, then here</span></button>'
        +'<div class="rs-scratch" id="rsScratch"><div class="rs-slots"><button type="button" class="rs-slot" id="rsSlotA" data-speak="Scratch slot one" aria-label="Scratch slot one. Tap with a rock selected to place it.">slot 1</button><button type="button" class="rs-slot" id="rsSlotB" data-speak="Scratch slot two" aria-label="Scratch slot two. Tap with a rock selected to place it.">slot 2</button></div><button type="button" class="lab-action rs-scrape" id="rsScrape" disabled>Scrape!</button></div>'
        +'<ul class="rs-log" id="rsLog" aria-live="polite"></ul>'
        +'</div>'
        +'<div class="rs-catbar" role="group" aria-label="Choose a sorting rule">'+catCards+'</div>'
        +'<div class="rs-trays" id="rsTrays" hidden><div class="rs-half left" id="rsHalfL" data-accept="rock" data-exp="1" tabindex="0" role="button" aria-label="Left tray"></div><div class="rs-half right" id="rsHalfR" data-accept="rock" data-exp="0" tabindex="0" role="button" aria-label="Right tray"></div></div>'
        +'<div class="rs-table" id="rsTable" aria-label="Rocks to sort">'+rockCards+'</div>'
        +'<button type="button" class="lab-action rs-check" id="rsCheck" disabled data-speak="Check my sort">Check my sort!</button>'
        +'<div class="result" id="rsResult" aria-live="polite"></div></div>';
        setProgress();
        const table=$('#rsTable'),shineBtn=$('#rsShine'),scrapeBtn=$('#rsScrape'),log=$('#rsLog'),trays=$('#rsTrays'),halfL=$('#rsHalfL'),halfR=$('#rsHalfR'),check=$('#rsCheck'),result=$('#rsResult');
        const rockById={};$$('.rs-rock',table).forEach(el=>{rockById[el.dataset.rid]=el;});
        let selected=null,cat=null,attempts=0;
        const halves=[halfL,halfR];
        halves.forEach(h=>h.classList.add('filled'));
        function rockOf(rid){return rocks.filter(r=>r.idx===+rid)[0];}
        function setSelected(card){
          $$('.rs-rock',panel).forEach(x=>x.classList.remove('sel'));
          selected=card||null;
          if(card)card.classList.add('sel');
        }
        shineBtn.onclick=()=>{if(state.locked)return;
          if(!selected){toast('Tap a rock first!');speak('Tap a rock first, then the Shine Box.');return;}
          if(selected.classList.contains('sTested')){toast('That rock is already shine-tested!');return;}
          const r=rockOf(selected.dataset.rid);
          selected.classList.add('sTested');
          shineBtn.classList.add('flash');setTimeout(()=>shineBtn.classList.remove('flash'),650);
          const sb=document.createElement('span');sb.className='rs-badge';sb.textContent=r.shine?'✨ Shiny':'🌥️ Dull';
          const rb=document.createElement('span');rb.className='rs-badge';rb.textContent=r.rough?'🧱 Rough':'🫧 Smooth';
          selected.querySelector('.rs-badges').append(sb,rb);sciClink(0);
          const line=r.name+' is '+(r.shine?'shiny':'dull')+' and '+(r.rough?'rough':'smooth')+'.';
          log.insertAdjacentHTML('afterbegin','<li>'+line+'</li>');
          speak(line);
        };
        const slotDefs=[{btn:$('#rsSlotA'),rid:null},{btn:$('#rsSlotB'),rid:null}];
        slotDefs.forEach(sd=>{sd.btn.onclick=()=>{if(state.locked)return;if(!selected){toast('Tap a rock, then a slot.');return;}sd.rid=selected.dataset.rid;sd.btn.dataset.rid=selected.dataset.rid;sd.btn.innerHTML=selected.querySelector('svg').outerHTML+'<span class="rs-slot-name">'+selected.querySelector('.rs-rock-name').textContent+'</span>';sd.btn.classList.add('slotfilled');setSelected(null);scrapeBtn.disabled=!(slotDefs[0].rid&&slotDefs[1].rid);};});
        scrapeBtn.onclick=()=>{if(state.locked||!slotDefs[0].rid||!slotDefs[1].rid)return;
          if(slotDefs[0].rid===slotDefs[1].rid){toast('Use two different rocks!');speak('Use two different rocks!');return;}
          const a=rockOf(slotDefs[0].rid),b=rockOf(slotDefs[1].rid);
          $('#rsScratch').classList.add('scraping');sciScrape();
          setTimeout(()=>{
            $('#rsScratch').classList.remove('scraping');
            const line=a.hard>b.hard?a.name+' scratches '+b.name+' — hard beats soft!':b.hard>a.hard?b.name+' scratches '+a.name+' — hard beats soft!':'Same hardness — no winner! Those two are equals!';
            log.insertAdjacentHTML('afterbegin','<li>'+line+'</li>');
            [[a,slotDefs[0].rid],[b,slotDefs[1].rid]].forEach(function(pair){const rk=pair[0],card=rockById[pair[1]];if(!card.classList.contains('hTested')){card.classList.add('hTested');const hb=document.createElement('span');hb.className='rs-badge';hb.textContent=rk.hard?'💪 Hard':'🧽 Soft';card.querySelector('.rs-badges').append(hb);}});
            speak(line);
          },650);
        };
        const catMeta={};cats.forEach(c=>{catMeta[c.prop]=c;});
        $$('.rs-cat',panel).forEach(b=>b.onclick=()=>{if(state.locked)return;
          $$('.rs-cat',panel).forEach(x=>x.classList.remove('selected'));
          b.classList.add('selected');
          cat=catMeta[b.dataset.cat];
          $$('.rs-items .rs-rock',trays).forEach(x=>table.appendChild(x));
          trays.hidden=false;
          halfL.innerHTML='<div class="rs-half-title">'+cat.leftIcon+' '+cat.left+'</div><div class="rs-items"></div>';
          halfR.innerHTML='<div class="rs-half-title">'+cat.rightIcon+' '+cat.right+'</div><div class="rs-items"></div>';
          halfL.setAttribute('aria-label',cat.left+' tray');
          halfR.setAttribute('aria-label',cat.right+' tray');
          check.disabled=false;
          speak('Sort '+cat.left.toLowerCase()+' or '+cat.right.toLowerCase()+'! Drag each rock into its tray.');
          result.innerHTML='<strong>New rule: '+cat.left+' or '+cat.right+'!</strong> Drag or tap each rock into a tray.';
        });
        function placeSelected(half){
          if(state.locked||!cat)return;
          if(!selected){toast('Tap a rock first!');return;}
          half.querySelector('.rs-items').appendChild(selected);
          setSelected(null);sciPop();
        }
        halves.forEach(h=>{h.addEventListener('click',()=>placeSelected(h));h.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();placeSelected(h);}});});
        const rockEls=$$('.rs-rock',panel);
        bindDragAndTap(rockEls,halves,function(part,zone){
          if(state.locked)return;
          if(zone){if(!cat){toast('Pick a sorting rule first!');speak('Pick a sorting rule first!');return;}zone.querySelector('.rs-items').appendChild(part);setSelected(null);sciPop();}
          else if(part.parentElement&&part.parentElement.classList.contains('rs-items')){table.appendChild(part);setSelected(null);}
          else{setSelected(selected===part?null:part);}
        });
        check.onclick=()=>{if(state.locked||!cat)return;
          let errors=[];
          $$('.rs-items .rs-rock',trays).forEach(card=>{
            const half=card.closest('.rs-half'),expected=half===halfL?1:0;
            if(+card.dataset[cat.prop]!==expected)errors.push(card);
          });
          $$('.rs-rock',table).forEach(card=>errors.push(card));
          if(errors.length===0){
            const win=attempts<=2;
            const line='Rock sort win! '+cat.left+' and '+cat.right+' — you sorted like a geologist!';
            result.innerHTML='<strong>'+line+'</strong>';
            speak(line);
            labOutcome(renderRockSorter,win,check,line);
          }else{
            attempts++;
            errors.forEach(card=>table.appendChild(card));
            setSelected(null);
            const line=(errors.length===1?'1 rock':errors.length+' rocks')+' jumped back to the table — test them again and re-sort!';
            result.innerHTML='<strong>'+line+'</strong>';
            speak(line);wrong(check);
          }
        };
      }

      /* ── Science batch 2: build-time integrity audit ── */
      (function sciBatch2Audit(){
        if(sdKinds.length!==4||sdKinds.some(r=>r.length!==6))throw new Error('science batch 2: shadow sundial kinds');
        if(bbInsects.length!==4||bbInsects.some(r=>r.length!==6))throw new Error('science batch 2: bug banks');
        if(wcSpots.length!==4||wcSpots.some(r=>r.length!==6))throw new Error('science batch 2: droplet spots');
        if(wcQuiz.length!==3)throw new Error('science batch 2: cloud questions');
        if(fdTypes.length!==4||fdTypes.some(r=>r.length!==3))throw new Error('science batch 2: fossil banks');
        if(rsNames.length!==4||rsNames.some(r=>r.length!==6))throw new Error('science batch 2: rock names');
        if(rsCombos.length!==6)throw new Error('science batch 2: rock combos');
        const bbNames=bbInsects.map(r=>r.map(x=>x[0])).flat();
        if(new Set(bbNames).size!==bbNames.length)throw new Error('science batch 2: bug name collision');
        const rsAllNames=rsNames.map(r=>r.map(x=>x[0])).flat();
        if(new Set(rsAllNames).size!==rsAllNames.length)throw new Error('science batch 2: rock name collision');
        const tokens=L=>{const s=new Set();L.forEach(l=>String(l).toLowerCase().split(/[^a-z']+/).filter(w=>w).forEach(w=>s.add(w)));return s;};
        const sdL=sdScenes.concat(sdProps.map(p=>p.label));
        const bbL=bbNames.concat(bbAlias);
        const wcL=wcSpots.flat().map(x=>x[0]);
        const fdL=fdTypes.flat().map(x=>x[1]).concat(fdTypes.flat().map(x=>x[2])).concat(fdDecoys.flat().map(x=>x[1]));
        const rsL=rsAllNames.concat(rsCatDef.map(c=>c.left)).concat(rsCatDef.map(c=>c.right));
        const ws={sd:tokens(sdL),bb:tokens(bbL),wc:tokens(wcL),fd:tokens(fdL),rs:tokens(rsL)};
        const ks=Object.keys(ws);
        for(let a=0;a<ks.length;a++)for(let b=a+1;b<ks.length;b++){
          const hit=[...ws[ks[a]]].filter(w=>ws[ks[b]].has(w));
          if(hit.length)throw new Error('science batch 2 word dup: '+hit[0]+' ('+ks[a]+'+'+ks[b]+')');
        }
        [rsCombos,rsCombos.slice(0,4)].forEach(list=>{[0,1,2].forEach(p=>{const ones=list.filter(x=>x[p]===1).length;if(ones!==list.length/2)throw new Error('science batch 2: rock split');});});
        sdProps.forEach(p=>{const t=sdNeedT(p);if(!(t>0.02&&t<0.98))throw new Error('science batch 2: sundial target out of range');});
      })();
      /* --B2-SENTINEL-ROCKSORTER-END-- */
