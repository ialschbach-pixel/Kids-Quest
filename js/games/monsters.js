      /* Word Monsters: tricky-word memory match (retrofit 2026-10-01).
         Tricky sets are phase-aligned (2-4 words per phase) and drawn only from the
         existing dolchSight lists — zero new words. 12 per grade, 6 pairs per round,
         cycled so no word repeats within a session. */
      const kqTrickyWords=[
        ['the','a','is','it','in','and','can','see','big','red','to','go'],
        ['all','am','are','at','ate','be','black','brown','but','came','did','do'],
        ['always','because','been','before','does',"don't",'fast','first','found','made','many','off'],
        ['about','better','bring','carry','clean','done','draw','drink','fall','far','full','got']
      ];
      const kqTrickyPhaseMap={0:[2],1:[3,4,5],2:[6,7,8,9,10],3:[11,12,13]};
      function renderMonsters(){
        const count=6,tricky=kqTrickyWords[state.grade];
        const words=[0,1,2,3,4,5].map(q=>tricky[(state.round*6+q)%tricky.length]);
        const ph=kqPhonicsPhases[kqTrickyPhaseMap[state.grade][state.round%kqTrickyPhaseMap[state.grade].length]];
        const chip=kqTrackChip('👾','Tricky Words',`Phase ${ph.n}: ${ph.name}`);
        let cards=[];words.forEach((w,i)=>{cards.push({key:w,label:w});cards.push({key:w,label:w});});cards=shuffle(cards);let open=[],matched=0;state.total=count;
        panel.innerHTML=progressMarkup()+chip+`<div class="monster-shelf" aria-label="Collected monsters">${state.monsters.length?state.monsters.join(' '):'Collect a monster for every match!'}</div><h2 class="prompt">Can you match all of the sight words?</h2><div class="memory-board" style="grid-template-columns:repeat(${count>5?4:count===5?5:4},1fr)">${cards.map((c,i)=>`<button class="memory-tile" type="button" data-key="${c.key}" aria-label="Hidden word card"><span class="memory-inner"><span class="memory-face memory-front">?</span><span class="memory-face memory-back" style="font-size:1rem">${c.label}</span></span></button>`).join('')}</div>`;
        const fill=$('.progress-fill',panel),label=$('.progress-label',panel);label.textContent=`0 of ${count} pairs`;
        $$('.memory-tile',panel).forEach(tile=>tile.addEventListener('click',()=>{if(state.locked||tile.classList.contains('open')||tile.classList.contains('matched'))return;tile.classList.add('open');open.push(tile);speak(tile.dataset.key);if(open.length===2){state.locked=true;const[a,b]=open;if(a.dataset.key===b.dataset.key){setTimeout(()=>{a.classList.add('matched');b.classList.add('matched');open=[];matched++;state.locked=false;state.score++;addStars(1);masteryCorrect();const m=monsterFaces[(matched-1)%monsterFaces.length];state.monsters.push(m);toast(`${m} joined your team!`);fill.style.width=`${matched/count*100}%`;label.textContent=`${matched} of ${count} pairs`;if(matched===count)setTimeout(()=>finishRound(`You collected ${count} word monsters!`),650);},320);}else setTimeout(()=>{wrong(b);a.classList.remove('open');b.classList.remove('open');open=[];state.locked=false;},650);}}));
      }
