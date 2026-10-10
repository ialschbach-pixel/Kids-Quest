/* ══════════════════════════════════════════════════════════════════════
         Fair Share (division, grade 3). Share: deal treats evenly onto plates.
         Group: pack fruit into bags of equal size. Big: deal big picnics.
         All with a number-keypad answer and zero duplicate rounds.
         ══════════════════════════════════════════════════════════════════════ */
      const sharePairs=[[12,2],[12,3],[12,4],[15,3],[16,4],[18,2],[18,3],[20,4],[21,3],[24,3],[24,4],[26,2],[28,4],[30,3],[30,5],[34,2],[36,4],[36,6],[40,4],[40,5],[42,6],[44,4],[48,6],[46,2]];
      const groupPairs=[[12,2],[12,3],[14,2],[15,3],[16,2],[16,4],[18,2],[18,3],[20,4],[20,5],[21,3],[24,3],[24,4],[26,2],[28,4],[30,5],[30,6],[32,8],[36,4],[36,6],[42,7],[48,6],[48,8]];
      const bigPairs=[[54,6],[56,7],[63,7],[72,8],[72,9],[81,9],[90,9],[100,10]];
      function fairPick(){
        const round=state.round,q=state.q;
        let kind=round<=1?'share':round<=3?'group':(q>=4?'big':(((round*6+q)%2===0)?'share':'group'));
        const fg=typeof state.grade==='number'?state.grade:0;
        if(fg<2&&kind==='big')kind='group';
        const fqFilt=(prs,mxQ,mxN)=>prs.filter(pr=>pr[0]/pr[1]<=mxQ&&pr[0]<=mxN);
        const fqSh=fg<=0?fqFilt(sharePairs,6,24):fg===1?fqFilt(sharePairs,7,30):sharePairs;
        const fqGp=fg<=0?fqFilt(groupPairs,6,24):fg===1?fqFilt(groupPairs,7,30):groupPairs;
        const shareSet=fqSh.length?fqSh:sharePairs,groupSet=fqGp.length?fqGp:groupPairs;
        for(let a=0;a<90;a++){
          let N=12,P=2,B=0;
          if(kind==='share'){const pr=shareSet[Math.floor(Math.random()*shareSet.length)];N=pr[0];P=pr[1];}
          else if(kind==='group'){const pr=groupSet[Math.floor(Math.random()*groupSet.length)];N=pr[0];B=pr[1];P=0;}
          else{const pr=bigPairs[Math.floor(Math.random()*bigPairs.length)];N=pr[0];P=pr[1];}
          const key=`fairshare:${kind}:n${N}p${P||B}`;
          if(state.usedProblems.has(key))continue;
          state.usedProblems.add(key);
          return{kind,N,P,B,answer:kind==='group'?N/B:N/P};
        }
        const fbp=kind==='share'?shareSet:kind==='group'?groupSet:bigPairs;const fbr=Math.floor(Math.random()*fbp.length);const fpr=fbp[fbr];return{kind,N:fpr[0],P:kind==='group'?0:fpr[1],B:kind==='group'?fpr[1]:0,answer:fpr[0]/fpr[1]};
      }
      function renderFairShare(){
        const p=fairPick();
        if(p.kind==='share')renderFairShareShare(p);
        else if(p.kind==='group')renderFairShareGroup(p);
        else renderFairShareBig(p);
      }
      /* ---- share treats evenly onto plates ---- */
      function renderFairShareShare(p){
        let remaining=p.N;
        const counts=Array.from({length:p.P},()=>0);
        let selected=null,dragged=null,audited=false;
        const cookies=Array.from({length:p.N},(_,i)=>`<button class="sh-cookie${p.N>30?' sh-tiny':''}" type="button" data-i="${i}" data-speak="treat" data-quiet-read="1" aria-label="Treat ${i+1}"><span aria-hidden="true">🍪</span></button>`).join('');
        const plates=Array.from({length:p.P},(_,i)=>`<button class="sh-plate" type="button" data-p="${i}" data-speak="Plate ${i+1}" data-quiet-read="1" aria-label="Plate ${i+1}, 0 treats">
          <span class="sh-plate-rim" aria-hidden="true"></span><span class="sh-plate-count" aria-hidden="true" id="shPlateCount${i}">0</span></button>`).join('');
        panel.innerHTML=`<div class="sh-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="Share ${p.N} treats among ${p.P} plates. Make it fair! Drag each treat onto a plate, or tap a treat and then a plate.">🧺 Share <b>${p.N}</b> treats among <b>${p.P}</b> plates — make it <b>fair</b>! Drag a treat onto a plate, or tap a treat then a plate.</h2>
          <div class="sh-hud"><span class="kq-chip sh-chip">🧺 On the blanket: <b id="shLeft">${p.N}</b></span><span class="kq-chip sh-chip">🍽 Each plate? <b id="shFair">unknown</b></span></div>
          <div class="sh-blanket" id="shBlanket" role="group" aria-label="Treats to share">${cookies}</div>
          <div class="sh-plates-row" id="shPlatesRow">${plates}</div>
          <div class="sh-actions" id="shActions">
            <button class="secondary-btn sh-deal" id="shDeal" type="button" data-speak="Deal one treat to each plate">🤲 Deal one to each!</button>
            <button class="primary-btn sh-check" id="shCheck" type="button">Check plates! ✓</button>
          </div>
          <div class="sh-final" id="shFinal" hidden>${arithNumPadHTML()}<button class="primary-btn" id="shFeast" type="button">Feast! 🎉</button></div>
          <p class="studio-note">Put every treat on a plate first, then tap "Check plates!" — and type how many treats each plate got.</p>
        </div>`;
        setProgress();
        const drawHud=()=>{
          $('#shLeft').textContent=remaining;
          const allPlaced=remaining===0;
          const equal=counts.every(c=>c===counts[0]);
          $('#shFair').textContent=allPlaced&&equal?String(counts[0]):'unknown';
          counts.forEach((c,i)=>{const el=$('#shPlateCount'+i);if(el)el.textContent=c;
            const plate=panel.querySelector(`.sh-plate[data-p="${i}"]`);
            if(plate)plate.setAttribute('aria-label',`Plate ${i+1}, ${c} treats`);
          });
        };
        const dealCookieTo=(cookieEl,pIdx)=>{
          if(remaining<=0||cookieEl.classList.contains('gone')||audited)return false;
          cookieEl.classList.add('gone');setTimeout(()=>cookieEl.remove(),220);
          counts[pIdx]++;remaining--;
          const plate=panel.querySelector(`.sh-plate[data-p="${pIdx}"]`);
          plate.classList.remove('sh-pop');void plate.offsetWidth;plate.classList.add('sh-pop');
          beep('good');drawHud();
          if(remaining===0)setTimeout(()=>speak('Every treat is on a plate. Are all the plates fair? Tap Check plates.'),350);
          return true;
        };
        const firstCookie=()=>panel.querySelector('.sh-cookie:not(.gone)');
        panel.querySelectorAll('.sh-cookie').forEach(c=>{
          c.addEventListener('click',e=>{
            e.stopPropagation();
            if(audited||state.locked||c.classList.contains('gone'))return;
            if(selected)selected.classList.remove('sh-selected');
            selected=c;c.classList.add('sh-selected');
            beep('try');speak('Treat picked up. Tap a plate.');
          });
        });
        panel.querySelectorAll('.sh-plate').forEach(pl=>{
          pl.addEventListener('click',()=>{
            if(audited||state.locked)return;
            const which=selected&&!selected.classList.contains('gone')?selected:firstCookie();
            if(which){dealCookieTo(which,+pl.dataset.p);selected=null;}
          });
        });
        arithDrag(panel,{
          itemSel:'.sh-cookie:not(.gone)',
          targetSel:'.sh-plate',
          onDown:(item)=>{dragged=item;if(selected)selected.classList.remove('sh-selected');selected=null;},
          onHover:(plate)=>{panel.querySelectorAll('.sh-plate').forEach(x=>x.classList.remove('sh-target'));if(plate)plate.classList.add('sh-target');},
          onUp:()=>{panel.querySelectorAll('.sh-plate').forEach(x=>x.classList.remove('sh-target'));},
          onDrop:(plate)=>{const which=dragged&&!dragged.classList.contains('gone')?dragged:selected;if(which)dealCookieTo(which,+plate.dataset.p);dragged=null;}
        });
        $('#shDeal').onclick=()=>{
          if(audited||state.locked)return;
          if(remaining===0){toast('All treats are on plates! Tap "Check plates!".',true);return;}
          if(remaining<p.P){toast('Not enough treats left to give every plate one more!',false,1500);return;}
          const alive=[...panel.querySelectorAll('.sh-cookie:not(.gone)')];
          for(let i=0;i<p.P;i++){alive[i].classList.add('gone');setTimeout(((el)=>()=>el.remove())(alive[i]),(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)?0:140*i+220);
            counts[i]++;remaining--;}
          panel.querySelectorAll('.sh-plate').forEach(pl=>{pl.classList.remove('sh-pop');void pl.offsetWidth;pl.classList.add('sh-pop');});
          beep('good');toast('One each! 🤲',true,700);drawHud();
        };
        $('#shCheck').onclick=()=>{
          if(audited||state.locked)return;
          if(remaining>0){toast(`There are still ${remaining} treats on the blanket!`,false);return;}
          const equal=counts.every(c=>c===counts[0]);
          if(!equal){
            const low=Math.min(...counts);
            panel.querySelectorAll('.sh-plate').forEach((pl,i)=>{pl.classList.toggle('sh-uneven',counts[i]!==counts[0]);});
            wrong($('#shCheck'));
            toast(`Not fair yet! Plate ${counts.indexOf(low)+1} is short. Move treats to balance.`,false,1800);
            return;
          }
          audited=true;
          toast(`Fair! Every plate has ${counts[0]} treats. 🎉`,true,1500);
          speak(`Fair! Every plate has ${counts[0]} treats. Now type how many.`);
          $('#shCheck').disabled=true;
          panel.querySelector('#shFinal').hidden=false;
          panel.querySelector('#shActions').style.display='none';
          const padApi=arithNumPadWire(panel.querySelector('.arith-numpad'),{maxDigits:3});
          $('#shFeast').onclick=()=>{
            if(state.locked)return;
            if(padApi.value===''||Number(padApi.value)!==p.answer){wrong($('#shFeast'));padApi.reset();toast(`Not quite — every plate has ${counts[0]} treats. Type that number!`,false,1600);return;}
            correctThen(renderFairShare,$('#shFeast'));
          };
        };
        drawHud();
      }
      /* ---- pack fruit into bags of equal size (grouping) ---- */
      function renderFairShareGroup(p){
        let toBag=p.N,bagCount=0;
        const openCard={el:null,fill:0};
        const apples=Array.from({length:p.N},(_,i)=>`<button class="sh-apple${p.N>30?' sh-tiny':''}" type="button" data-i="${i}" data-speak="apple" data-quiet-read="1" aria-label="Apple ${i+1}"><span aria-hidden="true">🍎</span></button>`).join('');
        panel.innerHTML=`<div class="sh-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="Pack ${p.N} apples into bags of ${p.B}. Tap an apple to put it in the bag, or tap Bag one group. How many bags?">🍎 Pack <b>${p.N}</b> apples into bags of <b>${p.B}</b>. Tap an apple, or tap "Bag one group!" — then tell us how many bags.</h2>
          <div class="sh-hud"><span class="kq-chip sh-chip">🧺 Apples to bag: <b id="shLeft">${p.N}</b></span><span class="kq-chip sh-chip">🛍 Sealed bags: <b id="shBags">0</b></span></div>
          <div class="sh-blanket" id="shBasket" role="group" aria-label="Apples in the basket">${apples}</div>
          <div class="sh-actions" id="shActions"><button class="primary-btn sh-deal" id="shBagBtn" type="button" data-speak="Bag one group of ${p.B} apples">🛍 Bag one group!</button></div>
          <div class="sh-bagzone" id="shBagZone" role="group" aria-label="Bags"></div>
          <div class="sh-final" id="shFinal" hidden>${arithNumPadHTML()}<button class="primary-btn" id="shPack" type="button">Pack! 📦</button></div>
          <p class="studio-note">Each bag must hold exactly ${p.B} apples. When the basket is empty, type the number of bags.</p>
        </div>`;
        setProgress();
        const bagZone=$('#shBagZone');
        const newBag=()=>{const d=document.createElement('div');d.className='sh-bag';d.innerHTML=`<span class="sh-bag-fill" aria-hidden="true"></span><span class="sh-bag-lbl">0 / ${p.B}</span>`;bagZone.appendChild(d);return d;};
        const toastSoon=m=>setTimeout(()=>toast(m,false,1300),120);
        const bagApples=n=>{
          n=Math.min(n,toBag);
          const alive=[...panel.querySelectorAll('.sh-apple:not(.gone)')];
          for(let i=0;i<n;i++){
            const el=alive[i];el.classList.add('gone');setTimeout(()=>el.remove(),220);
            if(!openCard.el||openCard.fill>=p.B){openCard.el=newBag();openCard.fill=0;}
            openCard.fill++;
            openCard.el.querySelector('.sh-bag-fill').textContent='🍎'.repeat(openCard.fill);
            openCard.el.querySelector('.sh-bag-lbl').textContent=`${openCard.fill} / ${p.B}`;
            toBag--;
            if(openCard.fill===p.B){openCard.el.classList.add('sealed');bagCount++;}
          }
          const lastBag=panel.querySelector('.sh-bag:not(.sealed)');
          if(lastBag&&openCard.fill<p.B&&toBag>0){/* keep open */}
          beep('good');drawBagHud();
          if(toBag===0)revealPack();
        };
        const drawBagHud=()=>{$('#shLeft').textContent=toBag;$('#shBags').textContent=bagCount;};
        panel.querySelectorAll('.sh-apple').forEach(a=>{
          a.addEventListener('click',e=>{
            e.stopPropagation();
            if(state.locked||a.classList.contains('gone')||toBag===0)return;
            bagApples(1);
          });
        });
        $('#shBagBtn').onclick=()=>{
          if(state.locked)return;
          if(toBag===0){toast('The basket is empty!',true);return;}
          bagApples(Math.min(p.B,toBag));
        };
        const revealPack=()=>{
          if(!$('#shFinal').hidden)return;
          $('#shFinal').hidden=false;$('#shActions').style.display='none';
          toast(`Basket empty! How many bags did you fill?`,true,1500);
          speak(`The basket is empty. Count your sealed bags and type the answer.`);
          const padApi=arithNumPadWire(panel.querySelector('.arith-numpad'),{maxDigits:3});
          $('#shPack').onclick=()=>{
            if(state.locked)return;
            if(padApi.value===''||Number(padApi.value)!==p.answer){wrong($('#shPack'));padApi.reset();toast('Not quite — count your sealed bags and type that number!',false,1600);return;}
            correctThen(renderFairShare,$('#shPack'));
          };
        };
        drawBagHud();
      }
      /* ---- big picnics: deal quotients up to 100 ---- */
      function renderFairShareBig(p){
        let remaining=p.N;
        const counts=Array.from({length:p.P},()=>0);
        const plates=Array.from({length:p.P},(_,i)=>`<div class="sh-plate sh-tallyplate" data-p="${i}" role="group" aria-label="Plate ${i+1}: 0 treats"><span class="sh-plate-rim" aria-hidden="true"></span><span class="sh-tally-dots" id="shDots${i}" aria-hidden="true"></span><span class="sh-plate-count" id="shPlateCount${i}" aria-hidden="true">0</span></div>`).join('');
        panel.innerHTML=`<div class="sh-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="Big picnic! Share ${p.N} treats among ${p.P} plates. Tap Deal one to each until the table is empty.">🥪 Big picnic! Share <b>${p.N}</b> treats among <b>${p.P}</b> plates. Tap <b>"Deal one to each!"</b> until the table is empty.</h2>
          <div class="sh-hud"><span class="kq-chip sh-chip">🧺 On the table: <b id="shLeft">${p.N}</b></span><span class="kq-chip sh-chip">🤲 Deals made: <b id="shDeals">0</b></span></div>
          <div class="sh-table" role="img" aria-label="${p.N} treats on the picnic table"><span class="sh-table-cookie" aria-hidden="true">🍪</span><span class="sh-table-n" id="shTableN">${p.N}</span></div>
          <div class="sh-plates-row sh-plates-grid">${plates}</div>
          <div class="sh-actions" id="shActions"><button class="primary-btn sh-deal" id="shDealBig" type="button" data-speak="Deal one treat to each plate">🤲 Deal one to each!</button></div>
          <div class="sh-final" id="shFinal" hidden>${arithNumPadHTML()}<button class="primary-btn" id="shFeast" type="button">Feast! 🎉</button></div>
          <p class="studio-note">Each deal gives every plate exactly one treat. Count your deals — that is each plate's share!</p>
        </div>`;
        setProgress();
        const drawBig=()=>{
          $('#shLeft').textContent=remaining;$('#shTableN').textContent=remaining;
          counts.forEach((c,i)=>{const n=$('#shPlateCount'+i);if(n)n.textContent=c;
            const d=$('#shDots'+i);if(d)d.innerHTML='🍪'.repeat(Math.min(c,10));
            const pl=panel.querySelector(`.sh-tallyplate[data-p="${i}"]`);if(pl)pl.setAttribute('aria-label',`Plate ${i+1}: ${c} treats`);});
        };
        let deals=0;
        $('#shDealBig').onclick=()=>{
          if(state.locked||remaining===0)return;
          deals++;remaining-=p.P;counts.forEach((_,i)=>counts[i]++);
          $('#shDeals').textContent=deals;drawBig();beep('good');
          panel.querySelectorAll('.sh-tallyplate').forEach(pl=>{pl.classList.remove('sh-pop');void pl.offsetWidth;pl.classList.add('sh-pop');});
          if(remaining===0){
            $('#shActions').style.display='none';$('#shFinal').hidden=false;
            toast(`Empty table! Each plate got ${deals} treats. Type it!`,true,1600);
            speak(`The table is empty. You dealt ${deals} times. Type the answer.`);
            const padApi=arithNumPadWire(panel.querySelector('.arith-numpad'),{maxDigits:3});
            $('#shFeast').onclick=()=>{
              if(state.locked)return;
              if(padApi.value===''||Number(padApi.value)!==p.answer){wrong($('#shFeast'));padApi.reset();toast('Not quite — check the Deals chip and type that number!',false,1600);return;}
              correctThen(renderFairShare,$('#shFeast'));
            };
          }
        };
        drawBig();
      }

      let seqTimer;
