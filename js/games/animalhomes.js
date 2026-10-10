      let ahTrack='home';
      const ahCamoColors={snow:'#f7fbff',sand:'#f2dda4',bark:'#9a6a3b',leaf:'#63b365'};
      const ahScenes=[
        {name:'Snowy Tundra',camo:'snow',spots:[['snow','❄️ Snow','#f7fbff'],['rock','🪨 Gray rock','#c3ccd6'],['mud','🟤 Brown mud','#b98a5e']],animals:[['arctic fox','🦊'],['snowy owl','🦉'],['polar bear','🐻‍❄️']]},
        {name:'Desert',camo:'sand',spots:[['sand','🏜️ Warm sand','#f2dda4'],['rock','🪨 Gray rock','#c3ccd6'],['cactus','🌵 Green cactus','#63b365']],animals:[['desert lizard','🦎'],['scorpion','🦂'],['camel','🐪']]},
        {name:'Forest',camo:'bark',spots:[['leaf','🍃 Green leaves','#63b365'],['bark','🪵 Brown bark','#9a6a3b'],['stone','🪨 Gray stone','#c3ccd6']],animals:[['owl','🦉'],['squirrel','🐿️'],['deer','🦌']]},
        {name:'Pond',camo:'leaf',spots:[['lily','🪷 Lily pads','#63b365'],['mud','🟤 Muddy bank','#b98a5e'],['water','💧 Blue water','#8ecdf7']],animals:[['frog','🐸'],['turtle','🐢'],['duck','🦆']]}
      ];
      const ahWhy=[
        ['Why does the arctic fox turn white in winter?','So it blends with the snow and hungry hunters walk right past',['So it can glow in the dark','So it looks fancy in photos','So it can swim like a fish']],
        ['Why is the desert lizard the color of sand?','So it disappears on the sand and stays safe',['So it can fly away fast','So it never needs any water','So it can sing very loudly']],
        ['Why does the owl have brown, bark-colored feathers?','So it melts into the tree bark where it naps',['So it can run extra fast','So it shines bright at night','So it can breathe underwater']],
        ['Why is the frog green like the lily pads?','So it hides among the leaves from hungry birds',['So it can jump to the moon','So it never gets wet','So it glows to make friends']]
      ];
      function ahTabs(){return `<div class="kq-tabs" role="tablist" aria-label="Animal Homes tracks"><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${ahTrack==='home'}" data-track="home" type="button">🏠 Animal Homes</button><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${ahTrack==='hide'}" data-track="hide" type="button">🔍 Hide &amp; Seek</button></div>`;}
      function ahBindTabs(){$$('.kq-tab-btn[data-track]',panel).forEach(b=>b.onclick=()=>{ahTrack=b.dataset.track;renderAnimalHomes();});}
      function ahSpotBtn(s){const em=s[1].split(' ')[0],label=s[1].slice(em.length+1);return `<button class="answer ah-spot" data-camo="${s[0]}" type="button" style="background:${s[2]}"><span style="font-size:30px" aria-hidden="true">${em}</span><span>${label}</span></button>`;}
      function renderAnimalHomes(){
        if(ahTrack==='hide'){renderHideSeek();return;}
        const x=animalHomes[state.grade][lessonIndex()],prompt=`Where does the ${x.name} live?`;
        const opts=deterministicOptions(x.home,animalHabitatChoices[state.grade],4,lessonIndex());
        panel.innerHTML=progressMarkup()+ahTabs()+`<h2 class="prompt">${prompt}</h2><div class="visual-prompt">${kqEsc(x.name)}</div><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${kqEsc(o)}">${kqEsc(o)}</button>`).join('')}</div>`;
        setProgress();ahBindTabs();
        $$('.answer',panel).forEach(b=>b.onclick=()=>{if(b.dataset.value===String(x.home)){speak(`Yes! The ${x.name} lives in the ${x.home}.`);correctThen(renderAnimalHomes,b);}else{wrong(b);toast(`Not that home — where would a ${x.name} find food and shelter?`,false,1700);}});
      }
      function renderHideSeek(){
        const g=state.grade,i=lessonIndex(),sc=ahScenes[i%ahScenes.length],order=shuffle(sc.animals.map((a,k)=>k));
        const resultEl=()=> $('#ahResult',panel);
        if(g===0){
          const [name,emoji]=sc.animals[order[0]];
          panel.innerHTML=progressMarkup()+ahTabs()+`<h2 class="prompt">A hungry hawk is circling! Where can the ${name} hide so it blends in?</h2><p class="lab-instruction">Tap the spot that looks most like the ${name}.</p><div class="lab-stage"><div class="ah-critter" style="background:${ahCamoColors[sc.camo]}"><span style="font-size:44px" aria-hidden="true">${emoji}</span><span><strong>${name}</strong></span></div><div class="ah-spots">${sc.spots.map(ahSpotBtn).join('')}</div><p class="science-result" id="ahResult" role="status">Look closely — which spot matches the ${name}?</p></div>`;
          setProgress();ahBindTabs();
          $$('.ah-spot',panel).forEach(b=>b.onclick=()=>{
            if(state.locked)return;
            if(b.dataset.camo===sc.camo){resultEl().innerHTML=`<strong>Hidden!</strong> 🦅 The hawk flew right past — the ${name} blends in!`;speak(`Hidden! The hawk flew right past the ${name}.`);correctThen(renderAnimalHomes,b);}
            else{wrong(b);resultEl().textContent=`Spotted! That spot does not look like the ${name}. Find the spot that matches.`;}
          });
          return;
        }
        if(g===2){renderAhPredict(sc,i,resultEl);return;}
        renderAhHide(sc,order,1,resultEl);
      }
      function renderAhHide(sc,order,phase,resultEl){
        let placed=0,sel=-1;
        const spots=sc.spots.map(s=>({...{key:s[0],label:s[1],bg:s[2]},hidden:[]}));
        function draw(){
          panel.innerHTML=progressMarkup()+ahTabs()+`<h2 class="prompt">${phase===1?'Hide every animal where it blends in!':'All hidden! Now the big why…'}</h2><p class="lab-instruction">${phase===1?'Tap an animal, then tap its hiding spot.':'Tap the true answer.'}</p><div class="lab-stage">${phase===1?`<div class="ah-critters">${order.map(ai=>{const [name,emoji]=sc.animals[ai];return spots.some(s=>s.hidden.indexOf(ai)>=0)?'':`<button class="answer ah-critter" data-ai="${ai}" type="button" style="background:${ahCamoColors[sc.camo]};${sel===ai?'outline:3px solid #2b2d42':''}"><span style="font-size:34px" aria-hidden="true">${emoji}</span><span>${name}</span></button>`;}).join('')}</div><div class="ah-spots">${spots.map((s,k)=>`<button class="answer ah-spot" data-k="${k}" data-camo="${s.key}" type="button" style="background:${s.bg}"><span style="font-size:30px" aria-hidden="true">${s.hidden.length?sc.animals[s.hidden[s.hidden.length-1]][1]:s.label.split(' ')[0]}</span><span>${s.label.slice(s.label.indexOf(' ')+1)}${s.hidden.length?' — hidden!':''}</span></button>`).join('')}</div>`:`<p class="lab-instruction"><strong>${ahWhy[lessonIndex()%ahWhy.length][0]}</strong></p><div class="answer-grid">${ahWhyQ().map((o,k)=>`<button class="answer" data-k="${k}" type="button">${o}</button>`).join('')}</div>`}<p class="science-result" id="ahResult" role="status">${phase===1?'Which spot looks like each animal?':'Why do animals look like their homes?'}</p></div>`;
          setProgress();ahBindTabs();
          if(phase===1){
            $$('.ah-critter',panel).forEach(b=>b.onclick=()=>{sel=+b.dataset.ai;draw();speak(sc.animals[sel][0]);});
            $$('.ah-spot',panel).forEach(b=>b.onclick=()=>{
              if(state.locked||sel<0||b.dataset.k==null)return;
              const k=+b.dataset.k;
              if(spots[k].key===sc.camo){
                spots[k].hidden.push(sel);const nm=sc.animals[sel][0];sel=-1;placed++;sciPop();
                if(placed>=3){phase=2;draw();resultEl().innerHTML=`🦅 <strong>The hawk flew right past every one!</strong> Animals that match their home are hard to see.`;speak('The hawk flew right past every one!');bindWhy();return;}
                draw();resultEl().textContent=`Hidden! The ${nm} blends right in. ${3-placed} to go.`;
              }else{wrong(b);resultEl().textContent=`Spotted! That spot does not match. Look for the spot that looks like the animal.`;}
            });
          }else bindWhy();
        }
        function ahWhyQ(){const q=ahWhy[lessonIndex()%ahWhy.length];return shuffle([q[1],...q[2]]);}
        function bindWhy(){
          const q=ahWhy[lessonIndex()%ahWhy.length];
          $$('.answer[data-k]',panel).forEach(b=>b.onclick=()=>{
            if(state.locked)return;
            if(b.textContent===q[1]){resultEl().innerHTML=`<strong>Exactly!</strong> ${q[1]}`;speak(q[1]);correctThen(renderAnimalHomes,b);}
            else{wrong(b);resultEl().textContent=`Not quite — think about staying safe from hungry hunters.`;}
          });
        }
        draw();
      }
      function renderAhPredict(sc,i,resultEl){
        const matchSpot=sc.spots.findIndex(s=>s[0]===sc.camo);
        const altSpots=sc.spots.map((s,k)=>k).filter(k=>k!==matchSpot);
        const oddOne=(i+1)%3,assign=[matchSpot,matchSpot,matchSpot];
        assign[oddOne]=altSpots[i%altSpots.length];
        let guess=-1,sent=false;
        panel.innerHTML=progressMarkup()+ahTabs()+`<h2 class="prompt">The hawk is coming! One animal does NOT blend in. Which one will it spot?</h2><p class="lab-instruction">Tap your guess, then send the hawk!</p><div class="lab-stage"><div class="ah-spots">${sc.spots.map((s,k)=>{const ai=assign.indexOf(k);const occ=ai>=0?sc.animals[ai]:null;return `<div class="ah-spot" style="background:${s[2]}"><span style="font-size:26px" aria-hidden="true">${occ?occ[1]:s[1].split(' ')[0]}</span><span>${s[1].slice(s[1].indexOf(' ')+1)}</span>${occ?`<button class="answer ah-guess" data-ai="${ai}" type="button" style="${guess===ai?'outline:3px solid #2b2d42':''}">${occ[0]}${sent&&ai===oddOne?' 😱 spotted!':''}</button>`:''}</div>`;}).join('')}</div><div style="font-size:44px" id="ahHawk" aria-hidden="true">🦅</div><button class="answer" id="ahSend" type="button">Send the hawk! 🦅</button><p class="science-result" id="ahResult" role="status">Which animal stands out?</p></div>`;
        setProgress();ahBindTabs();
        const redraw=()=>renderAhPredictRedraw(sc,i,matchSpot,altSpots,oddOne,assign,guess,sent,resultEl);
        $$('.ah-guess',panel).forEach(b=>b.onclick=()=>{if(sent||state.locked)return;guess=+b.dataset.ai;redraw();speak(sc.animals[guess][0]);});
        $('#ahSend',panel).onclick=e=>{
          if(sent||state.locked||guess<0){resultEl().textContent=`First tap the animal you think the hawk will spot!`;return;}
          sent=true;redraw();
          const hawk=$('#ahHawk',panel);hawk.style.transition='transform .8s ease';hawk.style.transform='translateX(60vw)';
          setTimeout(()=>{
            redraw();
            if(guess===oddOne){const nm=sc.animals[oddOne][0];resultEl().innerHTML=`<strong>You called it!</strong> The ${nm} stood out and got spotted. Animals that match their home stay safe.`;speak(`You called it! The ${nm} stood out.`);correctThen(renderAnimalHomes,$('#ahSend',panel));}
            else{wrong($('#ahSend',panel));resultEl().textContent=`The hawk spotted a different one! Look for the animal that does NOT match its spot, then send the hawk again.`;sent=false;guess=-1;setTimeout(redraw,600);}
          },850);
        };
      }
      function renderAhPredictRedraw(sc,i,matchSpot,altSpots,oddOne,assign,guess,sent,resultEl){
        const keep=resultEl()?resultEl().innerHTML:'';
        panel.innerHTML=progressMarkup()+ahTabs()+`<h2 class="prompt">The hawk is coming! One animal does NOT blend in. Which one will it spot?</h2><p class="lab-instruction">Tap your guess, then send the hawk!</p><div class="lab-stage"><div class="ah-spots">${sc.spots.map((s,k)=>{const ai=assign.indexOf(k);const occ=ai>=0?sc.animals[ai]:null;return `<div class="ah-spot" style="background:${s[2]}"><span style="font-size:26px" aria-hidden="true">${occ?occ[1]:s[1].split(' ')[0]}</span><span>${s[1].slice(s[1].indexOf(' ')+1)}</span>${occ?`<button class="answer ah-guess" data-ai="${ai}" type="button" style="${guess===ai?'outline:3px solid #2b2d42':''}">${occ[0]}${sent&&ai===oddOne?' 😱 spotted!':''}</button>`:''}</div>`;}).join('')}</div><div style="font-size:44px" id="ahHawk" aria-hidden="true">🦅</div><button class="answer" id="ahSend" type="button">Send the hawk! 🦅</button><p class="science-result" id="ahResult" role="status">${keep||'Which animal stands out?'}</p></div>`;
        setProgress();ahBindTabs();
        $$('.ah-guess',panel).forEach(b=>b.onclick=()=>{if(sent||state.locked)return;guess=+b.dataset.ai;renderAhPredictRedraw(sc,i,matchSpot,altSpots,oddOne,assign,guess,sent,resultEl);speak(sc.animals[guess][0]);});
        $('#ahSend',panel).onclick=()=>{
          if(sent||state.locked||guess<0){const r=$('#ahResult',panel);if(r)r.textContent=`First tap the animal you think the hawk will spot!`;return;}
          sent=true;renderAhPredictRedraw(sc,i,matchSpot,altSpots,oddOne,assign,guess,sent,resultEl);
          const hawk=$('#ahHawk',panel);hawk.style.transition='transform .8s ease';hawk.style.transform='translateX(60vw)';
          setTimeout(()=>{
            if(guess===oddOne){const nm=sc.animals[oddOne][0];renderAhPredictRedraw(sc,i,matchSpot,altSpots,oddOne,assign,guess,true,resultEl);const r=$('#ahResult',panel);r.innerHTML=`<strong>You called it!</strong> The ${nm} stood out and got spotted. Animals that match their home stay safe.`;speak(`You called it! The ${nm} stood out.`);correctThen(renderAnimalHomes,$('#ahSend',panel));}
            else{const btn=$('#ahSend',panel);wrong(btn);sent=false;guess=-1;renderAhPredictRedraw(sc,i,matchSpot,altSpots,oddOne,assign,guess,sent,resultEl);const r=$('#ahResult',panel);r.textContent=`The hawk spotted a different one! Look for the animal that does NOT match its spot, then send the hawk again.`;}
          },850);
        };
      }

      const weatherConditions=[
        [{s:'the sun is bright',a:'wear a sun hat'},{s:'rain is falling',a:'carry an umbrella'},{s:'snow covers the ground',a:'wear warm boots'},{s:'the wind is strong',a:'hold onto your hat'},{s:'the air is hot',a:'drink water'},{s:'the air is cold',a:'wear a coat'}],
        [{s:'dark clouds are gathering',a:'take a raincoat'},{s:'puddles are freezing',a:'walk carefully'},{s:'leaves are blowing quickly',a:'secure loose things'},{s:'the UV level is high',a:'use sun protection'},{s:'fog hides the road',a:'move slowly and carefully'},{s:'thunder is heard',a:'go indoors'}],
        [{s:'warm air is rising',a:'expect clouds to form'},{s:'water vapor is cooling',a:'expect condensation'},{s:'a cold front arrives',a:'expect cooler weather'},{s:'air pressure drops',a:'prepare for changing weather'},{s:'humidity increases',a:'expect more moisture in the air'},{s:'a rain gauge fills',a:'record precipitation'}],
        [{s:'water evaporates after rain',a:'water vapor enters the air'},{s:'cloud droplets grow heavy',a:'precipitation may fall'},{s:'oxygen-rich air moves inland',a:'wind carries air masses'},{s:'a warm front approaches',a:'steady clouds may develop'},{s:'a cumulonimbus cloud grows',a:'a thunderstorm may form'},{s:'a drought continues',a:'conserve water'}]
      ];
      const weatherActivities=['on the way to school','during a park visit','before a nature walk','at the playground','while watching the sky','during an outdoor science check'];
