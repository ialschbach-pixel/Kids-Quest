      function circuitChallenge(i,grade){
        const batteryColors=['yellow','blue','green','orange','silver','red'],routes=['top loop','wide loop','square loop','round loop','left loop','right loop'];
        const pieces=grade===0?['battery','wire','bulb','wire']:grade===1?['battery','wire','connector','bulb','wire']:grade===2?['battery','wire','connector','bulb','switch','wire']:['battery','wire','connector','bulb','switch','wire'];
        return{code:`${grade+1}-${Math.floor(i/6)+1}-${i%6+1}`,color:batteryColors[Math.floor(i/6)],route:routes[i%6],pieces};
      }
      const circuitChallengeAudit=Array.from({length:4},(_,grade)=>Array.from({length:36},(_,i)=>circuitChallenge(i,grade))).flat();
      if(circuitChallengeAudit.length!==144||circuitChallengeAudit.some(ch=>!ch.pieces.includes('battery')||!ch.pieces.includes('bulb')||ch.pieces.filter(part=>part==='wire').length<2))throw new Error('Circuit challenge integrity failed');
      function renderBulb(){
        const i=lessonIndex(),ch=circuitChallenge(i,state.grade),needsSwitch=state.grade>=2,placedBySlot=Array(ch.pieces.length).fill(null);
        const slots=ch.pieces.map((part,n)=>({part,n,label:part==='wire'?(n===ch.pieces.lastIndexOf('wire')?'return wire':'outgoing wire'):part}));
        const tray=slots.map((x,n)=>({part:x.part,key:`${x.part}-${n}`,label:x.label}));
        if(state.grade===3)tray.splice((i%tray.length)+1,0,{part:'short',key:'short',label:'short-path wire'});
        const names=slots.map(x=>x.label),needed=names.length===2?`${names[0]} and ${names[1]}`:`${names.slice(0,-1).join(', ')}, and ${names.at(-1)}`;
        const circuitPrompt=`Build a closed battery circuit with ${needed}. Drag every part onto the board, then ${needsSwitch?'close the switch':'complete the loop'}.`;
        panel.innerHTML=progressMarkup()+`<h2 class="prompt">${circuitPrompt}</h2><p class="lab-instruction">A complete path lets the battery transfer energy around the loop. Electricity is not used up in the wires.</p><div class="lab-stage"><div class="circuit-board hands-on" id="circuitBoard"><div class="circuit-path"></div>${slots.map((x,n)=>`<div class="circuit-drop" data-accept="${x.part}" data-slot="${n}"><span>Drop ${x.label} here</span></div>`).join('')}${needsSwitch?'<button class="circuit-switch" id="circuitSwitch" type="button" disabled>Switch is open — tap to close</button>':''}</div><div class="parts-tray" aria-label="Circuit parts tray">${tray.map(x=>`<button draggable="true" class="circuit-part ${x.part==='short'?'bad-part':''}" type="button" data-part="${x.part}" data-key="${x.key}"><span class="part-symbol">${labSymbols[x.part]||'⚠'}</span>${x.label}</button>`).join('')}</div><p class="science-result" id="circuitResult">Drag a part to its matching place. You can also tap a part.</p>${safetyLine()}</div>`;
        setProgress();
        const parts=$$('.circuit-part',panel),zones=$$('.circuit-drop',panel),board=$('#circuitBoard');
        const closedLoopBuilt=()=>slots.every((slot,n)=>placedBySlot[n]===slot.part)&&placedBySlot.includes('battery')&&placedBySlot.includes('bulb')&&placedBySlot.filter(part=>part==='wire').length>=2;
        const light=()=>{const sw=needsSwitch?$('#circuitSwitch'):null;if(state.locked||!closedLoopBuilt()||(sw&&!sw.classList.contains('closed'))){$('#circuitResult').textContent='The bulb needs a battery, a bulb, and both wire connections in one closed loop.';return;}board.classList.add('lit');$('#circuitResult').textContent='The loop is complete — the bulb lights!';beep('good');correctThen(renderBulb,board);};
        const finish=()=>{if(!closedLoopBuilt())return;if(needsSwitch){const sw=$('#circuitSwitch');sw.disabled=false;$('#circuitResult').textContent='Both wire connections complete the path. Close the switch to light the bulb.';return;}light();};
        bindDragAndTap(parts,zones,(part,zone)=>{if(state.locked||part.disabled)return;if(part.dataset.part==='short'){wrong(part);$('#circuitResult').textContent='That short path skips the bulb. Build the path through the bulb instead.';speak('That short path skips the bulb. Build the path through the bulb instead.');return;}if(!zone||zone.dataset.accept!==part.dataset.part){wrong(part);$('#circuitResult').textContent="The path isn't complete — the electricity can't get all the way around!";speak("The path isn't complete — the electricity can't get all the way around!");return;}const slotIndex=Number(zone.dataset.slot);zone.classList.add('filled');zone.innerHTML=`<span><span class="part-symbol">${labSymbols[part.dataset.part]}</span>${part.textContent.trim()}</span>`;part.disabled=true;placedBySlot[slotIndex]=part.dataset.part;const connected=placedBySlot.filter(Boolean).length;$('#circuitResult').textContent=`${connected} of ${slots.length} parts connected.`;finish();});
        if(needsSwitch)$('#circuitSwitch').onclick=e=>{if(e.currentTarget.disabled||!closedLoopBuilt())return;e.currentTarget.classList.add('closed');e.currentTarget.textContent='Switch closed';light();};
      }

      const staticBanks=[
        ['tissue square','paper star','cotton thread','oat flake','tiny feather','paper dot'],
        ['confetti circle','wool fiber','dry leaf bit','rice-paper strip','cereal flake','hair strand'],
        ['foil sliver','paper curl','tissue ribbon','thread loop','foam crumb','thin yarn'],
        ['shredded paper','dried grass tip','cellophane bit','lint tuft','paper spiral','tiny cork shaving']
      ];
      const staticNoPull=[
        ['wooden block','ceramic cup','full book','rubber ball','metal spoon','glass jar'],
        ['toy brick','water bottle','thick notebook','stone cube','wooden ruler','apple'],
        ['steel weight','filled mug','hardcover atlas','large magnet','wooden box','glass bowl'],
        ['heavy clamp','full can','thick tile','large bolt','wood block','water glass']
      ];
