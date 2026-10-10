      /* Bubble Sum Sprint (bubbleup): tap bubbles whose values add up to the
         target sum. Fresh take on addition (frogadd is a number line, duel is
         timed recall): here the child CONSTRUCTS the sum by combining addends,
         with a subset-solvability guard so every puzzle stays winnable. */
      const buSpec=[
        {minT:4, maxT:10, vals:[1,2,3,4,5], bubbles:6, dots:true},   /* K */
        {minT:11,maxT:20, vals:[1,2,3,4,5,6,7,8,9], bubbles:8},      /* 1st */
        {minT:25,maxT:75, vals:[5,10,15,20,25], bubbles:9, step:5},  /* 2nd: tens */
        {minT:40,maxT:100,vals:[10,15,20,25,30,35,40], bubbles:9, step:5}, /* 3rd: tens */
      ];
      function buCombo(){
        const g=state.grade,spec=buSpec[g],step=spec.step||1;
        const level=clamp(state.level||0,0,2);
        /* adaptivity: Warming up completes a sum (missing addend, 1.OA.4);
           higher levels build sums from scratch with more parts. */
        const kind=level===0?'missing':(level===1?(Math.random()<0.5?'make':'missing'):'make');
        const minV=spec.vals[0],lo=spec.minT,hi=spec.maxT;
        for(let a=0;a<200;a++){
          const T=lo+step*Math.floor(Math.random()*((hi-lo)/step+1));
          let parts,shown;
          if(kind==='missing'){
            const nShown=level>=2?2:1;
            shown=[];let rem=T;
            for(let i=0;i<nShown;i++){
              const choices=spec.vals.filter(v=>v<rem&&rem-v>=minV);
              if(!choices.length)break;
              const v=choices[Math.floor(Math.random()*choices.length)];
              shown.push(v);rem-=v;
            }
            if(shown.length!==nShown||!spec.vals.includes(rem))continue;
            parts=shown.concat([rem]);
          }else{
            const nParts=level>=2?3:2;
            if(T<nParts*minV)continue;
            parts=[];let rem=T,ok=true;
            for(let i=0;i<nParts-1;i++){
              const left=nParts-1-i;
              const choices=spec.vals.filter(v=>v<=rem-left*minV&&rem-v>=left*minV);
              if(!choices.length){ok=false;break;}
              const v=choices[Math.floor(Math.random()*choices.length)];
              parts.push(v);rem-=v;
            }
            if(!ok||!spec.vals.includes(rem))continue;
            parts.push(rem);shown=[];
          }
          /* tank = solution parts + distractors; the full tank joins the key
             so no two challenges in a session ever look identical */
          const tank=parts.slice();
          let guard=0;
          while(tank.length<spec.bubbles&&guard++<80)
            tank.push(spec.vals[Math.floor(Math.random()*spec.vals.length)]);
          shuffle(tank);
          const key=`bubbleup:${g}:${kind}:${T}:${shown.slice().sort((x,y)=>x-y).join('+')}:${tank.slice().sort((x,y)=>x-y).join(',')}`;
          if(state.usedProblems.has(key))continue;
          state.usedProblems.add(key);
          return{T,parts,shown,spec,tank};
        }
        const fbT=2*spec.vals[0],fbN=state.usedProblems.size;
        state.usedProblems.add(`bubbleup:${g}:make:${fbT}:${fbN}:${spec.vals[0]}`);
        return{T:fbT,parts:[spec.vals[0],spec.vals[0]],shown:[],spec,tank:[spec.vals[0],spec.vals[0],spec.vals[0]]};
      }
      /* subset-sum: can the remaining bubbles still reach exactly `need`? */
      function buSolvable(need,vals){
        if(need===0)return true;if(need<0||!vals.length)return false;
        const reach=new Set([0]);
        for(const v of vals){const nxt=new Set(reach);for(const r of reach){if(r+v<=need)nxt.add(r+v);}reach.clear();nxt.forEach(x=>reach.add(x));}
        return reach.has(need);
      }
      function renderBubbleUp(){
        const{T,parts,shown,spec,tank}=buCombo();
        const g=state.grade;
        const kind=shown.length?'missing':'make';
        /* pre-fill the tray with the shown parts (missing-addend kind) */
        const picked=new Set(),usedIdx=new Set();
        shown.forEach(v=>{
          const i=tank.findIndex((x,j)=>x===v&&!usedIdx.has(j));
          if(i>=0){usedIdx.add(i);picked.add(i);}
        });
        const sum=()=>[...picked].reduce((s,i)=>s+tank[i],0);
        const speakLine=kind==='missing'
          ?`The tray already makes ${sum()}! Tap the bubble that finishes the sum to ${T}.`
          :`Make exactly ${T}! Tap bubbles that add up to ${T}.`;
        const promptHTML=kind==='missing'
          ?`🫧 <span>The tray already makes <b>${sum()}</b>! Tap the <b>one</b> bubble that finishes the sum to <b>${T}</b>.</span>`
          :`🫧 <span>Make exactly <b>${T}</b>! Tap bubbles that add up to <b>${T}</b>.</span>`;
        panel.innerHTML=`<div class="bu-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">${promptHTML}</h2>
          <div class="bu-hud">
            <span class="kq-chip">Target <b>${T}</b></span>
            <span class="kq-chip">My sum <b id="buSum">0</b></span>
            <span class="kq-chip">Still need <b id="buNeed">${T}</b></span>
          </div>
          <div class="bu-tray" id="buTray" aria-live="polite"><span class="bu-tray-empty">Your bubbles float here…</span></div>
          <div class="bu-tank" role="group" aria-label="Bubbles to choose from">${tank.map((v,i)=>
            `<button class="bu-bubble" type="button" data-i="${i}" data-speak="Bubble ${v}${spec.dots?', '+v+' dots':''}" aria-label="Bubble worth ${v}"><span class="bu-val">${v}</span>${spec.dots?`<span class="bu-dots" aria-hidden="true">${'●'.repeat(Math.min(v,5))}</span>`:''}</button>`
          ).join('')}</div>
          <div class="bu-actions"><button class="secondary-btn bu-hint" id="buHint" type="button" data-speak="Show me a bubble that fits">💡 Show me a bubble</button></div>
          <p class="studio-note">Tap a bubble to add it. Tap it again to send it back.</p>
        </div>`;
        setProgress();
        const sumEl=$('#buSum'),needEl=$('#buNeed'),tray=$('#buTray');
        const els=[...panel.querySelectorAll('.bu-bubble')];
        const draw=()=>{
          const s=sum();
          sumEl.textContent=s;needEl.textContent=Math.max(0,T-s);
          tray.innerHTML=[...picked].length
            ?[...picked].sort((a,b)=>a-b).map(i=>`<span class="bu-chip">${tank[i]}</span>`).join('<span class="bu-plus" aria-hidden="true">+</span>')+`<span class="bu-equals" aria-hidden="true">=</span><b class="bu-total">${s}</b>`
            :'<span class="bu-tray-empty">Your bubbles float here…</span>';
          els.forEach((el,i)=>el.classList.toggle('picked',picked.has(i)));
        };
        els.forEach((el,i)=>{
          el.onclick=()=>{
            if(state.locked)return;
            if(picked.has(i)){picked.delete(i);beep('try');draw();return;}
            const v=tank[i],s=sum(),ns=s+v;
            if(ns>T){
              wrong(el);
              toast(`Whoops — ${s} + ${v} is ${ns}, past our target of ${T}! That bubble is too big right now.`,false,2000);
              return;
            }
            if(ns<T){
              /* would the remaining bubbles still be able to finish the sum? */
              const rest=tank.filter((_,j)=>j!==i&&!picked.has(j));
              if(!buSolvable(T-ns,rest)){
                wrong(el);
                toast(`Hmm — with ${v} added, the bubbles left can't reach ${T} anymore. Pick a different bubble!`,false,2000);
                return;
              }
            }
            picked.add(i);beep('good');draw();
            if(sum()===T){
              const echo=`Yes! ${[...picked].sort((a,b)=>a-b).map(k=>tank[k]).join(' + ')} = ${T} — you built the sum!`;
              correctThen(renderBubbleUp,el);
              toast(echo,true,1400);speak(echo);
            }
          };
        });
        $('#buHint').onclick=e=>{
          if(state.locked)return;
          const s=sum(),rest=tank.map((v,j)=>({v,j})).filter(o=>!picked.has(o.j));
          const fit=rest.find(o=>buSolvable(T-s-o.v,rest.filter(r=>r.j!==o.j).map(r=>r.v)));
          if(fit){const el=els[fit.j];el.classList.add('hint-glow');speak(`Try the bubble worth ${fit.v}.`);setTimeout(()=>el.classList.remove('hint-glow'),1600);}
          else toast('Tap one of your bubbles to send it back, then try again!',false,1600);
        };
        draw();
      }
