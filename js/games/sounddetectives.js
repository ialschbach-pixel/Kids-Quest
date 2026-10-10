      /* Sound Detectives — merged from Instrument Detective + High or Low (2026-10-01).
         One tile, two alternating round types: timbre ID ("which instrument?")
         and pitch direction ("higher or lower?"). Content banks preserved. */
      function renderSDInstrument(i){
        const answer=instruments[(i*5+state.grade)%instruments.length],freq=220*Math.pow(2,((i+state.grade*2)%18)/12),pool=instruments;
        panel.innerHTML=progressMarkup()+`<h2 class="prompt">Sound Detectives: which instrument sound do you hear?</h2><div class="audio-stage"><button class="primary-btn" id="hearInstrument" type="button" aria-label="Play the mystery instrument sound">▶ Hear the sound</button></div><div class="answer-grid">${deterministicOptions(answer,pool,4,i).map(o=>`<button class="answer" type="button" data-value="${o}">${o}</button>`).join('')}</div>`;
        setProgress();$('#hearInstrument').onclick=()=>playInstrument(answer,freq);
        $$('.answer',panel).forEach(b=>b.onclick=()=>{if(b.dataset.value===answer){correctThen(renderSoundDetectives,b);speak('Yes! That was the '+answer+'!');}else{wrong(b);toast('Not that instrument — hear the sound again!');}});
      }
      function renderSDPitch(i){
        const steps=[[12,9,7,5,4,3],[7,5,4,3,2,6],[4,3,2,5,1,6],[2,1,3,1,2,1]][state.grade],dir=i%2?1:-1,semi=steps[(i+Math.floor(i/6))%6]*dir,base=261.63*Math.pow(2,((i*5)%12)/12),second=base*Math.pow(2,semi/12),answer=semi>0?'Higher':'Lower';
        panel.innerHTML=progressMarkup()+`<h2 class="prompt">Sound Detectives: is the second note higher or lower than the first?</h2><div class="audio-stage"><button class="primary-btn" id="hearPitch" type="button" aria-label="Play both notes">▶ Hear both notes</button></div><div class="answer-grid"><button class="answer" type="button" data-value="Higher">Higher</button><button class="answer" type="button" data-value="Lower">Lower</button></div>`;
        setProgress();$('#hearPitch').onclick=()=>{const ctx=getMusicCtx(),t=ctx.currentTime+.05;toneAt(base,t,.32);toneAt(second,t+.52,.32);};
        $$('.answer',panel).forEach(b=>b.onclick=()=>{if(b.dataset.value===answer)correctThen(renderSoundDetectives,b);else{wrong(b);toast('Hear both notes again — does the second climb or fall?');}});
      }
      function renderSoundDetectives(){const i=lessonIndex();if(i%2===0)renderSDInstrument(i);else renderSDPitch(i);}
