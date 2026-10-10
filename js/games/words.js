      /* Words game: phonics tracks (retrofit 2026-10-01).
         K: Letter Garden — 25 letters in blending order (m,a,t,d...qu); meet-a-letter
            rounds (see -> hear name+sound -> tap among 4) plus a build-a-word
            micro-moment after every 4th letter, built only from known letters.
         1st: Blend Lab — phases 2-5 rotate by round (first sound / blend / digraph /
            sneaky-e word sort). 2nd: Vowel Team Lab — phases 6-10 (pattern-detect MCQ;
            chunk-tap builder for phase 7). 3rd: Word Parts Lab — phases 11-13
            (affix-detect MCQ; parts-builder every 3rd question). */
      let lgAskedFor=null;
      const kqLGBlocks=[['m','a','t','d'],['o','c','g','i'],['n','h','s','f'],['v','z','p','b'],['l','r','u','w'],['j','y','x','k'],['qu']];
      const kqLGDisp=l=>l==='qu'?'Qu':l.toUpperCase();
      function lgLetterRound(L,i){
        const disp=kqLGDisp(L),snd=kqLetterSounds[L],ex=kqLetterWords[L];
        const chip=kqTrackChip('🌱','Letter Garden','meet the letters');
        const stepKey=state.round+'_'+state.q+'_'+L;
        if(lgAskedFor!==stepKey){
          lgAskedFor=stepKey;
          panel.innerHTML=progressMarkup()+chip+`<h2 class="prompt" data-speak="Meet the letter ${disp}! ${disp} says ${snd}, as in ${ex}.">Meet the letter ${disp}!</h2><div class="visual-prompt" style="font-size:3.4rem" aria-hidden="true">${disp}</div><p class="flavor-line choice-hear" data-speak="${disp} says ${snd}, as in ${ex}.">${disp} says <strong>${snd}</strong>, as in <strong>${ex}</strong>.</p><div class="answer-grid"><button class="answer" type="button" data-speak="${L} says ${snd}, as in ${ex}.">🔊 Hear it</button><button class="answer" type="button" data-hi="1">Let's play! ▶</button></div>`;setProgress();
          $$('[data-hi]',panel).forEach(b=>b.addEventListener('click',()=>{renderWords();}));
        }else{
          const known=kqLetterOrder.indexOf(L);
          const pool=kqLetterOrder.slice(0,Math.max(4,known+1));
          const opts=deterministicOptions(L,pool,4,i).map(kqLGDisp);
          panel.innerHTML=progressMarkup()+chip+`<h2 class="prompt" data-speak="Which letter says ${snd}, as in ${ex}?">Which letter says “${snd}”, as in “${ex}”?</h2><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}" style="font-size:2.2rem">${o}</button>`).join('')}</div>`;setProgress();
          $$('.answer',panel).forEach(b=>b.addEventListener('click',()=>{if(b.dataset.value===disp){correctThen(renderWords,b);}else wrong(b);}));
        }
      }
      function lgMicroRound(block,i){
        const pool=kqMicroMoments[block],word=pool[i%pool.length];
        const chip=kqTrackChip('🌱','Letter Garden','build-a-word');
        const promptHTML=`<h2 class="prompt" data-speak="Build the word ${word}. Tap the letters in order.">Build it! Tap the letters in order.</h2><div class="center-actions"><button class="answer" type="button" data-speak="${word}">🔊 Hear the word</button></div>`;
        kqTapBuilder(promptHTML,chip,word.toUpperCase().split(''),'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),`Build the word: ${word}.`,renderWords);
      }
      function kqMCQ(chip,intro,prompt,visual,correct,opts){
        panel.innerHTML=progressMarkup()+chip+intro+`<h2 class="prompt">${prompt}</h2><div class="visual-prompt">${visual}</div><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}">${o}</button>`).join('')}</div>`;setProgress();
        $$('.answer',panel).forEach(b=>b.addEventListener('click',()=>b.dataset.value===correct?correctThen(renderWords,b):wrong(b)));
      }
      /* Bounce & Blend round type (folded in from Trampoline Blend 2026-10-01):
         bouncy letters + sound-by-sound blending, every 3rd Blend Lab question. */
      function renderWordsBounceBlend(i){
        const chip=kqTrackChip('🧪','Blend Lab','Bounce & Blend');
        const bank=wordBanks[1].words,word=bank[i%bank.length],opts=deterministicOptions(word,bank,4,i);
        panel.innerHTML=progressMarkup()+chip+`<h2 class="prompt" data-speak="Listen to the sounds. Then tap the word.">Can you bounce through the sounds and blend the word?</h2><div class="visual-prompt">${word.toUpperCase().split('').map((l,ix)=>`<span class="bouncy-letter" style="animation-delay:${ix*.12}s">${l}</span>`).join('')}</div><div class="answer-grid">${opts.map(o=>`<button class="answer" type="button" data-value="${o}" data-speak="${o}">${o}</button>`).join('')}</div>`;setProgress();speakSegments(word);
        $$('.answer',panel).forEach(b=>b.addEventListener('click',()=>b.dataset.value===word?(speak(word),correctThen(renderWords,b)):wrong(b)));
      }
      function renderWordsBlendLab(i){
        if(state.q%3===2)return renderWordsBounceBlend(i);
        const ph=kqPhonicsPhases[[2,3,4,5][state.round%4]];
        const chip=kqTrackChip('🧪','Blend Lab',`Phase ${ph.n}: ${ph.name}`),intro=kqPhaseIntro(ph);
        const word=ph.words[i%ph.words.length];
        if(ph.n===2){
          const correct=word[0].toUpperCase();
          kqMCQ(chip,intro,`Which FIRST SOUND starts “${word}”?`,word.toUpperCase(),correct,deterministicOptions(correct,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),4,i));
        }else if(ph.n===3){
          const m=word.match(/^(str|squ|scr|shr|thr|spl|spr|bl|br|cl|cr|dr|fl|fr|gl|gr|pl|pr|sl|sm|sn|sp|st|sw|tr|tw|sc|sk)/);
          const correct=(m?m[0]:word.slice(0,2)).toUpperCase();
          kqMCQ(chip,intro,`Which BLEND starts “${word}”?`,word.toUpperCase(),correct,deterministicOptions(correct,['BL','BR','CL','CR','DR','FL','FR','GL','GR','PL','PR','SL','SM','SN','SP','ST','SW','TR','TW','SC','SK','STR','SPR','SCR'],4,i));
        }else if(ph.n===4){
          const m=word.match(/sh|ch|th|wh|ng|ck/);
          const correct=(m?m[0]:word.slice(0,2)).toUpperCase();
          kqMCQ(chip,intro,`Which DIGRAPH is hiding in “${word}”?`,word.toUpperCase(),correct,deterministicOptions(correct,['SH','CH','TH','WH','NG','CK','TCH'],4,i));
        }else{
          // Sneaky-e sort: tap the 2 sneaky-e words among 4 (2 from phase 5, 2 CVC from phase 2)
          const p5=kqPhonicsPhases[5].words,p2=kqPhonicsPhases[2].words;
          const targets=[p5[i%p5.length],p5[(i+11)%p5.length]];
          const decoys=[p2[i%p2.length],p2[(i+17)%p2.length]];
          const cards=shuffle([...targets.map(w=>({w,hot:true})),...decoys.map(w=>({w,hot:false}))]);
          panel.innerHTML=progressMarkup()+chip+intro+`<h2 class="prompt" data-speak="Tap the two sneaky-e words!">Tap the <strong>two</strong> sneaky-e words!</h2><div class="answer-grid">${cards.map((c,ix)=>`<button class="answer" type="button" data-ix="${ix}" data-speak="${c.w}">${c.w}</button>`).join('')}</div>`;setProgress();
          let picked=[];
          $$('.answer',panel).forEach(b=>b.addEventListener('click',()=>{
            if(state.locked||b.disabled||b.classList.contains('picked'))return;
            b.classList.add('picked');picked.push({card:cards[+b.dataset.ix],btn:b});
            if(picked.length===2){
              if(picked.every(p=>p.card.hot)){picked.forEach(p=>p.btn.classList.add('correct'));correctThen(renderWords);}else{wrong(b);setTimeout(()=>{picked=[];$$('.answer',panel).forEach(x=>x.classList.remove('picked'));},700);}
            }
          }));
        }
      }
      function kqVowelPattern(word,n){
        const rx={6:/(tch|dge|le$|y$)/,8:/(ar|er|ir|or|ur)/,9:/(ai|ay|ee|ea|oa|ow|igh|ie)/,10:/(oi|oy|ou|ow|oo|aw)/}[n];
        const m=rx&&word.match(rx);return m?m[0]:null;
      }
      function renderWordsVowelLab(i){
        const ph=kqPhonicsPhases[[6,7,8,9,10][state.round%5]];
        const chip=kqTrackChip('🔤','Vowel Team Lab',`Phase ${ph.n}: ${ph.name}`),intro=kqPhaseIntro(ph);
        const raw=ph.words[i%ph.words.length],word=raw.replace(/·/g,'');
        if(ph.n===7){
          // Chunk-tap builder: tap syllable chunks in order
          const chunks=raw.split('·');
          const dpool=ph.words.filter(w=>w!==raw).flatMap(w=>w.split('·'));
          kqTapBuilder(`<h2 class="prompt" data-speak="Tap the chunks in order to build ${word}.">Tap the chunks in order!</h2>`+intro,chip,chunks,dpool,`Build the word: ${word}.`,renderWords);
        }else{
          const pat=kqVowelPattern(word,ph.n);
          const choices={6:['tch','dge','le','y'],8:['ar','er','ir','or','ur'],9:['ai','ay','ee','ea','oa','ow','igh','ie'],10:['oi','oy','ou','ow','oo','aw']}[ph.n];
          kqMCQ(chip,intro,`Which vowel pattern do you hear in “${word}”?`,word.toUpperCase(),pat,deterministicOptions(pat,choices,4,i));
        }
      }
      function kqSplitParts(raw,n){
        if(raw.includes('·'))return raw.split('·');
        const pfx=['un','re','dis','pre','mis','for','be','con','com','over','under'];
        const sfx=['ment','ness','less','ful','ing','ed','es','ly'];
        let parts=[],rest=raw;
        for(const p of pfx){if(rest.startsWith(p)&&rest.length>p.length+2){parts.push(p);rest=rest.slice(p.length);break;}}
        for(const s of sfx){if(rest.endsWith(s)&&rest.length>s.length+2){parts.push(rest.slice(0,-s.length),s);rest='';break;}}
        if(rest)parts.push(rest);
        return parts.filter(Boolean);
      }
      function kqFindAffix(word,n){
        const lists={11:['ed','ing','es'],12:['un','re','dis','pre','ful','less','ness','ly','ment'],13:['mis','for','be','a','al','con','com','over','under','dis','ed','ful']};
        for(const a of lists[n]){if(word.startsWith(a)&&word.length>a.length+2)return a;}
        for(const a of lists[n]){if(word.endsWith(a)&&word.length>a.length+2)return a;}
        return null;
      }
      function renderWordsPartsLab(i){
        const ph=kqPhonicsPhases[[11,12,13][state.round%3]];
        const chip=kqTrackChip('🧩','Word Parts Lab',`Phase ${ph.n}: ${ph.name}`),intro=kqPhaseIntro(ph);
        const raw=ph.words[i%ph.words.length],word=raw.replace(/·/g,'');
        if(state.q%3===2){
          // Parts-builder: tap prefix/base/suffix in order
          const parts=kqSplitParts(raw,ph.n);
          const dpool=ph.words.filter(w=>w!==raw).flatMap(w=>kqSplitParts(w,ph.n));
          kqTapBuilder(`<h2 class="prompt" data-speak="Build ${word} from its word parts, in order.">Build it from its word parts — in order!</h2>`+intro,chip,parts,dpool,`Build the word: ${word}.`,renderWords);
        }else{
          let mraw=ph.words[i%ph.words.length],mword=mraw.replace(/·/g,''),affix=kqFindAffix(mword,ph.n),tries=0;
          while(!affix&&tries<36){tries++;mraw=ph.words[(i+tries)%ph.words.length];mword=mraw.replace(/·/g,'');affix=kqFindAffix(mword,ph.n);}
          const choices={11:['ed','ing','es','s'],12:['un','re','dis','pre','ful','less','ness','ly','ment'],13:['mis','for','be','a','al','con','com','over','under','dis','ed','ful']}[ph.n];
          kqMCQ(chip,intro,`Which word part do you see in “${mword}”?`,mword.toUpperCase(),affix,deterministicOptions(affix,choices,4,i));
        }
      }
      function renderWords(){
        const i=lessonIndex();
        if(state.grade===1)return renderWordsBlendLab(i);
        if(state.grade===2)return renderWordsVowelLab(i);
        if(state.grade===3)return renderWordsPartsLab(i);
        // Grade K: Letter Garden — 32 steps per cycle (7 blocks: letters + micro-moment)
        const step=(state.round*6+state.q)%32;
        const block=step<30?Math.floor(step/5):6,pos=step<30?step%5:step-30;
        const letters=kqLGBlocks[block];
        if(pos<letters.length)lgLetterRound(letters[pos],i);
        else lgMicroRound(block,i);
      }
