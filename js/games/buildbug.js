      function bbAbdomenInner(inx){
        const hc=inx[1],ac=inx[3],pc=inx[4],pat=inx[5];
        if(pat==='spots'||pat==='dots')return '<ellipse cx="126" cy="62" rx="32" ry="22" fill="'+ac+'" stroke="'+hc+'" stroke-width="3"/><circle cx="110" cy="54" r="5" fill="'+pc+'"/><circle cx="122" cy="48" r="4" fill="'+pc+'"/><circle cx="134" cy="52" r="5" fill="'+pc+'"/><circle cx="116" cy="70" r="4" fill="'+pc+'"/><circle cx="130" cy="72" r="5" fill="'+pc+'"/>';
        if(pat==='bands')return '<ellipse cx="126" cy="62" rx="32" ry="22" fill="'+ac+'" stroke="'+hc+'" stroke-width="3"/><path d="M104 46v32M118 42v40M132 42v40M146 46v32" stroke="'+pc+'" stroke-width="6" stroke-linecap="round" opacity=".85"/>';
        if(pat==='tip')return '<ellipse cx="126" cy="62" rx="32" ry="22" fill="'+ac+'" stroke="'+hc+'" stroke-width="3"/><circle cx="156" cy="62" r="8" fill="#fff38a" stroke="#d9a700" stroke-width="2"/><circle cx="156" cy="62" r="14" fill="#fff38a" opacity=".3"/>';
        if(pat==='wingspots')return '<ellipse cx="126" cy="62" rx="32" ry="22" fill="'+ac+'" stroke="'+hc+'" stroke-width="3"/><circle cx="118" cy="62" r="9" fill="'+pc+'" opacity=".8"/><circle cx="136" cy="58" r="5" fill="'+pc+'" opacity=".8"/>';
        return '<ellipse cx="126" cy="62" rx="32" ry="22" fill="'+ac+'" stroke="'+hc+'" stroke-width="3"/>';
      }
      function renderBuildBug(){
        const i=lessonIndex(),g=state.grade,inx=bbInsects[g][i%6],name=inx[0],alias=bbAlias[i%8],hc=inx[1];
        const icons={
          head:'<svg viewBox="0 0 48 44" aria-hidden="true"><circle cx="24" cy="20" r="11" fill="'+hc+'"/><circle cx="19" cy="18" r="2.8" fill="#fff"/><circle cx="29" cy="18" r="2.8" fill="#fff"/><circle cx="19" cy="18" r="1.3" fill="#1b1e24"/><circle cx="29" cy="18" r="1.3" fill="#1b1e24"/><path d="M19 26q5 5 10 0" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
          thorax:'<svg viewBox="0 0 48 44" aria-hidden="true"><rect x="10" y="12" width="28" height="20" rx="10" fill="'+inx[2]+'"/></svg>',
          abdomen:'<svg viewBox="0 0 48 44" aria-hidden="true"><ellipse cx="24" cy="22" rx="17" ry="12" fill="'+inx[3]+'" stroke="'+hc+'" stroke-width="3"/></svg>',
          leg:'<svg viewBox="0 0 48 44" aria-hidden="true"><path d="M24 8q-2 14-14 20" stroke="'+hc+'" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M24 8q2 14 14 20" stroke="'+hc+'" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
          antenna:'<svg viewBox="0 0 48 44" aria-hidden="true"><path d="M20 40q-4-18-12-26" stroke="'+hc+'" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M28 40q4-18 12-26" stroke="'+hc+'" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="7" cy="12" r="3" fill="'+hc+'"/><circle cx="41" cy="12" r="3" fill="'+hc+'"/></svg>',
          wing:'<svg viewBox="0 0 48 44" aria-hidden="true"><ellipse cx="15" cy="22" rx="11" ry="6" fill="#ffffff" stroke="'+hc+'" stroke-width="2.5" transform="rotate(-20 15 22)"/><ellipse cx="33" cy="22" rx="11" ry="6" fill="#ffffff" stroke="'+hc+'" stroke-width="2.5" transform="rotate(20 33 22)"/></svg>'
        };
        const deck=[['head','A bug head'],['thorax','A bug thorax'],['abdomen','A bug abdomen']];
        for(let n=1;n<=8;n++)deck.push(['leg','Bug leg number '+n]);
        deck.push(['antenna','Antenna one'],['antenna','Antenna two'],['wing','Bug wing one'],['wing','Bug wing two']);
        if(g>=2)deck.push(['wing','An extra wing']);
        const trayHTML=deck.map((d,n)=>'<button type="button" class="bb-part" data-part="'+d[0]+'" data-key="p'+n+'" data-speak="'+d[1]+'" aria-label="'+d[1]+'">'+icons[d[0]]+'</button>').join('');
        const legPos=[{x:60,y:78,s:-1},{x:80,y:78,s:1},{x:100,y:78,s:-1},{x:60,y:88,s:1},{x:100,y:88,s:-1},{x:80,y:88,s:1}];
        const guides={head:'<svg viewBox="0 0 30 30"><circle cx="15" cy="13" r="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3"/></svg>',thorax:'<svg viewBox="0 0 30 30"><rect x="6" y="7" width="18" height="14" rx="7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3"/></svg>',abdomen:'<svg viewBox="0 0 30 30"><ellipse cx="15" cy="15" rx="13" ry="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3"/></svg>',leg:'<svg viewBox="0 0 30 30"><path d="M15 6q-2 9-9 13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3"/></svg>',antenna:'<svg viewBox="0 0 30 30"><path d="M12 26q-3-10-7-15M18 26q3-10 7-15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3"/></svg>',wing:'<svg viewBox="0 0 30 30"><ellipse cx="15" cy="12" rx="11" ry="6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3"/></svg>'};
        const zoneDefs=[['head',26,52,24,46,'Head slot'],['thorax',44,52,22,46,'Thorax slot'],['abdomen',70,52,34,54,'Abdomen slot']];
        legPos.forEach((p,n)=>zoneDefs.push(['leg-'+n,(p.x/180)*100,(p.y/124)*100,12,15,'Leg slot '+(n+1)]));
        zoneDefs.push(['antenna-0',19,28,13,28,'Antenna slot one'],['antenna-1',32,28,13,28,'Antenna slot two'],['wing-0',38,21,18,26,'Wing slot one'],['wing-1',51,21,18,26,'Wing slot two']);
        const zoneHTML=zoneDefs.map(z=>'<div class="bb-zone" role="button" tabindex="0" data-slot="'+z[0]+'" data-slot-name="'+z[5]+'" data-accept="'+z[0].split('-')[0]+'" style="left:'+z[1]+'%;top:'+z[2]+'%;width:'+z[3]+'%;height:'+z[4]+'%" aria-label="'+z[5]+'" data-speak="'+z[5]+'">'+(g<=1?guides[z[0].split('-')[0]]:'')+'</div>').join('');
        panel.innerHTML=progressMarkup()+'<h2 class="prompt" data-speak="Build today\u2019s bug! Every insect has a head, a thorax, an abdomen, six legs, two antennae, and up to two wings. Drag or tap each part onto the bench.">Build today\u2019s bug! Drag or tap each part onto the bench — <b>head, thorax, abdomen, six legs, two antennae, two wings.</b></h2>'
        +'<div class="lab-stage"><div class="bb-bench" id="bbStage">'
        +'<svg viewBox="0 0 180 124" class="bb-bugsvg" id="bbBugSvg" aria-hidden="true"><g class="bbg-wings"></g><g class="bbg-ant"></g><g class="bbg-head"></g><g class="bbg-thorax"></g><g class="bbg-abdomen"></g><g class="bbg-legs"></g></svg>'
        +zoneHTML+'</div>'
        +'<div class="bb-nameplate" id="bbName" hidden></div>'
        +'<div class="bb-tray" aria-label="Bug parts tray">'+trayHTML+'</div>'
        +'<div class="bb-progress" id="bbCount" aria-live="polite">0 of '+zoneDefs.length+' parts attached.</div>'
        +'<div class="result" id="bbResult" aria-live="polite"></div>'
        +'</div>';
        setProgress();
        let done=false,bbWrong=0;
        const zones=$$('.bb-zone',panel),parts=$$('.bb-part',panel),result=$('#bbResult');
        const q=s=>($('#bbBugSvg').querySelector('.bbg-'+s))||document.createElementNS('http://www.w3.org/2000/svg','g');
        function bbHeadArt(){return '<circle cx="46" cy="62" r="16" fill="'+hc+'"/><circle cx="39" cy="59" r="4" fill="#fff"/><circle cx="53" cy="59" r="4" fill="#fff"/><circle cx="39" cy="59" r="1.8" fill="#1b1e24"/><circle cx="53" cy="59" r="1.8" fill="#1b1e24"/><path d="M39 71q7 6 14 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>';}
        function bbThoraxArt(){return '<ellipse cx="80" cy="62" rx="20" ry="16" fill="'+inx[2]+'"/><ellipse cx="74" cy="56" rx="8" ry="5" fill="#fff" opacity=".22"/>';}
        function bbLegArt(p){return '<path d="M '+p.x+' '+p.y+' q '+(p.s*10)+' 8 '+(p.s*18)+' 12" stroke="'+hc+'" stroke-width="5" fill="none" stroke-linecap="round"/>';
        }
        function bbAntArt(k){return k===0?'<path d="M 40 50 q -8 -16 -16 -24" stroke="'+hc+'" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="24" cy="26" r="3" fill="'+hc+'"/>':'<path d="M 52 50 q 8 -16 16 -24" stroke="'+hc+'" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="68" cy="26" r="3" fill="'+hc+'"/>';}
        function bbWingArt(k){return k===0?'<ellipse cx="68" cy="26" rx="27" ry="9" fill="#ffffff" opacity=".92" stroke="'+hc+'" stroke-width="3" transform="rotate(-20 68 26)"/>':'<ellipse cx="92" cy="26" rx="27" ry="9" fill="#ffffff" opacity=".92" stroke="'+hc+'" stroke-width="3" transform="rotate(20 92 26)"/>';}
        const legsA=[null,null,null,null,null,null],antA=[null,null],wingA=[null,null];
        function onPlace(part,zone){
          if(state.locked||done||part.disabled)return;
          const kind=part.dataset.part;
          const good=kind;
          if(!zone||zone.dataset.accept!==good||zone.classList.contains('filled')){
            if(kind==='leg'&&!zones.some(z=>z.dataset.accept==='leg'&&!z.classList.contains('filled'))){speak('One! Two! Three! Four! Five! Six! Insects have six legs — count your leg slots with me!');toast('No more leg slots — count the six with me!',false,1800);return;}
            if(kind==='wing'&&!zones.some(z=>z.dataset.accept==='wing'&&!z.classList.contains('filled'))){speak('Two wings is insect-perfect! Extra parts stay in the tray.');toast('Insects fly with up to two wings — the extra wing is a decoy!',false,1800);return;}
            bbWrong++;wrong(part);result.textContent='That piece fits somewhere else — look at the slot shapes!';speak('That piece fits somewhere else. Look at the slot shapes.');
            return;
          }
          const slot=zone.dataset.slot,idx=+slot.split('-')[1]||0;
          zone.classList.add('filled');zone.dataset.partKey=part.dataset.key;zone.setAttribute('aria-label',zone.dataset.slotName+' — attached');zone.setAttribute('data-speak',zone.dataset.slotName+' — attached');
          part.disabled=true;part.classList.add('placed');
          if(slot==='head')q('head').innerHTML=bbHeadArt();
          else if(slot==='thorax')q('thorax').innerHTML=bbThoraxArt();
          else if(slot==='abdomen')q('abdomen').innerHTML=bbAbdomenInner(inx);
          else if(slot.indexOf('leg')===0){legsA[idx]=bbLegArt(legPos[idx]);q('legs').innerHTML=legsA.map(x=>x||'').join('');}
          else if(slot.indexOf('ant')===0){antA[idx]=bbAntArt(idx);q('ant').innerHTML=antA.map(x=>x||'').join('');}
          else if(slot.indexOf('wing')===0){wingA[idx]=bbWingArt(idx);q('wings').innerHTML=wingA.map(x=>x||'').join('');}
          $('#bbCount').textContent=zones.filter(z=>z.classList.contains('filled')).length+' of '+zones.length+' parts attached.';
          sciClink(0);
          checkBbDone();
        }
        bindDragAndTap(parts,zones,onPlace);
        function detach(zone){
          if(state.locked||done||!zone.classList.contains('filled'))return;
          const key=zone.dataset.partKey,part=parts.find(p=>p.dataset.key===key);
          if(part){part.disabled=false;part.classList.remove('placed');}
          zone.classList.remove('filled');zone.dataset.partKey='';zone.setAttribute('aria-label',zone.dataset.slotName);zone.setAttribute('data-speak',zone.dataset.slotName);
          const slot=zone.dataset.slot,idx=+slot.split('-')[1]||0;
          if(slot==='head')q('head').innerHTML='';
          else if(slot==='thorax')q('thorax').innerHTML='';
          else if(slot==='abdomen')q('abdomen').innerHTML='';
          else if(slot.indexOf('leg')===0){legsA[idx]=null;q('legs').innerHTML=legsA.map(x=>x||'').join('');}
          else if(slot.indexOf('ant')===0){antA[idx]=null;q('ant').innerHTML=antA.map(x=>x||'').join('');}
          else if(slot.indexOf('wing')===0){wingA[idx]=null;q('wings').innerHTML=wingA.map(x=>x||'').join('');}
          $('#bbCount').textContent=zones.filter(z=>z.classList.contains('filled')).length+' of '+zones.length+' parts attached.';
          speak('Changed your mind — sure thing!');
        }
        zones.forEach(z=>{z.addEventListener('click',()=>detach(z));z.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();detach(z);}});});
        function checkBbDone(){
          if(done||!zones.every(z=>z.classList.contains('filled')))return;
          done=true;
          $('#bbStage').classList.add('bb-alive');
          const nameBox=$('#bbName');nameBox.hidden=false;nameBox.innerHTML='Meet <b>'+alias+'</b> the '+name+'!';
          const factOrKudos=g>=2?bbFacts[g][i%6]:bbKudos[i%6];
          const line='Meet '+alias+' the '+name+'! '+factOrKudos;
          result.innerHTML='<strong>Bug complete!</strong> '+factOrKudos;
          speak(line);sciPop();
          labOutcome(renderBuildBug,bbWrong<=2,null,line);
        }
      }
      /* ── WATER CYCLE RIDE ── */
      const wcSpots=[
        [['Deep Ocean','ocean'],['Still Lake','lake'],['Playground Puddle','puddle'],['Wavy River','river'],['Quiet Bay','bay'],['Rocky Creek','creek']],
        [['Snowy Mountain Top','snow'],['Fawn Pond','pond'],['Grand Lagoon','lagoon'],['Willow Marsh','marsh'],['Foggy Fen','fen'],['Stormy Sea','sea']],
        [['Rushing Rapids','rapids'],['Glade Stream','stream'],['Mirror Tarn','tarn'],['Misty Moor','moor'],['Birch Inlet','inlet'],['Canyon Wash','wash']],
        [['Alpine Cirque','cirque'],['Kettle Pond','pond'],['Braided Channel','channel'],['Tidal Flat','flat'],['Oxbow Loop','loop'],['Vernal Pool','pool']]
      ];
      const wcQuiz=[
        {q:'What lifts water up into the sky?',ok:'The sun\u2019s heat',bad:['The big wind','A bird\u2019s wings','The cold moon']},
        {q:'Inside the cloud, tiny droplets join to make\u2026',ok:'one heavy cloud',bad:['a dry kite','a tiny song','dusty rings']},
        {q:'After the rain falls, the water goes\u2026',ok:'back to the sea again',bad:['into space forever','inside a rock forever','only into my cup']}
      ];
