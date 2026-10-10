      function dropHeight(level,variant){const names=['High','Middle','Low'],baseTops=[28,78,128],nudges=[-4,-2,0,2,4,6],top=baseTops[level]+nudges[variant%nudges.length];return{name:names[level],top,fall:232-top};}
      /* Local height pairs (was in staticzap.js). [leftLevel, rightLevel]: 0=High,1=Middle,2=Low.
         Only cross-level pairs — same-level pairs could produce equal falls (audit fails). */
            /* Deterministic but unpredictable hash — not a simple cycle Mia can memorize. */
      function dropHash01(grade,i,salt){let h=(grade*374761393+i*668265263+salt*2246822519)|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296;}
      function dropChallenge(i,grade){
        const r=Math.floor(i/6),k=i%6,b=dropBanks[grade];
        /* Randomize which object goes left/right (visual) — answer not tied to side. */
        const swapSides=dropHash01(grade,i,99)<0.5;
        const leftObj=swapSides?b.right[k]:b.left[r], rightObj=swapSides?b.left[r]:b.right[k];
        /* Randomize height pair via hash (not a predictable cycle). */
        const pair=dropHeightPairs[Math.floor(dropHash01(grade,i,7)*dropHeightPairs.length)];
        /* Drag follows the OBJECT type, not the side: heavy=1.0, light=1.4 (1.3 for grade 3).
           Tuned for ~40/30/30 bottom/top/together distribution. */
        const leftIsHeavy=!swapSides;
        const dragFor=isHeavy=>isHeavy?1.0:(grade===3?1.3:1.4);
        const leftHeight=dropHeight(pair[0],(r+grade*3+i)%6),rightHeight=dropHeight(pair[1],(k+i*2)%6);
        const dragA=dragFor(leftIsHeavy),dragB=dragFor(!leftIsHeavy);
        const timeA=Math.sqrt(leftHeight.fall)*dragA,timeB=Math.sqrt(rightHeight.fall)*dragB;
        const diff=Math.abs(timeA-timeB);
        let answer, outcomeKind;
        if(diff<1.3){ answer='Together'; outcomeKind='together'; }
        else if(timeA<timeB){ answer=leftObj; outcomeKind=leftHeight.fall<rightHeight.fall?'bottom':'top'; }
        else { answer=rightObj; outcomeKind=rightHeight.fall<leftHeight.fall?'bottom':'top'; }
        const why=outcomeKind==='together'?'The height difference and air resistance balanced out, so they land together.'
          :outcomeKind==='bottom'?`${answer} started lower, so it had less distance to fall.`
          :`${answer} started higher, but its streamlined shape means less air resistance, making up for the extra distance.`;
        return{code:`${grade+1}-${r+1}-${k+1}`,left:leftObj,right:rightObj,leftHeight,rightHeight,timeA,timeB,answer,why,outcomeKind};
      }
      const dropChallengeAudit=Array.from({length:4},(_,grade)=>Array.from({length:36},(_,i)=>dropChallenge(i,grade))).flat();
      if(dropChallengeAudit.length!==144||dropChallengeAudit.some(ch=>ch.leftHeight.top===ch.rightHeight.top||ch.leftHeight.fall===ch.rightHeight.fall||!['High','Middle','Low'].includes(ch.leftHeight.name)||!['High','Middle','Low'].includes(ch.rightHeight.name)))throw new Error('Drop challenge height integrity failed');
      function dropShape(label,color){
        const n=label.toLowerCase(),stroke='#17324d',hi='rgba(255,255,255,.48)';let art='';
        if(/feather/.test(n))art=`<path d="M72 12C34 15 13 42 24 76c18-7 33-24 39-48-10 20-23 32-38 39" fill="${color}" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/>`;
        else if(/apple/.test(n))art=`<path d="M45 25c-4-9 0-14 7-18M48 18c10-7 18-3 20 3-9 4-16 3-20-3Z" fill="#3f8c4c" stroke="${stroke}" stroke-width="4"/><path d="M45 24C20 11 11 42 21 66c8 19 21 14 24 11 4 3 17 8 25-11 10-24 1-55-25-42Z" fill="${color}" stroke="${stroke}" stroke-width="5"/>`;
        else if(/car|train/.test(n))art=`<path d="M12 53h10l9-18h28l13 18h7v19H12Z" fill="${color}" stroke="${stroke}" stroke-width="5"/><circle cx="28" cy="72" r="8" fill="#33485d"/><circle cx="65" cy="72" r="8" fill="#33485d"/><path d="M38 40h17l9 13H31Z" fill="${hi}"/>`;
        else if(/book|block|cube|box|brick|atlas|notebook|tile/.test(n))art=`<path d="M18 25h55v49H18Z" fill="${color}" stroke="${stroke}" stroke-width="5"/><path d="M31 25v49M24 35h43" stroke="${hi}" stroke-width="4"/>`;
        else if(/spoon/.test(n))art=`<ellipse cx="47" cy="24" rx="16" ry="20" fill="${color}" stroke="${stroke}" stroke-width="5"/><path d="M45 43 35 80" stroke="${stroke}" stroke-width="10" stroke-linecap="round"/>`;
        else if(/acorn/.test(n))art=`<path d="M27 35c2-19 34-22 39 0" fill="#8a5a30" stroke="${stroke}" stroke-width="5"/><path d="M29 37c-5 31 13 43 19 43s25-13 18-43Z" fill="${color}" stroke="${stroke}" stroke-width="5"/><path d="M47 18c2-8 7-10 12-11" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/>`;
        else if(/leaf|shaving/.test(n))art=`<path d="M15 63C26 17 66 10 76 17c-2 40-27 60-61 46Z" fill="${color}" stroke="${stroke}" stroke-width="5"/><path d="M21 60 68 23M44 42l-4-17M49 39l17 3" stroke="${hi}" stroke-width="4"/>`;
        else if(/fan/.test(n))art=`<path d="M14 64Q25 17 45 66Q46 15 61 67Q68 22 76 69Z" fill="${color}" stroke="${stroke}" stroke-width="5"/><circle cx="45" cy="69" r="8" fill="#8a5a30"/>`;
        else if(/tissue|paper|filter|napkin|sheet|scarf/.test(n))art=`<path d="M15 27Q28 17 42 28t31 0v42q-15 10-30 0t-28 0Z" fill="${color}" stroke="${stroke}" stroke-width="5"/><path d="M25 39q11-7 22 0t18 0" fill="none" stroke="${hi}" stroke-width="4"/>`;
        else if(/cotton|foam/.test(n))art=`<path d="M24 69c-19-7-11-28 4-29-6-17 18-25 27-11 15-8 27 8 20 20 15 10 4 30-12 25-9 12-29 8-32-4Z" fill="${color}" stroke="${stroke}" stroke-width="5"/>`;
        else if(/bubble/.test(n))art=`<circle cx="45" cy="45" r="31" fill="${color}" fill-opacity=".32" stroke="${stroke}" stroke-width="4"/><path d="M28 32c6-9 13-11 21-12" stroke="white" stroke-width="6" stroke-linecap="round"/>`;
        else art=`<circle cx="45" cy="45" r="31" fill="${color}" stroke="${stroke}" stroke-width="5"/><path d="M25 34c8-10 20-14 32-9" stroke="${hi}" stroke-width="5" stroke-linecap="round"/>`;
        return `<svg viewBox="0 0 90 90" role="img" aria-label="${kqEsc(label)}">${art}</svg>`;
      }
      function renderDropIt(){
        const i=lessonIndex(),ch=dropChallenge(i,state.grade),colors=['#df5e52','#3f83b7','#d58a18','#6f5fa8','#23865a','#b84c7c'],ca=colors[(i+state.grade)%6],cb=colors[(i+3+state.grade)%6],leftHeight=ch.leftHeight,rightHeight=ch.rightHeight,timeA=ch.timeA,timeB=ch.timeB,answer=ch.answer,why=ch.why;let prediction=null,slow=false,released=false;
        panel.innerHTML=progressMarkup()+`<h2 class="prompt">Which lands first: the ${kqEsc(ch.left)} from ${leftHeight.name.toLowerCase()} or the ${kqEsc(ch.right)} from ${rightHeight.name.toLowerCase()}?</h2><p class="lab-instruction">Different starting heights change the distance each object falls. Shape can change how much the air slows it.</p><div class="lab-stage"><div class="drop-stage"><span class="drop-height-line" style="--line-top:${leftHeight.top+42}px"></span><span class="drop-height-line" style="--line-top:${rightHeight.top+42}px"></span><span class="drop-object drop-a" style="--left:22%;--top:${leftHeight.top}px;--fall:${leftHeight.fall}px"><span class="drop-label">${kqEsc(ch.left)} · ${leftHeight.name}</span>${dropShape(ch.left,ca)}</span><span class="drop-object drop-b" style="--left:64%;--top:${rightHeight.top}px;--fall:${rightHeight.fall}px"><span class="drop-label">${kqEsc(ch.right)} · ${rightHeight.name}</span>${dropShape(ch.right,cb)}</span><span class="drop-ground-label">Landing zone</span></div><div class="drop-predict" aria-label="Choose your prediction"><button type="button" data-predict="${kqEsc(ch.left)}">${kqEsc(ch.left)} first</button><button type="button" data-predict="${kqEsc(ch.right)}">${kqEsc(ch.right)} first</button><button type="button" data-predict="Together">Together</button></div><div class="drop-controls"><button class="slow-toggle" id="slowMotion" type="button" aria-pressed="false">Slow motion: off</button><button class="lab-action" id="releaseDrop" type="button" disabled>Release both objects</button></div><p class="science-result" id="dropResult">Choose a prediction. Then release both objects.</p></div>`;
        setProgress();$$('[data-predict]',panel).forEach(b=>b.onclick=()=>{prediction=b.dataset.predict;$$('[data-predict]',panel).forEach(x=>x.classList.toggle('selected',x===b));$('#releaseDrop').disabled=false;$('#dropResult').textContent='Prediction locked in. Tap release to test it.';});
        $('#slowMotion').onclick=e=>{slow=!slow;e.currentTarget.setAttribute('aria-pressed',String(slow));e.currentTarget.textContent=`Slow motion: ${slow?'on':'off'}`;};
        $('#releaseDrop').onclick=()=>{if(!prediction||released)return;released=true;$('#releaseDrop').disabled=true;const scale=(slow?2.35:.86)/Math.max(timeA,timeB),durationA=timeA*scale,durationB=timeB*scale,a=$('.drop-a',panel),b=$('.drop-b',panel);a.style.setProperty('--drop-speed',`${durationA}s`);b.style.setProperty('--drop-speed',`${durationB}s`);a.classList.add('fall');b.classList.add('fall');const wait=Math.max(durationA,durationB)*1000+180;setTimeout(()=>{const result=answer==='Together'?'They land together.':`${answer} lands first.`;$('#dropResult').textContent=`${result} ${why}`;speak(`${result} ${why}`);labOutcome(renderDropIt,prediction===answer,$('#releaseDrop'),prediction===answer?'Your prediction matched what you saw!':'Great experiment — now you know from what you saw.');},wait);};
      }

      const skyBanks=[
        [['bright sun','day'],['stars after bedtime','night'],['owl after dark','night'],['rainbow after morning rain','day'],['school-time sunshine','day'],['fireflies after sunset','night']],
        [['morning robin','day'],['evening bat','night'],['sunlit playground','day'],['constellations after dark','night'],['sunset cloud','day'],['nighttime streetlights','night']],
        [['short noon shadow','day'],['long morning shadow','day'],['Milky Way after dark','night'],['sunrise colors','day'],['midnight stars','night'],['crescent Moon before sunset','day']],
        [['Moon reflecting sunlight at night','night'],['Moon visible before sunset','day'],['planet visible after dusk','night'],['cloud lit by the setting Sun','day'],['stars hidden by daylight','day'],['meteor seen after dark','night']]
      ];
      const skyPlaces=['backyard','playground','park','schoolyard','campground','garden'];
