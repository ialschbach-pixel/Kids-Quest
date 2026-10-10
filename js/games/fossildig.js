      function fdFossilArt(id){
        const base='<svg viewBox="0 0 64 64" class="fd-art" aria-hidden="true">';
        const arts={
          fern:'<path d="M14 54C26 44 38 32 54 20" stroke="#8a7346" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 48l-9-3M26 42l-10-4M30 36l-10-6M34 30l-9-8M38 24l-7-8M42 20l-5-8M22 48l9-3M26 42l10-4M30 36l10-6M34 30l9-8M38 24l7-8M42 20l5-8" stroke="#8a7346" stroke-width="2" stroke-linecap="round"/>',
          fish:'<path d="M12 32h32" stroke="#9c6b30" stroke-width="3" stroke-linecap="round"/><path d="M16 32l-6-10M16 32l-6 10M24 32l-5-9M24 32l-5 9M32 32l-5-9M32 32l-5 9M40 32l-5-9M40 32l-5 9" stroke="#9c6b30" stroke-width="2"/><path d="M44 32l13-12v24z" fill="#b89b6a" stroke="#9c6b30" stroke-width="2"/><circle cx="11" cy="32" r="4" fill="#9c6b30"/>',
          shell:'<path d="M32 8q18 8 18 36-18 8-36 0 0-28 18-36z" fill="#d8c8a8" stroke="#9c6b30" stroke-width="3"/><path d="M32 8v36M24 46l-5-20M40 46l5-20" stroke="#9c6b30" stroke-width="2"/>',
          oakleaf:'<path d="M32 6q16 16 0 48-16-32 0-48z" fill="#d8c8a8" stroke="#9c6b30" stroke-width="3"/><path d="M32 6v48M24 26l8-6M40 26l-8-6M26 38l6-4M38 38l-6-4" stroke="#9c6b30" stroke-width="2"/>',
          starfish:'<path d="M32 8l6 16 17 2-12 12 4 16-15-9-15 9 4-16-12-12 17-2z" fill="#d8c8a8" stroke="#9c6b30" stroke-width="3"/>',
          snail:'<circle cx="28" cy="34" r="17" fill="none" stroke="#9c6b30" stroke-width="3"/><circle cx="28" cy="34" r="10" fill="none" stroke="#9c6b30" stroke-width="2.5"/><circle cx="28" cy="34" r="4.5" fill="none" stroke="#9c6b30" stroke-width="2"/><path d="M44 46q9 2 12 8-10 3-18-3z" fill="#d8c8a8" stroke="#9c6b30" stroke-width="2"/>',
          dinotooth:'<path d="M24 6l16 52-16-9-16 9z" fill="#e4d6b8" stroke="#9c6b30" stroke-width="3" stroke-linejoin="round"/><path d="M30 22l5 14M24 30l-3 10" stroke="#9c6b30" stroke-width="2"/>',
          trilobite:'<ellipse cx="32" cy="34" rx="13" ry="19" fill="#d8c8a8" stroke="#9c6b30" stroke-width="3"/><path d="M19 26h26M19 34h26M19 42h26M32 15v38" stroke="#9c6b30" stroke-width="2"/>',
          feather:'<path d="M32 6l10 46-10 6-10-6z" fill="#d8c8a8" stroke="#9c6b30" stroke-width="3"/><path d="M32 6v52" stroke="#9c6b30" stroke-width="2"/><path d="M32 18l-8-4M32 18l8-4M32 28l-8-4M32 28l8-4M32 38l-7-4M32 38l7-4" stroke="#9c6b30" stroke-width="1.5"/>',
          dinoclaw:'<path d="M14 6q12 24 4 48 20-12 23-30-11-13-27-18z" fill="#e4d6b8" stroke="#9c6b30" stroke-width="3" stroke-linejoin="round"/><path d="M22 20q6 12 3 24" stroke="#9c6b30" stroke-width="2" fill="none"/>',
          sharktooth:'<path d="M32 8l13 36H19z" fill="#dfe4ea" stroke="#9c6b30" stroke-width="3" stroke-linejoin="round"/><path d="M27 24h10M25 32h14" stroke="#9c6b30" stroke-width="2"/>',
          eggnest:'<ellipse cx="32" cy="44" rx="21" ry="12" fill="#b89b6a" stroke="#8a6a3a" stroke-width="2.5"/><ellipse cx="26" cy="34" rx="6" ry="8.5" fill="#e8ddc4" stroke="#9c6b30" stroke-width="2"/><ellipse cx="39" cy="34" rx="6" ry="8.5" fill="#d8cba8" stroke="#9c6b30" stroke-width="2"/>'
        };
        return base+(arts[id]||'')+'</svg>';
      }
      function fdCreatureArt(id){
        const base='<svg viewBox="0 0 64 64" class="fd-art" aria-hidden="true">';
        const arts={
          fern:'<path d="M14 54C26 44 38 32 54 20" stroke="#2f9e44" stroke-width="3" fill="none"/><path d="M22 48l-9-3M26 42l-10-4M30 36l-10-6M34 30l-9-8M38 24l-7-8M42 20l-5-8M22 48l9-3M26 42l10-4M30 36l10-6M34 30l9-8M38 24l7-8M42 20l5-8" stroke="#40c057" stroke-width="2.5"/>',
          fish:'<ellipse cx="28" cy="34" rx="16" ry="10" fill="#52b788" stroke="#1f6f54" stroke-width="3"/><path d="M44 34l14-11v22z" fill="#52b788" stroke="#1f6f54" stroke-width="3"/><circle cx="20" cy="31" r="3.2" fill="#1b1e24"/>',
          shell:'<path d="M32 8q18 8 18 36-18 8-36 0 0-28 18-36z" fill="#f4a9c4" stroke="#c43a72" stroke-width="3"/><path d="M32 8v36M24 46l-5-20M40 46l5-20" stroke="#c43a72" stroke-width="2"/>',
          oakleaf:'<circle cx="32" cy="20" r="15" fill="#5a8a3a" stroke="#3a6325" stroke-width="3"/><circle cx="21" cy="30" r="9" fill="#6ba23a" stroke="#3a6325" stroke-width="3"/><circle cx="43" cy="30" r="9" fill="#6ba23a" stroke="#3a6325" stroke-width="3"/><rect x="29" y="32" width="7" height="22" rx="3" fill="#8a5a3a" stroke="#6b4228" stroke-width="2"/>',
          starfish:'<path d="M32 8l6 16 17 2-12 12 4 16-15-9-15 9 4-16-12-12 17-2z" fill="#f4a261" stroke="#c44e2a" stroke-width="3"/><circle cx="28" cy="32" r="2" fill="#fff" opacity=".8"/><circle cx="36" cy="34" r="2" fill="#fff" opacity=".8"/>',
          snail:'<circle cx="28" cy="34" r="14" fill="#b392f0" stroke="#6f4fc4" stroke-width="3"/><circle cx="28" cy="34" r="7" fill="#d8ccf5" stroke="#6f4fc4" stroke-width="2"/><path d="M41 46q11 1 14 8-9 4-17-1z" fill="#9d7ef5" stroke="#6f4fc4" stroke-width="2"/><circle cx="54" cy="44" r="3" fill="#fdfcf8" stroke="#6f4fc4" stroke-width="2"/><circle cx="54" cy="44" r="1.2" fill="#1b1e24"/><path d="M58 40l3-4" stroke="#6f4fc4" stroke-width="2"/>',
          dinotooth:'<ellipse cx="32" cy="32" rx="20" ry="16" fill="#7fbf7f" stroke="#3f6b3f" stroke-width="3"/><circle cx="24" cy="26" r="3.5" fill="#23301e"/><circle cx="26" cy="24" r="1" fill="#fff"/><path d="M44 24l8 6-8 6z" fill="#5a8a5a" stroke="#3f6b3f" stroke-width="2"/>',
          trilobite:'<ellipse cx="32" cy="34" rx="13" ry="19" fill="#6bade2" stroke="#2b6a9e" stroke-width="3"/><path d="M19 26h26M19 34h26M19 42h26M32 15v38" stroke="#2b6a9e" stroke-width="2"/>',
          feather:'<ellipse cx="28" cy="36" rx="15" ry="12" fill="#4dabf7" stroke="#1971c2" stroke-width="3"/><circle cx="42" cy="21" r="8" fill="#4dabf7" stroke="#1971c2" stroke-width="3"/><path d="M50 21l8 3-8 3z" fill="#ffbd3e" stroke="#d99a1f" stroke-width="2"/><circle cx="44" cy="19" r="2.2" fill="#23301e"/><path d="M14 28l-7-5M14 33l-8-1M14 38l-7 5" stroke="#1971c2" stroke-width="3" stroke-linecap="round"/>',
          dinoclaw:'<ellipse cx="32" cy="32" rx="20" ry="16" fill="#7fbf7f" stroke="#3f6b3f" stroke-width="3"/><circle cx="24" cy="26" r="3.5" fill="#23301e"/><circle cx="26" cy="24" r="1" fill="#fff"/><path d="M44 24l8 6-8 6z" fill="#5a8a5a" stroke="#3f6b3f" stroke-width="2"/>',
          sharktooth:'<ellipse cx="32" cy="32" rx="20" ry="12" fill="#7ea6c9" stroke="#3f6b8f" stroke-width="3"/><path d="M50 26l11-9v15z" fill="#7ea6c9" stroke="#3f6b8f" stroke-width="2"/><circle cx="40" cy="29" r="2.8" fill="#23301e"/><path d="M32 32l4 4 4-4 4 4 4-4" fill="none" stroke="#fdfcf8" stroke-width="2.5"/>',
          eggnest:'<ellipse cx="28" cy="36" rx="15" ry="12" fill="#f4a261" stroke="#b86a1f" stroke-width="3"/><circle cx="42" cy="21" r="8" fill="#f4a261" stroke="#b86a1f" stroke-width="3"/><path d="M50 21l8 3-8 3z" fill="#ffbd3e" stroke="#d99a1f" stroke-width="2"/><circle cx="44" cy="19" r="2.2" fill="#23301e"/><path d="M14 28l-7-5M14 33l-8-1M14 38l-7 5" stroke="#b86a1f" stroke-width="3" stroke-linecap="round"/>',
          rabbit:'<ellipse cx="20" cy="20" rx="6" ry="13" fill="#f2e8dc" stroke="#a98f6d" stroke-width="3"/><ellipse cx="34" cy="20" rx="6" ry="13" fill="#f2e8dc" stroke="#a98f6d" stroke-width="3"/><ellipse cx="27" cy="40" rx="14" ry="12" fill="#f2e8dc" stroke="#a98f6d" stroke-width="3"/><circle cx="22" cy="38" r="2.6" fill="#23301e"/><circle cx="33" cy="38" r="2.6" fill="#23301e"/>',
          turtle:'<ellipse cx="32" cy="40" rx="20" ry="12" fill="#6ba23a" stroke="#3a6325" stroke-width="3"/><circle cx="50" cy="31" r="7" fill="#8ac26b" stroke="#3a6325" stroke-width="3"/><circle cx="52" cy="29" r="2" fill="#23301e"/>',
          crab:'<ellipse cx="32" cy="38" rx="16" ry="10" fill="#e2594b" stroke="#a63930" stroke-width="3"/><circle cx="15" cy="27" r="7" fill="#e2594b" stroke="#a63930" stroke-width="3"/><circle cx="49" cy="27" r="7" fill="#e2594b" stroke="#a63930" stroke-width="3"/><circle cx="28" cy="34" r="2.5" fill="#fff"/><circle cx="36" cy="34" r="2.5" fill="#fff"/><circle cx="28" cy="34" r="1.2" fill="#23301e"/><circle cx="36" cy="34" r="1.2" fill="#23301e"/>',
          berrybush:'<circle cx="24" cy="34" r="12" fill="#4a8a3a" stroke="#2f5a2b" stroke-width="3"/><circle cx="40" cy="34" r="12" fill="#5a9a44" stroke="#2f5a2b" stroke-width="3"/><circle cx="24" cy="30" r="4" fill="#c43a72"/><circle cx="40" cy="38" r="4" fill="#c43a72"/><circle cx="33" cy="44" r="4" fill="#c43a72"/>',
          frog:'<circle cx="23" cy="23" r="7" fill="#8acf7f" stroke="#3f6b3f" stroke-width="3"/><circle cx="41" cy="23" r="7" fill="#8acf7f" stroke="#3f6b3f" stroke-width="3"/><ellipse cx="32" cy="38" rx="17" ry="12" fill="#7fbf6f" stroke="#3f6b3f" stroke-width="3"/><circle cx="23" cy="23" r="2.8" fill="#23301e"/><circle cx="41" cy="23" r="2.8" fill="#23301e"/>',
          lizard:'<ellipse cx="26" cy="38" rx="14" ry="9" fill="#8a9a4a" stroke="#5a6b2f" stroke-width="3"/><path d="M40 38q10 4 15 15" stroke="#8a9a4a" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="18" cy="35" r="2.4" fill="#23301e"/><path d="M20 47l-6 8M32 47l-4 8" stroke="#5a6b2f" stroke-width="3" stroke-linecap="round"/>',
          snake:'<path d="M8 44q10-18 22-8t22-8" stroke="#6ba23a" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="54" cy="23" r="5" fill="#6ba23a"/><circle cx="56" cy="22" r="1.6" fill="#23301e"/>',
          mouse:'<circle cx="19" cy="24" r="7" fill="#d8cdc2" stroke="#8a7f74" stroke-width="3"/><circle cx="45" cy="24" r="7" fill="#d8cdc2" stroke="#8a7f74" stroke-width="3"/><ellipse cx="32" cy="38" rx="14" ry="11" fill="#c9bdb2" stroke="#8a7f74" stroke-width="3"/><circle cx="27" cy="35" r="2.4" fill="#23301e"/><circle cx="37" cy="35" r="2.4" fill="#23301e"/><path d="M45 42q11 1 11 12" stroke="#8a7f74" stroke-width="3" fill="none" stroke-linecap="round"/>'
        };
        return base+(arts[id]||'')+'</svg>';
      }
      function renderFossilDig(){
        const i=lessonIndex(),g=state.grade,n=g>=2?4:3,m=g>=2?3:2;
        const seq=b2Shuffle([0,1,2],i*5+1).slice(0,m).map(x=>fdTypes[g][x]);
        const tileOrder=b2Shuffle(Array.from({length:n*n},(_,k)=>k),i*13+7);
        const fossilTiles={},pebbleTiles={};
        seq.forEach((f,fi)=>{fossilTiles[tileOrder[fi]]=f;});
        [m,m+1].forEach(k=>{if(tileOrder[k]!=null)pebbleTiles[tileOrder[k]]=1;});
        const pebArt='<svg viewBox="0 0 64 64" class="fd-art" aria-hidden="true"><ellipse cx="32" cy="34" rx="13" ry="10" fill="#9d97a3" stroke="#6b6577" stroke-width="3"/><ellipse cx="28" cy="31" rx="5" ry="3" fill="#fff" opacity=".35"/></svg>';
        const gridHTML=Array.from({length:n*n},(_,t)=>{
          const f=fossilTiles[t];
          const content=f?fdFossilArt(f[0]):pebbleTiles[t]?pebArt:'';
          return '<button type="button" class="fd-tile" data-tile="'+t+'" data-fossil="'+(f?f[0]:'')+'" aria-label="Covered dig tile" data-speak="Covered dig tile"><span class="fd-content">'+content+'</span><span class="fd-sand"></span><span class="fd-puff"></span></button>';
        }).join('');
        panel.innerHTML=progressMarkup()+'<h2 class="prompt" data-speak="Brush the tiles to uncover the hidden fossils.">Brush the tiles to uncover the hidden fossils!</h2><p class="fd-hint">Brush a tile 3 times — drag your brush across tiles, tap, or use Space.</p>'
        +'<div class="lab-stage"><div class="fd-grid fd-g'+n+'" id="fdGrid" role="group" aria-label="Dig site grid">'+gridHTML+'</div>'
        +'<div class="fd-diginfo" id="fdInfo" aria-live="polite">Fossils found: <b>0</b> of <b>'+m+'</b></div>'
        +'<div class="fd-matchwrap" id="fdMatch" hidden></div>'
        +'<div class="result" id="fdResult" aria-live="polite"></div></div>';
        setProgress();
        const grid=$('#fdGrid'),info=$('#fdInfo'),matchWrap=$('#fdMatch'),result=$('#fdResult');
        let found=0,done=false;
        const strikeBusy={};
        function strike(tile){
          if(!tile||state.locked||done||tile.classList.contains('revealed'))return;
          const key=tile.dataset.tile;
          if(strikeBusy[key])return;strikeBusy[key]=1;setTimeout(()=>{strikeBusy[key]=0;},140);
          const s=(+tile.dataset.strokes||0)+1;tile.dataset.strokes=s;
          sciScrape();
          const puff=tile.querySelector('.fd-puff');puff.classList.remove('go');void puff.offsetWidth;puff.classList.add('go');
          if(s===1)tile.classList.add('br1');
          if(s===2)tile.classList.add('br2');
          tile.setAttribute('aria-label',s<3?'Covered dig tile — '+(3-s)+' brushes to go':'Dig tile');
          if(s>=3){
            tile.classList.add('revealed');
            const fid=tile.dataset.fossil;
            if(fid){
              found++;
              const f=seq.filter(x=>x[0]===fid)[0];
              tile.setAttribute('aria-label',f[1]+'!');
              speak('You uncovered a '+f[1]+'!');
              info.innerHTML='Fossils found: <b>'+found+'</b> of <b>'+m+'</b>';
              if(found>=m)digDone();
            }else{tile.setAttribute('aria-label',pebbleTiles[tile.dataset.tile]?'A plain pebble.':'Just packed sand — keep brushing!');}
          }
        }
        let brushing=false,struckThisGesture=null;
        grid.addEventListener('pointerdown',e=>{if(state.locked||done)return;const t=e.target.closest('.fd-tile');if(!t)return;e.preventDefault();brushing=true;strike(t);struckThisGesture=t;});
        grid.addEventListener('pointermove',e=>{if(!brushing)return;const el=document.elementFromPoint(e.clientX,e.clientY);const t=el?el.closest('.fd-tile'):null;if(t)strike(t);});
        grid.addEventListener('pointerup',()=>{brushing=false;});
        grid.addEventListener('pointercancel',()=>{brushing=false;});
        grid.addEventListener('click',e=>{const t=e.target.closest('.fd-tile');if(!t)return;if(struckThisGesture===t){struckThisGesture=null;return;}strike(t);});
        let selected=null,solved=0,mistakes=0;
        function digDone(){
          done=true;
          speak('You found every fossil! Now match each fossil to the creature that left it.');
          const fsCards=seq.map(f=>'<button type="button" class="fd-pick" data-cid="'+f[0]+'" data-name="'+f[1]+'" aria-pressed="false" data-speak="'+f[1]+'"><span class="fd-art-wrap">'+fdFossilArt(f[0])+'</span><span class="fd-name">'+f[1]+'</span></button>').join('');
          const creatureDefs=seq.map(f=>({cid:f[0],name:f[2]})).concat(fdDecoys[g].map(d=>({cid:d[0],name:d[1]})));
          const crCards=b2Shuffle(creatureDefs,i*29+3).map(c=>'<button type="button" class="fd-creature" data-cid="'+c.cid+'" data-name="'+c.name+'" aria-pressed="false" data-speak="Could it be '+c.name+'?"><span class="fd-art-wrap">'+fdCreatureArt(c.cid)+'</span><span class="fd-name">'+c.name+'</span></button>').join('');
          matchWrap.innerHTML='<p class="fd-matchtitle" data-speak="Match each fossil to the creature that left it.">Match each fossil to the creature that left it!</p><div class="fd-picks" role="group" aria-label="Found fossils">'+fsCards+'</div><div class="fd-creatures" role="group" aria-label="Creature choices">'+crCards+'</div>';
          matchWrap.hidden=false;
          result.innerHTML='<strong>All fossils found!</strong> Now the detective matching.';
          $$('.fd-pick',matchWrap).forEach(b=>b.onclick=()=>{if(state.locked)return;$$('.fd-pick',matchWrap).forEach(x=>{x.classList.remove('sel');x.setAttribute('aria-pressed','false');});b.classList.add('sel');b.setAttribute('aria-pressed','true');selected=b.dataset.cid;speak('You picked the '+b.dataset.name+'. Which creature left it?');});
          $$('.fd-creature',matchWrap).forEach(b=>b.onclick=()=>{if(state.locked||b.classList.contains('solved'))return;
            if(!selected){toast('Tap a fossil first, then its creature.');speak('Tap a fossil first, then pick its creature.');return;}
            if(b.dataset.cid===selected){
              const f=seq.filter(x=>x[0]===selected)[0];
              b.classList.add('solved');
              const fossilBtns=$$('.fd-pick',matchWrap).filter(x=>x.dataset.cid===selected)[0];
              if(fossilBtns){fossilBtns.classList.add('solved');fossilBtns.classList.remove('sel');}
              solved++;sciClink(0);
              const fact=fdFacts[g][selected];
              result.innerHTML='<strong>Yes! A '+f[2]+' left that '+f[1]+'.</strong> '+fact;
              speak('Yes! A '+f[2]+' left that '+f[1]+'. '+fact);
              selected=null;
              if(solved>=m)setTimeout(()=>labOutcome(renderFossilDig,mistakes<=1,matchWrap,'You brushed, found, and matched like a real paleontologist!'),1400);
            }else{
              mistakes++;wrong(b);
              speak('Hmm — what creature would leave that shape? Look again!');
            }
          });
        }
      }
      /* ── ROCK SORTER ── */
      const rsCombos=[[1,1,1],[0,0,0],[1,0,1],[0,1,0],[0,1,1],[1,0,0]];
      const rsNames=[
        [['Glitter Pebble','#c9a13b'],['Cotton Cube','#d8cfc0'],['Shine Coin','#e8d44d'],['Cloud Crumbs','#b8c4cc'],['Thunder Chunk','#6b5d4f'],['Lilac Gem','#9a8a99']],
        [['Sparkle Star','#d94f70'],['Dust Heap','#c4b49a'],['Glass Marble','#9ec9e8'],['Ash Lump','#7a7f85'],['Granite Bit','#8a8f98'],['Coral Sphere','#f0e6d2']],
        [['Pyrite Shard','#c9a227'],['Basalt Bit','#3b3f45'],['Quartz Coin','#dfe9f2'],['Pumice Stone','#c9c2b2'],['Flint Edge','#4a4f57'],['Opal Drop','#e8f4f8']],
        [['Calcite Chip','#f2e6c9'],['Sandstone Wedge','#d9a86c'],['Obsidian Shard','#20242c'],['Coal Cluster','#2f2f33'],['Magnetite Bit','#6b7683'],['Feldspar Plate','#e8d8c2']]
      ];
      const rsCatDef=[{prop:'shine',left:'Shiny',leftIcon:'✨',right:'Dull',rightIcon:'🌥️'},{prop:'rough',left:'Rough',leftIcon:'🧱',right:'Smooth',rightIcon:'🫧'},{prop:'hard',left:'Hard',leftIcon:'💪',right:'Soft',rightIcon:'🧽'}];
