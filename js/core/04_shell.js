      function currentPath(){return skillArea()==='math'?'math':'reading';}
      function updatePathSwitch(){
        const ladders={
          math:[['Count','Add to 5','Subtract to 5','Make 10','Within 10','Mixed'],['Add to 20','Subtract to 20','Missing parts','Doubles','Fact families','Mixed'],['2-digit add','2-digit subtract','Place value','Repeated add','Multiply','Mixed'],['Multiply','Divide','Halves','Thirds','Quarters','Mixed']],
          reading:[['Letter sounds','CVC words','Short vowels','Word match','Simple clues','Review'],['Blends','Digraphs','Word parts','Fluency','Sentences','Review'],['Long vowels','Vowel teams','R-controlled','Meaning','Inference','Review'],['Syllables','Prefixes','Suffixes','Vocabulary','Main idea','Review']],
          other:[['Colors','Shapes','3 items','4 items','Simple sort','Review'],['6 items','AB patterns','Categories','Two steps','Compare','Review'],['8 items','Two traits','Sequence','Inference','Classify','Review'],['Large set','Analogies','Complex rule','Multi-step','Explain','Review']]
        };
        const area=skillArea()==='math'?'math':skillArea()==='reading'?'reading':'other',miaLadders=[['Find the job','Name it','Describe it','Do it','Mix & sort','Mia’s review'],['Naming words','Action words','Describing words','Mixed sort','Use the clue','Mia’s review'],['Tricky twins','Word jobs','Context clues','Harder words','Mixed sort','Mia’s review'],['Word detectives','Sentence clues','Precise words','Tricky context','Mixed cases','Mia’s review']],mazeLadders=[['Forest paths','Ocean search','Space trail','Candy corners','Pirate keys','Snowy escape'],['Sleepy Stones','Hidden snacks','Quiz doors','Treasure turns','World search','Mia’s finale'],['Quiz doors','Clever routes','Key hunt','Door puzzles','Perfect search','Mia’s finale'],['Sleepy Stones','Teleporters','Fact doors','Expert routes','Perfect search','Mia’s finale']],carpetLadders=[['Short a!','Short i!','Short o','Short e!','Short u!','Isaiah’s finale'],['S-blends','L & R blends','Digraphs','End sounds','Silent-e','Isaiah’s finale'],['S-blends','L & R blends','Digraphs','End sounds','Silent-e','Isaiah’s finale'],['S-blends','L & R blends','Digraphs','End sounds','Silent-e','Isaiah’s finale']],names=state.game==='readingcarpet'?carpetLadders[state.grade]:state.game==='miaswordsort'?miaLadders[state.grade]:state.game==='mazeescape'?mazeLadders[state.grade]:ladders[area][state.grade];
        $$('.level-btn').forEach((b,i)=>{b.classList.remove('locked');b.disabled=false;b.classList.toggle('active',i===state.round);$(`#stepName${i}`).textContent=names[i];});state.pathStep=state.round;state.level=Math.min(2,Math.floor(state.round/2));
      }
      function masteryCorrect(){state.streak++;state.wrongTaps=0;return typeof kqRecord==='function'?kqRecord(true):'';}
      function hintText(){const hints={builder:'Questy says: say each sound from left to right.',stories:'Questy says: look back for the exact clue.',tenframe:'Questy says: count the filled circles in groups of five.',duel:'Questy says: break the fact into smaller facts. Missing a number? Count up from the part you know.',clockset:'Questy says: the short hand shows hours.',coinshop:'Questy says: start with the biggest coin.',families:'Questy says: look at the last two letters.',frogadd:'Questy says: leap and count every hop out loud.',dinomunch:'Questy says: feed one cookie at a time, then count the leftovers.',arraybake:'Questy says: count the cookies by whole rows.',fairshare:'Questy says: give every plate one treat at a time.',readingcarpet:'Questy says: tap any word to hear it, then read along with me!',sinkfloat:'Questy says: heavy for its size usually sinks — but boats float!',magnetfish:'Questy says: sweep slowly — the clinks are iron or steel.',seedsprout:'Questy says: watch the droop — needs show themselves.',colormix:'Questy says: squirt one color at a time and compare.',icemelt:'Questy says: salty sun melts first — shady cold melts last.',shadowsundial:'Questy says: sun low, shadow LONG — sun high, shadow small.',buildbug:'Questy says: head, thorax, abdomen, six legs — that spells insect!',watercycle:'Questy says: heat lifts you up, cold gathers you, and heavy clouds rain!',fossildig:'Questy says: brush soft and slow — hidden shapes need a gentle hand.',rocksorter:'Questy says: test first, sort second — the rocks tell you where they go.',commonmath:'Questy says: no tricks, just the facts. Take your time and trust your brain.'};return hints[state.game]||'Questy says: slow down and try one clue at a time.';}

      function toast(text, good=true, duration=850) {
        $('#feedbackText').textContent = text; feedback.classList.add('show'); beep(good ? 'good' : 'try');
        clearTimeout(feedbackTimer); feedbackTimer = setTimeout(() => feedback.classList.remove('show'), duration);
      }
      function showAdaptive(kind){
        const up=kind==='up',line=up?"You're on fire! Let's try trickier ones!":"Let's slow down and practice this one together.";
        $$('.adapt-pop',panel).forEach(x=>x.remove());
        const pop=document.createElement('div');pop.className=`adapt-pop ${up?'':'calm'}`;pop.setAttribute('role','status');pop.innerHTML=`<img src="${up?questyArt.celebrating:questyArt.thinking}" alt=""><strong>${line}</strong>`;panel.appendChild(pop);
        $('#feedback img').src=up?questyArt.celebrating:questyArt.thinking;toast(line,up,1900);speak(line);setTimeout(()=>pop.remove(),2100);
      }
      function addStars(n) { state.stars += n; $('#starCount').textContent = state.stars; }
      function setProgress() {
        const fill = $('.progress-fill', panel); const label = $('.progress-label', panel);
        if (fill) fill.style.width = `${Math.min(100, (state.q/state.total)*100)}%`;
        if (label) label.textContent = `Round ${state.round+1} of ${state.rounds} · ${Math.min(state.q+1,state.total)} of ${state.total}`;
      }
      function progressMarkup() { const levels=[['Warming up','★☆☆'],['Rolling','★★☆'],['Soaring','★★★']],level=levels[clamp(state.level||0,0,2)];return `<div class="game-meta"><span id="kqHudAvatar">${window.KQState&&window.KQState.avatar?kqAvatarHTML('kq-hud-doll'):''}</span>${gradeChipMarkup()}<div class="challenge-meter" aria-label="Challenge level: ${level[0]}"><span class="challenge-stars" aria-hidden="true">${level[1]}</span><span>${level[0]}</span></div><div class="progress-track" aria-hidden="true"><div class="progress-fill"></div></div><div class="streak-goal">Round ${state.round+1}/6</div><div class="progress-label"></div></div>`; }
      let kqTimeHeartbeat=null;
      function kqStopHeartbeat(){if(kqTimeHeartbeat){clearInterval(kqTimeHeartbeat);kqTimeHeartbeat=null;}if(typeof kqRecordTime==='function')kqRecordTime();}
      function showHome() {
        kqStopHeartbeat();
        state.game = null; state.locked = false; kqTryOn = null; // leaving any feature clears the shop try-on preview
        $('#activityView').classList.remove('active'); $('#kqFeatureView').classList.remove('active'); $('#homeView').classList.add('active');
        $('#backSlot').innerHTML = ''; if(window.KQState&&window.KQState.avatar)kqRenderHome();
        window.scrollTo({top:0, behavior:'smooth'});
        kqRestoreJourney(true);
      }
      /* Show home with a specific category expanded + scrolled into view, plus a
         back button that returns to the top menu (second level of back nav). */
      function showHomeToCategory(catId){
        kqStopHeartbeat();
        state.game = null; state.locked = false; kqTryOn = null;
        $('#activityView').classList.remove('active'); $('#kqFeatureView').classList.remove('active'); $('#homeView').classList.add('active');
        if(window.KQState&&window.KQState.avatar)kqRenderHome();
        kqRestoreJourney(true);
        /* Expand the target category */
        try{
          const sec=document.querySelector(`#mapRegions .quest-category.category-${catId}`);
          if(sec){
            const toggle=sec.querySelector('.category-toggle');
            if(toggle&&toggle.getAttribute('aria-expanded')!=='true')toggle.click();
            setTimeout(()=>{sec.scrollIntoView({behavior:'smooth',block:'start'});},120);
          }
        }catch(e){}
        /* Back button goes to top menu */
        $('#backSlot').innerHTML = `<button class="back-btn kq-map-btn" id="homeBtn" type="button" aria-label="Back to main menu">${icons.map} <span>Menu</span></button>`;
        $('#homeBtn').addEventListener('click',()=>{kqNavLevel='home';kqLastCategory=null;showHome();});
      }
      /* Kid-friendly exit: Questy confirms mid-game exits. On completion screens
         (".completion" in the panel) the game is done, so go straight home. */
      function kqAskExitGame(){
        if(typeof speak==='function')speak('Back to the map!');
        const done = panel && panel.querySelector('.completion');
        if(done){ kqExitToMap(); return; }
        if($('#kqExitAsk'))return; // already asking
        const host=document.createElement('div');
        host.innerHTML=`<div class="kq-splash" id="kqExitAsk" role="dialog" aria-modal="true" aria-labelledby="kqExitTitle"><div class="kq-splash-card kq-exit-card"><img class="kq-exit-questy" src="${kqQuestyOutfit()}" alt="Questy the fox"><h2 id="kqExitTitle">All done?</h2><p class="kq-splash-greet">Let&apos;s go back to the map!</p><div class="kq-exit-btns"><button class="primary-btn kq-exit-keep" id="kqExitKeep" type="button">▶ Keep playing</button><button class="secondary-btn kq-exit-map" id="kqExitMap" type="button">${icons.map} Map</button></div></div></div>`;
        document.body.appendChild(host.firstElementChild);
        $('#kqExitKeep').addEventListener('click',()=>{const el=$('#kqExitAsk');if(el)el.remove();});
        $('#kqExitMap').addEventListener('click',()=>{const el=$('#kqExitAsk');if(el)el.remove();kqExitToMap();});
        $('#kqExitAsk').addEventListener('click',e=>{if(e.target.id==='kqExitAsk'){const el=$('#kqExitAsk');if(el)el.remove();}});
        setTimeout(()=>{const b=$('#kqExitKeep');if(b)b.focus({preventScroll:true});},120);
      }
      /* Two-level back nav: game → category → home. kqNavLevel tracks where we are. */
      let kqNavLevel='home', kqLastCategory=null;
      /* Slide the activity view out, then show home. Instant cut under reduced motion. */
      function kqExitToMap(){
        /* Let the outgoing game tear down (stops any animation/WebGL loops). */
        try{if(typeof window.__kqGameCleanup==='function'){window.__kqGameCleanup();}window.__kqGameCleanup=null;}catch(e){}
        const av=$('#activityView');
        const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const go=()=>{
          if(typeof kqIntroFromIntro!=='undefined'&&kqIntroFromIntro&&kqIntroWorld){
            /* Launched from intro flow: back to the intro world games view. */
            kqIntroFromIntro=false;
            kqNavLevel='home'; kqLastCategory=null;
            kqIntroRenderGames();
            kqIntroShow('#introGames');
          } else if(kqNavLevel==='game'&&kqLastCategory){
            /* First back: land on the category we came from, expanded + scrolled into view. */
            kqNavLevel='category';
            showHomeToCategory(kqLastCategory);
          } else {
            /* Second back (or no category): top of home. */
            kqNavLevel='home'; kqLastCategory=null;
            showHome();
          }
        };
        if(!av||reduced){ go(); return; }
        av.classList.add('kq-exiting');
        setTimeout(()=>{ av.classList.remove('kq-exiting'); go(); },360);
      }
      function openGame(game) {
        /* Tear down any running game first (stops animation/WebGL loops on re-entry). */
        try{if(typeof window.__kqGameCleanup==='function'){window.__kqGameCleanup();}window.__kqGameCleanup=null;}catch(e){}
        // Journey ledger: every launch counts exactly once, no matter which path opens it
        const gp=kqEnsureProgress(game);gp.plays=(gp.plays||0)+1;gp.lastPlayed=Date.now();
        if(kqSpineOf[game]){KQ.spineActive=kqSpineOf[game].spine;} /* active spine follows the last-played spine game */
        const nearCard=kqCardOf(game),journeyWorld=nearCard?kqWorldIdOf(nearCard.closest('.quest-category')):null;
        KQ.journey={pos:game,world:journeyWorld};KQsave();
        kqNavLevel='game'; kqLastCategory=journeyWorld;
        state.game = game; kqTryOn = null; state.q = 0; state.score = 0; state.seriesScore = 0; state.total = 6; state.round = 0; state.pathStep = 0; state.locked = false; state.usedProblems = new Set();
        $('#homeView').classList.remove('active'); $('#kqFeatureView').classList.remove('active'); $('#activityView').classList.add('active'); if(typeof kqLastActionAt!=='undefined')kqLastActionAt=Date.now();
        $('#activityTitle').textContent=gameInfo[game][0];
        if(game==='storybooks'){
          // Story Books is a free-reading library, not a 6-round challenge game:
          // hide the round tabs + grade picker, use a library-appropriate subtitle.
          $('#activitySubtitle').innerHTML=`${gameInfo[game][1]}<br><strong>Learning goal:</strong> ${gameInfo[game][2]}`;
          $('#levelSwitch').style.display='none';
          const gp=$('.game-grade-picker'); if(gp) gp.style.display='none';
        }else{
          $('#activitySubtitle').innerHTML=`${gameInfo[game][1]} · 6 rounds · 6 challenges each<br><strong>Learning goal:</strong> ${gameInfo[game][2]}`;
          $('#levelSwitch').style.display='grid';
          const gp=$('.game-grade-picker'); if(gp) gp.style.display='';
        }
        if(game!=='mazeescape')$('#activitySubtitle').insertAdjacentHTML('beforeend',`<div class="kq-world-garland" aria-hidden="true">${kqWorldFlavor().garland}</div>`);
        $('#backSlot').innerHTML = `<button class="back-btn kq-map-btn" id="homeBtn" type="button" aria-label="Back to the map">${icons.map} <span>Map</span></button>`;
        $('#homeBtn').addEventListener('click', kqAskExitGame);
        kqStopHeartbeat();kqTimeHeartbeat=setInterval(()=>{if(state.game&&typeof kqRecordTime==='function')kqRecordTime();},30000);
        updatePathSwitch();
        if(game==='miaswordsort')renderMiasWordSortIntro();else if(game==='mazeescape')renderMiasMazeIntro();else if(game==='readingcarpet')renderReadingCarpetIntro();else startCurrentGame(); window.scrollTo({top:0, behavior:'smooth'});
      }
      function startCurrentGame() {
        state.q = 0; state.score = 0; state.total = 6; state.locked = false; state.problemCounter = 0; updatePathSwitch();
        if (state.game === 'words') renderWords();
        if (state.game === 'builder') renderBuilder();
        if (state.game === 'stories') renderStories();
        if (state.game === 'storybooks') renderStorybooks();
        if (state.game === 'monsters') renderMonsters();
        if (state.game === 'tenframe') renderTenFrame();
        if (state.game === 'duel') renderDuel();
        if (state.game === 'rhymematch') renderRhymeMatch();
        if (state.game === 'clockset') renderClockSet();
        if (state.game === 'coinshop') renderCoinShop();
        if (state.game === 'families') renderFamilies();
        if (state.game === 'miaswordsort') renderMiasWordSort();
        if (state.game === 'readingcarpet') renderReadingCarpet();
        if (state.game === 'mazeescape') renderMazeEscape();
        if (state.game === 'memory') renderMemory();
        if (state.game === 'patterns') renderPattern();
        if (state.game === 'science') renderScience();
        if (state.game === 'shapes') renderShapes();
        if (state.game === 'frogadd') renderFrogAdd();
        if (state.game === 'dinomunch') renderDinoMunch();
        if (state.game === 'arraybake') renderArrayBake();
        if (state.game === 'fairshare') renderFairShare();
        if (state.game === 'bubbleup') renderBubbleUp();
        if (state.game === 'treasuretake') renderTreasureTake();
        if (state.game === 'factfarm') renderFactorFarm();
        if (state.game === 'changemaker') renderChangeMaker();
        if (state.game === 'timetrek') renderTimeTrek();
        if (state.game === 'sequence') renderSequenceIntro();
        
        if (state.game === 'dress') renderDress();
        if (state.game === 'art') renderArt();
        if (state.game === 'coloring') renderColoring();
        if (state.game === 'commonmath') renderCommonMath();
        if (state.game === 'rhythmrepeat') renderRhythmRepeat();
        if (state.game === 'sounddetectives') renderSoundDetectives();
        if (state.game === 'tempo') renderTempo();
        if (state.game === 'band') renderBand();
        if (state.game === 'animalhomes') renderAnimalHomes();
        if (state.game === 'weatherwatch') renderWeatherWatch();
        
        if (state.game === 'livingornot') renderLivingOrNot();
        if (state.game === 'planets') renderPlanets();
        if (state.game === 'bulb') renderBulb();
        if (state.game === 'staticzap') renderStaticZap();
        if (state.game === 'dropit') renderDropIt();
        if (state.game === 'daysky') renderDaySky();
        if (state.game === 'safezap') renderSafeZap();
        if (state.game === 'sinkfloat') renderSinkFloat();
        if (state.game === 'magnetfish') renderMagnetFish();
        if (state.game === 'seedsprout') renderSeedSprout();
        if (state.game === 'colormix') renderColorMixBookWrap();
        if (state.game === 'icemelt') renderIceMelt();
        if (state.game === 'shadowsundial') renderShadowSundial();
        if (state.game === 'buildbug') renderBuildBug();
        if (state.game === 'watercycle') renderWaterCycle();
        if (state.game === 'fossildig') renderFossilDig();
        if (state.game === 'rocksorter') renderRockSorter();
      }
      function kqSessionGate(next){kqInitSession();const limit=Number(KQ.settings.dailyMinutes)||0;if(limit&&KQ.session.dailySeconds>=limit*60){panel.innerHTML=`<div class="completion"><div>${gradeChipMarkup()}<img class="completion-mascot" src="${questyArt.reading}" alt="Questy the fox resting"><h2>Questy is tired — see you tomorrow!</h2><p>You reached today’s ${limit}-minute family limit. Your progress is safe, and this message appears only between rounds.</p><div class="center-actions"><button class="secondary-btn" id="timeHome" type="button">Choose another activity later</button></div></div></div>`;$('#timeHome').onclick=showHome;return true;}const now=Date.now();if(now-(KQ.session.continuousStartedAt||now)>=1200000&&now-(KQ.session.lastBreakAt||0)>=1200000){KQ.session.lastBreakAt=now;KQsave();panel.innerHTML=`<div class="completion"><div>${gradeChipMarkup()}<img class="completion-mascot" src="${questyArt.celebrating}" alt="Questy the fox stretching"><h2>Time for a stretch!</h2><p>Look about 20 feet away for 20 seconds, wiggle your arms, and take a sip of water. You can continue whenever you are ready.</p><div class="center-actions"><button class="primary-btn" id="stretchContinue" type="button">Continue playing</button><button class="secondary-btn" id="stretchHome" type="button">Take a longer break</button></div></div></div>`;$('#stretchContinue').onclick=()=>{KQ.session.continuousStartedAt=Date.now();KQsave();next();};$('#stretchHome').onclick=showHome;return true;}return false;}
      function renderRoundComplete(message,earnedTickets){
        if(state.round>=state.rounds-1){finishGame(`${message} You earned ${earnedTickets} tickets.`);return;}const completed=state.round+1;panel.innerHTML=`<div class="completion"><div>${gradeChipMarkup()}<div class="completion-mascots"><img class="completion-mascot" src="${questyArt.celebrating}" alt="Questy the fox cheering"><span class="completion-cameo" aria-hidden="true">${kqAvatarHTML("kq-completion-doll")}</span></div><div class="completion-badge">${icons.star}</div><h2>Round ${completed} complete!</h2><p>${message}<br>${state.score} of 6 challenges completed. You earned ${earnedTickets} tickets and a new sticker. ${state.rounds-completed} rounds to go!</p><div class="center-actions"><button class="primary-btn" id="nextRound" type="button">Start round ${completed+1}</button><button class="secondary-btn" id="chooseQuest" type="button">Choose another quest</button></div></div></div>`;$('#nextRound').onclick=()=>{state.round++;state.pathStep=state.round;startCurrentGame();};$('#chooseQuest').onclick=showHome;
      }
      function finishRound(message){state.seriesScore+=state.score;const earnedTickets=kqAwardRound();if(state.game!=='mazeescape')toast(sample(kqWorldFlavor().rewards),true,2100);const show=()=>renderRoundComplete(message,earnedTickets);if(!kqSessionGate(show))show();}
      function finishGame(message) {
        
        panel.innerHTML = `<div class="completion"><div>${gradeChipMarkup()}<div class="completion-mascots"><img class="completion-mascot" src="${questyArt.celebrating}" alt="Questy the fox cheering"><span class="completion-cameo" aria-hidden="true">${kqAvatarHTML("kq-completion-doll")}</span></div><div class="completion-badge">${icons.star}</div><h2>Lesson complete!</h2><p>${message}<br>You finished all 6 rounds and ${state.rounds*state.total} challenges. Questy is proud of you!</p><div class="center-actions"><button class="primary-btn" id="playAgain" type="button">Play the full lesson again</button><button class="secondary-btn" id="chooseQuest" type="button">Choose another quest</button></div></div></div>`;
        $('#playAgain').addEventListener('click',()=>{state.round=0;state.pathStep=0;state.seriesScore=0;state.usedProblems=new Set();startCurrentGame();}); $('#chooseQuest').addEventListener('click', showHome);
      }
      function correctThen(next, button) {
        if (state.locked) return; state.locked = true; state.score++; addStars(1); const adapted=masteryCorrect();
        if (button) button.classList.add('correct'); if(adapted==='up')showAdaptive('up');else toast(sample(['Great thinking!', 'You got it!', 'Brilliant!', 'Nice work!']));
        setTimeout(() => { state.q++; state.locked = false; if (state.q >= state.total) finishRound('Strong work all the way through!'); else next(); }, adapted==='up'?1250:720);
      }
      function wrong(button) { if (state.locked) return; state.streak=0;state.wrongTaps++;const adapted=kqRecord(false);if(button)button.classList.add('wrong');const hinting=state.wrongTaps>=2||adapted==='down';$('#feedback img').src=hinting?questyArt.thinking:questyArt.reading;if(adapted==='down'){showAdaptive('down');setTimeout(()=>toast(hintText(),false,1500),900);}else toast(hinting?hintText():'Try a different answer',false);setTimeout(()=>button&&button.classList.remove('wrong'),480); }
      function optionsFor(correct, min, max, count=4) {
        const vals = new Set([correct]);
        while (vals.size<count) vals.add(clamp(Math.floor(Math.random()*(max-min+1))+min, min, max));
        return shuffle([...vals]);
      }
      function makeArithmeticProblem(namespace='math', offset=state.q) {
        const i=state.round*6+offset,r=Math.floor(i/6),k=i%6;let a,b,answer,op,problem,visual;
        if(state.grade===0){
          if(r===0){answer=k+1;op='count';a=answer;b=0;problem=`Count ${answer} dots`;visual='● '.repeat(answer).trim();}
          else if(r===1){a=k%5;b=1+Math.floor(k/5);answer=a+b;op='+';problem=`${a} + ${b}`;}
          else if(r===2){a=5+k;b=1+(k%5);answer=a-b;op='−';problem=`${a} − ${b}`;}
          else if(r===3){a=k+1;b=10-a;answer=10;op='+';problem=`${a} + ${b}`;visual=`Make 10 with ${a} and ${b}`;}
          else if(r===4){const rows=[[2,6],[3,6],[4,5],[5,3],[6,2],[7,1]];[a,b]=rows[k];op='+';answer=a+b;problem=`${a} + ${b}`;}
          else {const rows=[[9,1],[9,2],[10,3],[10,4],[8,5],[7,6]];[a,b]=rows[k];op='−';answer=a-b;problem=`${a} − ${b}`;}
        } else if(state.grade===1){
          if(r<2){a=6+((i*3)%9);b=1+((i*5)%Math.max(2,20-a));op='+';answer=a+b;problem=`${a} + ${b}`;}
          else if(r<4){a=12+((i*5)%9);b=2+((i*3)%10);op='−';answer=a-b;problem=`${a} − ${b}`;}
          else {answer=2+(i%9);b=3+((i*2)%8);a=answer+b;op='missing';problem=`? + ${b} = ${a}`;visual='Find the missing addend';}
        } else if(state.grade===2){
          if(r<2){a=21+((i*7)%49);b=11+((i*5)%29);op='+';answer=a+b;problem=`${a} + ${b}`;}
          else if(r<4){a=55+((i*7)%44);b=12+((i*5)%35);if(b>a)b=Math.floor(a/2);op='−';answer=a-b;problem=`${a} − ${b}`;}
          else {const facts=[[2,3],[2,4],[2,5],[3,3],[3,4],[3,5],[4,3],[4,4],[4,5],[5,3],[5,4],[5,5]];[a,b]=facts[i-24];op='×';answer=a*b;problem=`${a} × ${b}`;visual=`${a} groups of ${b}`;}
        } else {
          if(r<2){const facts=[[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[10,10],[11,11],[12,12],[3,12]];[a,b]=facts[i];op='×';answer=a*b;problem=`${a} × ${b}`;}
          else if(r<4){const facts=[[12,2],[18,3],[24,4],[30,5],[36,6],[42,7],[48,8],[54,9],[60,10],[66,11],[72,12],[84,7]];[a,b]=facts[i-12];answer=a/b;op='÷';problem=`${a} ÷ ${b}`;}
          else {const den=[2,3,4][(i+r)%3],whole=den*(2+(i%7));answer=whole/den;op='fraction';a=whole;b=den;problem=`What is 1/${den} of ${whole}?`;visual=`Split ${whole} into ${den} equal groups`;}
        }
        const key=`${namespace}:grade${state.grade}:${i}:${problem}`;state.usedProblems.add(key);return {a,b,answer,op,key,problem,visual:visual||problem};
      }


      /* ═══════════ Curriculum spines — surfacing test (2026-10-01) ═══════════
         Spines SUGGEST; the park never gates. Every stop is an unlocked game and
         this section never hides, disables, or reorders a quest card.
         Active spine = spine of the most recently launched SPINE game, persisted
         on KQ.spineActive; a fresh player (no spine game played yet) starts on
         Early reading. Non-spine games leave the active spine untouched.
         A stop counts as done when the game has a recorded play
         (KQ.gameProgress plays>0). Stars keep their current meaning. */
      function kqActiveSpineId(){const id=KQ&&KQ.spineActive;return id&&kqSpineById[id]?id:'reading';}
      function kqActiveSpine(){return kqSpineById[kqActiveSpineId()];}
      function kqStopDone(game){const rec=KQ.gameProgress&&KQ.gameProgress[game];return !!(rec&&rec.plays>0);}
      function kqSpineProgress(spineId){const sp=kqSpineById[spineId];if(!sp)return{done:0,total:0};return{done:sp.stops.filter(st=>kqStopDone(st.game)).length,total:sp.stops.length};}
      function kqNextUp(spineId){
        const sp=kqSpineById[spineId||kqActiveSpineId()];if(!sp)return null;
        /* first stop that is visible at this grade and not yet played */
        return sp.stops.find(st=>kqGameVisible(st.game,state.grade)&&!kqStopDone(st.game))||null;
      }
      function kqSpineStripHTML(){
        /* tiny parent strip for the dashboard: 3 lines, skill only, no streak */
        return kqSpines.map(sp=>{
          const next=kqNextUp(sp.id),prog=kqSpineProgress(sp.id);
          const skill=next?`${next.skill} · ${prog.done} of ${prog.total} stops`:'all stops played! 🎉';
          return `<p><strong>${sp.emoji} ${sp.short}:</strong> ${kqEsc(skill)}</p>`;
        }).join('');
      }
      function kqRefreshNextUp(){
        const row=$('#journeyRow');if(!row)return;
        let chip=$('#nextUpSpine');
        const next=kqNextUp();
        if(!next){if(chip)chip.hidden=true;return;}
        const sp=kqActiveSpine(),tag=kqSpineOf[next.game],gname=(gameInfo[next.game]&&gameInfo[next.game][0])||'Adventure';
        if(!chip){
          chip=document.createElement('button');
          chip.type='button';chip.id='nextUpSpine';chip.className='next-up choice';
          chip.innerHTML='<span class="next-up-compass" aria-hidden="true">🧭</span><span class="next-up-copy"><strong id="nextUpTitle"></strong><small id="nextUpSkill"></small></span><span class="next-up-prog" id="nextUpProg" aria-hidden="true"></span>';
          chip.addEventListener('click',()=>{const g=chip.dataset.game;if(g&&typeof kqLaunchWithJourney==='function')kqLaunchWithJourney(g);});
          row.appendChild(chip);
        }
        chip.hidden=false;chip.dataset.game=next.game;
        chip.dataset.speak=`Questy suggests: next up, ${gname} — ${next.skill}. ${sp.emoji} ${sp.name}, stop ${tag.order} of ${sp.stops.length}. Tap to hop there!`;
        $('#nextUpTitle',chip).textContent='Next up: '+gname;
        $('#nextUpSkill',chip).textContent=`${next.skill} · ${sp.emoji} ${sp.name}`;
        $('#nextUpProg',chip).textContent=`${tag.order}/${sp.stops.length}`;
        decoratePrompts(row);
      }
      function kqApplySpineKeepPlaying(){
        /* "Keep playing" prefers the active spine's next stop when one exists;
           otherwise it keeps whatever the journey refresh chose (last played). */
        const keep=$('#keepPlaying');if(!keep)return;
        const next=kqNextUp();
        if(next&&kqGameVisible(next.game)){
          keep.hidden=false;keep.dataset.game=next.game;
          const t=$('#keepPlayingTitle');if(t)t.textContent='Keep playing: '+((gameInfo[next.game]&&gameInfo[next.game][0])||'Adventure');
        }
      }
      function kqRefreshSpineHeaders(){
        /* per-chapter spine progress, appended after the journey summary text */
        $$('#mapRegions .quest-category .spine-prog').forEach(x=>x.remove());
        const cats={math:['math'],reading:['reading'],science:['science','lab']};
        kqSpines.forEach(sp=>{
          const prog=kqSpineProgress(sp.id);
          (cats[sp.id]||[]).forEach(cid=>{
            const sec=$('#mapRegions .quest-category.category-'+cid),small=sec&&$('.category-copy small',sec);
            if(!small)return;
            const tag=document.createElement('span');
            tag.className='spine-prog';
            tag.textContent=` · ${sp.emoji} ${sp.short} path: ${prog.done}/${prog.total} stops`;
            small.appendChild(tag);
          });
        });
      }
      /* The keep-playing refresh lives in 16_journey.js (not touched here): wrap it
         so every journey refresh also repaints the spine UI. This assignment wins
         because this file executes before 16_journey.js declares the function. */
      const _kqRefreshKeepPlaying=kqRefreshKeepPlaying;
      kqRefreshKeepPlaying=function(){_kqRefreshKeepPlaying();kqRefreshNextUp();kqApplySpineKeepPlaying();kqRefreshSpineHeaders();};
