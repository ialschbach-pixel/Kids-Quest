/* ═══════════ Journey mode: pawn follows launched stops, stars & footprints ═══════════
         The map quietly records every launch + best stars; the pawn waits on the
         last-launched stop, hops stop-to-stop when launching, and comes home to
         where you are. No locks, no streaks, no "behind" language. */
      function kqCardOf(gameId){return document.querySelector(`.quest-card[data-game="${gameId}"]`);}
      function kqWorldIdOf(section){if(!section)return null;const m=/\bcategory-([a-z]+)\b/.exec(section.className||'');return m?m[1]:null;}
      function kqJourneyOf(){const j=KQ.journey;return (j&&typeof j==='object')?j:null;}
      function kqEnsureProgress(gameId){
        if(!KQ.gameProgress||typeof KQ.gameProgress!=='object')KQ.gameProgress={};
        let rec=KQ.gameProgress[gameId];
        if(!rec||typeof rec!=='object')rec=KQ.gameProgress[gameId]={plays:0,starsBest:0,lastPlayed:0};
        return rec;
      }
      function kqRecordStars(gameId,stars){
        try{const rec=kqEnsureProgress(gameId);rec.starsBest=Math.max(rec.starsBest||0,stars||0);KQsave();}catch(e){}
      }
      function kqOpenWorldQuiet(id){
        const sec=document.querySelector('#mapRegions .quest-category.category-'+id);if(!sec)return sec;
        $$('#mapRegions .quest-category').forEach(other=>{
          const open=other===sec;
          other.classList.remove('kq-noanim');
          other.classList.toggle('is-open',open);
          $('.category-toggle',other).setAttribute('aria-expanded',String(open));
          $('.category-games',other).inert=!open;
          other.classList.toggle('is-current',open);
        });
        if(state.currentWorld!==id){state.currentWorld=id;document.body.dataset.kqworld=id;kqRenderWorldArt(id);const w=kqWorldById[id];if(w){kqSetBubble(sample(w.lines));kqSetGarland(id,w.garland);}}
        return sec;
      }
      function kqCollapseWorldQuiet(id,sec,speakIt){
        sec=sec||document.querySelector('#mapRegions .quest-category.category-'+id);if(!sec)return;
        sec.classList.add('kq-noanim');
        sec.classList.remove('is-open','is-current');
        $('.category-toggle',sec).setAttribute('aria-expanded','false');
        $('.category-games',sec).inert=true;
        setTimeout(()=>sec.classList.remove('kq-noanim'),80); /* a quick clean close, never a long rewind */
        if(state.currentWorld===id){state.currentWorld=null;document.body.dataset.kqworld='';kqRenderWorldArt('');kqSetBubble(sample(kqWorldFlavor().lines));kqSetGarland('', '🗺️ ⭐ 🧭 ⭐ 🎒 ⭐');}
        if(speakIt&&((window.KQState&&window.KQState.narration==='read')||state.grade===0))speak('Closed! Your progress is saved.');
      }
      function kqWorldSummaryText(section){
        let stars=0,played=0,gc=0;
        $$('.quest-grid .quest-card',section).forEach(card=>{if(card.style.display==='none')return;gc++;const gp=KQ.gameProgress&&KQ.gameProgress[card.dataset.game];stars+=((gp&&gp.starsBest)||0);if(gp&&gp.lastPlayed)played++;});
        const playedLabel=played===0?'none played yet':(played===gc&&gc>0)?'all played!':played+' of '+gc+' played';
        const starPart=stars>0?` ★${stars}`:'';
        return `${gc} ${gc===1?'game':'games'}${starPart} · ${playedLabel} · Grade ${gradeNames[state.grade]}`;
      }
      function kqRefreshStopBadges(){
        $$('#mapRegions .quest-card').forEach(card=>{
          let badge=$('.stop-stars',card);
          const rec=KQ.gameProgress&&KQ.gameProgress[card.dataset.game];
          if(!rec||!rec.lastPlayed){if(badge)badge.remove();return;}
          if(!badge){badge=document.createElement('span');badge.className='stop-stars';badge.setAttribute('aria-hidden','true');card.appendChild(badge);}
          const best=rec.starsBest||0;
          badge.classList.toggle('is-visited',best===0);
          badge.classList.toggle('is-starred',best>0);
          badge.textContent=best>0?'★'.repeat(Math.min(3,best)):'✓';
        });
      }
      function kqDropFootprints(gameId){
        if(!KQ.journeyFeet||typeof KQ.journeyFeet!=='object')KQ.journeyFeet={};
        if(!gameId||KQ.journeyFeet[gameId])return;
        KQ.journeyFeet[gameId]=1;
        const card=kqCardOf(gameId);
        if(card&&!$('.stop-feet',card)){const feet=document.createElement('span');feet.className='stop-feet';feet.setAttribute('aria-hidden','true');feet.textContent='🐾';card.appendChild(feet);}
        KQsave();
      }
      function kqRefreshFootprints(){
        $$('#mapRegions .quest-card').forEach(card=>{
          const id=card.dataset.game,feet=$('.stop-feet',card);
          if(KQ.journeyFeet&&KQ.journeyFeet[id]){if(!feet){const f=document.createElement('span');f.className='stop-feet';f.setAttribute('aria-hidden','true');f.textContent='🐾';card.appendChild(f);}}
          else if(feet)feet.remove();
        });
      }
      function kqRefreshKeepPlaying(){
        const keep=$('#keepPlaying'),title=$('#keepPlayingTitle'),row=$('#journeyRow');if(!keep||!title||!row)return;
        const j=kqJourneyOf(),game=j&&j.pos,card=game?kqCardOf(game):null;
        if(game&&card&&kqGameVisible(game)){
          keep.hidden=false;keep.dataset.game=game;
          title.textContent='Keep playing: '+((gameInfo[game]&&gameInfo[game][0])||'Adventure');
        }else{keep.hidden=true;keep.removeAttribute('data-game');}
        row.classList.toggle('two-up',!keep.hidden);
      }
      function kqRestoreJourney(fromReturn){
        /* Buddy restoring to the saved journey spot: summaries, marks, chip, pawn + world */
        $$('#mapRegions .quest-category').forEach(sec=>{
          const label=$('.category-copy small',sec);
          if(label)label.textContent=kqWorldSummaryText(sec);
        });
        kqRefreshStopBadges();kqRefreshFootprints();kqRefreshKeepPlaying();
        const j=kqJourneyOf(),game=j&&j.pos,card=game?kqCardOf(game):null,wid=j&&j.world;
        if(!card)return;
        const sec=card.closest('.quest-category'),needsWorld=!!(wid&&card.style.display!=='none'&&sec&&!sec.classList.contains('is-open')&&state.currentWorld!==wid);
        if(needsWorld)kqOpenWorldQuiet(wid);
        const parkPawn=()=>{const t=kqPawnTargetGame(game);if(t!==null){kqPawnFrac=t;kqPlacePawn(t);}};
        if(needsWorld&&!kqReducedMotion)setTimeout(parkPawn,520);else parkPawn();
      }
      function kqPawnTargetGame(game){
        const board=$('#mapBoard'),card=kqCardOf(game);
        if(!board||!card||!board.offsetHeight)return null;
        if(card.style.display==='none')return null;
        return (kqTopInBoard(card)+card.offsetHeight/2)/board.offsetHeight;
      }
      function kqStopHits(from,to,skipGame){
        const acc=[],board=$('#mapBoard');if(!board||!board.offsetHeight)return acc;
        const cards=$$('#mapRegions .quest-card').filter(c=>c.dataset.game!==skipGame&&c.style.display!=='none');
        for(const card of cards){
          const frac=(kqTopInBoard(card)+card.offsetHeight/2)/board.offsetHeight;
          if(to>=from?frac>from&&frac<to:frac<from&&frac>to)acc.push({gameId:card.dataset.game,frac});
        }
        acc.sort((a,b)=>to>=from?a.frac-b.frac:b.frac-a.frac);
        return acc;
      }
      function kqLaunchWithJourney(game){
        if(kqLaunching)return;
        if(!gameInfo[game]||!kqCardOf(game)){openGame(game);return;}
        if(!kqGameVisible(game)){toast("That stop is hiding! Pick your grade above to see it.");return;}
        kqLaunching=true;
        const row=$('#journeyRow'),card=kqCardOf(game);
        if(row)row.setAttribute('aria-busy','true');
        card.classList.add('is-launching');
        const j=kqJourneyOf(),prevGame=j&&j.pos;
        const recap=KQ.gameProgress&&KQ.gameProgress[game];
        const wasPlayed=!!(recap&&recap.plays>0);
        const sec=card.closest('.quest-category'),wid=kqWorldIdOf(sec);
        if(wid&&sec&&!sec.classList.contains('is-open'))kqOpenWorldQuiet(wid);
        const finish=()=>{
          card.classList.remove('is-launching');
          if(row)row.removeAttribute('aria-busy');
          kqLaunching=false;
          openGame(game);
        };
        const afterOpen=()=>{
          if(prevGame)kqDropFootprints(prevGame); /* Questy leaves prints where he was standing */
          const toF=kqPawnTargetGame(game);
          kqTravelToFrac(toF===null?kqPawnFrac:toF,{footprints:true,skipGame:game},()=>{
            kqBurstConfettiAt(toF);beep('good');
            kqSetBubble(sample(wasPlayed?
              ["Practice makes stronger! Hop back in, superstar!","Back for more? You're a true adventurer!"]:
              ["Ooh, a brand-new stop! Let's go, explorer!","Your very first visit here — have the best time!"]));
            setTimeout(finish,kqReducedMotion?40:650);
          });
        };
        setTimeout(afterOpen,kqReducedMotion?0:430); /* give the world its quiet opening before we measure stops */
      }
      kqInitAdventureMap();

      /* Floating campsite home button — fades in when scrolled down on home view */
      const campBtn=$('#campHome');
      if(campBtn){
        const updateCamp=()=>{
          const onHome=$('#homeView')&&$('#homeView').classList.contains('active');
          campBtn.classList.toggle('show', onHome&&window.scrollY>400);
        };
        window.addEventListener('scroll',updateCamp,{passive:true});
        campBtn.addEventListener('click',()=>{
          kqNavLevel='home';kqLastCategory=null;showHome();
          try{if(typeof speak==='function')speak('Back to camp!');}catch(e){}
        });
        /* Re-check on view changes */
        setInterval(updateCamp,500);
      }

      $$('.grade-btn').forEach(b=>b.addEventListener('click',()=>setGrade(Number(b.dataset.grade),false)));
      $$('.game-grade-btn').forEach(b=>b.addEventListener('click',()=>setGrade(Number(b.dataset.gameGrade),true)));
      $$('.theme-btn').forEach(b=>b.addEventListener('click',()=>{state.theme=b.dataset.theme;$$('.theme-btn').forEach(x=>x.classList.toggle('selected',x===b));document.body.classList.remove('theme-planets','theme-animals','theme-ocean','theme-sports','theme-dinosaurs','theme-fashion');document.body.classList.add(`theme-${state.theme}`);const cameo=$('#kqIntroCameoImg');if(cameo)cameo.src=kqQuestyOutfit();const mapQ=$('#mapQuestyArt');if(mapQ)mapQ.src=kqQuestyOutfit();const pawnI=$('#mapPawnImg');if(pawnI)pawnI.src=kqQuestyOutfit();toast(`${b.textContent.trim()} world selected!`);}));
      /* World flavor echo: refresh the flavored greeting right when a world is picked (original handler above stays untouched). */
      $$('.theme-btn').forEach(b=>b.addEventListener('click',()=>{if(window.KQState&&window.KQState.avatar)kqRenderHome();}));      $$('.quest-card').forEach(b=>b.addEventListener('click',()=>kqLaunchWithJourney(b.dataset.game)));
      $$('.level-btn').forEach(b=>b.addEventListener('click',()=>{const step=Number(b.dataset.step);state.round=step;state.pathStep=step;state.level=Math.min(2,Math.floor(step/2));updatePathSwitch();startCurrentGame();}));
      $('#soundToggle').addEventListener('click',()=>{state.sound=!state.sound;if(!state.sound){try{if('speechSynthesis'in window)window.speechSynthesis.cancel();}catch(e){}try{if(window.AndroidTTS)window.AndroidTTS.stop();}catch(e){}}$('#soundToggle').title=state.sound?'Sound on':'Sound off';$('#soundToggle').setAttribute('aria-label',state.sound?'Turn sounds off':'Turn sounds on');$('#soundToggle').style.opacity=state.sound?'1':'.5';if(state.sound)beep('good');});
      updateGradeUI();$('#kqIntroCameoImg').src=kqQuestyOutfit();const mapQ0=$('#mapQuestyArt');if(mapQ0)mapQ0.src=kqQuestyOutfit();const pawnI0=$('#mapPawnImg');if(pawnI0)pawnI0.src=kqQuestyOutfit();
      /* Journey crew strip shortcuts: tap avatar → creator, Char → her corner, tickets → shop */
      $('#kqIdAvatar').addEventListener('click',()=>kqShowFeature('avatar'));
      $('#kqIdChar').addEventListener('click',()=>kqShowFeature('char'));
      $('#kqIdTicketsWrap').addEventListener('click',()=>kqShowFeature('shop'));
      $('#keepPlaying').addEventListener('click',()=>{const g=$('#keepPlaying').dataset.game;if(g)kqLaunchWithJourney(g);});
      decoratePrompts($('#kqIdentity'));decoratePrompts($('.grade-celebration'));
      kqRestoreJourney(false); /* pawn + world + marks restored to your journey, even mid-launch */

    })();
  