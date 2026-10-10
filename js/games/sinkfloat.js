      function sfPick(i,g){const q=i%6,r=Math.floor(i/6)%6;const e=sfBanks[g][(q*11+r)%12];return {name:e[0],art:e[1],floats:!!e[2],scene:sfScenes[r],round:r};}
      const sfWhyF={
        shell:"It floats! Its cupped shell traps air, like a tiny boat.",
        spoon:"It sinks! Metal is heavy for its size, so gravity wins every time.",
        clip:"It sinks! A paperclip is thin, solid metal — too heavy for its tiny size.",
        pom:"It floats! All that fluff is mostly trapped air holding it up.",
        pebble:"It sinks. Pebbles are packed solid, so gravity pulls them down fast.",
        crayon:"It floats! Wax is lighter than water, so it rides on top.",
        penny:"It sinks! Coins are dense metal — no air to save them.",
        peel:"It floats! Fruit peel is full of tiny air pockets.",
        grape:"It sinks! Grapes are solid and heavy — no air bubbles inside.",
        sponge:"It floats! A sponge starts off full of airy holes.",
        capm:"It sinks! Pressed flat, metal can't trap enough air to float.",
        marble:"It sinks! Glass marbles are solid and heavy for their size.",
        frozgr:"It floats! Ice is lighter than water, so frozen things bob.",
        soap:"It floats! Some soap has air whipped inside it.",
        tack:"It sinks! Thumbtacks are metal — dense and heavy for their size.",
        wand:"It floats! Thin plastic is lighter than the water it pushes aside.",
        radish:"It floats! Its flat slice spreads its weight wide.",
        peanut:"It sinks! Nuts are packed solid, like tiny dumbbells.",
        dipper:"It floats! Wood is full of tiny air pockets inside.",
        band:"It sinks! A fabric hair band soaks up water and gives up.",
        foam:"It floats! Foam is almost entirely air bubbles.",
        fclip:"It sinks! A nail clipper is solid steel.",
        candle:"It floats! Wax is lighter than water — candles bob like little boats.",
        dollar:"It floats! Scallop shells curve like tiny boats and scoop up air.",
        tinboat:"It floats! Shaped like a bowl, a foil cup traps air and rides up.",
        grapefruit:"It floats! Its thick peel is a life jacket made of air.",
        pgf:"It sinks! Without its peel, there are no air pockets left.",
        berry:"It floats! Gooseberries are light, bouncy, and full of airy juice.",
        sugarplum:"It floats! Sugary candy has air baked inside it.",
        washero:"It sinks! A faucet seal is solid and dense.",
        orangew:"It floats! Peel full of air lifts the wedge up.",
        plumh:"It sinks! Sliced plums fill with water fast.",
        ribbon:"It floats! Streamers are so light they dance on the surface.",
        carrotst:"It sinks! Celery strips are dense and water-logged.",
        puzzle:"It floats! Cardboard soaks slowly, so it bobs along.",
        button:"It sinks! Metal buttons are heavy for their tiny size.",
        egg:"It sinks! A hard-boiled egg packs tight — denser than water.",
        cap:"It floats! A juice cap cups an upside-down pocket of air.",
        appleslice:"It floats! Apples are puffy with air — a quarter of every apple is air!",
        steelbolt:"It sinks! Steel beats water every single time.",
        candy:"It floats! The airy wrapper becomes its life jacket.",
        squishy:"It floats! Soft squishy cubes are mostly airy foam.",
        acorn:"It floats! The acorn shell traps a breath of air.",
        bookmark:"It floats! Flat shapes spread their weight wide.",
        whistle:"It sinks! A metal whistle is dense through and through.",
        twig:"It floats! Driftwood fibers trapped air for years.",
        nutmeat:"It sinks! Walnut meat is denser than walnut shell.",
        tongs:"They sink! Long steel tongs are dense end to end."
      };
      function sfWhy(art,grade){let f=sfWhyF[art]||"Water pushes every object up — and gravity pulls it down. Whichever wins decides!";return grade>=2?f+" Scientists call the water's push buoyancy.":f;}
      function sfShape(art){
        switch(art){
          case 'shell':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M48 6c16 0 26 12 26 28 0 24-13 56-26 56S22 58 22 34c0-16 10-28 26-28z' fill='#b07d4f' stroke='#7c5230' stroke-width='3'/><path d='M40 22q8 22 8 44M56 22q-8 22-8 44' stroke='#7c5230' stroke-width='2' fill='none'/></svg>";
          case 'spoon':return "<svg viewBox='0 0 96 96' class='sf-art'><ellipse cx='48' cy='30' rx='15' ry='20' fill='#e8b52a' stroke='#b8860b' stroke-width='3'/><rect x='44' y='46' width='8' height='40' rx='4' fill='#e8b52a' stroke='#b8860b' stroke-width='3'/></svg>";
          case 'clip':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M34 24v28a6 6 0 0 0 12 0V36a8 8 0 0 1 16 0v32a12 12 0 0 1-24 0V30' stroke='#9aa3b2' stroke-width='6' fill='none' stroke-linecap='round'/></svg>";
          case 'pom':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='26' fill='#ff9ff3'/><circle cx='36' cy='40' r='8' fill='#ffd6fb'/><circle cx='58' cy='56' r='7' fill='#ffd6fb'/><circle cx='52' cy='34' r='6' fill='#ffd6fb'/></svg>";
          case 'pebble':return "<svg viewBox='0 0 96 96' class='sf-art'><ellipse cx='48' cy='52' rx='28' ry='20' fill='#9aa0a6' stroke='#6a6f75' stroke-width='3'/><ellipse cx='42' cy='46' rx='8' ry='5' fill='#cfd4d9'/></svg>";
          case 'crayon':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M34 18l16 8-16 8z' fill='#4d80ff'/><rect x='22' y='26' width='52' height='14' rx='4' fill='#4d80ff' stroke='#2f57c4' stroke-width='3'/><rect x='52' y='26' width='16' height='14' fill='#2f57c4'/></svg>";
          case 'penny':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='28' fill='#c9762f' stroke='#8f4e1d' stroke-width='3'/><circle cx='48' cy='48' r='18' fill='none' stroke='#8f4e1d' stroke-width='2' stroke-dasharray='4 4'/></svg>";
          case 'peel':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M30 60q-6-26 18-34 22-8 18 14-4 20-24 18z' fill='#fb8500'/><path d='M30 60q26 8 36-16' stroke='#c96f2e' stroke-width='4' fill='none'/></svg>";
          case 'grape':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='40' cy='40' r='15' fill='#7b2cbf'/><circle cx='58' cy='52' r='15' fill='#9d4edd'/><path d='M48 26q2-12 12-14' stroke='#4d7c3a' stroke-width='4' fill='none' stroke-linecap='round'/></svg>";
          case 'frozgr':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='40' cy='44' r='17' fill='#9fd8ff' stroke='#5a9bd4' stroke-width='3'/><circle cx='58' cy='56' r='14' fill='#c8e8ff' stroke='#5a9bd4' stroke-width='3'/><path d='M30 34l8 8M50 60l8-8' stroke='#ffffff' stroke-width='3' stroke-linecap='round'/></svg>";
          case 'sponge':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='24' y='32' width='48' height='32' rx='8' fill='#ffd60a' stroke='#d9a700' stroke-width='3'/><circle cx='36' cy='44' r='4' fill='#d9a700'/><circle cx='52' cy='52' r='5' fill='#d9a700'/><circle cx='62' cy='42' r='3' fill='#d9a700'/></svg>";
          case 'capm':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='20' y='30' width='56' height='34' rx='6' fill='#9aa3b2' stroke='#6a7485' stroke-width='3'/><path d='M24 36h48' stroke='#6a7485' stroke-width='3'/></svg>";
          case 'marble':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='24' fill='#dff0ff' stroke='#7ea6c9' stroke-width='3'/><path d='M28 48q20-18 40 0' stroke='#3a86ff' stroke-width='6' fill='none'/></svg>";
          case 'soap':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='22' y='36' width='52' height='26' rx='12' fill='#ffe8f0' stroke='#e0a8bd' stroke-width='3'/><ellipse cx='48' cy='42' rx='10' ry='4' fill='#ffd0e0'/></svg>";
          case 'tack':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='34' r='16' fill='#e63946' stroke='#a62639' stroke-width='3'/><path d='M48 50l-4 26 8 0z' fill='#9aa3b2'/></svg>";
          case 'wand':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='20' y='60' width='8' height='26' rx='4' fill='#ffb703'/><circle cx='48' cy='36' r='22' fill='none' stroke='#3a86ff' stroke-width='5'/><circle cx='48' cy='36' r='14' fill='#cfe8ff' opacity='.7'/></svg>";
          case 'radish':return "<svg viewBox='0 0 96 96' class='sf-art'><ellipse cx='48' cy='50' rx='22' ry='16' fill='#ff6b9d' stroke='#c43a72' stroke-width='3'/><ellipse cx='48' cy='50' rx='12' ry='8' fill='#ffffff'/><path d='M44 38q-2-10-8-14M52 38q2-10 8-14' stroke='#4d7c3a' stroke-width='4' stroke-linecap='round'/></svg>";
          case 'peanut':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M34 40a16 16 0 1 0 4 24 14 14 0 1 0-4-24z' fill='#d9a066' stroke='#9c6b30' stroke-width='3'/></svg>";
          case 'dipper':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='40' r='16' fill='#d9a066' stroke='#9c6b30' stroke-width='3'/><path d='M36 36h24M36 43h24' stroke='#9c6b30' stroke-width='2'/><rect x='45' y='54' width='6' height='28' rx='3' fill='#b07d4f'/></svg>";
          case 'band':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='24' fill='none' stroke='#ff9ff3' stroke-width='12'/><circle cx='48' cy='48' r='24' fill='none' stroke='#e06fdb' stroke-width='4' stroke-dasharray='6 5'/></svg>";
          case 'foam':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='24' fill='#a9e6cf' stroke='#58a87e' stroke-width='3'/><circle cx='38' cy='40' r='6' fill='#d9f4e8'/><circle cx='58' cy='56' r='5' fill='#d9f4e8'/></svg>";
          case 'fclip':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='26' y='36' width='44' height='14' rx='7' fill='#9aa3b2' stroke='#6a7485' stroke-width='3'/><rect x='62' y='30' width='10' height='26' rx='5' fill='#6a7485'/></svg>";
          case 'candle':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='38' y='38' width='20' height='36' rx='4' fill='#fff3b0' stroke='#d9a700' stroke-width='3'/><path d='M48 16q8 10 0 18-8-8 0-18z' fill='#ffb703'/></svg>";
          case 'dollar':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M20 44q28-30 56 0-8 26-28 26t-28-26z' fill='#f6c9a0' stroke='#c96f2e' stroke-width='3'/><path d='M48 44v22M34 42l-6 18M62 42l6 18' stroke='#c96f2e' stroke-width='2'/></svg>";
          case 'tinboat':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M22 38l26 30h-0l26-30z' fill='#dff0ff' stroke='#7ea6c9' stroke-width='3'/><ellipse cx='48' cy='38' rx='26' ry='9' fill='#eef7ff' stroke='#7ea6c9' stroke-width='3'/></svg>";
          case 'grapefruit':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='28' fill='#ffe08a' stroke='#d9a700' stroke-width='4'/><circle cx='48' cy='48' r='22' fill='none' stroke='#d9a700' stroke-width='2'/><circle cx='48' cy='48' r='5' fill='#ff9f1c'/></svg>";
          case 'pgf':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M48 14a34 34 0 0 1 0 68z' fill='#ff9f1c' stroke='#c96f2e' stroke-width='3'/><path d='M48 22v52M48 34l18-6M48 34l18 12M48 58l18-4' stroke='#ffe08a' stroke-width='3'/></svg>";
          case 'berry':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='50' r='20' fill='#a3d20e' stroke='#6b8f0f' stroke-width='3'/><ellipse cx='42' cy='44' rx='6' ry='4' fill='#dcf5a8'/><path d='M48 30q0-10 10-12' stroke='#4d7c3a' stroke-width='4' stroke-linecap='round'/></svg>";
          case 'sugarplum':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='50' r='20' fill='#9d4edd' stroke='#6a2bbf' stroke-width='3'/><path d='M34 40l8-8M52 60l8-8M62 40l-6 6' stroke='#e0aaff' stroke-width='4' stroke-linecap='round'/></svg>";
          case 'washero':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='24' fill='#4d4f57'/><circle cx='48' cy='48' r='12' fill='#f4f6fb'/><circle cx='48' cy='48' r='24' fill='none' stroke='#23242b' stroke-width='3'/></svg>";
          case 'orangew':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M20 64a32 32 0 0 0 56 0z' fill='#fb8500' stroke='#c96f2e' stroke-width='3'/><path d='M32 62l12-20 12 20z' fill='#ffd6a5'/></svg>";
          case 'plumh':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M24 44a24 24 0 0 1 48 0c0 12-11 22-24 22s-24-10-24-22z' fill='#7b2cbf'/><ellipse cx='48' cy='44' rx='14' ry='10' fill='#c77dff'/><ellipse cx='48' cy='42' rx='6' ry='5' fill='#6a4a2f'/></svg>";
          case 'ribbon':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M20 30q14 6 0 24 14 6 0 24 20 4 40 0' fill='none' stroke='#ff5d8f' stroke-width='9' stroke-linecap='round'/></svg>";
          case 'carrotst':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='42' y='20' width='12' height='50' rx='6' fill='#8ecf60' stroke='#4d7c3a' stroke-width='3'/><path d='M42 44h12M42 54h12' stroke='#4d7c3a' stroke-width='2'/></svg>";
          case 'puzzle':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M28 40a8 8 0 0 1 12-4v-6h16v6a8 8 0 0 1 12 4v20a8 8 0 0 1-12 4v6H40v-6a8 8 0 0 1-12-4z' fill='#ffd60a' stroke='#d9a700' stroke-width='3'/></svg>";
          case 'button':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='22' fill='#c9d1dc' stroke='#6a7485' stroke-width='3'/><circle cx='42' cy='42' r='3' fill='#6a7485'/><circle cx='54' cy='42' r='3' fill='#6a7485'/><circle cx='42' cy='54' r='3' fill='#6a7485'/><circle cx='54' cy='54' r='3' fill='#6a7485'/></svg>";
          case 'egg':return "<svg viewBox='0 0 96 96' class='sf-art'><ellipse cx='48' cy='52' rx='20' ry='26' fill='#fdf6e3' stroke='#cbb98a' stroke-width='3'/><ellipse cx='42' cy='46' rx='5' ry='8' fill='#ffffff'/></svg>";
          case 'cap':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M24 62a24 24 0 0 1 48 0z' fill='#3a86ff' stroke='#1e5cb8' stroke-width='3'/><path d='M28 54h40' stroke='#1e5cb8' stroke-width='3'/></svg>";
          case 'appleslice':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M28 20q20 10 20 40t-20 24z' fill='#f7efde' stroke='#b8860b' stroke-width='3'/><path d='M28 20q10 32 0 64' stroke='#e63946' stroke-width='6' fill='none'/><circle cx='36' cy='52' r='3' fill='#6a4a2f'/></svg>";
          case 'steelbolt':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='44' y='40' width='8' height='36' fill='#9aa3b2'/><path d='M44 40l4-10 8 10z' fill='#6a7485'/><rect x='34' y='26' width='28' height='12' rx='6' fill='#c9d1dc' stroke='#6a7485' stroke-width='2'/><path d='M48 30v4M44 30v4M52 30v4' stroke='#6a7485' stroke-width='2'/></svg>";
          case 'candy':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M18 44l12-8v24z' fill='#cfe8ff'/><path d='M78 44l-12-8v24z' fill='#cfe8ff'/><rect x='30' y='36' width='36' height='24' rx='10' fill='#7ef0b2' stroke='#3a9d6e' stroke-width='3'/></svg>";
          case 'squishy':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='28' y='28' width='40' height='40' rx='14' fill='#b9a7e6' stroke='#7b68c4' stroke-width='3'/><circle cx='40' cy='40' r='4' fill='#e5dbff'/><circle cx='56' cy='56' r='3' fill='#e5dbff'/></svg>";
          case 'acorn':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M36 40q12-10 24 0l-2 20a10 10 0 0 1-20 0z' fill='#9c6b30' stroke='#6e4220' stroke-width='3'/><path d='M34 38q14-12 28 0l-2 6q-12-8-24 0z' fill='#6e4220'/></svg>";
          case 'bookmark':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M36 14h24v52l-12-8-12 8z' fill='#d9436b' stroke='#a62639' stroke-width='3'/><path d='M43 28h10' stroke='#ffd0dd' stroke-width='3' stroke-linecap='round'/></svg>";
          case 'whistle':return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='42' cy='50' r='18' fill='#c9d1dc' stroke='#6a7485' stroke-width='3'/><rect x='54' y='42' width='24' height='12' rx='6' fill='#9aa3b2' stroke='#6a7485' stroke-width='2'/><circle cx='42' cy='50' r='5' fill='#6a7485'/></svg>";
          case 'twig':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M24 70q24-6 44-34 4-6-2-10t-10 2Q40 52 26 62z' fill='#9c6b30' stroke='#6e4220' stroke-width='3'/><circle cx='56' cy='42' r='3' fill='#6e4220'/></svg>";
          case 'nutmeat':return "<svg viewBox='0 0 96 96' class='sf-art'><path d='M48 22c12 0 20 10 20 22 0 14-9 26-20 26S28 58 28 44c0-12 8-22 20-22z' fill='#d9a066' stroke='#9c6b30' stroke-width='3'/><path d='M48 24q-6 14 0 28M48 24q6 14 0 28' stroke='#9c6b30' stroke-width='2' fill='none'/></svg>";
          case 'tongs':return "<svg viewBox='0 0 96 96' class='sf-art'><rect x='34' y='14' width='8' height='54' rx='4' fill='#9aa3b2' transform='rotate(8 38 41)'/><rect x='54' y='14' width='8' height='54' rx='4' fill='#9aa3b2' transform='rotate(-8 58 41)'/><path d='M34 16q14-8 28 0' stroke='#6a7485' stroke-width='6' fill='none'/></svg>";
          default:return "<svg viewBox='0 0 96 96' class='sf-art'><circle cx='48' cy='48' r='26' fill='#dfe8ff'/></svg>";
        }
      }
      function sfSceneArt(scene){
        const waterColor={"Pond Tank":"#7fcba3","Bath Tank":"#8fd3f7","Ocean Tank":"#5cb8e8","Rain Barrel":"#6fb3c9","Swimming Pool":"#5cc8ff","Science Tank":"#90cdf4"}[scene]||"#8fd3f7";
        return `<div class="sf-water" style="--water:${waterColor}"><div class="sf-bubbles"><span></span><span></span><span></span><span></span></div></div>`;
      }
      function renderSinkFloat(){
        const i=lessonIndex(),g=state.grade,ch=sfPick(i,g);
        const cards=$(".sf-dragcard",panel);
        let prediction=null,dropped=false;
        const prompt=`Will the ${ch.name} sink or float in the ${ch.scene.toLowerCase()}? Drag it to a pad to predict, then drop it in the water.`;
        panel.innerHTML=progressMarkup()+`<h2 class="prompt" data-speak="Will the ${ch.name} sink or float? Drag it to the sink pad or the float pad to predict.">${prompt}</h2><p class="lab-instruction">Make a prediction first, like a scientist. Then test it!</p><div class="lab-stage"><p class="sf-scene-tag" data-speak="${ch.scene}">${ch.scene}</p><div class="sf-tank" id="sfTank">${sfSceneArt(ch.scene)}<div class="sf-surface"></div></div><button class="sf-dragcard" id="sfCard" data-part="predict" type="button" data-name="${ch.name}">${sfShape(ch.art)}<span class="sf-card-name">${ch.name}</span></button><div class="sf-pads"><button class="sf-pad sf-sink" data-accept="predict" type="button" aria-label="Predict: this sinks to the bottom"><span class="sf-pad-icon">⬇️</span><span class="sf-pad-word">SINK</span><small>to the bottom</small></button><button class="sf-pad sf-float" data-accept="predict" type="button" aria-label="Predict: this floats on top"><span class="sf-pad-icon">🌊</span><span class="sf-pad-word">FLOAT</span><small>rides on top</small></button></div><button class="lab-action sf-dropbtn" id="sfDrop" disabled type="button">Drop it in the water!</button><p class="science-result" id="sfResult" role="status">Tap a pad or drag the ${ch.name} there to make your prediction.</p></div>`;
        setProgress();
        const card=$('#sfCard',panel),tank=$('#sfTank',panel),pads=$$('.sf-pad',panel),dropBtn=$('#sfDrop',panel),result=$('#sfResult',panel);
        function placePredict(pad){
          if(dropped||state.locked||pad.disabled)return;
          prediction=pad.dataset.accept==='predict'?(pad.classList.contains('sf-sink')?'sink':'float'):prediction;
          pads.forEach(p=>p.classList.toggle('selected',p===pad));
          card.classList.add('locked');dropBtn.disabled=false;
          result.textContent=`Your prediction: ${prediction==='sink'?'it sinks!':'it floats!'} Tap “Drop it in the water!” to test.`;
          speak(`You predicted it ${prediction}s. Now drop it in the water to test your idea!`);
        }
        bindDragAndTap([card],pads,(part,zone)=>placePredict(zone));
        pads.forEach(pad=>pad.addEventListener('click',()=>placePredict(pad)));
        /* custom pointer drag for the card (touch-flings the card onto pads) */
        let drag=null;
        card.addEventListener('pointerdown',e=>{if(card.classList.contains('locked')||dropped)return;drag={x:e.clientX,y:e.clientY,moved:false};try{card.setPointerCapture(e.pointerId);}catch(err){}card.classList.add('dragging');card.style.zIndex='50';});
        card.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>12)drag.moved=true;card.style.transform=`translate(${dx}px,${dy}px) rotate(${clamp(dx/9,-14,14)}deg)`;});
        function endCardDrag(e){
          if(!drag)return;const moved=drag.moved;const cx=e.clientX,cy=e.clientY;drag=null;card.classList.remove('dragging');card.style.transform='';
          if(!moved||dropped)return;
          card.style.pointerEvents='none';const hit=document.elementFromPoint(cx,cy);const pad=hit&&hit.closest?hit.closest('.sf-pad'):null;card.style.pointerEvents='';
          if(pad)placePredict(pad);
        }
        card.addEventListener('pointerup',endCardDrag);
        card.addEventListener('pointercancel',()=>{drag=null;card.classList.remove('dragging');card.style.transform='';});
        dropBtn.addEventListener('click',()=>{
          if(dropped||!prediction||state.locked)return;dropped=true;dropBtn.disabled=true;card.classList.add('hidden-card');
          const flyer=document.createElement('div');flyer.className='sf-flyer';flyer.innerHTML=sfShape(ch.art);
          tank.appendChild(flyer);sciSplash();
          setTimeout(()=>{flyer.classList.add('land');
            for(let s=0;s<6;s++){const drop=document.createElement('span');drop.className='sf-splashdrop';drop.style.setProperty('--dx',(Math.random()*120-60)+'px');tank.appendChild(drop);setTimeout(()=>drop.remove(),700);}
            setTimeout(()=>{
              flyer.classList.add(ch.floats?'is-float':'is-sink');
              const correct=prediction===(ch.floats?'float':'sink');
              const fact=sfWhy(ch.art,g);
              const headline=correct?(ch.floats?'Your prediction matched! It floats!':'Your prediction matched! It sinks!'):'A surprise discovery!';
              result.innerHTML=`<strong>${headline}</strong> ${fact}`;
              speak(`${headline} ${fact}`);
              labOutcome(renderSinkFloat,correct,dropBtn,`${headline} ${fact}`);
            },520);
          },480);
        });
      }

      /* ── MAGNET FISHING ── */
