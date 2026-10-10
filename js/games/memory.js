      /* Memory Meadow — art cards.
         Grade K flips Questy-style illustrated shapes with the color+shape name
         printed below ("red circle"). Grade 1 flips Questy & Friends art, pictures
         only. Grades 2-3 flip art with the phonics word spelled out below the
         picture so older kids connect spelling to image. Pairs always match by key.
         Zero emoji. */
      const kqMemoryColors=[['red','#e05252'],['blue','#3f8fd6'],['green','#43a25a'],['yellow','#f2b90d'],['orange','#ef7d31'],['purple','#8e63c9']];
      const kqMemoryShapes=['circle','square','triangle','star','heart','diamond'];
      /* darken a hex color by factor f for soft illustrated outlines (no harsh black) */
      function kqShade(hex,f){
        const n=parseInt(hex.slice(1),16);
        const r=Math.max(0,Math.round(((n>>16)&255)*f)),g=Math.max(0,Math.round(((n>>8)&255)*f)),b=Math.max(0,Math.round((n&255)*f));
        return `rgb(${r},${g},${b})`;
      }
      function kqMemoryShapeSVG(color,shape){
        const hex=(kqMemoryColors.find(x=>x[0]===color)||[])[1]||'#888888';
        const edge=kqShade(hex,.7),deep=kqShade(hex,.82),gid=`mqg${color}${shape}`;
        const inner={
          circle:'<circle cx="32" cy="30" r="23"/>',
          square:'<rect x="12" y="9" width="40" height="40" rx="10"/>',
          triangle:'<path d="M32 8 L55 51 L9 51 Z"/>',
          star:'<path d="M32 5 L38 22.5 L56.5 23 L41.8 34 L47 51.5 L32 41.5 L17 51.5 L22.2 34 L7.5 23 L26 22.5 Z"/>',
          heart:'<path d="M32 53 C13 37 5 26 10.5 16.5 C14.5 9.5 24 10.5 32 20 C40 10.5 49.5 9.5 53.5 16.5 C59 26 51 37 32 53 Z"/>',
          diamond:'<path d="M32 6 L51 30 L32 54 L13 30 Z"/>'
        }[shape]||'';
        /* Questy storybook look: soft ground shadow, colored outline, bottom
           roundness shade, big dreamy highlight, glossy gleam, sparkle dots */
        return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs>`
          +`<radialGradient id="${gid}" cx="36%" cy="28%" r="78%"><stop offset="0%" stop-color="#ffffff" stop-opacity=".55"/><stop offset="55%" stop-color="#ffffff" stop-opacity=".08"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>`
          +`<linearGradient id="${gid}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${deep}" stop-opacity="0"/><stop offset="100%" stop-color="${deep}" stop-opacity=".38"/></linearGradient></defs>`
          +`<ellipse cx="32" cy="57" rx="19" ry="3.6" fill="rgba(30,40,60,.14)"/>`
          +`<g fill="${hex}" stroke="${edge}" stroke-width="2.6" stroke-linejoin="round">${inner}</g>`
          +`<g fill="url(#${gid}b)">${inner}</g>`
          +`<g fill="url(#${gid})">${inner}</g>`
          +`<g fill="rgba(255,255,255,.5)"><ellipse cx="24" cy="20" rx="6.5" ry="4.2" transform="rotate(-24 24 20)"/></g>`
          +`<g fill="rgba(255,255,255,.35)"><circle cx="45" cy="40" r="1.7"/><circle cx="39" cy="16" r="1.2"/></g></svg>`;
      }
      /* 36 distinct art pieces: 10 cast + 2 Char + 24 storybook illustrations.
         Each phonics word maps to one art piece; pairs show the same art. */
      const kqMemoryArt=[
        kqCastArt.questy,kqCastArt.mia,kqCastArt.isaiah,kqCastArt.splash,kqCastArt.safari,
        kqCastArt.sailor,kqCastArt.astronaut,kqCastArt.sports,kqCastArt.dino,kqCastArt.fashion,
        charArt.main,charArt.eating,
        questyArt.storyArt['0/0'],questyArt.storyArt['0/2'],questyArt.storyArt['0/4'],questyArt.storyArt['0/6'],
        questyArt.storyArt['1/0'],questyArt.storyArt['1/2'],questyArt.storyArt['1/4'],questyArt.storyArt['1/6'],
        questyArt.storyArt['2/0'],questyArt.storyArt['2/2'],questyArt.storyArt['2/4'],questyArt.storyArt['2/6'],
        questyArt.storyArt['4/0'],questyArt.storyArt['4/2'],questyArt.storyArt['4/4'],questyArt.storyArt['4/6'],
        questyArt.storyArt['6/0'],questyArt.storyArt['6/2'],questyArt.storyArt['6/4'],questyArt.storyArt['6/6'],
        questyArt.storyArt['8/0'],questyArt.storyArt['8/2'],questyArt.storyArt['8/4'],questyArt.storyArt['8/6']
      ];
      function kqMemoryItem(grade,idx){
        if(grade===0){
          const color=kqMemoryColors[Math.floor(idx/6)%6][0],shape=kqMemoryShapes[idx%6];
          return {word:color+' '+shape,art:kqMemoryShapeSVG(color,shape),showWord:true};
        }
        const word=phonicsBanks[grade][idx%36];
        const artSrc=kqMemoryArt[idx%36]||kqCastArt.questy;
        return {word:word,art:`<img class="memory-art" src="${artSrc}" alt="" aria-hidden="true" draggable="false">`,showWord:grade>=2};
      }
      /* one-time card-label styles (word printed under the art) */
      function kqMemoryEnsureCss(){
        if(document.getElementById('memory-word-css'))return;
        const st=document.createElement('style');st.id='memory-word-css';
        st.textContent='.memory-card-content{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;width:100%;height:100%;min-height:0}'
          +'.memory-card-content>svg{width:62%;height:auto;max-height:64%;flex:0 1 auto}'
          +'.memory-card-content>.memory-art{width:80%;height:auto;max-height:62%;flex:0 1 auto}'
          +'.memory-word{font-size:clamp(.68rem,2.6vw,.95rem);font-weight:800;color:var(--ink,#233);line-height:1.15;text-align:center;overflow-wrap:anywhere}';
        document.head.appendChild(st);
      }
      function renderMemory() {
        const g=state.grade;
        const pairCount=[3,6,8,10][g],start=(state.round*6)%36;
        const prompt=g===0?'Match the shapes! Find two that look the same.'
          :g===1?'Match the pictures! Find two that are the same.'
          :'Match each picture to its word!';
        const items=Array.from({length:pairCount},(_,n)=>kqMemoryItem(g,(start+n)%36));
        let cards=[]; items.forEach((x,i)=>{ cards.push({key:i,item:x}); cards.push({key:i,item:x}); }); cards=shuffle(cards);
        let open=[], matched=0; state.total=pairCount;
        kqMemoryEnsureCss();
        const back=item=>item.showWord
          ?`<span class="memory-card-content">${item.art}<span class="memory-word">${item.word}</span></span>`
          :item.art;
        panel.innerHTML=progressMarkup()+`<h2 class="prompt" data-speak="${prompt}">${prompt}</h2><div class="memory-board" style="grid-template-columns:repeat(${pairCount>5?4:pairCount===5?5:4},1fr)">${cards.map((c,i)=>`<button class="memory-tile" type="button" data-i="${i}" data-key="${c.key}" data-speak="${c.item.word}" aria-label="Hidden memory card"><span class="memory-inner"><span class="memory-face memory-front">?</span><span class="memory-face memory-back">${back(c.item)}</span></span></button>`).join('')}</div>`;
        const fill=$('.progress-fill',panel), label=$('.progress-label',panel); label.textContent=`0 of ${pairCount} pairs`;
        $$('.memory-tile',panel).forEach(tile=>tile.addEventListener('click',()=>{
          if(state.locked||tile.classList.contains('open')||tile.classList.contains('matched'))return;
          tile.classList.add('open'); open.push(tile);
          if(open.length===2){ state.locked=true; const [a,b]=open;
            if(a.dataset.key===b.dataset.key){ setTimeout(()=>{a.classList.add('matched');b.classList.add('matched');open=[];matched++;state.locked=false;state.score++;addStars(1);toast('A perfect pair!'); fill.style.width=`${matched/pairCount*100}%`;label.textContent=`${matched} of ${pairCount} pairs`;if(matched===pairCount)setTimeout(()=>finishRound('You matched every card!'),650);},320); }
            else setTimeout(()=>{a.classList.remove('open');b.classList.remove('open');open=[];state.locked=false;},650);
          }
        }));
      }
