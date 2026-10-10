      /* Factor Farm (factfarm): build rectangle pens that hold exactly P carrot
         squares — a constructive, commutative take on multiplication.
         arraybake models a GIVEN a×b; here the child discovers factor pairs by
         building. Grades 2–3 only (like arraybake). */
      const ffSpec={
        2:{products:[12,16,18,20,24,28,30,36],cols:8,rows:6},
        3:{products:[24,32,36,40,42,48,54,56,60,64,72,80,84,96],cols:12,rows:8},
      };
      function ffPairs(P,spec){
        const out=[];
        for(let r=1;r<=spec.rows;r++)for(let c=1;c<=spec.cols;c++)if(r*c===P)out.push([r,c]);
        return out;
      }
      function ffPick(){
        const g=state.grade,spec=ffSpec[g];
        for(let a=0;a<150;a++){
          const P=spec.products[Math.floor(Math.random()*spec.products.length)];
          const pairs=ffPairs(P,spec);
          if(!pairs.length)continue;
          const kinds=['any'];
          pairs.forEach(([r,c])=>{kinds.push('rows:'+r,'cols:'+c);});
          const kind=kinds[Math.floor(Math.random()*kinds.length)];
          const key=`factfarm:${g}:${kind}:${P}`;
          if(state.usedProblems.has(key))continue;
          state.usedProblems.add(key);
          const[kk,req]=kind.split(':');
          return{P,kind:kk,req:req?+req:0,spec,pairs};
        }
        return{P:12,kind:'any',req:0,spec,pairs:ffPairs(12,spec)};
      }
      function renderFactorFarm(){
        const{P,kind,req,spec,pairs}=ffPick();
        const painted=new Set();
        const reqLine=kind==='rows'?`with exactly <b>${req}</b> row${req===1?'':'s'}`
          :kind==='cols'?`with exactly <b>${req}</b> column${req===1?'':'s'}`:'in <b>any</b> rectangle shape';
        const speakLine=`Build a pen that holds exactly ${P} carrot squares, ${kind==='any'?'in any rectangle shape':kind==='rows'?'with exactly '+req+' rows':'with exactly '+req+' columns'}. Tap squares to plant carrots!`;
        panel.innerHTML=`<div class="ff-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">🚜 <span>Build a pen that holds exactly <b>${P}</b> carrot squares ${reqLine}!</span></h2>
          <div class="ff-hud">
            <span class="kq-chip">Need <b>${P}</b></span>
            <span class="kq-chip">Planted <b id="ffCount">0</b></span>
            ${kind!=='any'?`<span class="kq-chip">${kind==='rows'?'Rows':'Columns'}: <b id="ffDim">0</b> (need ${req})</span>`:''}
          </div>
          <div class="ff-grid" role="group" aria-label="Farm field. Tap squares to plant carrots." style="--ff-cols:${spec.cols}">${Array.from({length:spec.rows*spec.cols},(_,i)=>`<button class="ff-cell" type="button" data-i="${i}" data-speak="Field square ${i+1}" aria-label="Field square ${i+1}"><span aria-hidden="true">🥕</span></button>`).join('')}</div>
          <div class="ff-actions">
            <button class="secondary-btn ff-clear" id="ffClear" type="button" data-speak="Clear the field">🧹 Clear</button>
            <button class="primary-btn ff-check" id="ffCheck" type="button" data-speak="Check my pen">Check my pen!</button>
          </div>
          <p class="studio-note">Tap squares to plant (tap again to unplant). A pen must be a solid rectangle — no holes!</p>
        </div>`;
        setProgress();
        const cells=[...panel.querySelectorAll('.ff-cell')];
        const countEl=$('#ffCount'),dimEl=$('#ffDim');
        const bbox=()=>{
          if(!painted.size)return null;
          let r0=1e9,r1=-1e9,c0=1e9,c1=-1e9;
          painted.forEach(i=>{const r=Math.floor(i/spec.cols),c=i%spec.cols;r0=Math.min(r0,r);r1=Math.max(r1,r);c0=Math.min(c0,c);c1=Math.max(c1,c);});
          return{r0,r1,c0,c1,rows:r1-r0+1,cols:c1-c0+1};
        };
        const draw=()=>{
          countEl.textContent=painted.size;
          const b=bbox();
          if(dimEl&&b)dimEl.textContent=kind==='rows'?b.rows:b.cols;
        };
        cells.forEach((cell,i)=>{cell.onclick=()=>{
          if(state.locked)return;
          if(painted.has(i)){painted.delete(i);cell.classList.remove('on');}
          else{painted.add(i);cell.classList.add('on');}
          beep('good');draw();
        };});
        $('#ffClear').onclick=()=>{if(state.locked)return;painted.clear();cells.forEach(c=>c.classList.remove('on'));beep('try');draw();};
        $('#ffCheck').onclick=e=>{
          if(state.locked)return;
          const btn=e.target,n=painted.size,b=bbox();
          const solid=b&&n===b.rows*b.cols;
          if(!solid){
            wrong(btn);
            toast(n===0?'Plant some carrots first — tap squares to fill them!':'That shape has holes or stray squares — a pen must be one solid rectangle!',false,2000);
            return;
          }
          if(kind==='rows'&&b.rows!==req){wrong(btn);toast(`Your pen has ${b.rows} rows — this challenge needs exactly ${req}. Reshape it!`,false,2000);return;}
          if(kind==='cols'&&b.cols!==req){wrong(btn);toast(`Your pen has ${b.cols} columns — this challenge needs exactly ${req}. Reshape it!`,false,2000);return;}
          if(n!==P){
            wrong(btn);
            toast(n<P?`Your ${b.rows}×${b.cols} pen holds ${n} squares — we need ${P}. Plant ${P-n} more in a solid rectangle!`:`Your ${b.rows}×${b.cols} pen holds ${n} squares — ${n-P} too many! Unplant some.`,false,2200);
            return;
          }
          const flip=pairs.some(([r,c])=>r===b.cols&&c===b.rows&&!(r===b.rows&&c===b.cols));
          const echo=`A ${b.rows}×${b.cols} pen holds exactly ${P}! ${b.rows} times ${b.cols} is ${P}.${flip?' Turn it and it still fits — multiplication works both ways!':''}`;
          correctThen(renderFactorFarm,btn);
          toast(echo,true,1600);speak(echo);
        };
        draw();
      }
