      function dsSvgSun(){return `<svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true" style="vertical-align:-4px"><circle cx="24" cy="24" r="10" fill="#ffd94d" stroke="#e8a800" stroke-width="2"/><g stroke="#ffb700" stroke-width="3" stroke-linecap="round"><line x1="24" y1="5" x2="24" y2="11"/><line x1="24" y1="37" x2="24" y2="43"/><line x1="5" y1="24" x2="11" y2="24"/><line x1="37" y1="24" x2="43" y2="24"/><line x1="11" y1="11" x2="15" y2="15"/><line x1="33" y1="33" x2="37" y2="37"/><line x1="37" y1="11" x2="33" y2="15"/><line x1="15" y1="33" x2="11" y2="37"/></g></svg>`;}
      function dsSvgSnow(){return `<svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true" style="vertical-align:-4px"><g stroke="#7ec8f7" stroke-width="4" stroke-linecap="round"><line x1="24" y1="8" x2="24" y2="40"/><line x1="10" y1="16" x2="38" y2="32"/><line x1="38" y1="16" x2="10" y2="32"/></g><circle cx="24" cy="24" r="5" fill="#bfe6ff" stroke="#7ec8f7" stroke-width="2"/></svg>`;}
      function dsSvgThermo(){return `<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" style="vertical-align:-3px"><rect x="7" y="2" width="6" height="11" rx="3" fill="#dfe7ef" stroke="#8a9bb0" stroke-width="1.5"/><circle cx="10" cy="14" r="4.5" fill="#e63946"/><rect x="8.8" y="6" width="2.4" height="8" fill="#e63946"/></svg>`;}
      function dsSvgSunBig(){return `<svg width="52" height="52" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="10" fill="#ffd94d" stroke="#e8a800" stroke-width="2"/><g stroke="#ffb700" stroke-width="3" stroke-linecap="round"><line x1="24" y1="5" x2="24" y2="11"/><line x1="24" y1="37" x2="24" y2="43"/><line x1="5" y1="24" x2="11" y2="24"/><line x1="37" y1="24" x2="43" y2="24"/><line x1="11" y1="11" x2="15" y2="15"/><line x1="33" y1="33" x2="37" y2="37"/><line x1="37" y1="11" x2="33" y2="15"/><line x1="15" y1="33" x2="11" y2="37"/></g></svg>`;}
      let dsTrack='daynight';
      function dsTabs(){return `<div class="kq-tabs" role="tablist" aria-label="Day Sky tracks"><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${dsTrack==='daynight'}" data-track="daynight" type="button">${dsSvgSun()} Day &amp; Night</button><button class="kq-mini-btn alt kq-tab-btn" role="tab" aria-selected="${dsTrack==='seasons'}" data-track="seasons" type="button">${dsSvgThermo()} Summer &amp; Winter</button></div>`;}
      function dsBindTabs(){$$('.kq-tab-btn[data-track]',panel).forEach(b=>b.onclick=()=>{dsTrack=b.dataset.track;renderDaySky();});}
      function renderSummerWinter(){
        const g=state.grade,i=lessonIndex(),mystery=g>=2;
        let season=mystery?(i%2?'summer':'winter'):'summer';
        let exploredS=false,exploredW=false,predicted=null,finished=false;
        panel.innerHTML=progressMarkup()+dsTabs()+`<h2 class="prompt">${mystery?'Mystery sky! Drag the sun. Summer or winter?':'Drag the sun! Watch how high it goes.'}</h2><p class="lab-instruction">${g===0?'Drag the sun up high! Make the meter red!':g===1?'Drag the sun all the way across! Try summer, then winter.':'Drag the sun all the way across!'}</p><div class="lab-stage">${mystery?'':`<div class="kq-tabs" role="group" aria-label="Season"><button class="answer" data-season="summer" type="button" style="${season==='summer'?'outline:3px solid #2b2d42':''}">${dsSvgSun()} Summer</button><button class="answer" data-season="winter" type="button" style="${season==='winter'?'outline:3px solid #2b2d42':''}">${dsSvgSnow()} Winter</button></div>`}<div id="dsStage" style="position:relative;height:200px;border-radius:16px;overflow:hidden;background:${season==='summer'?'linear-gradient(#7ec8f7,#e8f7ff)':'linear-gradient(#a9c6e8,#eef4fb)'}"><div id="dsSun" style="position:absolute;left:8%;top:62%;width:52px;height:52px;transform:translate(-50%,-50%)" aria-hidden="true">${dsSvgSunBig()}</div><div style="position:absolute;left:0;right:0;bottom:0;height:36px;background:linear-gradient(#8fce62,#6faf4e)"></div><div id="dsSeasonTag" style="position:absolute;top:8px;left:12px;font-size:15px;background:rgba(255,255,255,.85);border-radius:10px;padding:2px 10px">${mystery?'Mystery season':season==='summer'?'Summer':'Winter'}</div></div><div class="sun-slider-wrap"><label><span>Sunrise</span><span>Drag the sun</span><span>Sunset</span></label><input class="sun-slider" id="dsSlider" type="range" min="5" max="95" value="8" aria-label="Drag the sun across the sky"></div><div class="ds-meter" style="display:flex;align-items:center;gap:8px;margin:6px 0"><span aria-hidden="true">${dsSvgThermo()}</span><div style="flex:1;background:#dfe7ef;border-radius:8px;overflow:hidden"><div id="dsWarm" style="height:14px;width:0%;background:#3a86ff;border-radius:8px;transition:width .15s"></div></div><span id="dsWarmLabel" style="font-size:13px">${g===3?'no peeking!':'Warmth'}</span></div><p style="margin:4px 0">Daylight: <b id="dsHours">8</b> hours</p><div id="dsQuiz"></div><p class="science-result" id="dsResult" role="status">${g===0?'How warm can you make it?':g===1?'Drag all the way across!':'Drag all the way across!'}</p></div>`;
        setProgress();dsBindTabs();
        const slider=$('#dsSlider',panel),sun=$('#dsSun',panel),warm=$('#dsWarm',panel),warmLabel=$('#dsWarmLabel',panel),hoursEl=$('#dsHours',panel),quiz=$('#dsQuiz',panel),result=()=> $('#dsResult',panel);
        let travelled=0,last=8;
        function update(){
          const v=+slider.value,t=(v-5)/90;
          travelled+=Math.abs(v-last);last=v;
          const arcH=season==='summer'?54:24;
          const top=66-Math.sin(Math.PI*t)*arcH;
          sun.style.left=v+'%';sun.style.top=top+'%';
          const warmth=(1-top/66)*(season==='summer'?1:.42);
          if(!(g===3&&!predicted)){warm.style.width=Math.round(warmth*100)+'%';warm.style.background=warmth>.66?'#e63946':warmth>.33?'#fb8500':'#3a86ff';}
          const hours=season==='summer'?Math.round(8+t*8):Math.round(6+t*4);
          hoursEl.textContent=hours;
          if(v>88){if(season==='summer')exploredS=true;else exploredW=true;}
          if(g===0&&!finished&&warmth>=0.8){
            finished=true;
            result().innerHTML=`<strong>Toasty!</strong> High sun = warm!`;
            speak('Toasty! High sun means warm!');
            correctThen(renderDaySky,slider);
          }
          if(g===1&&exploredS&&exploredW&&!finished&&!quiz.dataset.asked){
            quiz.dataset.asked='1';finished=true;
            quiz.innerHTML=`<div class="answer-grid"><button class="answer" data-a="summer" type="button">${dsSvgSun()} Summer</button><button class="answer" data-a="winter" type="button">${dsSvgSnow()} Winter</button></div>`;
            result().textContent=`Which day was longer?`;
            speak('Which day was longer?');
            $$('.answer[data-a]',quiz).forEach(b=>b.onclick=()=>{
              if(state.locked)return;
              if(b.dataset.a==='summer'){result().innerHTML=`<strong>Right!</strong> Summer days are longer!`;speak('Right! Summer days are longer!');correctThen(renderDaySky,b);}
              else{wrong(b);result().textContent=`Which number was bigger?`;}
            });
          }
          if(mystery&&travelled>=60&&!quiz.dataset.asked){
            quiz.dataset.asked='1';
            quiz.innerHTML=`<div class="answer-grid"><button class="answer" data-a="summer" type="button">${dsSvgSun()} Summer</button><button class="answer" data-a="winter" type="button">${dsSvgSnow()} Winter</button></div>${g===3?'<p class="lab-instruction">Tap your guess, then we reveal the meter!</p>':''}`;
            result().textContent=g===3?`Summer or winter? Guess!`:`Summer or winter? You decide!`;
            speak('Summer or winter?');
            $$('.answer[data-a]',quiz).forEach(b=>b.onclick=()=>{
              if(state.locked||finished)return;
              predicted=b.dataset.a;
              $$('.answer[data-a]',quiz).forEach(x=>x.style.outline=x===b?'3px solid #2b2d42':'');
              if(g===3){warmLabel.textContent='Warmth';warm.style.width='0%';}
              const right=predicted===season;
              const why=season==='summer'?'High sun, long day — summer!':'Low sun, short day — winter!';
              if(right){finished=true;result().innerHTML=`<strong>You got it!</strong> ${why}`;speak(`You got it! ${why}`);correctThen(renderDaySky,b);}
              else{wrong(b);result().textContent=`Not this time! ${g===3?'The meter is revealed — read it and try the other season.':'Watch the sun’s path again — high and long, or low and quick?'}`;if(g===3){warmLabel.textContent='Warmth';} }
            });
          }
        }
        slider.addEventListener('input',update);
        if(!mystery)$$('.answer[data-season]',panel).forEach(b=>b.onclick=()=>{
          if(state.locked)return;
          season=b.dataset.season;travelled=0;
          slider.value=8;last=8;
          $$('.answer[data-season]',panel).forEach(x=>x.style.outline=x===b?'3px solid #2b2d42':'');
          $('#dsStage',panel).style.background=season==='summer'?'linear-gradient(#7ec8f7,#e8f7ff)':'linear-gradient(#a9c6e8,#eef4fb)';
          $('#dsSeasonTag',panel).textContent=season==='summer'?'Summer':'Winter';
          result().textContent=season==='summer'?'Summer! Drag the sun high!':'Winter. Drag the sun!';
          speak(season==='summer'?'Summer!':'Winter.');
          update();
        });
        update();
      }
      function skyChallenge(i,grade){const r=Math.floor(i/6),k=i%6,base=skyBanks[grade][k];return{code:`${grade+1}-${r+1}-${k+1}`,item:`${base[0]} over the ${skyPlaces[r]}`,answer:base[1],start:8+((r*11+k*7)%28)};}
      function renderDaySky(){
        if(dsTrack==='seasons'){renderSummerWinter();return;}
        const i=lessonIndex(),ch=skyChallenge(i,state.grade);let travelled=0,last=ch.start;
        panel.innerHTML=progressMarkup()+dsTabs()+`<h2 class="prompt">Drag the sun across the sky!</h2><div class="lab-stage"><div class="sky-stage hands-on" id="skyStage" style="--sun-pos:${ch.start}"><div class="sky-stars">· · · · ·</div><div class="sky-moon"></div><div class="sky-time-label" id="skyTime">Morning</div><div class="sky-sun"></div><div class="sky-hill"></div></div><div class="sun-slider-wrap"><label><span>Morning</span><span>Drag the sun</span><span>Night</span></label><input class="sun-slider" id="sunSlider" type="range" min="5" max="95" value="${ch.start}" aria-label="Drag the sun from morning through sunset to night"></div><div class="sky-sort"><button class="sky-bin" data-sky="day" type="button" disabled>Day</button><button class="sky-object" id="skyObject" type="button" draggable="true" disabled data-answer="${ch.answer}">${kqEsc(ch.item)}</button><button class="sky-bin" data-sky="night" type="button" disabled>Night</button></div><p class="science-result" id="skyResult">Drag the sun! Watch the sky change.</p></div>`;
        setProgress();dsBindTabs();const stage=$('#skyStage'),slider=$('#sunSlider'),obj=$('#skyObject'),bins=$$('.sky-bin',panel);
        const update=()=>{const v=Number(slider.value);travelled+=Math.abs(v-last);last=v;stage.style.setProperty('--sun-pos',v);stage.classList.toggle('sunset',v>=60&&v<78);stage.classList.toggle('night',v>=78);stage.classList.toggle('deep-night',v>=90);$('#skyTime').textContent=v<35?'Morning':v<60?'Day':v<78?'Sunset':'Night';if(travelled>=45){obj.disabled=false;bins.forEach(x=>{x.disabled=false;x.classList.add('ready');});$('#skyResult').textContent='Now sort it! Tap Day or Night.';}};
        slider.oninput=update;
        const sort=bin=>{if(obj.disabled||state.locked)return;const right=bin.dataset.sky===ch.answer;obj.style.gridColumn=bin.dataset.sky==='day'?'1':'3';obj.textContent=`${ch.item} → ${bin.textContent}`;const explanation=ch.item.includes('Moon')?'The Moon can be out in day or night!':right?`Yes! That\u2019s ${ch.answer}.`:`Try the other one!`;if(right){$('#skyResult').textContent=explanation;speak(explanation);correctThen(renderDaySky,bin);}else{wrong(bin);$('#skyResult').textContent=explanation;}};
        obj.ondragstart=e=>e.dataTransfer.setData('text/plain','sky-object');bins.forEach(bin=>{bin.ondragover=e=>{if(!obj.disabled)e.preventDefault();};bin.ondrop=e=>{e.preventDefault();sort(bin);};bin.onclick=()=>sort(bin);});
      }

      function labOutcome(next,success,button,message){
        if(state.locked)return;state.locked=true;let adapted='';
        if(success){state.score++;addStars(1);adapted=masteryCorrect();if(button)button.classList.add('correct');if(adapted==='up')showAdaptive('up');else toast(message,true,1500);}else{state.streak=0;state.wrongTaps++;adapted=kqRecord(false);if(button)button.classList.add('wrong');if(adapted==='down'){showAdaptive('down');setTimeout(()=>toast(hintText(),false,1500),900);}else toast(message,false,1700);}
        setTimeout(()=>{state.q++;state.locked=false;if(state.q>=state.total)finishRound('You made predictions, ran real tests, and learned from the evidence!');else next();},adapted?2150:1850);
      }

      