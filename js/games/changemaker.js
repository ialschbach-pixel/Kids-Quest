      /* Change Maker Market (changemaker): the child is the SHOPKEEPER and gives
         change. coinshop pays exact prices; this is the inverse skill — making
         change by composing coins and bills toward a target. */
      const cmTills=[
        [{v:1,n:'penny',e:'🪙'},{v:5,n:'nickel',e:'🪙'}],
        [{v:1,n:'penny',e:'🪙'},{v:5,n:'nickel',e:'🪙'},{v:10,n:'dime',e:'🪙'},{v:25,n:'quarter',e:'🪙'}],
        [{v:1,n:'penny',e:'🪙'},{v:5,n:'nickel',e:'🪙'},{v:10,n:'dime',e:'🪙'},{v:25,n:'quarter',e:'🪙'},{v:100,n:'dollar',e:'💵'}],
        [{v:5,n:'nickel',e:'🪙'},{v:10,n:'dime',e:'🪙'},{v:25,n:'quarter',e:'🪙'},{v:100,n:'dollar',e:'💵'},{v:500,n:'five dollars',e:'💵'}],
      ];
      const cmItems=[
        [['🍎','apple'],['🧃','juice box'],['📏','ruler'],['🧸','teddy bear'],['🎈','balloon'],['🍪','cookie'],['✏️','pencil'],['🧦','socks'],['📕','book'],['🪀','yo-yo'],['🍌','banana'],['🎨','paint set']],
        [['🍎','apple'],['🧃','juice box'],['📏','ruler'],['🧸','teddy bear'],['🎈','balloon'],['🍪','cookie'],['✏️','pencil'],['🧦','socks'],['📕','book'],['🪀','yo-yo'],['🍌','banana'],['🎨','paint set']],
        [['📕','book'],['🧩','puzzle'],['🎲','game'],['🖍️','crayons'],['⚽','soccer ball'],['🎧','headphones'],['📓','notebook'],['🧢','cap'],['🪁','kite'],['🔦','flashlight'],['🎸','ukulele'],['🛹','skateboard']],
        [['📕','book'],['🧩','puzzle'],['🎲','game'],['🖍️','crayons'],['⚽','soccer ball'],['🎧','headphones'],['📓','notebook'],['🧢','cap'],['🪁','kite'],['🔦','flashlight'],['🎸','ukulele'],['🛹','skateboard']],
      ];
      function cmFmt(c){return c>=100?`$${(c/100).toFixed(2).replace(/\.00$/,'')}`:`${c}¢`;}
      function cmCandidates(g){
        const list=[];
        if(g===0){for(const P of[5,10,25,50,100])for(let C=Math.max(1,P-10);C<P;C++)list.push([C,P]);}
        else if(g===1){for(let C=5;C<=95;C++)for(const P of[10,25,50,100])if(P>C&&P-C<=40)list.push([C,P]);}
        else if(g===2){for(let C=5;C<=195;C++)for(const P of[100,200])if(P>C&&P-C<=100)list.push([C,P]);}
        else{for(let C=505;C<=995;C+=5)list.push([C,1000]);}
        return list;
      }
      function cmPick(){
        const g=state.grade,till=cmTills[g];
        /* shuffled deck, first unused card: uniform random without replacement */
        const deck=shuffle(cmCandidates(g));
        let card=deck.find(([C,P])=>!state.usedProblems.has(`changemaker:${g}:${C}x${P}`));
        if(!card)card=deck[Math.floor(Math.random()*deck.length)]; /* safety: pools hold 43+ cards, unreachable in 36 */
        const[C,P]=card;
        state.usedProblems.add(`changemaker:${g}:${C}x${P}`);
        const item=cmItems[g][(state.round*6+state.q)%cmItems[g].length];
        return{C,P,D:P-C,till,item};
      }
      function renderChangeMaker(){
        const{C,P,D,till,item}=cmPick();
        const given=[];
        const total=()=>given.reduce((s,v)=>s+v,0);
        const speakLine=`A customer buys the ${item[1]} for ${cmFmt(C)} and pays ${cmFmt(P)}. You are the shopkeeper — give back ${cmFmt(D)} in change!`;
        panel.innerHTML=`<div class="cm-game">
          ${progressMarkup()}
          <h2 class="prompt" data-speak="${kqEsc(speakLine)}">🏪 <span>A customer buys the ${item[1]} ${item[0]} for <b>${cmFmt(C)}</b> and pays <b>${cmFmt(P)}</b>. <b>Give back ${cmFmt(D)} in change!</b></span></h2>
          <div class="cm-counter">
            <div class="cm-item"><span class="cm-item-emoji" aria-hidden="true">${item[0]}</span><span>${cmFmt(C)}</span></div>
            <div class="cm-paid">paid <b>${cmFmt(P)}</b> ${P>=500?'💵':P>=100?'💵':'🪙'}</div>
          </div>
          <div class="cm-hud">
            <span class="kq-chip">Owe <b>${cmFmt(D)}</b></span>
            <span class="kq-chip">Given <b id="cmTotal">${cmFmt(0)}</b></span>
            <span class="kq-chip">Still owe <b id="cmLeft">${cmFmt(D)}</b></span>
          </div>
          <div class="cm-tray" id="cmTray" aria-live="polite"><span class="bu-tray-empty">Tap coins and bills to hand over change…</span></div>
          <div class="cm-till" role="group" aria-label="Cash register">${till.map(d=>
            `<button class="cm-coin" type="button" data-v="${d.v}" data-speak="${d.n}, ${cmFmt(d.v)}" aria-label="${d.n}, ${cmFmt(d.v)}"><span class="cm-coin-e" aria-hidden="true">${d.e}</span><span class="cm-coin-v">${cmFmt(d.v)}</span><span class="cm-coin-n">${d.n}</span></button>`
          ).join('')}</div>
          <div class="cm-actions">
            <button class="secondary-btn cm-back" id="cmBack" type="button" data-speak="Take back the last coin">↩️ Take back</button>
            <button class="primary-btn cm-give" id="cmGive" type="button" data-speak="Hand over the change">Hand over the change!</button>
          </div>
          <p class="studio-note">Tap money to add it. Made a mistake? Take back the last one.</p>
        </div>`;
        setProgress();
        const draw=()=>{
          const t=total();
          $('#cmTotal').textContent=cmFmt(t);
          $('#cmLeft').textContent=cmFmt(Math.max(0,D-t));
          $('#cmTray').innerHTML=given.length
            ?given.map(v=>{const d=till.find(x=>x.v===v);return`<span class="cm-chip">${d?d.e:'🪙'} ${cmFmt(v)}</span>`;}).join('')
            :'<span class="bu-tray-empty">Tap coins and bills to hand over change…</span>';
        };
        panel.querySelectorAll('.cm-coin').forEach(b=>{b.onclick=()=>{
          if(state.locked)return;
          const v=+b.dataset.v,t=total();
          if(t+v>D){
            wrong(b);
            const over=t+v-D;
            given.push(v); /* briefly show the mistake, then take it back */
            draw();
            toast(`That's ${cmFmt(t+v)} — ${cmFmt(over)} too much! I took the last one back.`,false,2000);
            setTimeout(()=>{given.pop();if(state.game==='changemaker')draw();},900);
            return;
          }
          given.push(v);beep('good');draw();
          if(total()===D){
            /* auto-complete on exact change */
            setTimeout(()=>{
              if(state.locked||state.game!=='changemaker'||total()!==D)return;
              const parts=[];const counts={};
              given.forEach(v=>{counts[v]=(counts[v]||0)+1;});
              Object.keys(counts).sort((a,b)=>b-a).forEach(v=>{const d=till.find(x=>x.v===+v);parts.push(`${counts[v]} ${d.n}${counts[v]>1?'s':''}`);});
              const echo=`Perfect change! ${cmFmt(D)} back as ${parts.join(', ')}.`;
              correctThen(renderChangeMaker,$('#cmGive'));
              toast(echo,true,1600);speak(echo);
            },350);
          }
        };});
        $('#cmBack').onclick=()=>{if(state.locked||!given.length)return;given.pop();beep('try');draw();};
        $('#cmGive').onclick=e=>{
          if(state.locked)return;
          const t=total();
          if(t===D){
            const parts=[];const counts={};
            given.forEach(v=>{counts[v]=(counts[v]||0)+1;});
            Object.keys(counts).sort((a,b)=>b-a).forEach(v=>{const d=till.find(x=>x.v===+v);parts.push(`${counts[v]} ${d.n}${counts[v]>1?'s':''}`);});
            const echo=`Perfect change! ${cmFmt(D)} back as ${parts.join(', ')}.`;
            correctThen(renderChangeMaker,e.target);
            toast(echo,true,1600);speak(echo);
          }else{
            wrong(e.target);
            toast(t<D?`That's only ${cmFmt(t)} — you still owe ${cmFmt(D-t)}. Add ${cmFmt(D-t)} more!`:`That's ${cmFmt(t)} — too much! Take some back.`,false,2000);
          }
        };
        draw();
      }
