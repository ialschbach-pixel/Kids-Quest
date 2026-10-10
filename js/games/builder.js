      /* Word Builder: phase-tracked build-a-word (retrofit 2026-10-01).
         Grade map: K:[phase 2], 1st:[3,4,5], 2nd:[6,7,8,9,10], 3rd:[11,12,13].
         Each round takes the next phase in the grade's list. Phases 7 and 13 use
         chunk-build mode (tap syllable chunks in order: sun·set, dis·a·gree).
         No-repeat guard: every phase bank holds exactly 36 words and a session
         asks indices 0-35 (6 rounds x 6), with each phase's two rounds landing on
         non-overlapping index ranges — so no word repeats within a session. */
      const kqBuilderPhaseMap={0:[2],1:[3,4,5],2:[6,7,8,9,10],3:[11,12,13]};
      function renderBuilder(){
        const phases=kqBuilderPhaseMap[state.grade];
        const ph=kqPhonicsPhases[phases[state.round%phases.length]];
        const i=lessonIndex(),raw=ph.words[i%ph.words.length];
        const chip=kqTrackChip('🧱',ph.name+' Build','Phase '+ph.n),intro=kqPhaseIntro(ph);
        if(raw.includes('·')){
          const chunks=raw.split('·'),word=raw.replace(/·/g,'');
          const dpool=ph.words.filter(w=>w!==raw).flatMap(w=>w.split('·'));
          kqTapBuilder(`<h2 class="prompt" data-speak="Build ${word} from its chunks, in order.">Build it from its chunks — in order!</h2>`+intro,chip,chunks,dpool,`Build the word: ${word}.`,renderBuilder);
          return;
        }
        const word=raw,letters=word.toUpperCase().split('');
        const extra=shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(x=>!letters.includes(x))).slice(0,state.level+1),choices=shuffle([...letters,...extra]);let built=[];
        panel.innerHTML=progressMarkup()+chip+intro+`<h2 class="prompt" data-speak="Can you build the word ${word}?">Can you build the word <strong>${word}</strong>?</h2><div class="build-word">${letters.map(()=>'<div class="letter-slot"></div>').join('')}</div><div class="letter-bank">${choices.map((l,ix)=>`<button class="answer" type="button" data-letter="${l}" data-ix="${ix}" data-speak="Letter ${l}">${l}</button>`).join('')}</div>`;setProgress();
        $$('.letter-bank .answer',panel).forEach(b=>b.addEventListener('click',()=>{if(state.locked||b.disabled)return;const needed=letters[built.length];if(b.dataset.letter===needed){built.push(needed);b.disabled=true;b.classList.add('correct');const slots=$$('.letter-slot',panel);slots[built.length-1].textContent=needed;slots[built.length-1].classList.add('filled');beep('good');if(built.length===letters.length){speak('You built '+word+'!');correctThen(renderBuilder);}}else{wrong(b);speak('Not that one. We need the letter '+needed+' next.');}}));
      }

      const rhymeFamilyLines=[
        'cat bat hat mat|dog log frog jog|sun fun run bun|pig wig dig fig|top hop mop pop|bed red fed led|cap map tap nap|fin pin win tin|bug rug mug hug|jet pet net wet|fox box socks clocks|cup pup up sup|hen pen ten den|jam ham ram yam|sit hit fit kit|mud bud thud stud|van fan man pan|lip dip tip zip',
        'ship trip clip flip|chin grin spin thin|shop chop stop drop|chat flat that splat|whip skip drip flip|frog blog clog jog|clap snap trap wrap|drum plum hum strum|flag drag brag snag|grip trip slip clip|step prep kept slept|plan clan fan span|twin grin spin skin|crab grab slab tab|brush crush hush rush|clock block flock rock|sled red fled bed|swim trim brim slim',
        'cake lake make shake|bike hike like strike|home foam dome roam|cube tube lube globe|rain train chain brain|seed need speed feed|boat coat float goat|night light bright flight|day play stay tray|team dream cream stream|field shield yield sealed|snow glow show throw|star car far jar|fork cork stork pork|bird third word heard|turn burn learn fern|chair fair pair stair|cloud loud proud crowd',
        'curious furious serious mysterious|discover recover uncover cover|journey attorney gurney tourney|clever never ever forever|energy synergy allergy strategy|protect connect correct inspect|replay display portray delay|preview review interview view|unhappy snappy happy scrappy|hopeful playful helpful cheerful|kindness blindness brightness lightness|teacher creature feature preacher|quickly thickly slickly strictly|fearless peerless cheerless tearless|sunlight moonlight starlight twilight|notebook storybook guidebook handbook|payment statement placement basement|artist smartest chartist heartist'
      ];
      const rhymeBanks=rhymeFamilyLines.map(line=>line.split('|').flatMap(group=>{const w=group.split(' ');return [[w[0],w[1]],[w[2],w[3]]];}));
