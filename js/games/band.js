/* ═══════════ Questy's Band: instrument playground (piano · drums · xylophone) ═══════════
         Free play — no wrong answers. WebAudio instruments only (offline, no audio files).
         The record/playback tape lives in memory for this session. */
      const bandWhite=[261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25];
      const bandBlack=[277.18,311.13,369.99,415.30,466.16];
      const bandWhiteName=['C','D','E','F','G','A','B','High C'];
      const bandBlackName=['C\u2011sharp','D\u2011sharp','F\u2011sharp','G\u2011sharp','A\u2011sharp'];
      const bandWhiteKey=['A','S','D','F','G','H','J','K'];
      const bandBlackKey=['W','E','T','Y','U'];
      const bandXylo=[523.25,587.33,659.25,698.46,783.99,880.00,987.77,1046.50];
      const bandXyloName=['C','D','E','F','G','A','B','High C'];
      const bandXyloColor=['#f1645d','#f38e2e','#ffbd3e','#8cc152','#2fbfae','#0f9bd8','#7766c9','#d94f83'];
      const bandDrums=[['kick','Kick','1'],['snare','Snare','2'],['hihat','Hi\u2011hat','3'],['crash','Crash','4']];
      const bandJamIdeas=[
        'Play a song that sounds like sunshine!',
        'Find the lowest piano key and give it a deep rumble!',
        'Tap the big drum like thunder, then tiptoe on the high notes!',
        'Play a song that sounds like rain on a rooftop!',
        'Can you play the piano keys in order, low note to high note?',
        'Make the cymbal crash, then play three soft little notes!',
        'Play a lullaby for Questy — slow and sleepy!',
        'Find the highest piano key and ring it like a tiny bell!',
        'Bang the snare drum four times: boom, boom, boom, boom!',
        'Play a song that sounds like a bouncy bunny!',
        'Play the same note soft... medium... LOUD!',
        'Tap the hi\u2011hat like popcorn popping!',
        'Can you play the piano keys backwards, high to low?',
        'Make a spooky mystery song using only low notes!',
        'Play the xylophone bars in rainbow order!',
        'Play a marching song: left foot, right foot, left, right!',
        'Ring the crash cymbal like a firework exploding!',
        'Play a song that sounds like floating on a fluffy cloud!',
        'Tap a drum, then a piano key — back and forth, back and forth!',
        'Play a happy birthday song for the whole band!',
        'Find your favorite note and play it eight times fast!',
        'Play a song that sounds like splashing in puddles!',
        'Play LOW, high, LOW, high — a mountain\u2011climbing song!',
        'Tap the snare drum like a woodpecker knocking on wood!',
        'Play a song that sounds like zooming race cars!',
        'Can you play two notes at the same time? A harmony!',
        'Play a song that sounds like tiptoeing past a sleeping dragon!',
        'Make the drums rumble like a rolling thunderstorm!',
        'Play a song that sounds like flowers blooming!',
        'Play your favorite little tune three times in a row!',
        'Bang the kick drum like a heartbeat: lub\u2011dub, lub\u2011dub!',
        'Play a song that sounds like chasing fireflies at night!',
        'Mix the drums and the xylophone — a whole band by yourself!',
        'Play a song that sounds like sledding down a snowy hill!',
        'Find two notes far apart and play them like a bouncing ball!',
        'Record your very best song and play it back for Questy!'
      ];
      let bandTape={rec:false,t0:0,events:[],playing:false},bandTimers=[],bandNoise=null,bandMallet=0;
      function bandGetNoise(ctx){if(!bandNoise){const len=Math.floor(ctx.sampleRate),buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;bandNoise=buf;}return bandNoise;}
      function bandNoiseHit(when,dur,gain,freq){const ctx=getMusicCtx();if(!ctx)return;const src=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();src.buffer=bandGetNoise(ctx);src.loop=true;f.type='highpass';f.frequency.value=freq;g.gain.setValueAtTime(gain,when);g.gain.exponentialRampToValueAtTime(.0001,when+dur);src.connect(f);f.connect(g);g.connect(ctx.destination);src.start(when);src.stop(when+dur+.05);}
      function bandDrumSound(kind,when){const ctx=getMusicCtx();if(!ctx)return;const t=when||ctx.currentTime+.02;
        if(kind==='kick'){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(46,t+.22);g.gain.setValueAtTime(.55,t);g.gain.exponentialRampToValueAtTime(.001,t+.28);o.connect(g).connect(ctx.destination);o.start(t);o.stop(t+.32);}
        else if(kind==='snare'){bandNoiseHit(t,.14,.45,1800);toneAt(190,t,.09,'triangle',.3);}
        else if(kind==='hihat'){bandNoiseHit(t,.06,.32,6500);}
        else{bandNoiseHit(t,1,.5,4800);}}
      function bandSound(kind,idx){if(state.game!=='band')return;const ctx=getMusicCtx();if(!ctx)return;const t=ctx.currentTime+.02;
        if(kind==='piano'){const f=idx<8?bandWhite[idx]:bandBlack[idx-8];toneAt(f,t,.42,'triangle',.17);toneAt(f*2,t,.25,'sine',.06);}
        else if(kind==='xylo'){const f=bandXylo[idx];toneAt(f*2,t,.3,'sine',.19);toneAt(f*4,t,.16,'sine',.055);}
        else bandDrumSound(kind,t);}
      function bandRecord(kind,idx){const T=bandTape;if(!T.rec)return;if(T.events.length>=300){T.rec=false;bandTapeUI();toast('Tape is full — that is one long song!',false);return;}T.events.push({kind,idx,at:performance.now()-T.t0});}
      function bandNote(kind,idx){if(state.game!=='band')return;bandSound(kind,idx);bandRecord(kind,idx);bandAnimate(kind,idx);}
      function bandAnimate(kind,idx){const stage=$('#bandStage',panel);if(!stage)return;
        const sel=kind==='piano'?(idx<8?`.band-wk${idx}`:`.band-bk${idx-8}`):kind==='xylo'?`.band-bar${idx}`:`[data-drum='${kind}']`;
        const el=$(sel,stage);if(!el)return;
        el.classList.remove('is-hit');void el.offsetWidth;el.classList.add('is-hit');bandFloater(el);
        if(kind==='xylo')bandStrikeMallet(el);}
      function bandStrikeMallet(el){const xylo=$('#bandXylo',panel);if(!xylo)return;const mal=$('.band-mallet'+(bandMallet%2),xylo);bandMallet++;if(!mal)return;
        const xr=xylo.getBoundingClientRect(),r=el.getBoundingClientRect();
        mal.style.setProperty('--mx',(r.left-xr.left+r.width/2)+'px');
        mal.style.setProperty('--sy',Math.max(6,r.top-xr.top+8-80)+'px');
        mal.classList.remove('is-strike');void mal.offsetWidth;mal.classList.add('is-strike');}
      function bandFloater(el){const tray=$('#bandFloaters',panel);if(!tray)return;while(tray.children.length>22)tray.removeChild(tray.firstChild);
        const sr=$('#bandStage',panel).getBoundingClientRect(),r=el.getBoundingClientRect();
        const s=document.createElement('span');s.className='band-floater';s.textContent=['♪','♫','♬'][Math.floor(Math.random()*3)];
        s.style.left=(r.left-sr.left+r.width/2)+'px';s.style.top=(r.top-sr.top-6)+'px';tray.appendChild(s);setTimeout(()=>s.remove(),950);}
      function bandStopTape(){bandTimers.forEach(clearTimeout);bandTimers=[];if(bandTape.playing){bandTape.playing=false;const p=$('#bandPlay');if(p){p.innerHTML='▶ Play my song';p.dataset.speak='Play my song';}}}
      function bandTapeUI(){const rec=$('#bandRec'),play=$('#bandPlay');
        if(rec){rec.classList.toggle('is-rec',bandTape.rec);rec.innerHTML=bandTape.rec?'⏹ Stop':'● Record';rec.dataset.speak=bandTape.rec?'Stop recording':'Record your song';}
        if(play)play.disabled=!bandTape.events.length&&!bandTape.playing;}
      function renderBand(){
        bandStopTape();bandTape.rec=false;bandMallet=0;
        const idea=pickAt(bandJamIdeas,lessonIndex());
        panel.innerHTML=progressMarkup()+`<h2 class="prompt" data-speak="${idea} Ready to play?">Jam idea: ${idea}</h2>
        <div class="band-stage" id="bandStage">
          <div class="band-notes" id="bandFloaters" aria-hidden="true"></div>
          <div class="band-crew" aria-hidden="true"><figure><img src="${kqCastArt.isaiah}" alt=""></figure><figure><img src="${kqCastArt.questy}" alt=""></figure><figure><img src="${kqCastArt.mia}" alt=""></figure></div>
          <div class="band-zones">
            <section class="band-zone zone-piano" aria-label="Piano"><div class="band-zone-title"><span aria-hidden="true">🎹</span> Piano <small>Tap the keys — or press A to K!</small></div>
              <div class="band-piano" role="group" aria-label="Piano keys, a full octave">
                ${bandWhite.map((f,i)=>`<button type="button" class="band-key band-wk band-wk${i}" aria-label="Piano key ${bandWhiteName[i]}, keyboard ${bandWhiteKey[i]}"><span class="key-note">${bandWhiteName[i]}</span><kbd>${bandWhiteKey[i]}</kbd></button>`).join('')}
                ${bandBlack.map((f,i)=>`<button type="button" class="band-key band-bk band-bk${i}" aria-label="Piano key ${bandBlackName[i]}, keyboard ${bandBlackKey[i]}"><kbd>${bandBlackKey[i]}</kbd></button>`).join('')}
              </div></section>
            <section class="band-zone zone-drums" aria-label="Drums"><div class="band-zone-title"><span aria-hidden="true">🥁</span> Drums <small>Tap the pads — or press 1 to 4!</small></div>
              <div class="band-drums" role="group" aria-label="Drum pads">
                ${bandDrums.map(([kind,label,key],i)=>`<button type="button" class="band-pad band-pad${i}" data-drum="${kind}" aria-label="${label} drum, keyboard ${key}"><span class="pad-note">${label}</span><kbd>${key}</kbd></button>`).join('')}
              </div></section>
            <section class="band-zone zone-xylo" aria-label="Xylophone"><div class="band-zone-title"><span aria-hidden="true">🌈</span> Xylophone <small>Tap the rainbow bars!</small></div>
              <div class="band-xylo" id="bandXylo" role="group" aria-label="Xylophone bars">
                <div class="band-mallet band-mallet0" aria-hidden="true"><svg viewBox="0 0 40 90"><rect x="17" y="4" width="6" height="62" rx="3" fill="#a9713f"/><circle cx="20" cy="76" r="16" fill="#f1645d" stroke="#17324d" stroke-width="3"/></svg></div>
                <div class="band-mallet band-mallet1" aria-hidden="true"><svg viewBox="0 0 40 90"><rect x="17" y="4" width="6" height="62" rx="3" fill="#a9713f"/><circle cx="20" cy="76" r="16" fill="#0f9bd8" stroke="#17324d" stroke-width="3"/></svg></div>
                ${bandXylo.map((f,i)=>`<button type="button" class="band-zbar band-bar${i}" style="--barc:${bandXyloColor[i]};height:${118-i*8}px" aria-label="Xylophone bar ${bandXyloName[i]}"><span class="bar-note">${bandXyloName[i]}</span></button>`).join('')}
              </div></section>
          </div>
          <div class="band-bar">
            <button type="button" class="secondary-btn band-control" id="bandRec" data-speak="Record your song">● Record</button>
            <button type="button" class="secondary-btn band-control" id="bandPlay" data-speak="Play my song">▶ Play my song</button>
            <button type="button" class="secondary-btn band-control" id="bandErase" data-speak="Erase your song">⌫ Erase</button>
            <button type="button" class="primary-btn band-control" id="bandDone" data-speak="Done jamming. Next challenge!">⭐ Done jamming!</button>
          </div>
          <p class="band-legend">⌨️ Piano: <kbd>A</kbd>–<kbd>K</kbd> · Drums: <kbd>1</kbd>–<kbd>4</kbd></p>
        </div>`;
        setProgress();
        $$('.band-wk',panel).forEach((b,i)=>b.addEventListener('click',()=>bandNote('piano',i)));
        $$('.band-bk',panel).forEach((b,i)=>b.addEventListener('click',()=>bandNote('piano',8+i)));
        $$('.band-pad',panel).forEach(b=>b.addEventListener('click',()=>bandNote(b.dataset.drum,0)));
        $$('.band-zbar',panel).forEach((b,i)=>b.addEventListener('click',()=>bandNote('xylo',i)));
        $('#bandRec').onclick=()=>{const T=bandTape;if(T.playing)bandStopTape();T.rec=!T.rec;if(T.rec){T.events=[];T.t0=performance.now();toast('Recording… jam your song!');speak('Recording. Jam your song!');}bandTapeUI();};
        $('#bandPlay').onclick=()=>{const T=bandTape;if(T.playing){bandStopTape();return;}if(T.rec)T.rec=false;
          if(!T.events.length){toast('Record a song first!',false);return;}
          const ev=T.events.slice();bandStopTape();T.playing=true;bandTapeUI();
          const p=$('#bandPlay');p.innerHTML='⏸ Stop';p.dataset.speak='Stop the song';speak('Here is your song!');
          ev.forEach(e2=>bandTimers.push(setTimeout(()=>{if(state.game!=='band')return;bandSound(e2.kind,e2.idx);bandAnimate(e2.kind,e2.idx);},e2.at)));
          bandTimers.push(setTimeout(()=>{bandStopTape();bandTapeUI();},ev[ev.length-1].at+700));bandTapeUI();};
        $('#bandErase').onclick=()=>{bandStopTape();bandTape.rec=false;bandTape.events=[];bandTapeUI();toast('Tape erased!');};
        $('#bandDone').onclick=()=>correctThen(renderBand,$('#bandDone'));
        bandTapeUI();
      }
      /* Keyboard jam: piano A–K (black keys use W E T Y U), drums 1–4 — active only inside Questy's Band. */
      document.addEventListener('keydown',e=>{
        if(state.game!=='band'||e.repeat)return;
        const k=e.key.toUpperCase(),wi=bandWhiteKey.indexOf(k),bi=bandBlackKey.indexOf(k),di=['1','2','3','4'].indexOf(k);
        if(wi>=0)bandNote('piano',wi);else if(bi>=0)bandNote('piano',8+bi);else if(di>=0)bandNote(bandDrums[di][0],0);
      });

      const animalHomes=[
        'dog|home,cat|home,hamster|home,guinea pig|home,parakeet|home,pet rabbit|home,cow|farm,horse|farm,pig|farm,chicken|farm,goat|farm,sheep|farm,deer|forest,fox|forest,owl|forest,squirrel|forest,bear|forest,woodpecker|forest,frog|pond,duck|pond,turtle|pond,dragonfly|pond,minnow|pond,beaver|pond,whale|ocean,dolphin|ocean,shark|ocean,octopus|ocean,crab|ocean,seahorse|ocean,camel|desert,lizard|desert,scorpion|desert,roadrunner|desert,rattlesnake|desert,meerkat|desert',
        'badger|burrow,mole|burrow,groundhog|burrow,prairie dog|burrow,wombat|burrow,armadillo|burrow,eagle|nest,robin|nest,stork|nest,sparrow|nest,oriole|nest,osprey|nest,lion|den,tiger|den,wolf|den,hyena|den,polar bear|den,coyote|den,honeybee|hive or colony,bumblebee|hive or colony,ant|hive or colony,termite|hive or colony,wasp|hive or colony,hornet|hive or colony,clownfish|reef,parrotfish|reef,moray eel|reef,anemone|reef,lobster|reef,sea turtle|reef,heron|wetland,alligator|wetland,otter|wetland,moose|wetland,hippopotamus|wetland,egret|wetland',
        'bison|grassland,antelope|grassland,zebra|grassland,ostrich|grassland,prairie chicken|grassland,meadowlark|grassland,jaguar|rainforest,toucan|rainforest,sloth|rainforest,howler monkey|rainforest,poison dart frog|rainforest,tapir|rainforest,arctic fox|tundra,caribou|tundra,snowy owl|tundra,musk ox|tundra,lemming|tundra,arctic hare|tundra,trout|freshwater,catfish|freshwater,salamander|freshwater,river dolphin|freshwater,mayfly|freshwater,water vole|freshwater,butterflyfish|coral reef,wrasse|coral reef,reef shark|coral reef,coral polyp|coral reef,giant clam|coral reef,manta ray|coral reef,bat|cave,swiftlet|cave,cave cricket|cave,olm|cave,blind cave fish|cave,salamander larva|cave',
        'oyster|estuary,blue crab|estuary,saltmarsh sparrow|estuary,harbor seal|estuary,striped bass|estuary,mud snail|estuary,orangutan|canopy,gibbon|canopy,macaw|canopy,tree boa|canopy,fruit bat|canopy,harpy eagle|canopy,okapi|understory,leafcutter ant|understory,gorilla|understory,forest floor gecko|understory,agouti|understory,peccary|understory,cheetah|savanna,wildebeest|savanna,secretary bird|savanna,gazelle|savanna,elephant|savanna,giraffe|savanna,lynx|taiga,sable|taiga,crossbill|taiga,snowshoe hare|taiga,wolverine|taiga,elk|taiga,barnacle|intertidal zone,limpet|intertidal zone,sea star|intertidal zone,mussel|intertidal zone,shore crab|intertidal zone,sea anemone|intertidal zone'
      ].map(x=>x.split(',').map(v=>{const [name,home]=v.split('|');return{name,home};}));
      const animalHabitatChoices=[['home','farm','forest','pond','ocean','desert'],['burrow','nest','den','hive or colony','reef','wetland'],['grassland','rainforest','tundra','freshwater','coral reef','cave'],['estuary','canopy','understory','savanna','taiga','intertidal zone']];
