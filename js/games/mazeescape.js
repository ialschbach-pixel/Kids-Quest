      function mazeRng(seed){return function(){let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
      function mazeEdge(a,b){return a<b?`${a}-${b}`:`${b}-${a}`;}
      function mazeNeighbors(model,index,blockedDoors=false){const n=model.size,r=Math.floor(index/n),c=index%n,w=model.walls[index],out=[];if(!(w&1)&&r>0)out.push(index-n);if(!(w&2)&&c<n-1)out.push(index+1);if(!(w&4)&&r<n-1)out.push(index+n);if(!(w&8)&&c>0)out.push(index-1);return blockedDoors?out.filter(x=>!model.doors.some(d=>!d.open&&d.edge===mazeEdge(index,x))):out;}
      function mazeBfs(model,start=0,blockedDoors=false){const seen=new Set([start]),queue=[start],distance=Array(model.size*model.size).fill(-1),parent=Array(model.size*model.size).fill(-1);distance[start]=0;while(queue.length){const at=queue.shift();mazeNeighbors(model,at,blockedDoors).forEach(next=>{if(seen.has(next))return;seen.add(next);distance[next]=distance[at]+1;parent[next]=at;queue.push(next);});}return{seen,distance,parent};}
      /* ---- Illustrated art helpers: zero emoji, all SVG/CSS or real Questy art ---- */
      const MAZE_QUESTY_IMG='images/cast/questy.webp';
      function mazeSvgSnack(kind){const c='width="100%" height="100%" viewBox="0 0 40 40"';if(kind==='apple')return `<svg ${c} aria-hidden="true"><ellipse cx="20" cy="23" rx="11" ry="10" fill="#e04536"/><ellipse cx="20" cy="23" rx="11" ry="10" fill="url(#mzg)" opacity="0"/><path d="M20 13 Q20 7 26 5" stroke="#5a8f3c" stroke-width="2.5" fill="none"/><ellipse cx="26" cy="8" rx="4" ry="2.5" fill="#5a8f3c" transform="rotate(-20 26 8)"/><ellipse cx="16" cy="20" rx="3" ry="4" fill="#fff" opacity=".35"/></svg>`;if(kind==='cookie')return `<svg ${c} aria-hidden="true"><circle cx="20" cy="20" r="12" fill="#d9a05b"/><circle cx="20" cy="20" r="12" fill="none" stroke="#a06a2c" stroke-width="2"/><circle cx="15" cy="16" r="2" fill="#5b3a1a"/><circle cx="24" cy="14" r="2" fill="#5b3a1a"/><circle cx="20" cy="22" r="2" fill="#5b3a1a"/><circle cx="25" cy="25" r="2" fill="#5b3a1a"/><circle cx="14" cy="24" r="2" fill="#5b3a1a"/></svg>`;return `<svg ${c} aria-hidden="true"><path d="M20 4 L24 15 L36 15 L26 22 L30 34 L20 27 L10 34 L14 22 L4 15 L16 15 Z" fill="#ffd94d" stroke="#c9930a" stroke-width="1.5"/></svg>`;}
      function mazeSvgKey(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><circle cx="14" cy="14" r="8" fill="none" stroke="#c9930a" stroke-width="4"/><circle cx="14" cy="14" r="3" fill="#c9930a"/><rect x="19" y="17" width="14" height="5" rx="2" fill="#c9930a" transform="rotate(35 19 17)"/><rect x="27" y="24" width="4" height="6" fill="#c9930a" transform="rotate(35 27 24)"/><rect x="30" y="28" width="4" height="6" fill="#c9930a" transform="rotate(35 30 28)"/></svg>`;}
      function mazeSvgDoor(open){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="4" width="24" height="32" rx="3" fill="${open?'#8fd18f':'#a06a2c'}" stroke="#5b3a1a" stroke-width="2"/><circle cx="26" cy="20" r="2.5" fill="#ffd94d"/>${open?'<path d="M8 20 L32 20" stroke="#fff" stroke-width="2" opacity=".6"/>':''}</svg>`;}
      function mazeSvgQuizDoor(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="4" width="24" height="32" rx="3" fill="#7b5fc7" stroke="#4a3585" stroke-width="2"/><text x="20" y="27" text-anchor="middle" font-size="20" font-weight="bold" fill="#fff">?</text></svg>`;}
      function mazeSvgPortal(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="20" rx="12" ry="14" fill="none" stroke="#7b5fc7" stroke-width="4"/><ellipse cx="20" cy="20" rx="7" ry="9" fill="none" stroke="#b39ddb" stroke-width="3"/><ellipse cx="20" cy="20" rx="3" ry="4" fill="#e1bee7"/></svg>`;}
      function mazeSvgFlag(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><rect x="18" y="6" width="3" height="28" fill="#8b5a2b"/><path d="M21 8 L36 13 L21 19 Z" fill="#e04536"/></svg>`;}
      function mazeSvgShape(shape,color){const c='width="100%" height="100%" viewBox="0 0 40 40"';color=color||'#e04536';if(shape==='circle')return `<svg ${c} aria-hidden="true"><circle cx="20" cy="20" r="13" fill="${color}"/></svg>`;if(shape==='square')return `<svg ${c} aria-hidden="true"><rect x="8" y="8" width="24" height="24" rx="3" fill="${color}"/></svg>`;if(shape==='triangle')return `<svg ${c} aria-hidden="true"><path d="M20 7 L34 33 L6 33 Z" fill="${color}"/></svg>`;if(shape==='star')return `<svg ${c} aria-hidden="true"><path d="M20 4 L24 15 L36 15 L26 22 L30 34 L20 27 L10 34 L14 22 L4 15 L16 15 Z" fill="${color}"/></svg>`;return `<svg ${c} aria-hidden="true"><rect x="6" y="12" width="28" height="16" rx="3" fill="${color}"/></svg>`;}
      function mazeSnackKind(charId,idx){const map={forest:['apple','apple','apple'],sea:['star','star','star'],space:['star','star','star'],candy:['cookie','cookie','cookie'],pirate:['cookie','cookie','cookie'],snow:['star','star','star']};return (map[charId]||['apple'])[idx%3];}
      /* ---- Character portrait art: real images for Questy/Mia/Isaiah/Char, themed SVG for Friends ---- */
      function mazeSvgMusic(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><circle cx="12" cy="30" r="5" fill="#8b5fc7"/><rect x="15" y="8" width="3" height="22" fill="#8b5fc7"/><path d="M18 8 Q28 10 26 20" stroke="#8b5fc7" stroke-width="3" fill="none"/><circle cx="28" cy="28" r="5" fill="#b39ddb"/><rect x="31" y="6" width="3" height="22" fill="#b39ddb"/></svg>`;}
      function mazeSvgTools(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="18" width="16" height="5" rx="2" fill="#ef8f2e" transform="rotate(-30 8 18)"/><rect x="22" y="10" width="5" height="18" rx="2" fill="#8b5a2b"/><rect x="19" y="6" width="11" height="6" rx="2" fill="#5b5b5b"/></svg>`;}
      function mazeSvgPalette(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="20" rx="14" ry="11" fill="#f5e6c8" stroke="#8b5a2b" stroke-width="2"/><circle cx="13" cy="16" r="3" fill="#e04536"/><circle cx="20" cy="13" r="3" fill="#f2c230"/><circle cx="27" cy="16" r="3" fill="#3da65a"/><circle cx="15" cy="24" r="3" fill="#2b7de0"/><rect x="24" y="22" width="3" height="12" fill="#8b5a2b" transform="rotate(20 24 22)"/></svg>`;}
      function mazeSvgLeaf(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 5 Q35 15 20 35 Q5 15 20 5" fill="#3da65a"/><path d="M20 8 L20 32" stroke="#2b7d3f" stroke-width="2"/></svg>`;}
      function mazeSvgBook(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="6" width="24" height="28" rx="3" fill="#8b5fc7" stroke="#4a3585" stroke-width="2"/><rect x="12" y="10" width="16" height="20" fill="#fff"/><path d="M15 15 L25 15 M15 19 L25 19 M15 23 L22 23" stroke="#8b5fc7" stroke-width="2"/></svg>`;}
      function mazeSvgChef(){return `<svg width="100%" height="100%" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="14" rx="10" ry="7" fill="#fff" stroke="#ccc" stroke-width="1.5"/><rect x="12" y="18" width="16" height="5" fill="#fff" stroke="#ccc" stroke-width="1.5"/><ellipse cx="14" cy="10" rx="4" ry="4" fill="#fff" stroke="#ccc" stroke-width="1.5"/><ellipse cx="26" cy="10" rx="4" ry="4" fill="#fff" stroke="#ccc" stroke-width="1.5"/></svg>`;}
      function kqSetKeyCount(el,hasKey){el.innerHTML=`<span class="maze-inv-svg">${mazeSvgKey()}</span> ${hasKey?'found':'not found'}`;}
      function mazeCharPortrait(ch){if(ch.portraitImg)return `<img src="${ch.portraitImg}" alt="${ch.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;const svg={zara:mazeSvgMusic(),mateo:mazeSvgTools(),priya:mazeSvgPalette(),yuki:mazeSvgLeaf(),amara:mazeSvgBook(),omar:mazeSvgChef()}[ch.id]||'';return `<span class="maze-char-svg">${svg}</span>`;}
      /* 10 character themes: Questy, Mia, Isaiah, Char + 6 Friends. Each maze belongs to a character. */
      const mazeCharacters=[
        {id:'questy',name:"Questy's Wild Trail",charName:'Questy',theme:'adventure',portraitImg:'images/cast/questy.webp',snackKind:'apple',scene:'radial-gradient(circle at 18% 25%,#fff7 0 5px,transparent 6px),linear-gradient(145deg,#bce6bd,#e8f7c7)',edge:'#315c54'},
        {id:'mia',name:"Mia's Art Studio",charName:'Mia',theme:'creative',portraitImg:'images/cast/mia.webp',snackKind:'cookie',scene:'radial-gradient(circle at 20% 30%,#fff9 0 7px,transparent 8px),linear-gradient(145deg,#ffb2d2,#fff0a8)',edge:'#8b4a6b'},
        {id:'isaiah',name:"Isaiah's Sports Arena",charName:'Isaiah',theme:'sports',portraitImg:'images/cast/sports.webp',snackKind:'star',scene:'radial-gradient(circle at 20% 35%,#fff8 0 6px,transparent 7px),linear-gradient(145deg,#78d7e8,#d8fbff)',edge:'#2b6a8a'},
        {id:'char',name:"Char's Bug Garden",charName:'Char',theme:'nature',portraitImg:'images/char/main.webp',snackKind:'apple',scene:'radial-gradient(circle at 22% 70%,#fff6 0 7px,transparent 8px),linear-gradient(145deg,#a8d98a,#e8f7c7)',edge:'#3d6b2f'},
        {id:'zara',name:"Zara's Music Hall",charName:'Zara',theme:'music',portraitImg:null,snackKind:'star',scene:'radial-gradient(circle at 18% 22%,#fff 0 3px,transparent 4px),linear-gradient(145deg,#b39ddb,#e8e0f5)',edge:'#5b4a8a'},
        {id:'mateo',name:"Mateo's Workshop",charName:'Mateo',theme:'builder',portraitImg:null,snackKind:'cookie',scene:'radial-gradient(circle at 24% 22%,#fff 0 5px,transparent 6px),linear-gradient(145deg,#f5c86e,#f9e8c0)',edge:'#8a6a2b'},
        {id:'priya',name:"Priya's Art Corner",charName:'Priya',theme:'art',portraitImg:null,snackKind:'cookie',scene:'radial-gradient(circle at 20% 30%,#fff9 0 7px,transparent 8px),linear-gradient(145deg,#ffb2d2,#d8f0ff)',edge:'#8b4a6b'},
        {id:'yuki',name:"Yuki's Nature Walk",charName:'Yuki',theme:'nature',portraitImg:null,snackKind:'apple',scene:'radial-gradient(circle at 18% 25%,#fff7 0 5px,transparent 6px),linear-gradient(145deg,#bce6bd,#e0f0d0)',edge:'#315c54'},
        {id:'amara',name:"Amara's Story Circle",charName:'Amara',theme:'stories',portraitImg:null,snackKind:'star',scene:'radial-gradient(circle at 22% 70%,#fff6 0 7px,transparent 8px),linear-gradient(145deg,#c9b3e8,#f0e8ff)',edge:'#5b4a8a'},
        {id:'omar',name:"Omar's Kitchen",charName:'Omar',theme:'cooking',portraitImg:null,snackKind:'cookie',scene:'radial-gradient(circle at 20% 35%,#fff8 0 6px,transparent 7px),linear-gradient(145deg,#f5a86e,#ffe8d0)',edge:'#8a5a2b'}
      ];
      function makeMazeEscapeModel(grade,index,attempt=0){
        const size=[7,9,11,13][grade],seed=0x4d494100+grade*4099+index*131+attempt*7919,rng=mazeRng(seed),walls=Array(size*size).fill(15),seen=new Set([0]),stack=[0],dirs=[[-1,0,1,4],[0,1,2,8],[1,0,4,1],[0,-1,8,2]];
        while(stack.length){const at=stack[stack.length-1],r=Math.floor(at/size),c=at%size,choices=dirs.map((d,di)=>({d,di,nr:r+d[0],nc:c+d[1]})).filter(x=>x.nr>=0&&x.nc>=0&&x.nr<size&&x.nc<size&&!seen.has(x.nr*size+x.nc));if(!choices.length){stack.pop();continue;}const pick=choices[Math.floor(rng()*choices.length)],next=pick.nr*size+pick.nc;walls[at]&=~pick.d[2];walls[next]&=~pick.d[3];seen.add(next);stack.push(next);}
        const model={grade,index,size,seed,walls,doors:[],character:mazeCharacters[index%mazeCharacters.length]},reach=mazeBfs(model),exit=reach.distance.reduce((best,d,i)=>d>reach.distance[best]?i:best,0),dead=Array.from({length:size*size},(_,i)=>i).filter(i=>i!==0&&i!==exit&&mazeNeighbors(model,i).length===1).sort((a,b)=>reach.distance[b]-reach.distance[a]);
        if(dead.length<3){if(attempt<30)return makeMazeEscapeModel(grade,index,attempt+1);throw new Error(`Mia's Maze Escape generation failed: grade ${grade}, maze ${index+1} has fewer than three dead ends after 31 seeded attempts.`);}
        const snacks=dead.slice(0,3),reserved=new Set([0,exit,...snacks]),key=Array.from({length:size*size},(_,i)=>i).filter(i=>!reserved.has(i)).sort((a,b)=>reach.distance[b]-reach.distance[a])[0];reserved.add(key);
        const edges=[];for(let a=0;a<size*size;a++)mazeNeighbors(model,a).forEach(b=>{if(a<b&&a!==0&&b!==exit)edges.push(mazeEdge(a,b));});
        const doorCount=[3,4,6,6][grade],startAt=Math.floor(rng()*Math.max(1,edges.length-doorCount)),usedDE=new Set();for(let d=0;d<doorCount;d++){let du=0,edge=edges[(startAt+d*11)%edges.length];while(usedDE.has(edge)&&du<edges.length){du++;edge=edges[(startAt+d*11+du)%edges.length];}usedDE.add(edge);model.doors.push({edge,open:false,question:null});}
        model.start=0;model.exit=exit;model.snacks=snacks;model.key=key;
        const check=mazeBfs(model).seen,required=[model.key,...model.snacks,model.exit];if(required.some(cell=>!check.has(cell)))throw new Error(`Mia's Maze Escape reachability failed: grade ${grade}, maze ${index+1} cannot reach every collectible and exit.`);
        return model;
      }
      const mazeEscapeModels=Array.from({length:4},(_,grade)=>Array.from({length:48},(_,index)=>makeMazeEscapeModel(grade,index)));
      (function checkMazeEscape(){const signatures=new Set();mazeEscapeModels.flat().forEach(model=>{const signature=`${model.size}:${model.walls.join(',')}`;if(signatures.has(signature))throw new Error(`Mia's Maze Escape uniqueness failed: duplicate layout for grade ${model.grade}, maze ${model.index+1}.`);signatures.add(signature);});if(signatures.size!==192)throw new Error("Mia's Maze Escape integrity failed: expected 192 unique mazes.");})();
      let mazeEscapeRuntime=null,mazePraiseSpoken=false;
      function mazeClearRuntime(){if(mazeEscapeRuntime){if(mazeEscapeRuntime.keyHandler)document.removeEventListener('keydown',mazeEscapeRuntime.keyHandler);if(mazeEscapeRuntime.resizeHandler)window.removeEventListener('resize',mazeEscapeRuntime.resizeHandler);if(mazeEscapeRuntime.timer)clearInterval(mazeEscapeRuntime.timer);}mazeEscapeRuntime=null;}
      // ---- munch juice: soft pitched pops on the existing sound path ----
      function mazeTone(freq,dur,vol,type){if(!state.sound)return;try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.type=type||'sine';o.frequency.value=freq;const t=audioCtx.currentTime;g.gain.setValueAtTime(vol||.04,t);g.gain.exponentialRampToValueAtTime(.001,t+(dur||.09));o.start(t);o.stop(t+(dur||.09)+.02);}catch(e){}}
      function mazeStepPop(){const rt=mazeEscapeRuntime;if(!rt)return;const now=Date.now();rt.stepStreak=(now-rt.lastStepAt<1200)?Math.min(rt.stepStreak+1,12):0;rt.lastStepAt=now;mazeTone(360+rt.stepStreak*22,.07,.028,'sine');}
      function mazeTrailheadFor(id){return `<span class="maze-trailhead-svg">${mazeSvgFlag()}</span>`;}
      function renderMiasMazeIntro(){
        mazeClearRuntime();panel.innerHTML=`<div class="mia-intro">${gradeChipMarkup()}<img src="${questyArt.celebrating}" alt="Questy celebrating Mia's maze idea"><span class="mia-credit">Mia's idea!</span><h2>This game was invented by Mia!</h2><p>Questy is lost in six magical worlds. Guide him with your finger or mouse, find three snacks and the key, then unlock the exit!</p><div class="maze-mission" style="width:100%"><span>Drag or tap a neighbor</span><span>Arrow keys or WASD</span><span>Stuck? Questy, help!</span><span>Rewind paw goes back</span></div><button class="primary-btn" id="startMiasMaze" type="button">Start Mia's maze adventure</button></div>`;$('#startMiasMaze').onclick=startCurrentGame;const line=mazePraiseSpoken?"Let's play Mia's amazing maze idea!":"Questy says: Mia, your maze idea is amazing. Let's explore!";if(state.sound)mazePraiseSpoken=true;
      }
      function renderMazeEscape(){
        mazeClearRuntime();const model=mazeEscapeModels[state.grade][lessonIndex()],character=model.character,hazards=state.grade===0?'A friendly maze. Find snacks, the key, and the exit!':state.grade===1?'Quiz doors ask colors, shapes, and word puzzles!':state.grade===2?'Watch for quiz doors — answer right to pass through!':'Tricky quiz doors await!';
        panel.innerHTML=progressMarkup()+`<div class="maze-intro"><span class="mia-credit">Mia's idea!</span><div class="maze-world-card" style="--maze-scene:${character.scene};--maze-edge:${character.edge}"><div class="maze-world-banner"><div class="maze-char-portrait">${mazeCharPortrait(character)}</div><div class="maze-world-copy"><strong>${character.name}</strong><small>Starring ${character.charName}!</small></div></div><div class="maze-mission"><span><span class="maze-mission-svg">${mazeSvgSnack(character.snackKind)}</span> Find 3 snacks</span><span><span class="maze-mission-svg">${mazeSvgKey()}</span> Find the key</span><span><span class="maze-mission-svg">${mazeSvgDoor(false)}</span> Reach the exit</span></div></div><h2 class="prompt" data-speak="Welcome to ${character.name}, starring ${character.charName}. ${hazards} Find three snacks and the key, then reach the exit.">${hazards}</h2><button class="primary-btn maze-enter" id="enterMaze" type="button">Enter maze ${lessonIndex()+1}</button></div>`;setProgress();$('#enterMaze').onclick=()=>startMazeEscape(model);
      }
      /* Quiz doors: grades 0-1 get colors, shapes, and sight words; grades 2-3 get math. No emoji — SVG/CSS art only. */
      const MAZE_COLORS=[['red','#e04536'],['blue','#2b7de0'],['green','#3da65a'],['yellow','#f2c230'],['orange','#ef8f2e'],['purple','#8b5fc7'],['pink','#ef7fb8'],['brown','#8b5a2b']];
      const MAZE_SHAPES=['circle','square','triangle','star'];
      const MAZE_SIGHT=['the','and','a','to','said','in','you','it','of','for'];
      function mazeQuestion(model,doorIndex){const rng=mazeRng(model.seed+doorIndex*997+73),g=model.grade;let text,answer,visual='',isWord=false;
        const qtype=doorIndex%3;
        if(g<=1){
          if(qtype===0){/* color ID: show a swatch, name the color */
            const ci=Math.floor(rng()*MAZE_COLORS.length),others=[];while(others.length<2){const oi=Math.floor(rng()*MAZE_COLORS.length);if(oi!==ci&&!others.includes(oi))others.push(oi);}
            answer=MAZE_COLORS[ci][0];text='What color is this?';visual=`<div class="maze-color-swatch" style="background:${MAZE_COLORS[ci][1]}" aria-label="${answer} color swatch"></div>`;
            const options=[answer,MAZE_COLORS[others[0]][0],MAZE_COLORS[others[1]][0]];for(let si=options.length-1;si>0;si--){const sj=Math.floor(rng()*(si+1)),tmp=options[si];options[si]=options[sj];options[sj]=tmp;}return{text,answer,visual,options,isWord:true};
          }else if(qtype===1){/* shape ID: show shapes, pick the named one */
            const si=Math.floor(rng()*MAZE_SHAPES.length),shape=MAZE_SHAPES[si],color=MAZE_COLORS[Math.floor(rng()*MAZE_COLORS.length)][1];
            const others=[];while(others.length<2){const oi=Math.floor(rng()*MAZE_SHAPES.length);if(oi!==si&&!others.includes(oi))others.push(MAZE_SHAPES[oi]);}
            answer=shape;text=`Which one is a ${shape}?`;visual=`<div class="maze-shape-row">${mazeSvgShape(shape,color)}<span class="maze-shape-vs">or</span>${mazeSvgShape(others[0],color)}</div>`;
            const options=[shape,others[0],others[1]];for(let oi=options.length-1;oi>0;oi--){const oj=Math.floor(rng()*(oi+1)),tmp=options[oi];options[oi]=options[oj];options[oj]=tmp;}return{text,answer,visual,options,isWord:true};
          }else{/* sight word: which button says the word? */
            const wi=Math.floor(rng()*MAZE_SIGHT.length),word=MAZE_SIGHT[wi],others=[];while(others.length<2){const oi=Math.floor(rng()*MAZE_SIGHT.length);if(oi!==wi&&!others.includes(MAZE_SIGHT[oi]))others.push(MAZE_SIGHT[oi]);}
            answer=word;text=`Which word says "${word}"?`;isWord=true;
            const options=[word,...others];for(let oi=options.length-1;oi>0;oi--){const oj=Math.floor(rng()*(oi+1)),tmp=options[oi];options[oi]=options[oj];options[oj]=tmp;}return{text,answer,visual,options,isWord:true};
          }
        }
        /* grades 2-3: math with per-door variety (seeded, no repeats within a door set) */
        if(g===2){const a=10+Math.floor(rng()*11),b=1+Math.floor(rng()*Math.min(10,a));answer=a-b;text=`What is ${a} − ${b}?`;}
        else{const a=2+Math.floor(rng()*8),b=2+Math.floor(rng()*8);answer=a*b;text=`What is ${a} × ${b}?`;}
        const distractors=[Math.max(0,answer-1),answer+1,answer+2].filter((x,i,a)=>a.indexOf(x)===i&&x!==answer),options=[answer];while(distractors.length&&options.length<3)options.push(distractors.splice(Math.floor(rng()*distractors.length),1)[0]);for(let si=options.length-1;si>0;si--){const sj=Math.floor(rng()*(si+1)),tmp=options[si];options[si]=options[sj];options[sj]=tmp;}return{text,answer,visual,options,isWord:false};}
      function mazeAwardTickets(amount,message){if(!window.KQState)return;KQ.tickets=(KQ.tickets||0)+amount;KQsave();kqRenderHome();toast(`${message} +${amount} ticket${amount===1?'':'s'}!`);}
      function mazeSparkleAt(i,big){const cells=$$('.maze-cell',panel),cell=cells[i];if(!cell)return;const s=document.createElement('div');s.className='maze-sparkle'+(big?' big':'');s.setAttribute('aria-hidden','true');const n=big?10:6;for(let k=0;k<n;k++){const p=document.createElement('i'),a=k/n*360*Math.PI/180;p.className='maze-spark-dot';p.style.setProperty('--dx',`${Math.cos(a)*(big?64:40)}px`);p.style.setProperty('--dy',`${Math.sin(a)*(big?64:40)}px`);p.style.animationDelay=`${k*.035}s`;s.appendChild(p);}cell.appendChild(s);setTimeout(()=>s.remove(),950);}
      function mazeUnlockRitual(){const board=$('.maze-board',panel);if(!board)return;const f=document.createElement('div');f.className='maze-unlock-flash';f.setAttribute('aria-hidden','true');for(let k=0;k<14;k++){const s=document.createElement('span'),a=k/14*360*Math.PI/180;s.className='maze-unlock-dot';s.style.setProperty('--dx',`${Math.cos(a)*130}px`);s.style.setProperty('--dy',`${Math.sin(a)*130}px`);s.style.animationDelay=`${k*.04}s`;f.appendChild(s);}board.appendChild(f);setTimeout(()=>f.remove(),1150);beep('good');mazeTone(880,.18,.05);}
      function mazeCelebrate(charId){const map={questy:['#3da65a','#f2c230','#e04536'],mia:['#ef7fb8','#8b5fc7','#f2c230'],isaiah:['#2b7de0','#ef8f2e','#3da65a'],char:['#3da65a','#8b5a2b','#f2c230'],zara:['#8b5fc7','#b39ddb','#ef7fb8'],mateo:['#ef8f2e','#f2c230','#8b5a2b'],priya:['#e04536','#f2c230','#2b7de0'],yuki:['#3da65a','#bce6bd','#2b7d3f'],amara:['#8b5fc7','#c9b3e8','#f2c230'],omar:['#e04536','#ef8f2e','#f2c230']},bits=map[charId]||['#f2c230','#e04536','#3da65a'];const wrap=document.createElement('div');wrap.className='maze-celeb';wrap.setAttribute('aria-hidden','true');for(let i=0;i<26;i++){const s=document.createElement('span');s.className='maze-confetti-dot';s.style.background=bits[i%bits.length];s.style.left=`${(i*37)%100}%`;s.style.setProperty('--dx',`${(i%2?1:-1)*(30+i*4)}px`);s.style.animationDelay=`${(i%7)*.05}s`;wrap.appendChild(s);}panel.appendChild(wrap);setTimeout(()=>wrap.remove(),1750);}
      // Connected-wall rendering: wall BARS centered on cell edges (fused with neighbors)
      // plus rounded JOINT dots at corners where walls turn — never per-cell boxes.
      function mazeAddJoints(board,model){
        const n=model.size,walls=model.walls;
        const edgeH=(r,c)=>r===0?!!(walls[c]&1):r===n?!!(walls[(n-1)*n+c]&4):!!(walls[r*n+c]&1);
        const edgeV=(r,c)=>c===0?!!(walls[r*n]&8):c===n?!!(walls[r*n+n-1]&2):!!(walls[r*n+c]&8);
        for(let r=0;r<=n;r++)for(let c=0;c<=n;c++){
          const e1=c>0&&edgeH(r,c-1),e2=c<n&&edgeH(r,c),e3=r>0&&edgeV(r-1,c),e4=r<n&&edgeV(r,c),horiz=e1||e2,vert=e3||e4;
          if(!(horiz||vert))continue;
          if((e1&&e2&&!e3&&!e4)||(e3&&e4&&!e1&&!e2))continue;
          const cr=r===n?n-1:r,cc=c===n?n-1:c,cell=board.children[cr*n+cc];if(!cell)continue;
          cell.insertAdjacentHTML('beforeend',`<span class="maze-joint jc-${r===n?'s':'n'}${c===n?'e':'w'}" aria-hidden="true"></span>`);
        }
      }
      function mazeGliderPlace(animate){const rt=mazeEscapeRuntime;if(!rt||!rt.glideEl)return;const n=rt.model.size,r=Math.floor(rt.pos/n),c=rt.pos%n,bw=rt.glideEl.parentNode?rt.glideEl.parentNode.clientWidth:0,cell=bw/n,x=Math.round((c+.5)*cell),y=Math.round((r+.5)*cell);if(!animate)rt.glideEl.classList.add('no-anim');rt.glideEl.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;if(!animate){void rt.glideEl.offsetWidth;rt.glideEl.classList.remove('no-anim');}}
      function mazeSquash(){const rt=mazeEscapeRuntime;if(!rt||!rt.glideEl)return;const q=rt.glideEl.firstElementChild;if(!q||!q.classList.contains('maze-questy'))return;q.classList.remove('hop');if(q._hopRaf)cancelAnimationFrame(q._hopRaf);q._hopRaf=requestAnimationFrame(()=>{q._hopRaf=requestAnimationFrame(()=>{q._hopRaf=null;q.classList.add('hop');});});clearTimeout(q._hopT);q._hopT=setTimeout(()=>q.classList.remove('hop'),340);}
      function mazeClearHintMarks(){$$('.maze-hint-glow,.maze-hint-dot',panel).forEach(c=>c.classList.remove('maze-hint-glow','maze-hint-dot'));$$('.maze-goal-sparkle',panel).forEach(t=>t.classList.remove('maze-goal-sparkle'));}
      function mazeClearPreview(){$$('.maze-preview',panel).forEach(c=>c.classList.remove('maze-preview'));}
      function startMazeEscape(model){
        const runtime=mazeEscapeRuntime={model,pos:model.start,visited:new Set([model.start]),trail:[model.start],snacks:new Set(model.snacks),snackOrder:[...model.snacks],hasKey:false,keyRevealed:false,bonus:false,timer:null,drag:null,done:false,glideEl:null,hint:{level:0,goal:null},stamped:new Set(),mouths:new Set(),deadEnds:[],stepStreak:0,lastStepAt:0};
        const character=model.character,n=model.size,staged=model.grade<2;
        panel.innerHTML=progressMarkup()+`<div class="maze-shell" data-character="${character.id}"><div class="maze-board-wrap"><div class="maze-board" role="grid" aria-label="${n} by ${n} ${character.name} maze"></div></div><div class="maze-head"><span class="maze-world-pill"><span class="maze-pill-portrait">${mazeCharPortrait(character)}</span> ${character.name}</span><span class="maze-inventory" aria-live="polite"><b class="maze-snack-count"><span class="maze-inv-svg">${mazeSvgSnack(character.snackKind)}</span> 0/3</b><b class="maze-key-count"><span class="maze-inv-svg">${mazeSvgKey()}</span> not found</b></span></div><div class="maze-tools"><button type="button" class="maze-helper-btn maze-hint-btn" data-speak="Questy, help! Questy sniffs out the way to go.">Questy, help!</button><button type="button" class="maze-helper-btn maze-undo-btn" data-speak="Rewind paw! Questy hops back to the last crossroads.">Rewind paw</button></div><div class="maze-dpad" aria-label="Move Questy"><button type="button" class="maze-dpad-btn" data-dir="n" aria-label="Move up"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M12 5 L19 14 L5 14 Z" fill="currentColor"/></svg></button><div class="maze-dpad-row"><button type="button" class="maze-dpad-btn" data-dir="w" aria-label="Move left"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M5 12 L14 5 L14 19 Z" fill="currentColor"/></svg></button><button type="button" class="maze-dpad-btn" data-dir="s" aria-label="Move down"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M12 19 L5 10 L19 10 Z" fill="currentColor"/></svg></button><button type="button" class="maze-dpad-btn" data-dir="e" aria-label="Move right"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M19 12 L10 5 L10 19 Z" fill="currentColor"/></svg></button></div></div><h2 class="prompt" data-speak="Guide Questy through the ${character.name}. Drag with your finger or mouse. You can also tap a neighboring square, or use the arrow keys or W A S D to move. If you get stuck, press the Questy help button. The rewind paw hops Questy back to the last crossroads. Find three snacks and the key, then reach the exit.">Guide Questy: snacks → key → exit!</h2><p class="maze-help">Tap the <b>arrow buttons</b>, use <b>arrow keys or WASD</b>, drag through a corridor, or tap a neighbor. Quiz doors ask a question — press <b>1, 2, or 3</b> to answer!</p></div>`;setProgress();
        const board=$('.maze-board',panel);board.style.gridTemplateColumns=`repeat(${n},1fr)`;
        for(let i=0;i<n*n;i++){const cell=document.createElement('button'),w=model.walls[i],r=Math.floor(i/n)+1,c=i%n+1;cell.type='button';cell.className='maze-cell';cell.dataset.cell=i;cell.setAttribute('role','gridcell');cell.setAttribute('aria-label',`Maze square, row ${r}, column ${c}`);let bars='<span class="maze-tok"></span>';if(w&1)bars+='<span class="maze-wallbar wb-n" aria-hidden="true"></span>';if(w&2)bars+='<span class="maze-wallbar wb-e" aria-hidden="true"></span>';if(w&4)bars+='<span class="maze-wallbar wb-s" aria-hidden="true"></span>';if(w&8)bars+='<span class="maze-wallbar wb-w" aria-hidden="true"></span>';cell.innerHTML=bars;board.appendChild(cell);}
        mazeAddJoints(board,model);
        const glider=document.createElement('div');glider.className='maze-glider';glider.style.width=`${100/n}%`;glider.style.height=`${100/n}%`;glider.innerHTML=`<span class="maze-questy" aria-label="Questy"><img src="${MAZE_QUESTY_IMG}" alt="Questy" style="width:100%;height:100%;object-fit:contain;"></span>`;board.appendChild(glider);runtime.glideEl=glider;
        runtime.deadEnds=Array.from({length:n*n},(_,i)=>i).filter(i=>i!==model.start&&mazeNeighbors(model,i).length===1);
        updateMazeEscape();mazeGliderPlace(false);
        const hintBtn=$('.maze-hint-btn',panel),undoBtn=$('.maze-undo-btn',panel);
        if(hintBtn)hintBtn.onclick=()=>mazeHint(hintBtn);
        if(undoBtn)undoBtn.onclick=()=>mazeUndo(undoBtn);
        $$('.maze-dpad-btn',panel).forEach(btn=>{btn.onclick=()=>mazeDpadMove(btn.dataset.dir);});
        const activateCell=target=>{const cr=Math.floor(runtime.pos/n),cc=runtime.pos%n,tr=Math.floor(target/n),tc=target%n;if(Math.abs(cr-tr)+Math.abs(cc-tc)!==1){toast('Tap a square right next to Questy.',false);return;}mazeMoveTo(target);};
        board.onclick=e=>{if(e.detail!==0)return;const cell=e.target.closest('.maze-cell');if(cell)activateCell(Number(cell.dataset.cell));};
        const cellFromPoint=(x,y)=>{const rect=board.getBoundingClientRect(),col=Math.max(0,Math.min(n-1,Math.floor((x-rect.left)/rect.width*n))),row=Math.max(0,Math.min(n-1,Math.floor((y-rect.top)/rect.height*n)));return row*n+col;};
        board.onpointerdown=e=>{const cell=e.target.closest('.maze-cell');if(!cell)return;const at=Number(cell.dataset.cell);runtime.drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false,traveled:false,down:at,last:at};board.setPointerCapture(e.pointerId);};
        board.onpointermove=e=>{const d=runtime.drag;if(!d||d.id!==e.pointerId)return;if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>6)d.moved=true;if(!d.moved)return;const target=cellFromPoint(e.clientX,e.clientY);if(target===d.last&&runtime.pos===target)return;d.last=target;const path=mazePath(runtime.pos,target);mazeClearPreview();if(path.length>1){path.slice(1).forEach(i=>{const cc2=board.children[i];if(cc2)cc2.classList.add('maze-preview');});d.traveled=true;mazeMoveTo(path[1],true);}else if(!$('.maze-quiz',panel)){const wd=mazePathToDoor(runtime.pos,target);if(wd&&wd.door){if(wd.path.length>1){wd.path.slice(1).forEach(i=>{const cc3=board.children[i];if(cc3)cc3.classList.add('maze-preview');});d.traveled=true;mazeMoveTo(wd.path[1],true);}else{mazeOpenQuiz(wd.door);}}}};
        board.onpointerup=e=>{const d=runtime.drag;runtime.drag=null;mazeClearPreview();if(!d||d.id!==e.pointerId)return;const up=cellFromPoint(e.clientX,e.clientY);if(up===d.down&&!d.traveled)activateCell(d.down);};board.onpointercancel=()=>{runtime.drag=null;mazeClearPreview();};
        runtime.keyHandler=e=>{
          if(mazeEscapeRuntime!==runtime||runtime.done||e.repeat)return;
          if(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
          if(e.key>='1'&&e.key<='3'){const quiz=$('.maze-quiz',panel),btn=quiz&&$$('.maze-quiz-answer',quiz)[Number(e.key)-1];if(btn){e.preventDefault();btn.focus();btn.click();}return;}
          if(e.key==='Escape'){const quiz=$('.maze-quiz',panel),dis=quiz&&$('.maze-quiz-dismiss',quiz);if(dis){e.preventDefault();dis.click();}return;}
          if($('.maze-quiz',panel))return;
          const dirs={ArrowUp:'n',w:'n',W:'n',ArrowDown:'s',s:'s',S:'s',ArrowLeft:'w',a:'w',A:'w',ArrowRight:'e',d:'e',D:'e'},dir=dirs[e.key];
          if(!dir||state.game!=='mazeescape')return;
          e.preventDefault();
          mazeMoveTo(runtime.pos+(dir==='n'?-n:dir==='s'?n:dir==='w'?-1:1));
          const cell=$$('.maze-cell',panel)[runtime.pos];
          try{cell.focus({preventScroll:true});}catch(err){if(cell)cell.focus();}
        };
        document.addEventListener('keydown',runtime.keyHandler);
        runtime.resizeHandler=()=>mazeGliderPlace(false);window.addEventListener('resize',runtime.resizeHandler);
        const mazeFirst=$$('.maze-cell',panel)[runtime.pos];
        try{mazeFirst.focus({preventScroll:true});}catch(err){if(mazeFirst)mazeFirst.focus();}
      }
      function mazePath(start,target){const rt=mazeEscapeRuntime,model=rt.model,queue=[start],parent=new Map([[start,-1]]);while(queue.length){const at=queue.shift();if(at===target)break;mazeNeighbors(model,at,true).forEach(next=>{if(parent.has(next))return;parent.set(next,at);queue.push(next);});}if(!parent.has(target))return[start];const out=[];for(let at=target;at!==-1;at=parent.get(at))out.push(at);return out.reverse();}
      /* Drag aid: BFS treating closed doors as passable, but stop the path just
         before the first closed door and report it — so a drag toward a door
         walks Questy up to it and opens the quiz instead of dying silently. */
      function mazePathToDoor(start,target){const rt=mazeEscapeRuntime,model=rt.model,queue=[start],parent=new Map([[start,-1]]);while(queue.length){const at=queue.shift();if(at===target)break;mazeNeighbors(model,at,false).forEach(next=>{if(parent.has(next))return;parent.set(next,at);queue.push(next);});}if(!parent.has(target))return null;const full=[];for(let at=target;at!==-1;at=parent.get(at))full.push(at);full.reverse();for(let i=1;i<full.length;i++){const door=model.doors.find(d=>!d.open&&d.edge===mazeEdge(full[i-1],full[i]));if(door)return{path:full.slice(0,i),door};}return{path:full,door:null};}
      function mazeDirection(from,to,size){return to===from-size?'n':to===from+1?'e':to===from+size?'s':'w';}
      /* Bulletproof wall check: verify no wall between two cells by reading the
         wall bits directly. Both cells must be orthogonally adjacent. */
      function mazeCanMove(model,from,to){
        const n=model.size,fr=Math.floor(from/n),fc=from%n,tr=Math.floor(to/n),tc=to%n;
        if(fr<0||fc<0||tr<0||tc<0||fr>=n||fc>=n||tr>=n||tc>=n)return false;
        if(Math.abs(fr-tr)+Math.abs(fc-tc)!==1)return false;
        const w=model.walls[from];
        if(tr===fr-1)return !(w&1);
        if(tc===fc+1)return !(w&2);
        if(tr===fr+1)return !(w&4);
        if(tc===fc-1)return !(w&8);
        return false;
      }
      /* Bump feedback: shake Questy + soft thud when a wall blocks movement. */
      function mazeBump(){
        const rt=mazeEscapeRuntime;if(!rt||!rt.glideEl)return;
        const q=rt.glideEl.firstElementChild;if(!q||!q.classList.contains('maze-questy'))return;
        q.classList.remove('maze-bump');void q.offsetWidth;q.classList.add('maze-bump');
        setTimeout(()=>q.classList.remove('maze-bump'),320);
        mazeTone(150,.12,.05,'square');
      }
      /* D-pad: tap arrows to move. Kid-friendly alternative to drag. */
      function mazeDpadMove(dir){
        const rt=mazeEscapeRuntime;if(!rt||rt.done||state.game!=='mazeescape')return;
        if($('.maze-quiz',panel))return;
        const n=rt.model.size,target=rt.pos+(dir==='n'?-n:dir==='s'?n:dir==='w'?-1:dir==='e'?1:0);
        mazeMoveTo(target);
        const cell=$$('.maze-cell',panel)[rt.pos];
        try{if(cell)cell.focus({preventScroll:true});}catch(err){}
      }
      function mazeMoveTo(target,fromDrag=false){
        const rt=mazeEscapeRuntime;if(!rt||rt.done)return;const model=rt.model;
        if(!mazeCanMove(model,rt.pos,target)){
          /* Adjacent but walled: bump so the block is obvious. Silent for drag
             (the drag pathfinder already validates) and non-adjacent targets. */
          if(!fromDrag){
            const n=model.size,fr=Math.floor(rt.pos/n),fc=rt.pos%n,tr=Math.floor(target/n),tc=target%n;
            if(Math.abs(fr-tr)+Math.abs(fc-tc)===1)mazeBump();
          }
          return;
        }
        const door=model.doors.find(d=>!d.open&&d.edge===mazeEdge(rt.pos,target));if(door){mazeOpenQuiz(door);return;}const direction=mazeDirection(rt.pos,target,model.size);rt.trail.push(target);rt.pos=target;rt.visited.add(target);mazeClearHintMarks();mazeStepPop();mazeSquash();mazeArrive(direction);
      }
      function mazeArrive(direction){
        const rt=mazeEscapeRuntime,model=rt.model,character=model.character;
        if(rt.snacks.has(rt.pos)){rt.snacks.delete(rt.pos);const foundN=rt.snackOrder.length-rt.snacks.size;mazeSparkleAt(rt.pos,foundN===3);mazeTone([523.25,587.33,659.25][Math.min(foundN-1,2)],.16,.055);mazeAwardTickets(1,`${character.snackKind} Snack found`);if(model.grade<2&&foundN===3&&!rt.keyRevealed){rt.keyRevealed=true;mazeSparkleAt(model.key,true);}if(!rt.snacks.size&&!rt.bonus){rt.bonus=true;mazeAwardTickets(2,'All three snacks found — bonus');}}
        if(rt.pos===model.key&&!rt.hasKey){rt.hasKey=true;mazeUnlockRitual();mazeAwardTickets(1,'Key found');queueSpeech(['You found the key!','Watch the exit — the lock is breaking into sparkles!']);}
        if(rt.pos===model.exit){if(!rt.hasKey){toast('The exit is locked. Find the key first!',false);updateMazeEscape();return;}rt.done=true;if(rt.timer)clearInterval(rt.timer);mazeAwardTickets(1,'Exit reached');mazeCelebrate(character.id);state.score++;addStars(1);const adapted=masteryCorrect();toast(rt.snacks.size?'Maze escaped! You can search every corner next time.':'Perfect search! Questy found everything!');if(adapted==='up')showAdaptive('up');setTimeout(()=>{state.q++;if(state.q>=state.total)finishRound("Mia’s mazes conquered — every character visited! Invented by Mia!");else renderMazeEscape();},adapted==='up'?1550:1050);return;}
        updateMazeEscape();
      }
      function mazeOpenQuiz(door){
        const rt=mazeEscapeRuntime,model=rt.model,index=model.doors.indexOf(door),q=door.question||(door.question=mazeQuestion(model,index)),wrap=$('.maze-board-wrap',panel),modal=document.createElement('div');modal.className='maze-quiz';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.innerHTML=`<div class="maze-quiz-card"><h3 class="prompt" data-speak="Quiz door. ${q.text}"><span class="maze-quiz-door-svg">${mazeSvgQuizDoor()}</span> Quiz Door</h3><p><strong>${q.text}</strong></p>${q.visual?`<div class="maze-quiz-stars" aria-label="${q.answer} stars">${q.visual}</div>`:''}<div class="maze-quiz-answers">${q.options.map(o=>`<button class="maze-quiz-answer" type="button" data-value="${o}" data-speak="${o}">${o}</button>`).join('')}</div><div class="maze-quiz-dismiss-row"><button class="maze-quiz-dismiss" type="button" data-speak="Come back later">Come back later</button></div></div>`;wrap.appendChild(modal);$$('.maze-quiz-answer',modal).forEach(button=>button.onclick=()=>{const val=q.isWord?button.dataset.value:Number(button.dataset.value);if(val===q.answer){door.open=true;button.classList.add('correct');beep('good');toast('The quiz door swings open!');setTimeout(()=>{modal.remove();updateMazeEscape();},420);}else{wrong(button);if(!q.isWord){const guess=Number(button.dataset.value);toast(guess<q.answer?'Too small — count up!':'Too big — count down!',false,1500);}else{toast('Try again!',false,1500);}}});$('.maze-quiz-dismiss',modal).onclick=()=>{modal.remove();toast('No rush — the door will wait for you.');updateMazeEscape();};setTimeout(()=>$('.maze-quiz-answer',modal)?.focus(),60);
      }
      function mazeCurrentGoal(){
        const rt=mazeEscapeRuntime,model=rt.model;
        if(model.grade<2){const f=rt.snackOrder.length-rt.snacks.size;if(f<3)return{cell:rt.snackOrder[f],name:'snack'};if(!rt.hasKey)return{cell:model.key,name:'key'};return{cell:model.exit,name:'exit'};}
        for(const s of rt.snackOrder)if(rt.snacks.has(s))return{cell:s,name:'snack'};
        if(!rt.hasKey)return{cell:model.key,name:'key'};
        return{cell:model.exit,name:'exit'};
      }
      function mazeHint(btn){
        const rt=mazeEscapeRuntime;if(!rt||rt.done)return;const goal=mazeCurrentGoal(),goalKey=`${goal.name}:${goal.cell}`;
        if(rt.hint.goal!==goalKey)rt.hint={level:0,goal:goalKey};
        rt.hint.level=Math.min(3,rt.hint.level+1);mazeClearHintMarks();
        const cells=$$('.maze-cell',panel),path=mazePath(rt.pos,goal.cell),dirName={n:'above',s:'below',e:'to the right',w:'to the left'};
        let line;
        if(path.length<2){line='Hmm! A quiz door blocks the way. Answer its riddle to pass!';}
        else{const dir=dirName[mazeDirection(rt.pos,path[1],rt.model.size)];
          if(rt.hint.level===1){line=`Questy sniffs the air… the ${goal.name} is ${dir}!`;const gt=$('.maze-token',cells[goal.cell]);if(gt)gt.classList.add('maze-goal-sparkle');const q=$('.maze-questy',rt.glideEl);if(q){q.classList.add('sniff');setTimeout(()=>q.classList.remove('sniff'),1600);}}
          else if(rt.hint.level===2){line=`Follow the glowing paw prints, ${dir}!`;path.slice(1,5).forEach(i=>{if(cells[i])cells[i].classList.add('maze-hint-glow');});}
          else{line='Here is the whole trail. You walk it, explorer!';path.slice(1).forEach(i=>{if(cells[i])cells[i].classList.add('maze-hint-dot');});}}
        queueSpeech([btn.dataset.speak,line]);
        toast(['Questy sniffs!','Paw-print hints!','The whole trail!'][rt.hint.level-1]);
      }
      function mazeUndo(btn){
        const rt=mazeEscapeRuntime;if(!rt||rt.done)return;const model=rt.model,isJ=i=>mazeNeighbors(model,i).length!==2;
        let idx=rt.trail.length-1;if(idx>0&&rt.trail[idx]===rt.pos&&isJ(rt.pos))idx--;
        while(idx>0&&!isJ(rt.trail[idx]))idx--;
        const dest=rt.trail[idx];
        if(dest===rt.pos){queueSpeech([btn.dataset.speak,'Questy is already at a crossroads!']);toast('Questy is already at a crossroads!');return;}
        rt.pos=dest;rt.visited.add(dest);mazeClearHintMarks();mazeGliderPlace(false);
        const q=$('.maze-questy',rt.glideEl);if(q){q.classList.remove('rewind');void q.offsetWidth;q.classList.add('rewind');}
        queueSpeech([btn.dataset.speak,'Questy hops back to the crossroads!']);updateMazeEscape();
      }
      function mazeMarkSearched(){
        const rt=mazeEscapeRuntime;if(!rt)return;const model=rt.model,cells=$$('.maze-cell',panel);
        const goalCells=new Set([...rt.snacks]);if(!rt.hasKey)goalCells.add(model.key);
        rt.deadEnds.forEach(d=>{
          if(rt.stamped.has(d))return;
          const corridor=[d];let prev=d,cur=mazeNeighbors(model,d)[0];
          while(cur!==undefined&&mazeNeighbors(model,cur).length===2&&!corridor.includes(cur)){corridor.push(cur);const nx=mazeNeighbors(model,cur).find(x=>x!==prev);prev=cur;cur=nx;}
          if(!corridor.every(c=>rt.visited.has(c))||corridor.some(c=>goalCells.has(c)))return;
          corridor.forEach(c=>{rt.stamped.add(c);if(cells[c])cells[c].classList.add('maze-searched');});
          rt.mouths.add(corridor[corridor.length-1]);
        });
      }
      function updateMazeEscape(){
        const rt=mazeEscapeRuntime;if(!rt)return;const model=rt.model,n=model.size,character=model.character,cells=$$('.maze-cell',panel),grade=model.grade,staged=grade<2;
        const foundN=rt.snackOrder.length-rt.snacks.size,curSnack=staged?rt.snackOrder[Math.min(foundN,rt.snackOrder.length-1)]:null,showKey=!staged||foundN>=3,showExit=!staged||rt.hasKey;
        mazeMarkSearched();
        cells.forEach((cell,i)=>{
          let html='';
          if(i===model.start)html+=`<span class="maze-trailhead" aria-label="Maze start">${mazeTrailheadFor(character.id)}</span>`;
          if(i===model.exit)html+=`<span class="maze-exit-beacon" aria-hidden="true"></span>`;
          if(rt.snacks.has(i)&&(!staged||i===curSnack))html+=`<span class="maze-token maze-snack" aria-label="Questy snack">${mazeSvgSnack(character.snackKind)}</span>`;
          else if(i===model.key&&!rt.hasKey&&showKey)html+=`<span class="maze-token maze-key" aria-label="Key">${mazeSvgKey()}</span>`;
          else if(i===model.exit&&showExit)html+=`<span class="maze-token maze-exit" aria-label="${rt.hasKey?'Unlocked':'Locked'} exit">${mazeSvgDoor(rt.hasKey)}</span>`;
          if(rt.mouths.has(i))html+=`<span class="maze-searched-mark" aria-label="searched"></span>`;
          const door=model.doors.find(d=>!d.open&&d.edge.split('-').map(Number).includes(i));
          if(door){const other=door.edge.split('-').map(Number).find(x=>x!==i),dir=mazeDirection(i,other,n);html+=`<span class="maze-door door-${dir}" aria-label="Quiz Door">${mazeSvgQuizDoor()}</span>`;}
          const tok=$('.maze-tok',cell);if(tok)tok.innerHTML=html;
          const r=Math.floor(i/n)+1,c=i%n+1,txt=(tok?tok.textContent:'').replace(/\s+/g,' ').trim();
          cell.setAttribute('aria-label',txt?`${txt}, row ${r} column ${c}`:`Maze square, row ${r} column ${c}`);
        });
        mazeGliderPlace(true);
        const found=3-rt.snacks.size,sc=$('.maze-snack-count',panel),kc=$('.maze-key-count',panel);
        if(sc)sc.innerHTML=`<span class="maze-inv-svg">${mazeSvgSnack(character.snackKind)}</span> ${found}/3`;if(kc)kqSetKeyCount(kc,rt.hasKey);
      }


      
