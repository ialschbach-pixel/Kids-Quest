      /* Time Trek (timetrek): Questy's day as a timeline. clockset SETS clock
         hands; here the child ORDERS events along a day and figures out how
         many minutes until the next event — sequencing + elapsed time. */
      const tkEvents=[
        /* K: picture day-parts, no clock reading */
        [['🌅','wake up',0],['🥣','breakfast',1],['🧸','playtime',2],['🥪','lunch',3],['🛝','park time',4],['🍝','dinner',5],['🛁','bath time',6],['🌙','bedtime',7]],
        /* 1st: hour times */
        [['🌅','wake up',420,'7 o’clock'],['🥣','breakfast',480,'8 o’clock'],['🏫','school',540,'9 o’clock'],['🥪','lunch',720,'12 o’clock'],['⚽','soccer',900,'3 o’clock'],['🍝','dinner',1020,'5 o’clock'],['📖','story time',1140,'7 o’clock'],['🌙','bedtime',1200,'8 o’clock']],
        /* 2nd: half hours */
        [['🌅','wake up',420,'7 o’clock'],['🥣','breakfast',510,'half past 7'],['🏫','school',540,'8 o’clock'],['📚','reading',630,'half past 9'],['🥪','lunch',720,'12 o’clock'],['⚽','soccer',930,'half past 2'],['🍝','dinner',1050,'half past 4'],['🌙','bedtime',1200,'8 o’clock']],
        /* 3rd: quarter hours */
        [['🌅','wake up',420,'7 o’clock'],['🥣','breakfast',435,'quarter past 7'],['🏫','school',540,'8 o’clock'],['📚','reading',645,'quarter to 10'],['🥪','lunch',720,'12 o’clock'],['⚽','soccer',945,'quarter past 2'],['🍝','dinner',1065,'quarter to 5'],['🌙','bedtime',1200,'8 o’clock']],
      ];
      const tkUntilPairs=[
        null,null,
        (()=>{const out=[];for(let t=480;t<=960;t+=30){if(t+30<=1020)out.push([t,t+30]);if(t+60<=1020)out.push([t,t+60]);}return out;})(),
        (()=>{const out=[];for(let t=480;t<=1020;t+=15){for(const gap of[15,30,45])if(t+gap<=1080)out.push([t,t+gap]);}return out;})(),
      ];
      function tkPick(){
        const g=state.grade;
        const kind=(g<2)?'order':((state.round*6+state.q)%2===0?'order':'until');
        if(kind==='until'){
          const pairs=tkUntilPairs[g];
          for(let a=0;a<80;a++){
            const[from,to]=pairs[Math.floor(Math.random()*pairs.length)];
            const key=`timetrek:${g}:until:${from}-${to}`;
            if(state.usedProblems.has(key))continue;
            state.usedProblems.add(key);
            return{kind,from,to};
          }
          return{kind,from:540,to:570};
        }
        const pool=tkEvents[g],n=g===0?3:(g===1?3:4);
        for(let a=0;a<80;a++){
          const idx=new Set();
          while(idx.size<n)idx.add(Math.floor(Math.random()*pool.length));
          const key=`timetrek:${g}:order:${[...idx].sort((x,y)=>x-y).join('-')}`;
          if(state.usedProblems.has(key))continue;
          state.usedProblems.add(key);
          const cards=[...idx].map(i=>({i,e:pool[i]}));
          shuffle(cards);
          return{kind,cards,pool};
        }
        return{kind,cards:[0,1,2].map(i=>({i,e:pool[i]}))};
      }
      function tkFmt(min){
        let h=Math.floor(min/60),m=min%60;
        const ap=h>=12?'PM':'AM';let hh=h%12;if(hh===0)hh=12;
        return`${hh}:${String(m).padStart(2,'0')} ${ap}`;
      }
      function renderTimeTrek(){
        const p=tkPick();
        if(p.kind==='until')return tkRenderUntil(p);
        return tkRenderOrder(p);
      }
      function tkRenderOrder(p){
        const g=state.grade;
        const correct=p.cards.slice().sort((a,b)=>a.e[2]-b.e[2]);
        const seq=[];
        const label=c=>g===0?c.e[1]:`${c.e[1]} — ${c.e[3]}`;
        const speakLine=g===0
          ?'Put Questy’s day in order! Tap what happens first, then next, then last.'
          :`Put these in time order, earliest to latest: ${p.cards.map(c=>c.e[1]+' at '+c.e[3]).join(', ')}.`;
        panel.innerHTML=`<div class="tk-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">🗺️ <span>${g===0?'Put Questy’s day in order — <b>tap what happens first!</b>':'Put these in <b>time order</b>, earliest to latest:'}</span></h2>
          <div class="tk-line" aria-hidden="true"><span>morning</span><span>night →</span></div>
          <div class="tk-cards" role="group" aria-label="Event cards. Tap them in order.">${p.cards.map((c,k)=>
            `<button class="tk-card" type="button" data-k="${k}" data-speak="${kqEsc(label(c))}" aria-label="${kqEsc(label(c))}"><span class="tk-ord" aria-hidden="true"></span><span class="tk-emoji" aria-hidden="true">${c.e[0]}</span><span class="tk-name">${kqEsc(c.e[1])}</span>${g>0?`<span class="tk-time">${kqEsc(c.e[3])}</span>`:''}</button>`
          ).join('')}</div>
          <div class="tk-actions">
            <button class="secondary-btn tk-clear" id="tkClear" type="button" data-speak="Start the order over">🧹 Start over</button>
            <button class="primary-btn tk-check" id="tkCheck" type="button" data-speak="Check my timeline">Check my timeline!</button>
          </div>
          <p class="studio-note">Tap the cards in order — first, next, last.</p>
        </div>`;
        setProgress();
        const cardEls=[...panel.querySelectorAll('.tk-card')];
        const ordNames=['1st','2nd','3rd','4th'];
        const draw=()=>{cardEls.forEach((el,k)=>{
          const pos=seq.indexOf(k);
          el.classList.toggle('picked',pos>=0);
          el.querySelector('.tk-ord').textContent=pos>=0?ordNames[pos]:'';
        });};
        cardEls.forEach((el,k)=>{el.onclick=()=>{
          if(state.locked)return;
          const pos=seq.indexOf(k);
          if(pos>=0)seq.splice(pos,1);else seq.push(k);
          beep('good');draw();
        };});
        $('#tkClear').onclick=()=>{if(state.locked)return;seq.length=0;beep('try');draw();};
        $('#tkCheck').onclick=e=>{
          if(state.locked)return;
          const btn=e.target;
          if(seq.length!==p.cards.length){toast('Tap every card first — put them all in order!',false,1500);return;}
          const ok=seq.every((k,i)=>p.cards[k].i===correct[i].i);
          if(ok){
            const echo=g===0
              ?`Perfect day! ${correct.map(c=>c.e[1]).join(', then ')}.`
              :`Time traveler! ${correct.map(c=>`${c.e[1]} at ${c.e[3]}`).join(', then ')}.`;
            correctThen(renderTimeTrek,btn);
            toast(echo,true,1700);speak(echo);
          }else{
            wrong(btn);
            let firstBad=seq.findIndex((k,i)=>p.cards[k].i!==correct[i].i);
            const want=correct[firstBad];
            toast(g===0
              ?`Hmm — step ${firstBad+1} should be “${want.e[1]}”. Which of your day-parts comes there?`
              :`Hmm — position ${firstBad+1} should be “${want.e[1]}” (${want.e[3]}). Look at the times!`,false,2200);
          }
        };
        draw();
      }
      function tkRenderUntil(p){
        const answer=p.to-p.from;
        const speakLine=`It is ${tkFmt(p.from)}. Questy’s next adventure starts at ${tkFmt(p.to)}. How many minutes until it starts?`;
        panel.innerHTML=`<div class="tk-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">⏳ <span>It is <b>${tkFmt(p.from)}</b>. Questy’s next adventure starts at <b>${tkFmt(p.to)}</b>. <b>How many minutes until it starts?</b></span></h2>
          <div class="tk-until">
            <div class="tk-stop"><span aria-hidden="true">🕐</span><b>${tkFmt(p.from)}</b><span>now</span></div>
            <div class="tk-arrow" aria-hidden="true">⟶</div>
            <div class="tk-stop"><span aria-hidden="true">🚩</span><b>${tkFmt(p.to)}</b><span>adventure!</span></div>
          </div>
          <div class="tk-actions">
            <span class="tt-predict-lbl">Minutes until the adventure</span>
            <div class="tk-stepper" id="tkStep" role="group" aria-label="Minutes">
              <button class="tk-step-btn" type="button" data-d="-5" data-speak="five less" aria-label="Five less">−5</button>
              <button class="tk-step-btn" type="button" data-d="-1" data-speak="one less" aria-label="One less">−1</button>
              <span class="tk-step-val" id="tkVal" tabindex="0" data-speak="0 minutes">0</span>
              <button class="tk-step-btn" type="button" data-d="1" data-speak="one more" aria-label="One more">+1</button>
              <button class="tk-step-btn" type="button" data-d="5" data-speak="five more" aria-label="Five more">+5</button>
            </div>
            <button class="primary-btn tk-check" id="tkGo" type="button" data-speak="Check my answer">Check!</button>
          </div>
          <p class="studio-note">Tip: hop by fives on the clock — 5, 10, 15…</p>
        </div>`;
        setProgress();
        let v=0;const valEl=$('#tkVal');
        const draw=()=>{valEl.textContent=v;valEl.dataset.speak=`${v} minutes`;};
        panel.querySelectorAll('.tk-step-btn').forEach(b=>{b.onclick=()=>{
          if(state.locked)return;
          v=clamp(v+Number(b.dataset.d),0,90);beep('good');draw();
        };});
        $('#tkGo').onclick=e=>{
          if(state.locked)return;
          if(v===answer){
            const echo=`Exactly ${answer} minutes! From ${tkFmt(p.from)} to ${tkFmt(p.to)} — great time-hop!`;
            correctThen(renderTimeTrek,e.target);
            toast(echo,true,1500);speak(echo);
          }else{
            wrong(e.target);
            toast(v<answer?`A little short! From ${tkFmt(p.from)}, count by fives until you reach ${tkFmt(p.to)}. How many fives did you count?`:`Too far! From ${tkFmt(p.from)} to ${tkFmt(p.to)} is less than ${v} minutes — count by fives!`,false,2200);
          }
        };
        draw();
      }
