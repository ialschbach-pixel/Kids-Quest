/* ═══════════ Adventure Map: one winding trail through every world ═══════════
         The seven subject worlds are chapters along one board-spine trail; each
         game is a numbered stop node ON the trail inside its world. Tapping a
         world hops Questy's pawn there, lets its theme take over home (--kw-*
         tokens via body[data-kqworld]), and refreshes her dialogue + garland.
         Mia's Maze Escape keeps its own worlds — the map only points to it. */
      const kqMapWorlds=[
        {id:'math',name:'Math Meadow',emoji:'🌼',sb:'#43a25a',garland:'🌼 🔢 🌼 ✏️ 🌼 ⭐',lines:["Welcome to Math Meadow, number sprout! Let's count like the wind!","The daisies are counting their petals — can you help them?","Every stop on this trail is a brand-new number adventure!"]},
        {id:'reading',name:'Reading Forest',emoji:'🦉',sb:'#1f8a6d',garland:'📖 🦉 📖 🌳 📖 ⭐',lines:["Shhh... the story trees are waking up, little reader!","The Reading Forest is full of tales. Let's grow your words!","Can you hear the alphabet owls? They love a good book!"]},
        {id:'logic',name:'Logic Lagoon',emoji:'🌊',sb:'#1f9ece',garland:'🌊 🧩 🌊 🪸 🌊 ⭐',lines:["Splash into Logic Lagoon! Puzzlers love it here!","The lagoon lobsters have riddles for you — are you ready?","Memory waves and mystery inlets — think like a detective!"]},
        {id:'creative',name:'Art Atelier',emoji:'🎨',sb:'#d94f83',garland:'🎨 🖌️ 🎨 🌈 🎨 ⭐',lines:["Welcome to the Art Atelier! Grab your imaginary paintbrush!","Creativity is raining paint here — let's make something bright!","Every idea gets a little sparkle in this studio!"]},
        {id:'music',name:'Music Mountain',emoji:'🎶',sb:'#7c63c9',garland:'🎶 🥁 🎶 ⛰️ 🎶 ⭐',lines:["Echo... echo... Music Mountain is singing your name!","Climb the melody! Tap a game and let's make music!","The mountain goats are keeping the beat. Can you?"]},
        {id:'science',name:'Science Shore',emoji:'🐚',sb:'#2aa186',garland:'🐚 🌊 🐚 🦀 🐚 ⭐',lines:["Welcome to Science Shore, little explorer!","The tide pools are full of wonders — let's discover them!","Grab your magnifying glass and follow the shoreline!"]},
        {id:'lab',name:'Science Lab',emoji:'🧪',sb:'#2f7fc4',garland:'🧪 ⚗️ 🧪 🔬 🧪 ⭐',lines:["The Science Lab is bubbling with experiments!","Safety goggles on, scientist! Let's try something fizzy!","Zap! Fizz! Watch what happens when you mix it!"]}
      ];
      const kqWorldById=Object.fromEntries(kqMapWorlds.map(w=>[w.id,w]));
      const kqReducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
      state.currentWorld=null;                       /* in-memory only: the picked adventure-map world */
      let kqPawnFrac=0, kqPickToken=0, kqLaunching=false;

      function kqSpineD(){
        const p=[[50,0],[45,10],[55,20],[45,30],[55,42],[45,54],[55,66],[45,78],[55,90],[50,100]]; /* winding spine, viewBox 0 0 100 100 */
        let d=`M${p[0][0]} ${p[0][1]}`;
        for(let i=0;i<p.length-1;i++){
          const p0=p[Math.max(0,i-1)],p1=p[i],p2=p[i+1],p3=p[Math.min(p.length-1,i+2)];
          d+=`C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0]} ${p2[1]}`;
        }
        return d;
      }
      function kqTopInBoard(el){
        const board=$('#mapBoard'); let y=0,node=el;
        while(node&&node!==board){y+=node.offsetTop;node=node.offsetParent;}
        return y;
      }
      function kqPawnTarget(id){
        const board=$('#mapBoard'),sec=document.querySelector('#mapRegions .quest-category.category-'+id);
        if(!board||!sec||!board.offsetHeight)return null;
        const toggle=sec.querySelector('.category-toggle');
        return (kqTopInBoard(sec)+toggle.offsetHeight/2)/board.offsetHeight;
      }
      /* Convert SVG viewBox point to pawn-container-relative percentages */
      function kqSvgToPct(pawn,path,pt){
        try{
          const svgRect=path.ownerSVGElement.getBoundingClientRect();
          const contRect=pawn.offsetParent.getBoundingClientRect();
          const scaleX=svgRect.width/100, scaleY=svgRect.height/100;
          const absX=svgRect.left+pt.x*scaleX, absY=svgRect.top+pt.y*scaleY;
          return [((absX-contRect.left)/contRect.width*100).toFixed(2),
                  ((absY-contRect.top)/contRect.height*100).toFixed(2)];
        }catch(e){ return [pt.x, pt.y]; }
      }
      function kqPlacePawn(frac){
        const pawn=$('#mapPawn'),path=$('#trailTop'); if(!pawn||!path)return;
        const pt=path.getPointAtLength(Math.min(.999,Math.max(0,frac))*path.getTotalLength());
        const [x,y]=kqSvgToPct(pawn,path,pt);
        pawn.style.left=x+'%'; pawn.style.top=y+'%';
        pawn.style.transform='translate(-50%,-86%)';
        pawn.classList.remove('is-traveling'); pawn.classList.add('is-idle');
      }
      /* Fraction-based pawn travel with an optional stop-to-stop footprint trail */
      function kqTravelToFrac(toF,opts,done){
        opts=opts||{};
        const path=$('#trailTop'),pawn=$('#mapPawn');
        toF=(typeof toF==='number'&&isFinite(toF))?toF:null;
        if(!path||!pawn||toF===null||kqReducedMotion){if(toF!==null)kqPawnFrac=toF;kqPlacePawn(kqPawnFrac);done&&done();return;}
        const from=kqPawnFrac,total=path.getTotalLength(),start=performance.now();
        const dur=Math.min(1500,420+Math.abs(toF-from)*2600),hops=Math.max(2,Math.round(Math.abs(toF-from)*9));
        const hits=opts.footprints&&typeof kqStopHits==='function'?kqStopHits(from,toF,opts.skipGame):[]; let hitIx=0;
        kqPawnFrac=toF; const token=++kqPickToken;
        if(pawn) pawn.classList.add('is-traveling'), pawn.classList.remove('is-idle');
        let lastSpark=0;
        const sparkLayer=()=>{const now2=performance.now(); if(now2-lastSpark>130){lastSpark=now2;
          const p2=path.getPointAtLength(Math.min(.999,Math.max(0,kqPawnFrac))*path.getTotalLength());
          kqDropTrailSparkle(p2.x, p2.y);}};
        const step=now=>{
          if(token!==kqPickToken){done&&done();return;}
          const prog=Math.min(1,(now-start)/dur),ease=prog<.5?2*prog*prog:1-((-2*prog+2)**2)/2;
          const cur=from+(toF-from)*ease;
          const pt=path.getPointAtLength(Math.min(.999,Math.max(0,cur))*total);
          const bounce=Math.abs(Math.sin(prog*Math.PI*hops))*-22,wob=Math.sin(prog*Math.PI*hops)*7;
          const [px,py]=kqSvgToPct(pawn,path,pt);
          pawn.style.left=px+'%'; pawn.style.top=py+'%';
          pawn.style.transform=`translate(-50%,-86%) translateY(${bounce.toFixed(1)}px) rotate(${wob.toFixed(1)}deg)`;
          while(hitIx<hits.length&&(toF>=from?(hits[hitIx].frac>=from&&hits[hitIx].frac<=cur):(hits[hitIx].frac<=from&&hits[hitIx].frac>=cur))){kqDropFootprints(hits[hitIx].gameId);hitIx++;}
          sparkLayer();
          if(prog<1)requestAnimationFrame(step); else {kqPlacePawn(toF);done&&done();}
        };
        requestAnimationFrame(step);
      }
      function kqTravelTo(id,done){
        kqTravelToFrac(kqPawnTarget(id),{},done);
      }
      function kqBurstConfettiAt(f){
        if(kqReducedMotion)return;
        const layer=$('#mapConfetti'),path=$('#trailTop'); if(!layer||!path)return; layer.textContent='';
        const pt=path.getPointAtLength((f===null||f===undefined?0.3:f)*path.getTotalLength());
        const cols=['#ef5350','#2c8fbe','#28a060','#765bc1','#ffbd3e','#ff7c43'];
        for(let i=0;i<22;i++){const bit=document.createElement('i');bit.style.left=`calc(${pt.x.toFixed(1)}% + ${(Math.random()*16-8).toFixed(1)}%)`;bit.style.setProperty('--stop-y',pt.y.toFixed(1)+'%');bit.style.background=cols[i%cols.length];bit.style.animationDelay=(Math.random()*.28).toFixed(2)+'s';layer.appendChild(bit);}
        setTimeout(()=>{layer.textContent='';},1900);
      }
      function kqBurstConfetti(id){kqBurstConfettiAt(kqPawnTarget(id));}
      function kqSetBubble(text){
        const b=$('#questyBubble'); if(!b)return;
        b.textContent=text; b.dataset.speak=text;
        b.classList.remove('bubble-pop'); void b.offsetWidth; b.classList.add('bubble-pop');
      }
      function kqSetGarland(worldId,fallbackText){const g=$('#mapGarland');if(!g)return;const bg=(typeof kqWorldArt!=='undefined'&&kqWorldArt.backgrounds&&kqWorldArt.backgrounds[worldId]);if(bg){g.innerHTML=`<img src="${bg}" alt="" style="width:100%;max-height:120px;object-fit:cover;border-radius:12px;display:block;">`;}else{g.textContent=fallbackText||'';}}
      function kqPickWorld(id){
        const w=kqWorldById[id],sec=document.querySelector('#mapRegions .quest-category.category-'+id); if(!w||!sec)return;
        const same=state.currentWorld===id;
        state.currentWorld=id; document.body.dataset.kqworld=id; kqRenderWorldArt(id);
        $$('#mapRegions .quest-category').forEach(s=>s.classList.toggle('is-current',s===sec));
        const line=sample(w.lines)+(same?" Let's keep exploring!":"");
        kqSetBubble(line); kqSetGarland(id,w.garland); kqBurstConfetti(id);
        const q=$('#mapQuesty'); if(q){q.classList.add('is-celebrating');setTimeout(()=>q.classList.remove('is-celebrating'),1300);}
        toast(`${w.emoji} ${w.name}, here we come!`,true,1400);
        if(window.KQState&&window.KQState.narration==='read'||state.grade===0)speak(line);
        kqTravelTo(id,()=>{
          beep('good');
          $$('#mapRegions .quest-category').forEach(other=>{
            other.classList.remove('is-open');
            $('.category-toggle',other).setAttribute('aria-expanded','false');
            $('.category-games',other).inert=true;
          });
          sec.classList.add('is-open');
          $('.category-toggle',sec).setAttribute('aria-expanded','true');
          $('.category-games',sec).inert=false;
        });
      }
      /* ═══════════ Living world: atmosphere, illustrated backdrops, pawn life ═══════════ */
      let kqArtWorld = null; /* which world's art is currently rendered */

      function kqBuildAtmosphere(){
        const host = $('#mapAtmosphere'); if(!host || kqReducedMotion) return;
        host.textContent = '';
        /* drifting clouds */
        for(let i=0;i<4;i++){
          const c = document.createElement('div'); c.className='map-cloud';
          c.style.top = (4 + Math.random()*32) + '%';
          c.style.transform = 'scale(' + (0.7 + Math.random()*0.7).toFixed(2) + ')';
          c.style.opacity = (0.35 + Math.random()*0.3).toFixed(2);
          c.style.animationDuration = (75 + Math.random()*55).toFixed(0) + 's';
          c.style.animationDelay = (-Math.random()*120).toFixed(0) + 's';
          host.appendChild(c);
        }
        /* twinkling sparkles */
        for(let i=0;i<12;i++){
          const s = document.createElement('div'); s.className='map-sparkle';
          s.style.left = (Math.random()*96).toFixed(1) + '%';
          s.style.top = (Math.random()*55).toFixed(1) + '%';
          s.style.animationDelay = (-Math.random()*3.2).toFixed(2) + 's';
          s.style.animationDuration = (2.4 + Math.random()*2.4).toFixed(2) + 's';
          host.appendChild(s);
        }
      }

      /* Per-world illustrated SVG scenes: layered silhouettes in the world's theme color.
         Kept soft (low opacity) so game cards stay the focus. All motion via CSS classes. */
      function kqWorldArtSVG(id){
        const B = 'var(--kw-b)';
        const scenes = {
          math: `<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <path d="M0,110 Q100,80 200,100 T400,95 L400,140 L0,140 Z" fill="${B}" opacity="0.16"/>
            <path d="M0,126 Q120,106 240,120 T400,118 L400,140 L0,140 Z" fill="${B}" opacity="0.26"/>
            <g class="kq-sway" style="animation-delay:-1.2s"><line x1="58" y1="126" x2="58" y2="96" stroke="${B}" stroke-width="3" opacity="0.5"/><circle cx="58" cy="89" r="7" fill="${B}" opacity="0.45"/><circle cx="58" cy="89" r="2.8" fill="#fff" opacity="0.8"/></g>
            <g class="kq-sway" style="animation-delay:-2.6s"><line x1="150" y1="128" x2="150" y2="102" stroke="${B}" stroke-width="3" opacity="0.5"/><circle cx="150" cy="95" r="6" fill="${B}" opacity="0.45"/><circle cx="150" cy="95" r="2.5" fill="#fff" opacity="0.8"/></g>
            <g class="kq-sway slow" style="animation-delay:-0.6s"><line x1="248" y1="126" x2="248" y2="94" stroke="${B}" stroke-width="3" opacity="0.5"/><circle cx="248" cy="87" r="7.5" fill="${B}" opacity="0.45"/><circle cx="248" cy="87" r="3" fill="#fff" opacity="0.8"/></g>
            <g class="kq-sway" style="animation-delay:-3.4s"><line x1="336" y1="128" x2="336" y2="104" stroke="${B}" stroke-width="3" opacity="0.5"/><circle cx="336" cy="97" r="6" fill="${B}" opacity="0.45"/><circle cx="336" cy="97" r="2.5" fill="#fff" opacity="0.8"/></g>
            <g class="kq-sway slow" opacity="0.4" fill="${B}"><path d="M112,130 q3,-13 6,0 q3,-11 6,0 Z"/><path d="M292,130 q3,-13 6,0 q3,-11 6,0 Z"/><path d="M200,132 q3,-12 6,0 q3,-10 6,0 Z"/></g>
          </svg>`,
          reading: `<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <g opacity="0.22" fill="${B}">
              <rect x="46" y="78" width="11" height="55"/><circle cx="51" cy="62" r="30"/><circle cx="30" cy="74" r="20"/><circle cx="72" cy="74" r="20"/>
              <rect x="180" y="70" width="13" height="63"/><circle cx="186" cy="52" r="34"/><circle cx="160" cy="66" r="22"/><circle cx="212" cy="66" r="22"/>
              <rect x="318" y="82" width="10" height="51"/><circle cx="323" cy="68" r="26"/><circle cx="304" cy="78" r="17"/><circle cx="342" cy="78" r="17"/>
            </g>
            <g fill="#ffe082">
              <circle class="kq-glow-pulse" cx="110" cy="66" r="3" style="animation-delay:-0.5s"/>
              <circle class="kq-glow-pulse" cx="250" cy="58" r="2.6" style="animation-delay:-1.7s"/>
              <circle class="kq-glow-pulse" cx="160" cy="90" r="2.2" style="animation-delay:-2.3s"/>
              <circle class="kq-glow-pulse" cx="300" cy="88" r="2.8" style="animation-delay:-0.9s"/>
              <circle class="kq-glow-pulse" cx="60" cy="95" r="2.2" style="animation-delay:-1.2s"/>
            </g>
          </svg>`,
          logic: `<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <g class="kq-shimmer" opacity="0.28" fill="${B}"><path d="M0,102 Q25,94 50,102 T100,102 T150,102 T200,102 T250,102 T300,102 T350,102 T400,102 L400,140 L0,140 Z"/></g>
            <g class="kq-shimmer" opacity="0.18" fill="${B}" style="animation-delay:-3s"><path d="M0,116 Q25,108 50,116 T100,116 T150,116 T200,116 T250,116 T300,116 T350,116 T400,116 L400,140 L0,140 Z"/></g>
            <ellipse class="kq-bob" cx="120" cy="110" rx="17" ry="6" fill="${B}" opacity="0.4"/>
            <ellipse class="kq-bob" cx="282" cy="114" rx="21" ry="7" fill="${B}" opacity="0.32" style="animation-delay:-1.5s"/>
            <circle class="kq-bob" cx="120" cy="104" r="4" fill="#fff" opacity="0.7" style="animation-delay:-0.8s"/>
            <circle class="kq-bob" cx="282" cy="107" r="5" fill="#fff" opacity="0.6" style="animation-delay:-2.2s"/>
          </svg>`,
          creative: `<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <g opacity="0.28" fill="${B}">
              <path d="M28,140 q-9,-26 9,-29 q14,-13 23,4 q13,-9 11,11 q10,4 2,14 Z"/>
              <path d="M170,140 q-8,-22 8,-25 q13,-11 20,4 q11,-8 10,10 q9,3 1,11 Z"/>
              <path d="M318,140 q-9,-24 8,-27 q14,-12 22,4 q12,-8 10,11 q10,4 2,12 Z"/>
            </g>
            <g fill="${B}">
              <circle class="kq-float-up" cx="90" cy="122" r="4" opacity="0.5" style="animation-delay:-2s"/>
              <circle class="kq-float-up" cx="230" cy="124" r="5" opacity="0.45" style="animation-delay:-5s"/>
              <circle class="kq-float-up" cx="310" cy="120" r="3.5" opacity="0.5" style="animation-delay:-3.2s"/>
              <circle class="kq-float-up" cx="150" cy="126" r="3" opacity="0.45" style="animation-delay:-0.8s"/>
            </g>
          </svg>`,
          music: `<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <g opacity="0.2" fill="${B}">
              <path d="M-10,140 L80,58 L170,140 Z"/>
              <path d="M110,140 L220,38 L330,140 Z"/>
              <path d="M250,140 L340,68 L430,140 Z"/>
            </g>
            <g opacity="0.14" fill="#fff">
              <path d="M62,76 L80,58 L98,76 L89,76 L89,92 L71,92 L71,76 Z"/>
              <path d="M202,56 L220,38 L238,56 L229,56 L229,72 L211,72 L211,56 Z"/>
            </g>
            <g fill="${B}" font-family="serif">
              <text class="kq-float-up" x="105" y="112" font-size="24" opacity="0.55" style="animation-delay:-1s">\u266A</text>
              <text class="kq-float-up" x="225" y="116" font-size="28" opacity="0.5" style="animation-delay:-4.2s">\u266B</text>
              <text class="kq-float-up" x="315" y="110" font-size="22" opacity="0.55" style="animation-delay:-2.6s">\u266A</text>
            </g>
          </svg>`,
          science: `<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <path d="M0,122 Q200,110 400,124 L400,140 L0,140 Z" fill="${B}" opacity="0.18"/>
            <g class="kq-shimmer" opacity="0.3" fill="${B}"><path d="M0,114 Q25,106 50,114 T100,114 T150,114 T200,114 T250,114 T300,114 T350,114 T400,114 L400,126 Q200,114 0,126 Z"/></g>
            <g class="kq-bob" opacity="0.45" fill="${B}"><path d="M148,124 m-9,0 a9,9 0 0,1 18,0 Z"/><path d="M148,124 l-9,0 M148,124 l-4.5,-7 M148,124 l4.5,-7 M148,124 l0,-8" stroke="${B}" stroke-width="1.6"/></g>
            <g class="kq-bob" opacity="0.4" fill="${B}" style="animation-delay:-1.8s"><path d="M268,126 m-7,0 a7,7 0 0,1 14,0 Z"/></g>
            <circle class="kq-glow-pulse" cx="90" cy="100" r="2.5" fill="#fff" opacity="0.8"/>
            <circle class="kq-glow-pulse" cx="330" cy="96" r="2" fill="#fff" opacity="0.8" style="animation-delay:-1.4s"/>
          </svg>`,
          lab: `<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <g opacity="0.25" stroke="${B}" stroke-width="4" fill="none" stroke-linecap="round">
              <path d="M168,58 L168,94 L148,126 L212,126 L192,94 L192,58 Z"/>
              <line x1="162" y1="58" x2="198" y2="58"/>
              <path d="M158,112 L202,112" opacity="0.7"/>
            </g>
            <g fill="none" stroke="${B}" stroke-width="2">
              <circle class="kq-rise" cx="180" cy="116" r="5" opacity="0.6" style="animation-delay:-1s"/>
              <circle class="kq-rise" cx="171" cy="119" r="3.4" opacity="0.5" style="animation-delay:-3.1s"/>
              <circle class="kq-rise" cx="189" cy="113" r="4" opacity="0.55" style="animation-delay:-2.2s"/>
              <circle class="kq-rise" cx="300" cy="122" r="4.4" opacity="0.4" style="animation-delay:-0.5s"/>
              <circle class="kq-rise" cx="82" cy="120" r="5" opacity="0.4" style="animation-delay:-4.3s"/>
              <circle class="kq-rise" cx="250" cy="124" r="3" opacity="0.45" style="animation-delay:-1.8s"/>
            </g>
          </svg>`
        };
        return scenes[id] || `<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d="M0,116 Q100,96 200,110 T400,108 L400,140 L0,140 Z" fill="${B}" opacity="0.14"/>
          <path d="M0,129 Q150,116 300,127 T400,125 L400,140 L0,140 Z" fill="${B}" opacity="0.2"/>
          <g fill="#fff">
            <circle class="kq-glow-pulse" cx="80" cy="58" r="3" opacity="0.85"/>
            <circle class="kq-glow-pulse" cx="200" cy="44" r="2.5" opacity="0.85" style="animation-delay:-1.3s"/>
            <circle class="kq-glow-pulse" cx="320" cy="62" r="3" opacity="0.85" style="animation-delay:-0.7s"/>
          </g>
        </svg>`;
      }

      /* Cross-fade the world backdrop when the picked world changes */
      function kqRenderWorldArt(worldId){
        worldId = worldId || '';
        if(kqArtWorld === worldId) return;
        kqArtWorld = worldId;
        const host = $('#mapWorldArt'); if(!host) return;
        const swap = () => { host.innerHTML = kqWorldArtSVG(worldId); host.classList.remove('is-fading'); };
        if(kqReducedMotion){ swap(); return; }
        host.classList.add('is-fading');
        setTimeout(swap, 460);
      }

      /* Trail sparkles: Questy leaves a little magic as she hops */
      function kqDropTrailSparkle(xPct, yPct){
        const layer = $('#mapTrailSparkles'); if(!layer || kqReducedMotion) return;
        const s = document.createElement('i');
        s.style.left = xPct.toFixed(1) + '%';
        s.style.top = yPct.toFixed(1) + '%';
        layer.appendChild(s);
        setTimeout(()=>s.remove(), 950);
        while(layer.children.length > 24) layer.firstChild.remove();
      }

      /* World-flavored trail decorations: the path between game cards feels like
         walking THROUGH the world, not past a gray column. Decorations are
         pointer-events:none and aria-hidden so taps and screen readers skip them. */
      const kqTrailDecor = {
        math:    ['🌼','🔢','🌸','✏️','🌿','🌼'],
        reading: ['🌳','📖','🦉','🍃','🌳','📖'],
        logic:   ['🫧','🐚','🐟','💧','🫧','🐚'],
        creative:['🎨','🌈','✨','🖌️','🎨','🌈'],
        music:   ['🎶','🥁','🎵','🎺','🎶','🎵'],
        science: ['🐚','⭐','🔍','🌊','🐚','⭐'],
        lab:     ['🧪','⚗️','⚡','🔬','🧪','⚡'],
      };
      const kqStopCharms = {
        math: '🔢', reading: '📖', logic: '🧩', creative: '🎨',
        music: '🎵', science: '🔍', lab: '🧪',
      };
      function kqDecorateTrail(){
        $$('#mapRegions .quest-category').forEach(sec => {
          const worldId = kqWorldIdOf(sec);
          const decor = kqTrailDecor[worldId];
          const inner = $('.category-games-inner', sec);
          if (!decor || !inner) return;
          // Scatter decorations along the trail between cards
          if (!inner.querySelector('.trail-decor')) {
            const cards = $$('.quest-card', inner);
            const count = Math.min(5, Math.max(2, cards.length - 1));
            for (let i = 0; i < count; i++) {
              const span = document.createElement('span');
              span.className = 'trail-decor';
              span.setAttribute('aria-hidden', 'true');
              span.textContent = decor[i % decor.length];
              const topPct = 14 + (i * (72 / Math.max(1, count - 1)));
              span.style.top = topPct.toFixed(1) + '%';
              span.style.left = (i % 2 === 0 ? '36%' : '64%');
              if (!kqReducedMotion) span.style.animationDelay = (-i * 1.1).toFixed(1) + 's';
              inner.appendChild(span);
            }
          }
          // Perch a world charm atop each numbered stop badge
          const charm = kqStopCharms[worldId] || '⭐';
          $$('.quest-card', inner).forEach(card => {
            if (card.querySelector('.stop-charm')) return;
            const c = document.createElement('span');
            c.className = 'stop-charm';
            c.setAttribute('aria-hidden', 'true');
            c.textContent = charm;
            card.appendChild(c);
          });
        });
      }

      function kqInitAdventureMap(){
        const d=kqSpineD(),under=$('#trailUnder'),top=$('#trailTop');
        if(under)under.setAttribute('d',d); if(top)top.setAttribute('d',d);
        const board=$('#mapBoard'),base=$('#mapBase');
        if(board&&base)kqPawnFrac=(kqTopInBoard(base)+base.offsetHeight+6)/board.offsetHeight; /* start at Questy's camp */
        $$('#mapRegions .quest-category').forEach(sec=>{$$('.quest-card',sec).forEach((card,i)=>{
          card.style.setProperty('--stopn',`"${i+1}"`); /* journey number badge on the spine */
          const title=$('h3',card)?$('h3',card).textContent.trim():'game',desc=$('p',card)?$('p',card).textContent.trim():'';
          card.dataset.speak=`Stop ${i+1}! ${title}. ${desc}`;
        });});
        decoratePrompts($('#mapRegions')); /* same tap-to-hear engine as in-game choices: stops read their journey number aloud */
        kqPlacePawn(kqPawnFrac);
        const bubble=$('#questyBubble');
        if(bubble)bubble.addEventListener('click',()=>speak(bubble.dataset.speak||bubble.textContent.trim()));
        /* living world, at rest: today's flavor line from the picked theme world */
        kqSetBubble(sample(kqWorldFlavor().lines));
        kqSetGarland('', '🗺️ ⭐ 🧭 ⭐ 🎒 ⭐');
        kqBuildAtmosphere();
        kqRenderWorldArt(state.currentWorld || document.body.dataset.kqworld || '');
        kqDecorateTrail(); /* world-flavored trail between the game stops */
        const pawn0=$('#mapPawn'); if(pawn0) pawn0.classList.add('is-idle');
      }
      