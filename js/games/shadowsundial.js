      function sdGeom(t){const tt=clamp(t,0.02,0.98),e=Math.sin(Math.PI*tt),k=Math.abs(tt-0.5)*2,L=1+2.3*Math.pow(k,1.25);return{tt,e,k,L,dir:tt<0.5?'E':'W',tod:tt<0.34?'Morning':tt<0.66?'Midday':'Evening'};}
      function sdNeedT(prop){const kT=Math.pow((prop.L-1)/2.3,0.8);return prop.side==='right'?0.5-kT/2:0.5+kT/2;}
      function renderShadowSundial(){
        const i=lessonIndex(),g=state.grade,scene=sdScenes[i%6],cfg=sdKinds[g][i%6],tol=sdTols[g];
        const prop=cfg.p?sdProps.find(p=>p.id===cfg.p):null;
        const needT=prop?sdNeedT(prop):null;
        const job=cfg.k==='long'?'Make the <b>longest</b> shadow!':cfg.k==='short'?'Make the <b>shortest</b> shadow!':cfg.k==='hide'?'Make the shadow <b>hide</b> right under the stick!':'Make the shadow touch <b>'+prop.label+'</b>!';
        const jobPlain=cfg.k==='long'?'Make the longest shadow!':cfg.k==='short'?'Make the shortest shadow!':cfg.k==='hide'?'Make the shadow hide right under the stick!':'Make the shadow touch '+prop.label+'!';
        const showProps=cfg.k!=='touch'?sdProps:[prop];
        const propHTML=showProps.map(p=>'<div class="sd-prop" style="left:'+(50+(p.side==='right'?1:-1)*(p.L/3.6)*40)+'%" aria-hidden="true">'+sdPropArt[p.id]+'</div>').join('');
        panel.innerHTML=progressMarkup()+'<h2 class="prompt" data-speak="'+jobPlain+' Drag the sun across the sky and watch the shadow move.">'+job+' Drag the sun across the sky and watch the shadow move.</h2>'
        +'<div class="lab-stage"><div class="sd-stage hands-on">'
        +'<div class="sd-sky" id="sdSky" aria-label="Sky. Drag across it to move the sun.">'
        +'<svg class="sd-skyarc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M6 96 Q50 -14 94 96" fill="none" stroke="rgba(11,94,138,.5)" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-dasharray="5 4"/></svg>'
        +'<span class="sd-tmark" style="left:8%">Morning</span><span class="sd-tmark" style="left:50%">Noon</span><span class="sd-tmark" style="left:92%">Evening</span>'
        +'<button type="button" class="sd-sun" id="sdSun" data-speak="The sun. Use the arrow keys to move it." aria-label="The sun. Use the left and right arrow keys to move it across the sky."></button></div>'
        +'<div class="sd-ground"><div class="sd-shadow" id="sdShadow"></div>'
        +'<svg class="sd-dial-art" viewBox="0 0 120 88" aria-hidden="true"><ellipse cx="60" cy="72" rx="54" ry="14" fill="#d9cfbc" stroke="#8d6e63" stroke-width="3"/><path d="M60 10 98 70 H22 Z" fill="#b08968" stroke="#6d4c41" stroke-width="3"/><path d="M60 10 V70" stroke="#6d4c41" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="70" r="4" fill="#6d4c41"/></svg>'
        +propHTML+'</div>'
        +'<div class="sd-readout" id="sdReadout" aria-live="polite"></div>'
        +(g>=1?'<div class="sd-predict-row"><span class="sd-predict-label">First predict — then drag:</span>'+['Morning','Midday','Evening'].map(t=>'<button type="button" class="sd-predict-btn" data-t="'+t+'" aria-pressed="false" data-speak="Predict '+t+'">'+t+'</button>').join('')+'</div>':'')
        +'<button type="button" class="lab-action sd-check" id="sdCheck" data-speak="Check my shadow">Check my shadow!</button>'
        +'<div class="result" id="sdResult" aria-live="polite"></div>'
        +'</div></div>';
        setProgress();
        let sunT=0.5,predict=null;
        const sun=$('#sdSun'),sky=$('#sdSky'),shadow=$('#sdShadow'),readout=$('#sdReadout'),result=$('#sdResult');
        function paint(){
          const gm=sdGeom(sunT),lenPct=(gm.L/3.6)*40;
          sun.style.left=(8+sunT*84)+'%';sun.style.top=(76-gm.e*54)+'%';
          shadow.style.width=lenPct+'%';
          shadow.style.left=gm.dir==='E'?'50%':(50-lenPct)+'%';
          const desc=gm.k<0.25?'tiny':gm.k<0.6?'medium':'stretched long';
          readout.textContent='Sky: '+gm.tod+' · shadow looks '+desc;
          sun.setAttribute('aria-label','The sun sits at '+gm.tod+'. The shadow looks '+desc+'. Arrow keys move the sun.');
        }
        paint();
        let dragging=false;
        function moveFromEvent(e){const r=sky.getBoundingClientRect();sunT=clamp((e.clientX-r.left)/r.width,0.02,0.98);paint();}
        sky.addEventListener('pointerdown',e=>{if(state.locked)return;dragging=true;sky.setPointerCapture(e.pointerId);moveFromEvent(e);});
        sky.addEventListener('pointermove',e=>{if(dragging)moveFromEvent(e);});
        sky.addEventListener('pointerup',()=>{dragging=false;});
        sky.addEventListener('pointercancel',()=>{dragging=false;});
        sun.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){sunT=clamp(sunT+(e.key==='ArrowLeft'?-0.06:0.06),0.02,0.98);paint();speak(readout.textContent);e.preventDefault();}});
        $$('.sd-predict-btn',panel).forEach(b=>b.onclick=()=>{if(state.locked)return;$$('.sd-predict-btn',panel).forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false');});b.classList.add('selected');b.setAttribute('aria-pressed','true');predict=b.dataset.t;speak('You predict '+predict+'.');});
        $('#sdCheck').onclick=()=>{if(state.locked)return;
          const gm=sdGeom(sunT);let sunOK=false,why='';
          if(cfg.k==='long'){sunOK=gm.k>=0.70;why='Look at that stretch! When the sun rides low in the morning or evening, shadows grow long.';}
          else if(cfg.k==='short'){sunOK=gm.k<=0.30;why='Tiny shadow! A high sun presses shadows down short.';}
          else if(cfg.k==='hide'){sunOK=gm.L<=1.12;why='It hid! At noon the sun is almost overhead, so the shadow tucks right under its object.';}
          else{sunOK=Math.abs(sunT-needT)<=tol;why=prop.side==='right'?'Can you see how the morning sun leans the shadow west toward '+prop.label+'? Morning sun comes from the east, so shadows fall west.':'Can you see how the evening sun leans the shadow east toward '+prop.label+'? Evening sun sits in the west, so shadows stretch east.';}
          let predOK=true,predLine='';
          if(g>=1){
            if(!predict){toast('Make a prediction first — Morning, Midday, or Evening?');speak('Make a prediction first: Morning, Midday, or Evening?');return;}
            const expected=cfg.k==='touch'?(prop.side==='right'?'Morning':'Evening'):cfg.k==='long'?(gm.tt<0.5?'Morning':'Evening'):'Midday';
            predOK=predict===expected;
            predLine=predOK?'Your prediction was right: '+expected+'! ':'';
          }
          const success=sunOK&&predOK;
          const line=success?'Shadow win! '+predLine+why:'Nice try! '+(sunOK?'But check your prediction — ':'The sun needs another nudge — ')+why;
          result.innerHTML='<strong>'+(success?'Shadow win!':'Nice try!')+'</strong> '+predLine+why;
          speak(line);
          labOutcome(renderShadowSundial,success,$('#sdCheck'),line);
        };
      }
      /* ── BUILD-A-BUG ── */
      const bbInsects=[
        [['ladybug','#2b2d42','#2b2d42','#e63946','#1b1d26','spots'],['honeybee','#2b2d42','#2b2d42','#ffbd3e','#2b2d42','bands'],['garden beetle','#3e4d2b','#34431f','#5c7034','#7ba05b','dots'],['blue butterfly','#2b2d42','#3a3f66','#7ea3f5','#d6e6ff','wingspots'],['chirpy cricket','#232d1f','#2c3527','#5a8a3a','#3a5a27','plain'],['tiny ant','#4d2f1f','#5a3a26','#6b4228','#2f1d12','plain']],
        [['firefly','#2b2d42','#2b2d42','#e8c547','#2b2d42','tip'],['grasshopper','#2f4a1f','#2f4a1f','#5a8a3a','#1d2f12','bands'],['dragonfly','#1f5a6b','#1f5a6b','#8ad0e6','#0f3a47','bands'],['silk moth','#6b5a44','#6b5a44','#d8cdb4','#4a3f2f','bands'],['stick insect','#5a4a2b','#5a4a2b','#8a7346','#3e3220','plain'],['paper wasp','#2b2d42','#2b2d42','#e8a13a','#2b2d42','bands']],
        [['praying mantis','#2f5a2b','#2f5a2b','#6ba85e','#1a3a17','plain'],['cicada','#3a3f55','#3a3f55','#8f96ad','#262a3a','bands'],['garden aphid','#6ba23a','#6ba23a','#9fd18a','#4a7326','dots'],['termite','#8a7346','#8a7346','#d8c493','#5a4a2b','bands'],['lacewing','#3f6b4f','#3f6b4f','#a9d8a4','#2b4a38','plain'],['click beetle','#2b2d42','#2b2d42','#5a6b8a','#1a1b2b','bands']],
        [['weevil','#4a3a2b','#4a3a2b','#8a7346','#2b2118','spots'],['jewel beetle','#146b5a','#146b5a','#3fa97f','#0a4036','plain'],['soldier beetle','#2b2d42','#2b2d42','#c96f2e','#2b2d42','bands'],['stinkbug','#3a4a2b','#3a4a2b','#7a8a4a','#232d1a','plain'],['leafhopper','#2b7a4a','#2b7a4a','#8ae6a3','#1a5533','plain'],['velvet ant','#6b2a1a','#6b2a1a','#d95a3a','#3a1710','bands']]
      ];
      const bbFacts=[[],[],
        ['A praying mantis grabs passing flies with its super arms!','Cicadas sing with special sound organs on their bellies!','Aphids sip plant juice with straw-like mouths!','Termites march as a team to build huge homes!','Lacewing babies gobble the tiny bugs that hurt gardens!','A click beetle jumps away from danger with a loud CLICK!'],
        ['A weevil\u2019s long snout helps it eat and lay eggs in seeds!','Jewel beetles shine like rainbows from their hard shells!','Soldier beetles guard gardens by eating plant eaters!','A stinkbug smells on purpose so big animals leave it alone!','A leafhopper jumps forty times its own body length!','A velvet ant is not an ant at all — it is a wasp in a fuzzy coat!']
      ];
      const bbKudos=['Wiggle-wiggle, it is alive!','Your insect has all its parts!','Six legs, two wings — insect ready!','Look at those wiggly antennae!','A bug-built masterpiece!','The head, the thorax, the abdomen — perfect!'];
      const bbAlias=['Dazzle','Pip','Twizzle','Sunbeam','Zoom','Petal','Tinker','Wobble'];
