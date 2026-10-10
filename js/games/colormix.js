      function cmRecipesOf(g){return cmRecipes[g];}
      /* normalize a hex to rgb trio */
      function cmHex(hex){const h=hex.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
      function cmMixHexes(hexes){const rs=hexes.map(cmHex);const n=rs.length;return `rgb(${Math.round(rs.reduce((a,r)=>a+r[0],0)/n)},${Math.round(rs.reduce((a,r)=>a+r[1],0)/n)},${Math.round(rs.reduce((a,r)=>a+r[2],0)/n)})`;}
      function cmPotFillSVG(code,color){return `<svg viewBox='0 0 96 96' class='cm-art'><path d='M26 40h44l-5 30a8 8 0 0 1-8 6H39a8 8 0 0 1-8-6z' fill='var(--kq-card-bg,#fdfcf8)' stroke='#8d6e63' stroke-width='3'/><ellipse cx='48' cy='40' rx='22' ry='8' fill='${color}' stroke='#8d6e63' stroke-width='2'/></svg>`;}
      function renderColorMix(){
        const i=lessonIndex(),g=state.grade;
        const recipes=cmRecipes[g];
        const rec=recipes[i%12];const [codes,name,colorHex]=rec;
        const targetSig=[...codes].sort().join('+');
        const pots=cmPots[g];
        const decoyN=g===0?0:g===3?2:1;
        const pool=new Set(codes);
        for(let d=0;d<decoyN;d++){for(const p of pots){if(!pool.has(p)){pool.add(p);break;}}}
        const potOrder=shuffle([...pool]);
        /* grade-safe playful card words */
        const flavor=g===0?['secret splash','giggly glug','happy swirl','wobbly wash','jumpy splash','bright gulp'][i%6]
          :g===1?['hidden hue','sneaky shade','mystery mist','playful paint','tricky tone','bubbly blob'][i%6]
          :g===2?['the unknown','the mystery','the enigma','the secret brew','the hidden batch','the riddle'][i%6]
          :['Sample A','Sample B','Sample C','Sample D','Sample E','Sample F'][i%6];
        const targetN=codes.length;
        const prompt=`Cook up the ${flavor} color! Squirt paint pots into the mixer with the same colors — in any order.`;
        panel.innerHTML=progressMarkup()+`<h2 class="prompt" data-speak="Mix the mystery color! Squirt paint into the mixer. The recipe has ${targetN} color${targetN>1?'s':''}.">Mix the mystery color: <span class="cm-recipe" data-speak="${flavor}">🎨 ${flavor}</span></h2><p class="lab-instruction">The mixer drinks only ${targetN} color${targetN>1?'s':''} for this recipe. Try pots, watch the swirl, and trust your eyes!</p><div class="lab-stage"><div class="cm-table"><div class="cm-mixer-zone"><div class="cm-target" id="cmTarget" aria-label="Target color swatch"><svg viewBox='0 0 96 96' class='cm-target-art'><rect x='8' y='8' width='80' height='80' rx='18' fill='var(--kq-card-bg,#fdfcf8)' stroke='#8d6e63' stroke-width='4'/><circle cx='48' cy='48' r='26' fill='${colorHex}'/></svg><p class="cm-target-name">?</p></div><div class="cm-mixer" id="cmMixer" aria-label="Your mixing cup"><svg viewBox='0 0 120 96' class='cm-mixer-art'><path d='M22 30h76l-8 52a8 8 0 0 1-8 6H38a8 8 0 0 1-8-6z' fill='var(--kq-card-bg,#fdfcf8)' stroke='#8d6e63' stroke-width='4'/><rect class='cm-mix-rect' x='28' y='66' width='64' height='2' fill='#e8e8e8'/></svg><div class="cm-mixdrops" id="cmMixersDrops"></div></div></div><div class="cm-pots" id="cmPots" role="group" aria-label="Paint pots">${potOrder.map((p,k)=>`<button class="cm-pot" data-code="${p}" data-word="${cmBases[p][0]}" type="button" aria-label="${cmBases[p][0]} paint pot">${cmPotFillSVG(p,cmBases[p][1])}<span class="cm-pot-word">${cmBases[p][0]}</span></button>`).join('')}</div></div><div class="cm-empty-row"><button class="lab-action cm-empty" id="cmEmpty" type="button">Empty the mixer</button><button class="lab-action cm-blob" id="cmCheck" type="button">Check my color!</button></div><p class="science-result" id="cmResult" role="status">Squirt paint into the mixer. The swatch above shows your target.</p></div>`;
        setProgress();
        const mixerEl=$('#cmMixer',panel),mixRect=mixerEl.querySelector('.cm-mix-rect'),drops=$('#cmMixersDrops',panel),check=$('#cmCheck',panel),emptyBtn=$('#cmEmpty',panel),result=$('#cmResult',panel);
        let squirted=[],finished=false;
        function currentMix(){
          if(!squirted.length)return 'rgb(232,232,232)';
          return cmMixHexes(squirted.map(c=>cmBases[c][1]));
        }
        function updateMixer(){
          mixRect.setAttribute('y',String(66-Math.min(44,squirted.length*12)));
          mixRect.setAttribute('height',String(2+Math.min(44,squirted.length*12)));
          mixRect.setAttribute('fill',currentMix());
        }
        function squirt(code,btn){
          if(finished||state.locked||btn.disabled)return;
          if(squirted.length>=targetN){result.textContent=`The mixer is full — ${targetN} colors is the recipe! Empty it to start over.`;return;}
          squirted.push(code);
          const drop=document.createElement('span');drop.className='cm-drop';drop.style.background=cmBases[code][1];drops.appendChild(drop);
          setTimeout(()=>{drop.remove();updateMixer();sciPop();},650);
          mixRect.setAttribute('fill',currentMix());
          result.textContent=`Squirted ${cmBases[code][0]}! ${squirted.length} of ${targetN} color${targetN>1?'s':''} in the mixer.`;
          speak(`${cmBases[code][0]}! ${squirted.length} of ${targetN}`);
        }
        $$('.cm-pot',panel).forEach(b=>b.addEventListener('click',()=>squirt(b.dataset.code,b)));
        emptyBtn.addEventListener('click',()=>{if(finished||state.locked)return;squirted=[];drops.innerHTML='';updateMixer();result.textContent='The mixer is empty. Try a fresh idea!';});
        function recordMix(){
          const gk=String(g);
          if(!window.kqMixBook)window.kqMixBook={};
          if(!kqMixBook[gk])kqMixBook[gk]=[];
          kqMixBook[gk].push({name,color:colorHex,ingredients:squirted.map(c=>cmBases[c][0]).map(w=>w[0].toUpperCase()+w.slice(1)).join(' + ')});
        }
        check.addEventListener('click',()=>{
          if(finished||state.locked)return;
          if(squirted.length!==targetN){result.textContent=`Not yet! The recipe wants exactly ${targetN} color${targetN>1?'s':''} — you have ${squirted.length}.`;speak(`Not yet. The recipe wants ${targetN} colors.`);wrong(check);return;}
          const sig=[...squirted].sort().join('+');
          const names=squirted.map(c=>cmBases[c][0]).map(w=>w[0].toUpperCase()+w.slice(1));
          if(sig===targetSig){
            finished=true;recordMix();
            result.innerHTML=`<strong>You made ${name}!</strong> 🥳 The ${flavor} is really <b>${name}</b>. Your recipe book saves it! Ingredients: ${names.join(' + ')} — any order works!`;
            document.querySelector('.cm-target-name').textContent=name;
            speak(`You made ${name}! The ${flavor} is really ${name}.`);
            document.querySelector('.cm-target circle')?.setAttribute('stroke','#2b2d42');
            document.querySelector('.cm-target circle')?.setAttribute('stroke-width','4');
            labOutcome(renderColorMix,true,check,`You made ${name}! The recipe is saved in your book.`);
          }else{
            wrong(check);
            result.innerHTML=`<strong>Not quite!</strong> You mixed ${names.join(' + ')}, but the ${flavor} looks different. Look at the two side by side and try squirted pots in a new way${decoyN>0?' — one pot is a decoy!':''}. Empty the mixer and try again!`;
            speak(`Not quite. Compare the target and your mix, then try again.`);
          }
        });
      }
      /* The recipe book appears as a collapsible panel at the very first challenge of each round. */
      const _cmOrig=typeof renderColorMix==='function'?renderColorMix:null;
      function renderColorMixBookWrap(){
        const i=lessonIndex();
        if(i===0)window.kqMixBook={}; /* per-grade fresh book at round 0 */
        renderColorMix();
        const g=state.grade,gk=String(g);
        if(i>0&&window.kqMixBook&&kqMixBook[gk]&&kqMixBook[gk].length){
          const wrap=document.createElement('div');wrap.className='cm-book-wrap';
          wrap.innerHTML=`<button class="cm-book-toggle" type="button" aria-expanded="false">📖 Recipe Book (${kqMixBook[gk].length}) — peek!</button><div class="cm-book hidden" id="cmBook">${kqMixBook[gk].map(b=>`<div class="cm-book-row"><span class="cm-book-swatch" style="background:${b.color}"></span><span>${b.name}</span><small>${b.ingredients}</small></div>`).join('')}</div>`;
          panel.insertBefore(wrap,panel.children[panel.children.length-1]);
          const t=wrap.querySelector('.cm-book-toggle'),b=wrap.querySelector('.cm-book');
          t.addEventListener('click',()=>{b.classList.toggle('hidden');t.setAttribute('aria-expanded',String(!b.classList.contains('hidden')));});
        }
      }

      /* ── ICE MELT RACE ── */
