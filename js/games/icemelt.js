      function imAthleteArt(name){
        const iceF='fill="#bfe6ff" stroke="#5a9bd4" stroke-width="3"';
        switch(name){
          case 'ice heart':return `<path d='M48 78c-14-10-26-20-26-32a13 13 0 0 1 24-5 13 13 0 0 1 24 5c0 12-12 22-22 32z' ${iceF}/>`;
          case 'ice fish':return `<path d='M20 48q14-18 34-14l-8 14 8 14q-20 4-34-14z' ${iceF}/><path d='M70 48l14-10v20z' ${iceF}/>`;
          case 'ice star':return `<path d='M48 14l8 18 20 2-15 13 5 19-18-10-18 10 5-19-15-13 20-2z' ${iceF}/>`;
          case 'ice flower':return `<ellipse cx='48' cy='30' rx='10' ry='14' ${iceF}/><ellipse cx='30' cy='48' rx='14' ry='10' ${iceF}/><ellipse cx='66' cy='48' rx='14' ry='10' ${iceF}/><ellipse cx='48' cy='66' rx='10' ry='14' ${iceF}/><circle cx='48' cy='48' r='9' fill='#eaf7ff' stroke='#5a9bd4' stroke-width='3'/>`;
          case 'ice boat':return `<path d='M22 58l8 18h36l8-18z' ${iceF}/><rect x='44' y='16' width='6' height='42' fill='#8fc7e8' stroke='#5a9bd4' stroke-width='2'/><path d='M50 18l18 12-18 12z' ${iceF}/>`;
          case 'ice castle':return `<rect x='30' y='38' width='36' height='38' ${iceF}/><path d='M30 38v-10h6v-6h6v6h6v-6h6v6h6v-6h6v6h6v10' fill='none' stroke='#5a9bd4' stroke-width='4' stroke-linejoin='round'/><rect x='42' y='58' width='12' height='18' rx='5' fill='#8fc7e8'/>`;
          case 'ice moon':return `<path d='M58 16a30 30 0 1 0 18 54 24 24 0 0 1-18-54z' ${iceF}/>`;
          case 'ice donut':return `<circle cx='48' cy='50' r='26' ${iceF}/><circle cx='48' cy='50' r='11' fill='#eef7ff' stroke='#5a9bd4' stroke-width='3'/>`;
          case 'ice shark':return `<path d='M14 56q20-24 44-16l-8 10 10 8q-26 8-46-2z' ${iceF}/><path d='M66 40l14-12-4 14z' ${iceF}/><circle cx='36' cy='50' r='2' fill='#2b2d42'/>`;
          case 'ice swan':return `<path d='M36 70q-6-20 8-28 8-5 6-16 0-6 6-6 5 0 5 5l-6 5q6 2 5 10-8 10-16 10l4 20z' ${iceF}/><path d='M20 70h52' stroke='#5a9bd4' stroke-width='4'/>`;
          case 'ice bracelet':return `<circle cx='48' cy='50' r='26' fill='none' stroke='#9fd8ff' stroke-width='13'/><circle cx='48' cy='24' r='4' fill='#5a9bd4'/><circle cx='74' cy='50' r='4' fill='#5a9bd4'/><circle cx='48' cy='76' r='4' fill='#5a9bd4'/><circle cx='22' cy='50' r='4' fill='#5a9bd4'/>`;
          case 'ice skate':return `<path d='M30 40q2-20 16-20 10 0 10 10v20l-26-10z' ${iceF}/><path d='M24 66h48' stroke='#5a9bd4' stroke-width='6' stroke-linecap='round'/><path d='M34 66v-10M56 66v-10' stroke='#5a9bd4' stroke-width='4'/>`;
          case 'ice helm':return `<path d='M28 56a20 20 0 0 1 40 0z' ${iceF}/><path d='M48 36v20' stroke='#5a9bd4' stroke-width='5'/><circle cx='40' cy='46' r='3' fill='#2b2d42'/><circle cx='56' cy='46' r='3' fill='#2b2d42'/>`;
          case 'snow cone':return `<path d='M32 48l16 34 16-34z' ${iceF}/><path d='M32 48a16 12 0 0 1 32 0z' ${iceF}/><circle cx='48' cy='38' r='6' fill='#ff9ff3' stroke='#d15bc9' stroke-width='2'/>`;
          case 'ice robot':return `<rect x='32' y='16' width='32' height='24' rx='6' ${iceF}/><rect x='32' y='44' width='32' height='28' rx='6' ${iceF}/><circle cx='41' cy='28' r='3' fill='#2b2d42'/><circle cx='55' cy='28' r='3' fill='#2b2d42'/><path d='M42 34h12' stroke='#5a9bd4' stroke-width='3'/><rect x='28' y='46' width='6' height='18' rx='3' fill='#8fc7e8'/><rect x='62' y='46' width='6' height='18' rx='3' fill='#8fc7e8'/>`;
          case 'ice rocket':return `<path d='M48 12c12 0 18 14 18 28l-18 34-18-34c0-14 6-28 18-28z' ${iceF}/><circle cx='48' cy='38' r='6' fill='#eaf7ff' stroke='#5a9bd4' stroke-width='2'/><path d='M34 58l-10 14 12-6zM62 58l10 14-12-6z' ${iceF}/>`;
          default:return `<circle cx='48' cy='50' r='28' ${iceF}/>`;
        }
      }
      function imCube(athlete,p){
        const core=imAthleteArt(athlete);
        const sc=(1-p*.75).toFixed(3);
        const wob=`rotate(${(p*90).toFixed(1)} 48 50)`;
        return `<svg viewBox='0 0 96 96' class='im-art'><ellipse cx='48' cy='82' rx='${20+p*14}' ry='${5+p*3}' fill='#bfe6ff' opacity='${(p*.8).toFixed(2)}'/><g transform='${wob} translate(48 52) scale(${sc}) translate(-48 -52)' opacity='${(1-p*.55).toFixed(2)}'>${core}</g></svg>`;
      }
      function imWinnerArt(kind){
        if(kind==='trophy')return `<svg viewBox='0 0 96 96' class='im-trophy'><path d='M34 18h28v18a14 14 0 0 1-28 0z' fill='#ffd60a' stroke='#d9a700' stroke-width='3'/><path d='M34 24h-8a6 8 0 0 0 8 16M62 24h8a6 8 0 0 1-8 16' fill='none' stroke='#d9a700' stroke-width='4'/><rect x='44' y='48' width='8' height='14' fill='#d9a700'/><rect x='32' y='62' width='32' height='8' rx='4' fill='#c0804f'/></svg>`;
        return `<svg viewBox='0 0 96 96' class='im-trophy'><rect x='30' y='24' width='36' height='26' rx='6' fill='#8fd3f7' stroke='#5a9bd4' stroke-width='3'/><path d='M40 52h16M40 58h16' stroke='#5a9bd4' stroke-width='3'/><path d='M38 68q10-6 20 0' stroke='#ffd60a' stroke-width='5' fill='none' stroke-linecap='round'/></svg>`;
      }
      function renderIceMelt(){
        const i=lessonIndex(),g=state.grade;
        const athlete=imAthletes[g][i%4],venue=imVenues[i%6];
        const condObj=imConds[g];const labels=Object.keys(condObj);const times=labels.map(l=>condObj[l]);
        const racing=[...labels];
        const base=[...times].sort((a,b)=>a-b);
        const map={};labels.forEach(l=>{map[l]=condObj[l];});
        const pickLast=imPickLast[g]===1;
        const answerLabels=racing.slice().sort((a,b)=>map[a]-map[b]);
        const firstLbl=answerLabels[0],lastLbl=answerLabels[answerLabels.length-1];
        const shuffled=shuffle(racing);
        let prediction=null,racing_=false,finished=false;
        const prompt=pickLast?`Welcome to the ${venue}! Four freezing sculptures are racing to melt — and this time you are betting on the ${'<b>last</b>'} one standing. Pick a lane before the race begins!`:`Welcome to the ${venue}! ${labels.length} freezing sculptures are racing to melt. Pick the lane you think will melt <b>first</b> before the race begins!`;
        panel.innerHTML=progressMarkup()+`<h2 class="prompt" data-speak="Pick the lane that will melt ${pickLast?'last':'first'}, then start the race.">Pick the ${pickLast?'<b>last</b>':'<b>first</b>'} one to melt at the ${venue}!</h2><p class="lab-instruction">Study the lanes. Then tap your pick and hit <em>START!</em> to watch the race.</p><div class="lab-stage"><div class="im-track" id="imTrack">${shuffled.map((l,k)=>`<button class="im-lane" data-label="${l}" data-t="${map[l]}" type="button" aria-label="Lane: ${l}"><span class="im-lane-num">${k+1}</span><div class="im-lane-melt" id="imMelt${k}"></div><div class="im-lane-tag" style="background:${imCondMeta[l][1]}"><span class="im-emoji">${imCondMeta[l][0]}</span><span class="im-label">${l}</span></div><div class="im-cube-slot" id="imSlot${k}">${imCube(athlete,0)}</div></button>`).join('')}</div><button class="lab-action im-start" id="imStart" disabled type="button">START! 🏁</button><p class="science-result" id="imResult" role="status">Tap the lane you predict melts ${pickLast?'<b>last</b>':'<b>first</b>'}.</p></div>`;
        setProgress();
        const lanes=$$('.im-lane',panel),startBtn=$('#imStart',panel),result=$('#imResult',panel);
        const venueSay=`${venue} Ice Melt Race. Pick a lane.`;
        lanes.forEach(lane=>{
          lane.addEventListener('click',()=>{
            if(racing_||finished||state.locked)return;
            prediction=lane.dataset.label;lanes.forEach(l=>l.classList.toggle('picked',l===lane));
            startBtn.disabled=false;
            result.innerHTML=`Your pick: <b>${prediction}</b> melts ${pickLast?'<b>last</b>':'<b>first</b>'}. Tap START when you're ready!`;
            speak(`You picked ${prediction} to melt ${pickLast?'last':'first'}. Press START.`);
          });
        });
        function meltDuration(label){
          const t=map[label];const base=2600;
          return base*t;
        }
        startBtn.addEventListener('click',()=>{
          if(racing_||finished||!prediction||state.locked)return;racing_=true;startBtn.disabled=true;
          lanes.forEach(l=>{l.classList.add('running');l.setAttribute('aria-disabled','true');});
          result.textContent='🏁 And they\'re melting! Who goes first...?';speak('And they\'re melting!');
          const laneStates=lanes.map(lane=>({label:lane.dataset.label,T:meltDuration(lane.dataset.label),p:0,done:false,el:lane}));
          const order=laneStates.slice().sort((a,b)=>a.T-b.T);
          const firstDone=order[0],lastDone=order[order.length-1];
          const t0=performance.now();
          function tick(now){
            const elapsed=now-t0;let allDone=true;
            laneStates.forEach(st=>{
              if(st.done)return;
              const raw=elapsed/st.T;
              if(raw>=1){st.p=1;st.done=true;
                const slot=st.el.querySelector('.im-cube-slot');if(slot)slot.innerHTML=imCube(athlete,1);
                const meltEl=st.el.querySelector('.im-lane-melt');if(meltEl)meltEl.style.width='100%';
                if(st===firstDone){st.el.classList.add('first');const tag=document.createElement('div');tag.className='im-flag';tag.textContent=pickLast?'🌊 gone first!':'🏆 first melted!';st.el.appendChild(tag);sciSplash();}
                if(st===lastDone){st.el.classList.add('last');const tag=document.createElement('div');tag.className='im-flag';tag.textContent=pickLast?'❄️ last one standing!':'🌊 last to melt!';st.el.appendChild(tag);sciSplash();}
              }else{allDone=false;st.p=Math.min(1,raw);const ease=st.p*st.p*(3-2*st.p);const slot=st.el.querySelector('.im-cube-slot');if(slot&&st.p>0.02)slot.innerHTML=imCube(athlete,ease);const meltEl=st.el.querySelector('.im-lane-melt');if(meltEl)meltEl.style.width=(ease*100)+'%';}
            });
            if(allDone){
              finished=true;
              const answer=pickLast?lastDone.label:firstDone.label;
              const correct=prediction===answer;
              const fact=`Salt breaks the ice's lattice — it melts fastest in every race! Shade keeps the ice cold, so it always melts last.`;
              const headline=correct?`You nailed it! The lane under <b>${answer}</b> melts ${pickLast?'<b>last — exactly your pick!</b>':'<b>first — exactly your pick!</b>'}`:`So close! Your pick, ${prediction}, melted near the ${laneStates.findIndex(s=>s.label===prediction)+1}${ordinal(laneStates.findIndex(s=>s.label===prediction)+1)} spot. The ${firstLbl}-lane melts <b>first</b> and the ${lastLbl}-lane melts <b>last</b>.`;
              result.innerHTML=`<strong>${correct?'Winner, winner!':'Great race!'}</strong> ${headline} ${fact}`;
              speak(`${correct?'Winner winner!':'Great race!'} ${fact}`);
              const headlinePlain=headline.replace(/<\/?b>/g,'');
              labOutcome(renderIceMelt,correct,startBtn,`${headlinePlain} ${fact}`);
            }else requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }
      