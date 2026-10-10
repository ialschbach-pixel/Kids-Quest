      /* Treasure Cove Takeaway (treasuretake): subtraction three ways — predict
         how many stay after the pirate takes some, compare two treasure piles,
         and find the missing part. dinomunch is feed-and-count; here the child
         predicts FIRST, then tests by tapping coins away. */
      const ttRanges=[{n:[4,10]},{n:[8,18]},{n:[15,40]},{n:[30,60]}];
      function ttPick(){
        const g=state.grade,[nLo,nHi]=ttRanges[g].n;
        const kind=['take','compare','missing'][(state.round*6+state.q)%3];
        for(let a=0;a<120;a++){
          let N,M,A,B;
          if(kind==='take'){
            N=nLo+Math.floor(Math.random()*(nHi-nLo+1));
            const mMax=g>=2?Math.min(15,N-1):N-1;
            M=1+Math.floor(Math.random()*mMax);
          }else if(kind==='compare'){
            A=nLo+1+Math.floor(Math.random()*(nHi-nLo));
            B=nLo+Math.floor(Math.random()*(A-nLo));
            if(B<1)B=1;if(A-B<1||A-B>20)continue;
          }else{
            N=nLo+Math.floor(Math.random()*(nHi-nLo+1));
            M=1+Math.floor(Math.random()*(N-1));
          }
          const key=kind==='compare'
            ?`treasuretake:${g}:compare:${A}x${B}`
            :`treasuretake:${g}:${kind}:${N}x${M}`;
          if(state.usedProblems.has(key))continue;
          state.usedProblems.add(key);
          return{kind,N,M,A,B};
        }
        return{kind:'missing',N:nLo+3,M:2,A:0,B:0};
      }
      let ttCurrent=null;
      function ttAdvance(){ttCurrent=null;renderTreasureTake();}
      function renderTreasureTake(){
        if(!ttCurrent)ttCurrent=ttPick();
        const p=ttCurrent,g=state.grade;
        const coinRow=(n,cls)=>`<div class="tt-coins ${cls||''}" aria-hidden="true">${'<span class="tt-coinface">🪙</span>'.repeat(Math.min(n,60))}${n>60?`<span class="tt-more">+${n-60} more</span>`:''}</div>`;
        if(p.kind==='take')return ttRenderTake(p,g,coinRow);
        if(p.kind==='compare')return ttRenderCompare(p,g,coinRow);
        return ttRenderMissing(p,g,coinRow);
      }
      function ttRenderTake(p,g,coinRow){
        const answer=p.N-p.M;
        let phase='predict',taken=0;
        const speakLine=`The chest holds ${p.N} gold coins. The pirate takes ${p.M}. First predict: how many coins stay in the chest?`;
        panel.innerHTML=`<div class="tt-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">🏴‍☠️ <span>The chest holds <b>${p.N}</b> coins. The pirate takes <b>${p.M}</b>! <b>Predict first:</b> how many stay in the chest?</span></h2>
          <div class="tt-chest" aria-label="Treasure chest with ${p.N} coins">
            <div class="tt-chest-lid" aria-hidden="true">🧰</div>
            <div class="tt-coin-grid" id="ttGrid" role="group" aria-label="Tap ${p.M} coins to give to the pirate">${Array.from({length:p.N},(_,i)=>`<button class="tt-coin" type="button" data-i="${i}" data-speak="Coin ${i+1}" aria-label="Coin ${i+1}"><span aria-hidden="true">🪙</span></button>`).join('')}</div>
          </div>
          <div class="tt-hud">
            <span class="kq-chip">Pirate takes <b>${p.M}</b></span>
            <span class="kq-chip">Taken <b id="ttTaken">0</b> of ${p.M}</span>
          </div>
          <div class="tt-sack" aria-hidden="true">💰 <span id="ttSackN">pirate's sack: empty</span></div>
          <div class="tt-actions" id="ttPhase1">
            <span class="tt-predict-lbl">My prediction</span>
            ${arithStepperHTML('ttStep',p.N,'How many coins stay in the chest')}
            <button class="primary-btn tt-take" id="ttGoTake" type="button" data-speak="Take the coins">Take the coins!</button>
          </div>
          <p class="studio-note">Predict first — then tap coins to hand them to the pirate and check yourself!</p>
        </div>`;
        setProgress();
        const stepApi=arithStepperWire($('#ttStep'),p.N);
        const grid=$('#ttGrid'),coins=[...grid.querySelectorAll('.tt-coin')];
        const update=()=>{$('#ttTaken').textContent=taken;$('#ttSackN').textContent=taken?`pirate's sack: ${taken} coin${taken===1?'':'s'}`:"pirate's sack: empty";};
        $('#ttGoTake').onclick=()=>{
          if(state.locked||phase!=='predict')return;
          phase='take';beep('good');
          $('#ttPhase1').innerHTML=`<span class="tt-predict-lbl">You predicted <b>${stepApi.value}</b> stay. Now tap <b>${p.M}</b> coins!</span>`;
          speak(`Now tap ${p.M} coins to give them to the pirate.`);
        };
        coins.forEach(c=>{c.onclick=()=>{
          if(state.locked||phase!=='take'||c.classList.contains('gone'))return;
          c.classList.add('gone');c.disabled=true;taken++;beep('try');update();
          if(taken>=p.M){
            phase='done';state.locked=true;
            setTimeout(()=>{
              state.locked=false;
              if(stepApi.value===answer){
                const echo=`You predicted ${answer} — and ${answer} stayed! ${p.N} minus ${p.M} is ${answer}.`;
                correctThen(ttAdvance,c);
                toast(echo,true,1500);speak(echo);
              }else{
                wrong(c);
                toast(`You predicted ${stepApi.value}, but ${answer} coins stayed. Count the coins left in the chest with me!`,false,2200);
                setTimeout(()=>{if(state.game==='treasuretake'){phase='predict';taken=0;renderTreasureTake();}},2300);
              }
            },450);
          }
        };});
        update();
      }
      function ttRenderCompare(p,g,coinRow){
        const A=p.A,B=p.B,answer=A-B;
        const speakLine=`Questy found ${A} coins and Mia found ${B}. How many more coins did Questy find?`;
        panel.innerHTML=`<div class="tt-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">⚖️ <span>Questy found <b>${A}</b> coins. Mia found <b>${B}</b>. <b>How many MORE did Questy find?</b></span></h2>
          <div class="tt-versus">
            <div class="tt-pile"><div class="tt-who" aria-hidden="true">🦊 Questy</div>${coinRow(A,'tt-a')}</div>
            <div class="tt-pile"><div class="tt-who" aria-hidden="true">👧 Mia</div>${coinRow(B,'tt-b')}</div>
          </div>
          <div class="tt-actions">
            <span class="tt-predict-lbl">Questy has this many more</span>
            ${arithStepperHTML('ttStepC',A,'How many more coins')}
            <button class="primary-btn tt-take" id="ttGoC" type="button" data-speak="Check my answer">Check!</button>
          </div>
          <p class="studio-note">Tip: match Mia's coins against Questy's — the extras are the answer!</p>
        </div>`;
        setProgress();
        const stepApi=arithStepperWire($('#ttStepC'),A);
        $('#ttGoC').onclick=e=>{
          if(state.locked)return;
          if(stepApi.value===answer){
            const echo=`Right! ${A} minus ${B} is ${answer} — Questy found ${answer} more!`;
            correctThen(ttAdvance,e.target);
            toast(echo,true,1500);speak(echo);
          }else{
            wrong(e.target);
            toast(`Not quite. Pair them up: ${B} of Questy's coins match Mia's. Count the ones with no partner!`,false,2200);
          }
        };
      }
      function ttRenderMissing(p,g,coinRow){
        const answer=p.N-p.M;
        const speakLine=`The chest started with ${p.N} coins. The pirate's sack already holds ${p.M}. How many coins are still hiding in the chest?`;
        panel.innerHTML=`<div class="tt-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">🗝️ <span>The chest started with <b>${p.N}</b> coins. The pirate's sack already holds <b>${p.M}</b>. <b>How many are still hiding in the chest?</b></span></h2>
          <div class="tt-versus">
            <div class="tt-pile"><div class="tt-who">💰 Pirate's sack: <b>${p.M}</b></div>${coinRow(p.M,'tt-b')}</div>
            <div class="tt-pile"><div class="tt-who">🧰 Chest: <b>?</b> coins left</div><div class="tt-mystery" aria-hidden="true">❔</div></div>
          </div>
          <div class="tt-actions">
            <span class="tt-predict-lbl">Coins still in the chest</span>
            ${arithStepperHTML('ttStepM',p.N,'Coins still in the chest')}
            <button class="primary-btn tt-take" id="ttGoM" type="button" data-speak="Check my answer">Check!</button>
          </div>
          <p class="studio-note">The taken coins and the hidden coins make ${p.N} altogether.</p>
        </div>`;
        setProgress();
        const stepApi=arithStepperWire($('#ttStepM'),p.N);
        $('#ttGoM').onclick=e=>{
          if(state.locked)return;
          if(stepApi.value===answer){
            const echo=`Yes! ${p.M} taken and ${answer} hidden make ${p.N}. ${p.N} minus ${p.M} is ${answer}!`;
            correctThen(ttAdvance,e.target);
            toast(echo,true,1500);speak(echo);
          }else{
            wrong(e.target);
            toast(`Close! Start at ${p.M} and count up to ${p.N} — the jumps you count are the hidden coins.`,false,2200);
          }
        };
      }
