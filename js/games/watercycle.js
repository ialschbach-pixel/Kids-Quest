      function wcGroundArt(dest){
        if(dest==='Mountain')return '<svg viewBox="0 0 600 120" preserveAspectRatio="none" style="width:100%;height:100%" aria-hidden="true"><polygon points="220,4 305,90 135,90" fill="#8d99ae" stroke="#495057" stroke-width="4" stroke-linejoin="round"/><polygon points="262,34 288,60 236,60" fill="#edf2f4"/><path d="M0 84 q40-16 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 V120 H0 Z" fill="#4ea8de" opacity=".92"/></svg>';
        if(dest==='Lake')return '<svg viewBox="0 0 600 120" preserveAspectRatio="none" style="width:100%;height:100%" aria-hidden="true"><ellipse cx="118" cy="76" rx="92" ry="18" fill="#74a57f" opacity=".5"/><path d="M0 60 q40-14 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 V120 H0 Z" fill="#57cc99"/><path d="M0 92 q50-10 100 0 t100 0 t100 0 t100 0 t100 0 V120 H0 Z" fill="#38a3a5" opacity=".8"/></svg>';
        if(dest==='Ocean')return '<svg viewBox="0 0 600 120" preserveAspectRatio="none" style="width:100%;height:100%" aria-hidden="true"><path d="M0 52 q50-18 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 V120 H0 Z" fill="#3d99d6"/><path d="M0 86 q60-12 120 0 t120 0 t120 0 t120 0 t120 0 V120 H0 Z" fill="#1d6fa5" opacity=".85"/></svg>';
        return '<svg viewBox="0 0 600 120" preserveAspectRatio="none" style="width:100%;height:100%" aria-hidden="true"><path d="M0 60 q60-16 120 0 t120 0 t120 0 t120 0 V120 H0 Z" fill="#90cbe8"/><path d="M0 90 q60-10 120 0 t120 0 t120 0 t120 0 V120 H0 Z" fill="#4ea8de" opacity=".7"/></svg>';
      }
      function renderWaterCycle(){
        const i=lessonIndex(),g=state.grade,spotPair=wcSpots[g][i%6],spotName=spotPair[0];
        const dropSvg='<svg viewBox="0 0 60 70" class="wc-drop-art" aria-hidden="true"><path d="M30 6C18 26 10 38 10 48a20 16 0 0 0 40 0c0-10-8-22-20-42z" fill="#4ea8de" stroke="#1d6fa5" stroke-width="4"/><path d="M22 46a9 7 0 0 0 6 6" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>';
        const miniSvg='<svg viewBox="0 0 60 70" aria-hidden="true"><path d="M30 6C18 26 10 38 10 48a20 16 0 0 0 40 0c0-10-8-22-20-42z" fill="#90cbe8" stroke="#3d7ea5" stroke-width="4"/></svg>';
        const cloudSvg='<svg viewBox="0 0 240 120" class="wc-cloud-art" aria-hidden="true"><ellipse cx="120" cy="78" rx="88" ry="38" fill="#ffffff" stroke="#b6d4e8" stroke-width="4"/><ellipse cx="70" cy="66" rx="44" ry="32" fill="#ffffff" stroke="#b6d4e8" stroke-width="4"/><ellipse cx="172" cy="66" rx="48" ry="34" fill="#ffffff" stroke="#b6d4e8" stroke-width="4"/></svg>';
        panel.innerHTML=progressMarkup()+'<h2 class="prompt" id="wcPrompt" data-speak="You are a droplet in the '+spotName+'! The sun\u2019s heat lifts water up. Drag the droplet up to the cloud.">You are a droplet in the <b>'+spotName+'</b>!<br><span class="wc-subprompt">See that cloud? Drag yourself up there — the sun\u2019s heat lifts water up.</span></h2>'
        +'<div class="wc-stagebar" aria-label="Stages"><span class="wc-chip" id="chipEvap">Evaporate</span><span class="wc-chip" id="chipCond">Condense</span><span class="wc-chip" id="chipRain">Rain</span></div>'
        +'<div class="lab-stage"><div class="wc-scene" id="wcScene">'
        +'<div class="wc-sun" aria-hidden="true"></div>'
        +'<div class="wc-heat" id="wcHeat" aria-hidden="true"></div>'
        +'<button type="button" class="wc-cloudbtn detached" id="wcCloud" data-speak="The cloud" aria-label="The cloud. Tap it when you are ready to rain.">'+cloudSvg+'</button>'
        +'<div class="wc-minis" id="wcMinis"></div>'
        +'<div class="wc-rainzone" id="wcRainzone" aria-hidden="true"></div>'
        +'<button type="button" class="wc-drop" id="wcDrop" data-speak="You, the droplet. Drag up to the cloud." aria-label="You, the droplet. Drag up to the cloud, or use the arrow keys.">'+dropSvg+'</button>'
        +'<div class="wc-ground" id="wcGround" aria-hidden="true">'+wcGroundArt(null)+'</div>'
        +'</div>'
        +'<div class="wc-dest-row" id="wcDests" hidden><span class="wc-dest-label">Where will you rain?</span>'+['Ocean','Lake','Mountain'].map(d=>'<button type="button" class="wc-dest" data-dest="'+d+'" aria-pressed="false" data-speak="Rain into the '+d+'">'+d+'</button>').join('')+'</div>'
        +'<div class="wc-quiz" id="wcQuiz" hidden></div>'
        +'<div class="wc-note" id="wcNote" aria-live="polite">The sun\u2019s heat is lifting you — drag up!</div>'
        +'</div>';
        setProgress();
        const scene=$('#wcScene'),drop=$('#wcDrop'),cloud=$('#wcCloud'),heat=$('#wcHeat'),minis=$('#wcMinis'),rainzone=$('#wcRainzone'),ground=$('#wcGround'),promptEl=$('#wcPrompt'),note=$('#wcNote'),dests=$('#wcDests'),quiz=$('#wcQuiz');
        let stage='evap',gathered=0,dest=null,firstTry=true;
        const chips={evap:$('#chipEvap'),cond:$('#chipCond'),rain:$('#chipRain')};
        chips.evap.classList.add('active');
        let dropT=360;drop.style.left='50%';drop.style.top=dropT+'px';
        function setPrompt(html,say){promptEl.innerHTML=html;promptEl.setAttribute('data-speak',say);}
        function mark(chip,cls){chips[chip].classList.remove('active');if(cls)chips[chip].classList.add(cls);}
        let dragging=false;
        function evapDone(){
          if(stage!=='evap')return;stage='cond';
          drop.style.display='none';heat.style.display='none';
          mark('evap','done');chips.cond.classList.add('active');
          sciPop();
          setPrompt('Sweet ascent! Now BRRR — it\u2019s cold up here. <span class="wc-subprompt">Tap the little droplets to gather them into the cloud.</span>','Sweet ascent! Now it is cold up here. Tap the little droplets to gather them into the cloud.');
          note.textContent='You evaporated! Now gather the little droplets.';
          speak('Sweet ascent! You evaporated! Up here it is cold. Tap the little droplets to gather them into the cloud.');
          startCond();
        }
        drop.onpointerdown=e=>{if(state.locked||stage!=='evap')return;dragging=true;try{drop.setPointerCapture(e.pointerId);}catch(err){}e.preventDefault();};
        drop.onpointermove=e=>{if(!dragging||stage!=='evap')return;const r=scene.getBoundingClientRect();dropT=clamp(e.clientY-r.top-36,40,430);drop.style.left=clamp(e.clientX-r.left,30,r.width-30)+'px';drop.style.top=dropT+'px';if(dropT<=110)evapDone();};
        drop.onpointerup=()=>{dragging=false;};
        drop.onkeydown=e=>{if(state.locked||stage!=='evap')return;const r=scene.getBoundingClientRect();const curX=parseFloat(drop.style.left)||r.width/2;
          if(e.key==='ArrowUp'||e.key==='ArrowDown'){dropT=clamp(dropT+(e.key==='ArrowDown'?18:-18),40,430);drop.style.top=dropT+'px';if(dropT<=110)evapDone();e.preventDefault();}
          else if(e.key==='ArrowLeft'){drop.style.left=clamp(curX-18,30,r.width-30)+'px';e.preventDefault();}
          else if(e.key==='ArrowRight'){drop.style.left=clamp(curX+18,30,r.width-30)+'px';e.preventDefault();}};
        function startCond(){
          const pos=[[28,86],[38,116],[50,64],[62,116],[72,86]];
          minis.innerHTML=pos.map(p=>'<button type="button" class="wc-mini" style="left:'+p[0]+'%;top:'+p[1]+'px" data-speak="A tiny droplet" aria-label="A tiny droplet. Tap it to send it into the cloud.">'+miniSvg+'</button>').join('');
          $$('.wc-mini',minis).forEach(m=>m.onclick=()=>{
            if(state.locked||stage!=='cond')return;
            m.disabled=true;
            const r=scene.getBoundingClientRect(),mr=m.getBoundingClientRect();
            const dx=r.left+r.width/2-(mr.left+mr.width/2),dy=r.top+80-(mr.top+mr.height/2);
            m.style.transform='translate('+dx+'px,'+dy+'px) scale(.5)';m.style.opacity='0';
            gathered++;sciPop();
            cloud.classList.remove('grew1','grew2','grew3');
            if(gathered>=5){cloud.classList.add('grew3');setTimeout(condDone,700);}
            else if(gathered>=3){cloud.classList.add('grew2');}
            else{cloud.classList.add('grew1');}
            if(gathered<5)note.textContent=gathered+' of 5 droplets gathered!';
          });
        }
        function condDone(){
          stage='dest';minis.innerHTML='';mark('cond','done');chips.rain.classList.add('active');
          dests.hidden=false;cloud.classList.remove('detached');
          setPrompt('The cloud is HUGE! <span class="wc-subprompt">Pick where you\u2019ll land, then tap the cloud to rain.</span>','The cloud is huge! Pick where you will land, then tap the cloud to rain.');
          note.textContent='Condensation done! Choose where you will rain.';
          speak('Condensation! The droplets joined into one heavy cloud. Now choose where you will rain, then tap the cloud.');
        }
        $$('.wc-dest',dests).forEach(b=>b.onclick=()=>{if(state.locked||stage!=='dest')return;$$('.wc-dest',dests).forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false');});b.classList.add('selected');b.setAttribute('aria-pressed','true');dest=b.dataset.dest;note.textContent='Ready to rain into the '+dest+'! Now tap the cloud.';speak('The '+dest+'! Now tap the cloud to rain.');});
        cloud.onclick=()=>{if(state.locked||stage!=='dest')return;
          if(!dest){toast('Pick a destination first — Ocean, Lake, or Mountain!');speak('Pick a destination first: Ocean, Lake, or Mountain!');return;}
          stage='quizrain';
          if(g>=2)showQuiz();else rainTime();
        };
        function showQuiz(){
          const qz=wcQuiz[i%3];
          const opts=b2Shuffle([{t:qz.ok,ok:true},qz.bad[0],qz.bad[1],qz.bad[2]].map(function(x){return typeof x==='string'?{t:x,ok:false}:x;}),i*3+17);
          quiz.innerHTML='<div class="wc-quizcard" role="group" aria-label="A water cycle question"><p class="wc-quiz-q" data-speak="'+qz.q+'">'+qz.q+'</p>'+opts.map(o=>'<button type="button" class="wc-quiz-a" data-ok="'+(o.ok?'1':'0')+'" data-speak="Answer: '+o.t+'">'+o.t+'</button>').join('')+'</div>';
          quiz.hidden=false;
          setPrompt('One cloud question before the rain… <span class="wc-subprompt">'+qz.q+'</span>','One cloud question before the rain. '+qz.q);
          speak('One cloud question before the rain. '+qz.q);
          $$('.wc-quiz-a',quiz).forEach(b=>b.onclick=()=>{if(state.locked||stage!=='quizrain')return;
            if(b.dataset.ok==='1'){quiz.hidden=true;speak('Yes! Now the rain begins!');rainTime();}
            else{firstTry=false;wrong(b);note.textContent='Nice guess — think again!';speak('Nice guess — think again!');}
          });
        }
        function rainTime(){
          stage='rain';dests.hidden=true;quiz.hidden=true;
          cloud.classList.add('raining');
          speak('Rain! You are falling toward the '+dest+'!');
          let spawned=0;
          const iv=setInterval(()=>{if(spawned>=28){clearInterval(iv);return;}spawned++;const d=document.createElement('div');d.className='wc-raindrop';d.style.left=(20+Math.random()*60)+'%';rainzone.appendChild(d);setTimeout(()=>d.remove(),1300);},110);
          setTimeout(()=>{
            cloud.classList.remove('raining','grew3');
            ground.innerHTML=wcGroundArt(dest);
            note.textContent='You rained into the '+dest+'! The loop never stops — the sun will lift you up again!';
            mark('rain','done');
            setPrompt('You rained into the <b>'+dest+'</b>!','You rained into the '+dest+'! The loop never stops: the sun will lift you up again.');
            speak('You rained into the '+dest+'! The water cycle never stops — the sun will lift you up again!');
            drop.style.display='block';drop.style.left='50%';drop.style.top='396px';
            labOutcome(renderWaterCycle,firstTry,cloud,'You rode the whole water cycle from the '+spotName+' to the '+dest+' — evaporation, condensation, and rain!');
          },1500);
        }
      }
      /* ── FOSSIL DIG ── */
      const fdTypes=[
        [['fern','Fern Fossil','Fern Plant'],['fish','Fish Fossil','Fish'],['shell','Shell Fossil','Clam']],
        [['oakleaf','Oak Leaf Fossil','Oak Tree'],['starfish','Starfish Fossil','Starfish'],['snail','Snail Shell Fossil','Snail']],
        [['dinotooth','Dino Tooth Fossil','Dinosaur'],['trilobite','Trilobite Fossil','Trilobite'],['feather','Feather Mark Fossil','Bird']],
        [['dinoclaw','Dino Claw Fossil','Dinosaur'],['sharktooth','Shark Tooth Fossil','Shark'],['eggnest','Nest Egg Fossil','Bird']]
      ];
      const fdFacts=[
        {fern:'This frond pressed into soft mud and left a leafy mark — beautiful and very old!',fish:'This fish shape sank into soft mud and turned to stone — a message from the ancient sea!',shell:'The clam left its swirly shell printed in stone!'},
        {oakleaf:'A whole forest once blew leaves onto the mud here — this one never blew away!',starfish:'When the sea moved away, this starfish shape stayed behind in the stone!',snail:'This little snail crawled over the mud so slowly that its coil fossilized right here!'},
        {dinotooth:'Dinosaur teeth tell us what dinosaurs ate — this one belonged to a hungry giant!',trilobite:'Trilobites crawled on the seafloor half a billion years ago. You just touched deep time!',feather:'This feather mark hints that some dinosaurs wore feathers, just like birds!'},
        {dinoclaw:'A dino claw\u2019s curve tells if it sliced meat or raked leaves!',sharktooth:'Shark teeth are tough enamel — they fossilize beautifully when sharks shed them!',eggnest:'Fossil nests show dinosaurs raised babies, just like birds do!'}
      ];
      const fdDecoys=[
        [['rabbit','Rabbit'],['turtle','Turtle']],
        [['crab','Crab'],['berrybush','Berry Bush']],
        [['frog','Frog'],['lizard','Lizard']],
        [['snake','Snake'],['mouse','Mouse']]
      ];
