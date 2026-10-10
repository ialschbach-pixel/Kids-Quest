      function ssPick(i,g){const e=ssPlants[g][i%12];return {name:e[0],art:e[1],water:e[2],sun:e[3],food:e[4]};}
      const ssWaterWords={0:["Dry soil","A mist of water","A soaking splash"],1:["Bone-dry","A gentle mist","A deep soak"],2:['"', '', ''],3:['','','']};
      const ssSunWords={0:["lights-off dark","cloudy shade","bright sun"],1:["nighttime dark","a shady nook","full sun"],2:['',''],3:['','']};
      const ssWaterSeg={0:["Dry","Misty","Soaked"],1:["Dry","Misty","Soaked"],2:["Parched","Misty","Drenched"],3:["Arid","Misty","Saturated"]};
      const ssSunSeg={0:["Night","Cloudy","Full Sun"],1:["Night","Cloudy","Full Sun"],2:["Moonlit","Overcast","Full Sun"],3:["Cavern","Overcast","Blazing"]};
      const ssFoodSeg=["No Snacks","One Snack","Feast 🥘"];
      const ssWIcon=["🏜️","💧","🌊"],ssSIcon=["🌙","⛅","☀️"],ssFIcon=["🚫","🍪","🥘"];
      const ssRiddleW=[
        ["I hate wet roots — keep me desert dry!","I sip, never gulp — damp soil makes me happy!","I am thirsty! I drink like a little pond!"],
        ["I am a camel — water me with an eyedropper!","I take the middle path — not parched, not soaked.","I am a frog in a puddle — keep the water coming!"]
      ];
      const ssRiddleS=[
        ["Direct sun would burn me — I sprawl in cool shade.","Soft morning light suits me — no blazing afternoons.","I face the sun all day and beg for more!"],
        ["I am a bat — keep me out of the sun!","I am a morning owl — gentle light only.","I am a sunflower best friend — give me full blast!"]
      ];
      const ssRiddleF=["No snacks for me — I make my own dinner!","A spoonful of plant snack keeps me perky!","I am growing big — I need a full feeding!"];
      const ssDirFrames=[
        (n,w,s)=>`🌱 ${n} needs ${w} and ${s}.`,
        (n,w,s)=>`Good thinking! ${n} grows best with ${w} and ${s}.`,
        (n,w,s)=>`Here is the clue: ${n} loves ${w} and ${s}!`,
        (n,w,s)=>`Listen closely — ${n} needs ${w} and ${s}.`
      ];
      function ssRiddleG3(name,w,s,f){
        const wLine=ssRiddleW[1][w].split('— ')[1]||ssRiddleW[1][w];
        const sLine=ssRiddleS[1][s].split('— ')[1]||ssRiddleS[1][s];
        return `🧪 Gardener's riddle for <b>${name}</b>: ${ssRiddleW[1][w]} ${ssRiddleS[1][s]} ${ssRiddleF[f]}`;
      }
      function ssPlant(type,stage,stress){
        const wob=stress>=2?` transform="rotate(${stress%2?7:-7} 48 60)"`:'';
        if(stage===0)return `<svg viewBox='0 0 96 96' class='ss-plant'><ellipse cx='48' cy='72' rx='26' ry='10' fill='#6b4a2a'/><ellipse cx='48' cy='66' rx='9' ry='6' fill='#c99a4f' stroke='#8a5a14' stroke-width='2'/></svg>`;
        if(stage===1)return `<svg viewBox='0 0 96 96' class='ss-plant'><line x1='48' y1='74' x2='48' y2='48' stroke='#4d7c3a' stroke-width='5' stroke-linecap='round'/><path d='M48 56q-12-2-16-12 12-2 16 12zM48 56q12-2 16-12-12-2-16 12z' fill='#6fbf58' stroke='#4d7c3a' stroke-width='2'/></svg>`;
        const sc=scaleOnly(Math.min(1,.65+stage*.12));
        function scaleOnly(f){return `${f}`;}
        const body={
          flower:`<line x1='48' y1='78' x2='48' y2='36' stroke='#4d7c3a' stroke-width='6' stroke-linecap='round'/><path d='M48 62q-14-2-20-14 14-2 20 14z' fill='#6fbf58'/><g><circle cx='48' cy='26' r='7' fill='#ffd60a'/><ellipse cx='48' cy='10' rx='7' ry='9' fill='#ff5d8f'/><ellipse cx='48' cy='42' rx='7' ry='9' fill='#ff5d8f'/><ellipse cx='32' cy='26' rx='9' ry='7' fill='#ff5d8f'/><ellipse cx='64' cy='26' rx='9' ry='7' fill='#ff5d8f'/></g>`,
          bulb:`<ellipse cx='48' cy='70' rx='12' ry='10' fill='#d9a066' stroke='#9c6b30' stroke-width='2'/><line x1='48' y1='62' x2='48' y2='32' stroke='#4d7c3a' stroke-width='5'/><path d='M48 48q-12-4-14-16 12 2 14 16zM48 48q12-4 14-16-12 2-14 16z' fill='#6fbf58'/><circle cx='48' cy='26' r='8' fill='#ffca3a' stroke='#d9a700' stroke-width='2'/><circle cx='48' cy='26' r='3' fill='#e63946'/>`,
          vine:`<path d='M48 78 Q40 50 48 20 Q54 38 66 40' fill='none' stroke='#4d7c3a' stroke-width='6' stroke-linecap='round'/><path d='M44 58q-10-2-12-12 10 0 12 12zM56 40q10-2 12-12-10 0-12 12zM50 68q10-2 12-12-10 0-12 12z' fill='#6fbf58'/><circle cx='56' cy='30' r='5' fill='#e63946'/><circle cx='62' cy='38' r='4' fill='#e63946'/>`,
          root:`<path d='M48 50q-6-14-16-18M48 50q6-14 16-18M48 50v-20M48 50q2-12-8-20' stroke='#4d7c3a' stroke-width='5' fill='none' stroke-linecap='round'/><path d='M48 50q-4 12-10 16M48 50q4 12 10 16M48 50v18' stroke='#9c6b30' stroke-width='3' stroke-linecap='round'/><ellipse cx='48' cy='30' rx='16' ry='8' fill='#6fbf58'/>`,
          tuft:`<path d='M40 74q-4-24 2-36M48 74q0-26-2-40M56 74q4-24 0-36' stroke='#4d7c3a' stroke-width='5' fill='none' stroke-linecap='round'/><path d='M36 60q8-4 14 0M46 58q8-4 14 0' stroke='#6fbf58' stroke-width='3' fill='none'/>`,
          bush:`<circle cx='38' cy='54' r='18' fill='#4d7c3a'/><circle cx='58' cy='54' r='18' fill='#4d7c3a'/><circle cx='48' cy='42' r='16' fill='#5d9348'/><circle cx='42' cy='48' r='3' fill='#8ecf60'/><circle cx='56' cy='44' r='3' fill='#8ecf60'/><rect x='44' y='66' width='8' height='12' fill='#6b4a2a'/>`,
          fern:`<path d='M48 78q-8-28-26-34M48 78q8-28 26-34M48 78v-40' stroke='#4d7c3a' stroke-width='5' fill='none' stroke-linecap='round'/><path d='M28 54l-8-4M28 54l-8 6M68 54l8-4M68 54l8 6M48 50l-8-4M48 50l8-4M48 58l-8-4M48 58l8-4' stroke='#6fbf58' stroke-width='3' stroke-linecap='round'/>`,
          moss:`<ellipse cx='48' cy='68' rx='28' ry='12' fill='#5d9348'/><circle cx='38' cy='62' r='3' fill='#8ecf60'/><circle cx='52' cy='66' r='3' fill='#8ecf60'/><circle cx='60' cy='60' r='2.5' fill='#8ecf60'/><circle cx='44' cy='58' r='2.5' fill='#a3e080'/>`,
          orchid:`<line x1='48' y1='78' x2='48' y2='40' stroke='#4d7c3a' stroke-width='5'/><ellipse cx='48' cy='26' rx='9' ry='12' fill='#ff9ff3' stroke='#d15bc9' stroke-width='2'/><ellipse cx='34' cy='32' rx='8' ry='10' fill='#ffc2fa'/><ellipse cx='62' cy='32' rx='8' ry='10' fill='#ffc2fa'/><circle cx='48' cy='34' r='5' fill='#d15bc9'/>`,
          pond:`<ellipse cx='48' cy='58' rx='28' ry='10' fill='#4d7c3a'/><ellipse cx='48' cy='56' rx='24' ry='9' fill='#6fbf58'/><path d='M48 56l-6-18 6-6 6 6z' fill='#ffb6d9'/><ellipse cx='42' cy='32' rx='6' ry='10' fill='#ff9ff3'/><ellipse cx='54' cy='32' rx='6' ry='10' fill='#ff9ff3'/><circle cx='48' cy='34' r='4' fill='#ffd60a'/>`,
          trap:`<path d='M48 70q-4-20-18-26M48 70q4-20 18-26' stroke='#4d7c3a' stroke-width='5' fill='none' stroke-linecap='round'/><path d='M16 34a18 18 0 0 1 36 0 0 0 0 0-36 0z' fill='#ff5d8f' stroke='#a62639' stroke-width='3'/><path d='M20 28l4-8M28 26l2-8M36 26l0-8M44 28l-2-8' stroke='#a62639' stroke-width='2'/><path d='M56 34a14 14 0 0 1 28 0 0 0 0 0-28 0z' fill='#ff5d8f' stroke='#a62639' stroke-width='3'/>`,
          pitcher:`<path d='M44 70q-4-30 4-44' stroke='#4d7c3a' stroke-width='5' fill='none'/><path d='M60 26q12 6 10 22-2 14-10 16-8-2-10-16 2-16 10-22z' fill='#ff8c2e' stroke='#c96f2e' stroke-width='3'/><ellipse cx='60' cy='26' rx='10' ry='5' fill='#c96f2e'/><path d='M60 22q-10-8-22-6' stroke='#4d7c3a' stroke-width='4' fill='none'/>`,
          cactus:`<rect x='44' y='30' width='9' height='44' rx='5' fill='#4d7c3a' stroke='#2f5a20' stroke-width='2'/><path d='M44 52q-12 0-12-12 0-4 4-4 4 4 4 8v8zM53 60q12 0 12-12 0-4-4-4-4 4-4 8v8z' fill='#5d9348' stroke='#2f5a20' stroke-width='2'/><circle cx='40' cy='30' r='5' fill='#ff5d8f'/><circle cx='62' cy='34' r='4' fill='#ff5d8f'/>`,
          fungus:`<rect x='43' y='56' width='10' height='18' rx='4' fill='#f0e6d6' stroke='#b89f74' stroke-width='2'/><path d='M26 58a22 14 0 0 1 44 0z' fill='#e63946' stroke='#a62639' stroke-width='3'/><circle cx='40' cy='48' r='4' fill='#fff'/><circle cx='56' cy='44' r='3' fill='#fff'/><circle cx='66' cy='52' r='2.5' fill='#fff'/>`,
          tree:`<rect x='44' y='52' width='8' height='24' rx='4' fill='#7c5230'/><circle cx='48' cy='36' r='22' fill='#4d7c3a'/><circle cx='36' cy='32' r='9' fill='#5d9348'/><circle cx='60' cy='30' r='8' fill='#5d9348'/>`
        };
        return `<svg viewBox='0 0 96 96' class='ss-plant'><g${wob}><g transform="translate(48 84) scale(${sc}) translate(-48 -84)">${body[type]||''}</g></g></svg>`;
      }
      let ssTrack='grow';window.kqSeedTrack='grow'; /* global mirror so skillTags.seedsprout reads the live track */
      const ssSeeds=[
        ['maple whirler','🍁','wind','It spins like a helicopter as it falls!'],
        ['cotton fluff','🌨️','wind','Soft fluff floats away on the breeze.'],
        ['milkweed silk','🪶','wind','Silky threads catch the wind and sail.'],
        ['coconut','🥥','water','It floats across the whole ocean!'],
        ['pond floater','🫧','water','It bobs along the stream to a new bank.'],
        ['sea bean','🫘','water','A tough coat for a long ocean ride.'],
        ['sticky burr','🪝','fur','Hooks grab onto passing animal fur.'],
        ['berry seed','🫐','fur','Birds eat the berry — the seed rides along!'],
        ['acorn','🌰','fur','Squirrels carry it off and forget where!'],
        ['pea popper','🫛','pop','The dry pod pops and flings its seeds!'],
        ['popping violet','💜','pop','Its pod snaps open with a tiny pop!'],
        ['lupine popper','🌸','pop','Dry, twist, POP — the seeds fly out!']
      ];
      const ssMethods=[
        ['wind','🌬️ Wind','Fluffy or winged seeds ride the air.'],
        ['water','🌊 Water','Floaty seeds sail streams and seas.'],
        ['fur','🐾 Animal fur','Sticky seeds hitch a ride.'],
        ['pop','💥 Pop!','Dry pods fling their seeds.']
      ];
      const ssFeatures=[
        ['wings','🪶 Fluffy wings','Catch the wind and soar far!'],
        ['hooks','🪝 Sticky hooks','Grab onto passing animal fur!'],
        ['float','🛟 Floaty coat','Bob along on water!'],
        ['spring','🌀 Springy pod','Dry, twist… POP! Fling far!']
      ];
      function ssTabs(){return `<div class="kq-tabs" role="tablist" aria-label="Seed Sprout tracks"><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${ssTrack==='grow'}" data-track="grow" type="button">🌱 Grow It</button><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${ssTrack==='travel'}" data-track="travel" type="button">🌬️ Seed Travelers</button><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${ssTrack==='parts'}" data-track="parts" type="button">🌿 Plant Parts</button></div>`;}
      function ssBindTabs(){$$('.kq-tab-btn[data-track]',panel).forEach(b=>b.onclick=()=>{ssTrack=b.dataset.track;window.kqSeedTrack=ssTrack;renderSeedSprout();});}
      function ssSeedByMethod(method,idx){const base={wind:0,water:3,fur:6,pop:9}[method];return ssSeeds[base+(idx%3)];}
      function renderSeedTravel(){
        const g=state.grade,i=lessonIndex();
        if(g===3){renderSeedDesign(i);return;}
        const picks=shuffle(['wind','water','fur','pop'].map(m=>ssSeedByMethod(m,i)));
        let sorted=0,sel=null;
        const methodName=k=>ssMethods.find(m=>m[0]===k)[1];
        panel.innerHTML=progressMarkup()+ssTabs()+`<h2 class="prompt">Before the sprout! Plants can't walk, so seeds hitch rides. Sort each seed by how it travels.${g===2?' Then watch every journey!':''}</h2><p class="lab-instruction">Tap a seed, then tap where it travels. You can also drag it!</p><div class="lab-stage"><div class="ss-seedrow">${picks.map(s=>`<button class="sort-item ss-seed" draggable="true" data-part="${s[2]}" data-name="${kqEsc(s[0])}" type="button" aria-label="${kqEsc(s[0])} seed"><span style="font-size:34px" aria-hidden="true">${s[1]}</span><span>${kqEsc(s[0])}</span></button>`).join('')}</div><div class="ss-binrow">${ssMethods.map(m=>`<div class="sort-zone ss-bin" data-accept="${m[0]}" role="button" tabindex="0" aria-label="${m[1]} travel bin"><strong>${m[1]}</strong><span class="ss-bin-sub">${m[2]}</span><div class="ss-bindrop"></div></div>`).join('')}</div><div class="ss-journey" id="ssJourney" aria-hidden="true"></div><p class="science-result" id="ssTrResult" role="status">Where does each seed want to go?</p>${g===2?'<button class="answer" id="ssWatch" type="button" disabled>▶️ Watch the journeys!</button>':''}</div>`;
        setProgress();ssBindTabs();
        const result=()=> $('#ssTrResult',panel),journey=()=> $('#ssJourney',panel);
        const seeds=$$('.ss-seed',panel),bins=$$('.ss-bin',panel);
        function place(seedEl,binEl){
          if(state.locked||seedEl.disabled)return;
          const ok=binEl.dataset.accept===seedEl.dataset.part;
          const seed=ssSeeds.find(s=>s[0]===seedEl.dataset.name);
          if(ok){
            seedEl.disabled=true;seedEl.classList.add('sorted');
            binEl.querySelector('.ss-bindrop').appendChild(seedEl);
            seedEl.draggable=false;seedEl.style.pointerEvents='none';
            sorted++;sciPop();sel=null;
            result().innerHTML=`<strong>Yes!</strong> ${kqEsc(seed[3])}`;
            speak(seed[3]);
            if(sorted>=4){
              if(g===2){result().innerHTML=`<strong>All sorted!</strong> Now watch how each seed travels!`;$('#ssWatch',panel).disabled=false;}
              else{result().innerHTML=`<strong>All sorted!</strong> Seeds travel so baby plants don't crowd their mom — more sun, more water, more room!`;speak('All sorted! Seeds travel so baby plants get sun, water, and room.');correctThen(renderSeedSprout,seedEl);}
            }else result().innerHTML+=` ${4-sorted} seed${4-sorted===1?'':'s'} to go.`;
          }else{
            wrong(seedEl);
            result().textContent=`Hmm — the ${seed[0]} doesn't travel that way. ${seedHint(seed[2])}`;
          }
        }
        function seedHint(m){return {wind:'Think fluffy or winged — what floats on air?',water:'Think floaty — what bobs on a stream?',fur:'Think sticky — what grabs onto fur?',pop:'Think dry pods — what goes POP?'}[m];}
        seeds.forEach(sd=>{
          sd.addEventListener('click',()=>{if(sd.disabled||state.locked)return;sel=sel===sd?null:sd;seeds.forEach(x=>x.classList.toggle('picked',x===sel));if(sel)speak(sel.dataset.name);});
          sd.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',sd.dataset.name));
        });
        bins.forEach(bn=>{
          bn.addEventListener('click',()=>{if(sel)place(sel,bn);});
          bn.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&sel){e.preventDefault();place(sel,bn);}});
          bn.addEventListener('dragover',e=>e.preventDefault());
          bn.addEventListener('drop',e=>{e.preventDefault();const sd=seeds.find(x=>x.dataset.name===e.dataTransfer.getData('text/plain'));if(sd)place(sd,bn);});
        });
        if(g===2){
          const watch=$('#ssWatch',panel);
          watch.addEventListener('click',()=>{
            if(watch.disabled||state.locked)return;watch.disabled=true;
            const seq=['wind','water','fur','pop'];let k=0;
            const icons={wind:['🌬️','💨'],water:['🌊','🫧'],fur:['🐕','🪝'],pop:['🌀','💥']};
            result().textContent=`Watch closely…`;
            (function step(){
              if(k>=seq.length){
                result().innerHTML=`<strong>What travelers!</strong> Wind, water, fur, and pop — four ways seeds find a new home before they sprout.`;
                speak('Wind, water, fur, and pop — four ways seeds travel!');
                journey().innerHTML='';correctThen(renderSeedSprout,watch);return;
              }
              const m=seq[k],sd=ssSeedByMethod(m,i);
              journey().innerHTML=`<div class="ss-jtrip"><span class="ss-jfrom">${icons[m][0]}</span><span class="ss-jseed" id="ssJSeed">${sd[1]}</span><span class="ss-jto">${icons[m][1]} new home!</span></div>`;
              const el=$('#ssJSeed',panel);el.style.transition='transform 1.1s ease';requestAnimationFrame(()=>{el.style.transform='translateX(120px)';});
              result().textContent=sd[3];speak(sd[3]);
              k++;setTimeout(step,1500);
            })();
          });
        }
      }
      function renderSeedDesign(i){
        const picked=new Set();
        panel.innerHTML=progressMarkup()+ssTabs()+`<h2 class="prompt">Seed engineer! Design a seed that travels the FARTHEST in the wind.</h2><p class="lab-instruction">Pick <strong>exactly 2</strong> features, then test your seed in the wind tunnel!</p><div class="lab-stage"><div class="answer-grid">${ssFeatures.map(f=>`<button class="answer ss-feat" data-f="${f[0]}" type="button"><span style="font-size:28px" aria-hidden="true">${f[1].split(' ')[0]}</span><span><strong>${f[1].slice(f[1].indexOf(' ')+1)}</strong><br><small>${f[2]}</small></span></button>`).join('')}</div><button class="answer" id="ssTest" type="button" disabled>Test in the wind! 🌬️</button><div class="ss-journey" id="ssJourney" aria-hidden="true"></div><p class="science-result" id="ssTrResult" role="status">Engineers test, watch, and redesign!</p></div>`;
        setProgress();ssBindTabs();
        const result=()=> $('#ssTrResult',panel),testBtn=$('#ssTest',panel);
        $$('.ss-feat',panel).forEach(b=>b.onclick=()=>{
          if(state.locked)return;
          const f=b.dataset.f;
          if(picked.has(f))picked.delete(f);else if(picked.size<2)picked.add(f);
          else{picked.delete([...picked][0]);picked.add(f);}
          $$('.ss-feat',panel).forEach(x=>x.classList.toggle('picked',picked.has(x.dataset.f)));
          testBtn.disabled=picked.size!==2;
          result().textContent=picked.size===2?`Ready to test: ${[...picked].map(p=>ssFeatures.find(x=>x[0]===p)[1]).join(' + ')}`:`Pick ${2-picked.size} more feature${2-picked.size===1?'':'s'}.`;
        });
        testBtn.onclick=()=>{
          if(testBtn.disabled||state.locked)return;
          const score={wings:3,spring:2,hooks:1,float:0};
          const total=[...picked].reduce((a,f)=>a+score[f],0);
          const dist=Math.round(total/5*100);
          const journey=$('#ssJourney',panel);
          journey.innerHTML=`<div class="ss-jtrip"><span class="ss-jfrom">🌬️</span><span class="ss-jseed" id="ssJSeed">🌰</span><div class="ss-jtrack"><div class="ss-jdist" id="ssJDist" style="width:0%"></div></div><span>🏁</span></div>`;
          const el=$('#ssJSeed',panel),bar=$('#ssJDist',panel);
          el.style.transition='transform 1.4s ease';bar.style.transition='width 1.4s ease';
          requestAnimationFrame(()=>{el.style.transform=`translateX(${dist*1.6}px)`;bar.style.width=dist+'%';});
          let verdict;
          if(total>=5)verdict=`<strong>WOW — ${dist}% of the meadow!</strong> Fluffy wings catch the wind and the springy pod gives a launching POP. Champion traveler!`;
          else if(total>=3)verdict=`<strong>Good flight — ${dist}%!</strong> ${picked.has('wings')?'Those fluffy wings really catch the wind!':'Add fluffy wings next time to catch more wind!'}`;
          else verdict=`<strong>Only ${dist}%.</strong> ${picked.has('float')?'A floaty coat is for water, not wind!':'Sticky hooks are for fur, not wind!'} Engineers redesign — fluffy wings love the wind.`;
          setTimeout(()=>{
            result().innerHTML=verdict+` Seeds travel so baby plants don't crowd their mom — more sun, more water, more room!`;
            speak(verdict.replace(/<[^>]+>/g,''));
            correctThen(renderSeedSprout,testBtn);
          },1600);
        };
      }
      function renderSeedParts(){
        const i=lessonIndex(),plant=plantNames[state.grade][i],x=plantJobs[state.grade][i%6],pool=plantJobs[state.grade].map(y=>y.part);
        const prompt=`Which part of the ${plant} does this job: ${x.job}?`,visual=`${plant} · ${x.job}`,correct=x.part;
        const opts=deterministicOptions(correct,pool,4,i);
        panel.innerHTML=progressMarkup()+ssTabs()+`<h2 class="prompt">${prompt}</h2><div class="visual-prompt">${visual}</div><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${kqEsc(o)}">${kqEsc(o)}</button>`).join('')}</div>`;
        setProgress();ssBindTabs();
        $$('.answer',panel).forEach(b=>b.onclick=()=>{if(b.dataset.value===String(correct)){correctThen(renderSeedSprout,b);speak('Yes! The '+correct+' '+x.job+'!');}else{wrong(b);toast('The '+b.dataset.value+' does a different job. Which part does this one?');}});
      }
      function renderSeedSprout(){
        if(ssTrack==='travel'){renderSeedTravel();return;}
        if(ssTrack==='parts'){renderSeedParts();return;}
        const i=lessonIndex(),g=state.grade,pl=ssPick(i,g);
        let wa=1,sa=1,fa=1,day=0,stage=0,stress=0,finished=false;
        let hint,g3f=false;
        if(g===0||g===1){hint=ssDirFrames[i%4](pl.name,ssWaterWords[g][pl.water],ssSunWords[g][pl.sun]);}
        else if(g===2){hint=`🧩 <b>${pl.name}</b> riddle: ${ssRiddleW[0][pl.water]} ${ssRiddleS[0][pl.sun]}`;}
        else{g3f=true;hint=ssRiddleG3(pl.name,pl.water,pl.sun,pl.food);}
        const prompt=`Grow one whole ${pl.name} from seed to full bloom! Set the care sliders, then press Pass a day to watch it grow.`;
        panel.innerHTML=progressMarkup()+ssTabs()+`<h2 class="prompt" data-speak="${pl.name}, a ${/orchid|trap|pitcher|fungus/.test(pl.art)?'curious plant':'plant'} seedling. Set the water and light sliders to grow it.">${prompt}</h2><p class="lab-instruction">Try a guess, press “Pass a day,” and watch how your seed answers!</p><div class="lab-stage"><div class="ss-sky"><div class="ss-sun" id="ssSun"></div><div class="ss-cloud" id="ssCloud">⛅</div><div class="ss-hero"><div class="ss-plantwrap" id="ssPlant"></div><div class="ss-soil" id="ssSoil"></div></div></div><div class="ss-sliders"><div class="ss-slider"><div class="ss-slider-head"><span>💧 Water</span></div><div class="ss-segs" role="group" aria-label="Water setting">${ssWaterSeg[g].map((l,k)=>`<button class="ss-seg-btn${k===1?' active':''}" data-kind="w" data-v="${k}" type="button" aria-label="Water: ${l}">${ssWIcon[k]}<span>${l}</span></button>`).join('')}</div></div><div class="ss-slider"><div class="ss-slider-head"><span>☀️ Daylight</span></div><div class="ss-segs" role="group" aria-label="Daylight setting">${ssSunSeg[g].map((l,k)=>`<button class="ss-seg-btn${k===1?' active':''}" data-kind="s" data-v="${k}" type="button" aria-label="Daylight: ${l}">${ssSIcon[k]}<span>${l}</span></button>`).join('')}</div></div>${g===3?`<div class="ss-slider"><div class="ss-slider-head"><span>🥘 Plant food</span></div><div class="ss-segs" role="group" aria-label="Plant food setting">${ssFoodSeg.map((l,k)=>`<button class="ss-seg-btn${k===1?' active':''}" data-kind="f" data-v="${k}" type="button" aria-label="Plant food: ${l}">${ssFIcon[k]}<span>${l}</span></button>`).join('')}</div></div>`:''}</div><p class="ss-hint" id="ssHint">${hint}</p><button class="lab-action ss-days-btn" id="ssDay" type="button">Pass a day ⏳</button><div class="ss-log" id="ssLog" role="status" aria-live="polite"></div><p class="science-result" id="ssResult">Your seed is tucked in soil. Days of care: <b id="ssDayCount">0 of 5</b>.</p></div>`;
        setProgress();
        const plantEl=$('#ssPlant',panel),soil=$('#ssSoil',panel),sun=$('#ssSun',panel),cloud=$('#ssCloud',panel),log=$('#ssLog',panel),dayBtn=$('#ssDay',panel),dayCount=$('#ssDayCount',panel),result=$('#ssResult',panel);
        const icons={w:ssWIcon,s:ssSIcon,f:ssFIcon},labels={w:ssWaterSeg[g],s:ssSunSeg[g],f:ssFoodSeg};
        function renderPlant(){plantEl.innerHTML=ssPlant(pl.art,stage,stress);soil.className='ss-soil soil-'+wa;sun.style.opacity=sa===2?1:sa===1?.6:.15;sun.style.transform=`scale(${sa===2?1:.75})`;cloud.style.opacity=sa===0?.9:sa===1?.7:.25;}
        function setBtn(target){
          if(finished||state.locked)return;const kind=target.dataset.kind,v=+target.dataset.v;
          if(kind==='w')wa=v;if(kind==='s')sa=v;if(kind==='f')fa=v;
          $$(`.ss-seg-btn[data-kind="${kind}"]`,panel).forEach(b=>b.classList.toggle('active',b===target));
          result.textContent=`Okay — ${{w:'water',s:'daylight',f:'plant food'}[kind]} set to ${icons[kind][v]} ${labels[kind][v]}.`;renderPlant();sciPop();
        }
        $$('.ss-seg-btn',panel).forEach(b=>b.addEventListener('click',()=>setBtn(b)));
        function passDay(){
          if(finished||state.locked)return;day++;dayCount.textContent=`${day} of 5`;
          const waterOK=wa===pl.water,sunOK=sa===pl.sun,foodOK=g<3||fa===pl.food;
          const allOK=waterOK&&sunOK&&foodOK;
          let note,cls;
          if(allOK){stage=Math.min(5,stage+1);note=`Day ${day}: 🌱 Your seed drank it in — the ${pl.name} is thriving!`;cls='good';sciPop();}
          else{stress++;note=`Day ${day}: ⚠️ `;const needs=[];
            if(!waterOK)needs.push(wa<pl.water?'the soil is too dry — raise the water!':'the soil is soggy — lower the water!');
            if(!sunOK)needs.push(sa<pl.sun?'too dark — give it more daylight!':'too much sun — pull the shade down!');
            if(!foodOK)needs.push(fa<pl.food?'the plant is hungry — add more plant food!':'too rich! the roots feel stuffed — cut the food!');
            note+=`The ${pl.name} looks droopy — ${needs.join(' ')}`;cls='warn';}
          const li=document.createElement('p');li.className='ss-logline '+cls;li.innerHTML=note;log.appendChild(li);
          renderPlant();
          if(day>=5){
            finished=true;dayBtn.disabled=true;
            const win=stage>=5;
            const msg=win?`Magnificent! You grew a full ${pl.name} in 5 days!`:`Oh no — the ${pl.name} did not finish growing. But you discovered how to read a plant's needs! Scientists record what helps.`;
            result.innerHTML=`<strong>${win?'Beautiful bloom!':'A learning sprout!'} </strong>${msg}`;
            speak(`${win?'Beautiful bloom!':'A learning sprout!'} ${msg}`);
            labOutcome(renderSeedSprout,win,dayBtn,msg);
          }else{
            result.textContent=`${allOK?'Thriving!':'Look at the clues — adjust a slider and pass another day.'} Days used: ${day} of 5.`;
            speak(`${allOK?'Your seed is thriving!':'Look at the clues and adjust a slider.'} Day ${day} of 5.`);
          }
        }
        renderPlant();dayBtn.addEventListener('click',passDay);
        ssBindTabs();
      }

      /* ── COLOR MIX LAB ── */
