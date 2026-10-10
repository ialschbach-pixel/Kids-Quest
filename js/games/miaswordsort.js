      const miasWordSortBands=[
        [
          {word:'dog',role:'noun',emoji:'🐶'},{word:'run',role:'verb',emoji:'🏃'},{word:'red',role:'adjective',emoji:'🔴'},
          {word:'ball',role:'noun',emoji:'⚽'},{word:'jump',role:'verb',emoji:'🤸'},{word:'big',role:'adjective',emoji:'🐘'},
          {word:'apple',role:'noun',emoji:'🍎'},{word:'swim',role:'verb',emoji:'🏊'},{word:'soft',role:'adjective',emoji:'🧸'},
          {word:'cat',role:'noun',emoji:'🐱'},{word:'clap',role:'verb',emoji:'👏'},{word:'yellow',role:'adjective',emoji:'🟡'},
          {word:'book',role:'noun',emoji:'📘'},{word:'sing',role:'verb',emoji:'🎤'},{word:'fuzzy',role:'adjective',emoji:'🐑'},
          {word:'sun',role:'noun',emoji:'☀️'},{word:'hop',role:'verb',emoji:'🐇'},{word:'tiny',role:'adjective',emoji:'🐜'},
          {word:'fish',role:'noun',emoji:'🐟'},{word:'dig',role:'verb',emoji:'🪏'},{word:'sleepy',role:'adjective',emoji:'😴'},
          {word:'tree',role:'noun',emoji:'🌳'},{word:'kick',role:'verb',emoji:'🦵'},{word:'sweet',role:'adjective',emoji:'🍯'},
          {word:'hat',role:'noun',emoji:'🧢'},{word:'hug',role:'verb',emoji:'🤗'},{word:'sour',role:'adjective',emoji:'🍋'},
          {word:'car',role:'noun',emoji:'🚗'},{word:'wave',role:'verb',emoji:'👋'},{word:'smooth',role:'adjective',emoji:'🪨'},
          {word:'moon',role:'noun',emoji:'🌙'},{word:'laugh',role:'verb',emoji:'😄'},{word:'rough',role:'adjective',emoji:'🪵'},
          {word:'cake',role:'noun',emoji:'🎂'},{word:'crawl',role:'verb',emoji:'🐛'},{word:'quiet',role:'adjective',emoji:'🤫'}
        ],
        [
          {word:'teacher',role:'noun',emoji:'🧑‍🏫'},{word:'whisper',role:'verb'},{word:'shiny',role:'adjective'},
          {word:'elephant',role:'noun',emoji:'🐘'},{word:'build',role:'verb'},{word:'brave',role:'adjective'},
          {word:'bicycle',role:'noun',emoji:'🚲'},{word:'carry',role:'verb'},{word:'narrow',role:'adjective'},
          {word:'doctor',role:'noun',emoji:'🧑‍⚕️'},{word:'rescue',role:'verb'},{word:'gentle',role:'adjective'},
          {word:'rabbit',role:'noun',emoji:'🐇'},{word:'sprinkle',role:'verb'},{word:'noisy',role:'adjective'},
          {word:'sandwich',role:'noun',emoji:'🥪'},{word:'gather',role:'verb'},{word:'careful',role:'adjective'},
          {word:'mountain',role:'noun',emoji:'⛰️'},{word:'follow',role:'verb'},{word:'enormous',role:'adjective'},
          {word:'blanket',role:'noun',emoji:'🛏️'},{word:'tumble',role:'verb'},{word:'purple',role:'adjective'},
          {word:'helmet',role:'noun',emoji:'⛑️'},{word:'march',role:'verb'},{word:'clever',role:'adjective'},
          {word:'farmer',role:'noun',emoji:'🧑‍🌾'},{word:'giggle',role:'verb'},{word:'speedy',role:'adjective'},
          {word:'kitten',role:'noun',emoji:'🐈'},{word:'measure',role:'verb'},{word:'muddy',role:'adjective'},
          {word:'rainbow',role:'noun',emoji:'🌈'},{word:'paddle',role:'verb'},{word:'cheerful',role:'adjective'}
        ],
        [
          {word:'dance',role:'noun',context:'a <mark>dance</mark> party',tricky:true},{word:'dance',role:'verb',context:'<mark>dance</mark> with me',tricky:true},
          {word:'paint',role:'noun',context:'a jar of <mark>paint</mark>',tricky:true},{word:'paint',role:'verb',context:'<mark>paint</mark> the fence',tricky:true},
          {word:'watch',role:'noun',context:'a silver <mark>watch</mark>',tricky:true},{word:'watch',role:'verb',context:'<mark>watch</mark> the birds',tricky:true},
          {word:'play',role:'noun',context:'the school <mark>play</mark>',tricky:true},{word:'play',role:'verb',context:'<mark>play</mark> the drums',tricky:true},
          {word:'cook',role:'noun',context:'the camp <mark>cook</mark>',tricky:true},{word:'cook',role:'verb',context:'<mark>cook</mark> the soup',tricky:true},
          {word:'ring',role:'noun',context:'a gold <mark>ring</mark>',tricky:true},{word:'ring',role:'verb',context:'<mark>ring</mark> the bell',tricky:true},
          {word:'plant',role:'noun',context:'a green <mark>plant</mark>',tricky:true},{word:'plant',role:'verb',context:'<mark>plant</mark> the seeds',tricky:true},
          {word:'brush',role:'noun',context:'a soft <mark>brush</mark>',tricky:true},{word:'brush',role:'verb',context:'<mark>brush</mark> your hair',tricky:true},
          {word:'fly',role:'noun',context:'a buzzing <mark>fly</mark>',tricky:true},{word:'fly',role:'verb',context:'<mark>fly</mark> the kite',tricky:true},
          {word:'drink',role:'noun',context:'a cold <mark>drink</mark>',tricky:true},{word:'drink',role:'verb',context:'<mark>drink</mark> some water',tricky:true},
          {word:'smile',role:'noun',context:'a bright <mark>smile</mark>',tricky:true},{word:'smile',role:'verb',context:'<mark>smile</mark> for the picture',tricky:true},
          {word:'sleep',role:'noun',context:'a good night’s <mark>sleep</mark>',tricky:true},{word:'sleep',role:'verb',context:'<mark>sleep</mark> in the tent',tricky:true},
          {word:'museum',role:'noun',context:'the history <mark>museum</mark>'},{word:'discover',role:'verb',context:'<mark>discover</mark> a hidden trail'},{word:'ancient',role:'adjective',context:'an <mark>ancient</mark> tree'},
          {word:'compass',role:'noun',context:'a pocket <mark>compass</mark>'},{word:'assemble',role:'verb',context:'<mark>assemble</mark> the model'},{word:'fragile',role:'adjective',context:'a <mark>fragile</mark> shell'},
          {word:'lantern',role:'noun',context:'a camping <mark>lantern</mark>'},{word:'observe',role:'verb',context:'<mark>observe</mark> the clouds'},{word:'patient',role:'adjective',context:'a <mark>patient</mark> helper'},
          {word:'canyon',role:'noun',context:'a rocky <mark>canyon</mark>'},{word:'vanish',role:'verb',context:'<mark>vanish</mark> behind the curtain'},{word:'slippery',role:'adjective',context:'a <mark>slippery</mark> path'}
        ],
        [
          {word:'explorer',role:'noun',sentence:'The <mark>explorer</mark> unfolded a map.'},{word:'investigate',role:'verb',sentence:'We <mark>investigate</mark> the mysterious tracks.'},{word:'curious',role:'adjective',sentence:'The <mark>curious</mark> child asked another question.'},
          {word:'orchestra',role:'noun',sentence:'The <mark>orchestra</mark> tuned before the concert.'},{word:'glimmer',role:'verb',sentence:'Stars <mark>glimmer</mark> above the dark field.'},{word:'delicate',role:'adjective',sentence:'A <mark>delicate</mark> web stretched between two branches.'},
          {word:'invention',role:'noun',sentence:'Her <mark>invention</mark> sorted the recycling.'},{word:'announce',role:'verb',sentence:'They <mark>announce</mark> the winner after lunch.'},{word:'fearless',role:'adjective',sentence:'The <mark>fearless</mark> climber reached the ledge.'},
          {word:'thunder',role:'noun',sentence:'The <mark>thunder</mark> shook the windows.'},{word:'compare',role:'verb',sentence:'Scientists <mark>compare</mark> both sets of results.'},{word:'rapid',role:'adjective',sentence:'The <mark>rapid</mark> current carried leaves downstream.'},
          {word:'courage',role:'noun',sentence:'It took <mark>courage</mark> to speak to the crowd.'},{word:'drift',role:'verb',sentence:'White clouds <mark>drift</mark> across the sky.'},{word:'distant',role:'adjective',sentence:'A <mark>distant</mark> lighthouse flashed at sea.'},
          {word:'library',role:'noun',sentence:'Our <mark>library</mark> has a new science shelf.'},{word:'construct',role:'verb',sentence:'The engineers <mark>construct</mark> a sturdy bridge.'},{word:'brilliant',role:'adjective',sentence:'Mia shared a <mark>brilliant</mark> game idea.'},
          {word:'planet',role:'noun',sentence:'The <mark>planet</mark> travels around its star.'},{word:'persuade',role:'verb',sentence:'Good reasons can <mark>persuade</mark> an audience.'},{word:'silent',role:'adjective',sentence:'The <mark>silent</mark> owl glided overhead.'},
          {word:'engine',role:'noun',sentence:'The <mark>engine</mark> powered the small boat.'},{word:'wobble',role:'verb',sentence:'The stacked blocks <mark>wobble</mark> on the table.'},{word:'sturdy',role:'adjective',sentence:'A <mark>sturdy</mark> rope held the swing.'},
          {word:'meadow',role:'noun',sentence:'Wildflowers covered the <mark>meadow</mark>.'},{word:'protect',role:'verb',sentence:'Helmets <mark>protect</mark> riders from injury.'},{word:'mysterious',role:'adjective',sentence:'A <mark>mysterious</mark> note appeared by the door.'},
          {word:'puzzle',role:'noun',sentence:'This <mark>puzzle</mark> has one missing piece.'},{word:'calculate',role:'verb',sentence:'We <mark>calculate</mark> the total before paying.'},{word:'generous',role:'adjective',sentence:'The <mark>generous</mark> neighbor shared her harvest.'},
          {word:'audience',role:'noun',sentence:'The <mark>audience</mark> applauded the performers.'},{word:'sprint',role:'verb',sentence:'The runners <mark>sprint</mark> toward the finish line.'},{word:'crooked',role:'adjective',sentence:'A <mark>crooked</mark> path wound up the hill.'},
          {word:'shadow',role:'noun',sentence:'The tree cast a long <mark>shadow</mark>.'},{word:'collect',role:'verb',sentence:'We <mark>collect</mark> rainwater in a clean jar.'},{word:'vibrant',role:'adjective',sentence:'The mural used <mark>vibrant</mark> colors.'}
        ]
      ];
      const miasTwinWords=new Set(['brush','cook','dance','drink','fly','paint','plant','play','ring','sleep','smile','watch']);
      (function checkMiasWordSort(){
        const all=miasWordSortBands.flat(),byHeadword=new Map();
        if(miasWordSortBands.some(b=>b.length!==36)||all.length!==144)throw new Error("Mia's Word Sort curriculum integrity failed: expected four bands of 36 problems.");
        all.forEach(problem=>{
          const word=String(problem.word).toLowerCase();
          if(!byHeadword.has(word))byHeadword.set(word,[]);
          byHeadword.get(word).push(problem);
        });
        for(const [word,problems] of byHeadword){
          const expectedCount=miasTwinWords.has(word)?2:1;
          if(problems.length!==expectedCount)throw new Error(`Mia's Word Sort headword integrity failed for "${word}": expected exactly ${expectedCount} occurrence${expectedCount===1?'':'s'}, found ${problems.length}.`);
          if(miasTwinWords.has(word)){
            const roles=new Set(problems.map(problem=>problem.role));
            const contexts=problems.map(problem=>String(problem.context||problem.sentence||'').replace(/<[^>]+>/g,'').trim().toLowerCase());
            if(roles.size!==2)throw new Error(`Mia's Word Sort headword integrity failed for "${word}": its two occurrences must use different roles.`);
            if(contexts.some(context=>!context)||new Set(contexts).size!==2)throw new Error(`Mia's Word Sort headword integrity failed for "${word}": its two roles must use different context phrases.`);
          }
        }
        for(const word of miasTwinWords)if(!byHeadword.has(word))throw new Error(`Mia's Word Sort headword integrity failed for "${word}": expected exactly 2 occurrences, found 0.`);
      })();
      const miasRoleInfo={
        noun:{label:'Naming Words',icon:'📦',detail:'a person, place, or thing',hint:'That’s a naming word — it names a person, place, or thing!'},
        adjective:{label:'Describing Words',icon:'🎨',detail:'words that describe',hint:'That’s a describing word — it tells what something is like!'},
        verb:{label:'Action Words',icon:'🏃',detail:'words for actions',hint:'That’s an action word — it tells what someone does!'}
      };
      let miasPraiseSpoken=false;

      function renderMiasWordSortIntro(){
        panel.innerHTML=`<div class="mia-intro">${gradeChipMarkup()}<img src="${questyArt.celebrating}" alt="Questy the fox celebrating Mia's game idea"><span class="mia-credit">💡 Mia’s idea!</span><h2>This game was invented by Mia!</h2><p>Pick up each word card and sort it by its job. Drag it into a bin, or tap the card and then tap a bin.</p><div class="word-sort-bins" style="width:100%"><div class="word-bin noun-bin"><span class="bin-icon">📦</span><strong>Naming Words</strong><small>a person, place, or thing</small></div><div class="word-bin adjective-bin"><span class="bin-icon">🎨</span><strong>Describing Words</strong><small>words that describe</small></div><div class="word-bin verb-bin"><span class="bin-icon">🏃</span><strong>Action Words</strong><small>words for actions</small></div></div><button class="primary-btn" id="startMiasGame" type="button">Start Mia’s game</button></div>`;
        $('#startMiasGame').onclick=startCurrentGame;
        const line=miasPraiseSpoken?"Let's play Mia's brilliant idea!":"Mia's brilliant idea is ready! Mia, you invented a great game!";
        setTimeout(()=>{speak(line);if(state.sound)miasPraiseSpoken=true;},120);
      }
      function wordSortWrong(bin,problem){
        if(state.locked)return;state.streak=0;state.wrongTaps++;const adapted=kqRecord(false),hint=miasRoleInfo[problem.role].hint;
        bin.classList.add('wrong');$('#feedback img').src=questyArt.thinking;
        if(adapted==='down'){showAdaptive('down');setTimeout(()=>toast(hint,false,1750),900);}else toast(hint,false,1750);
        setTimeout(()=>bin.classList.remove('wrong'),520);
      }
      function renderMiasWordSort(){
        const problem=miasWordSortBands[state.grade][lessonIndex()],info=miasRoleInfo[problem.role],plainContext=(problem.context||problem.sentence||problem.word).replace(/<[^>]+>/g,''),spoken=`${plainContext}. Sort ${problem.word} by the job it does.`;
        const display=problem.sentence?`<span class="sentence-card">${problem.sentence}</span>`:problem.context?`<span class="sentence-card">${problem.context}</span>`:`${problem.emoji?`<span class="word-emoji" aria-hidden="true">${problem.emoji}</span>`:''}<span>${problem.word}</span>`;
        panel.innerHTML=progressMarkup()+`<div class="word-sort-stage"><h2 class="prompt" data-speak="Listen to the word, then choose its word job.">Where does this word belong?</h2>${problem.tricky?'<div style="text-align:center"><span class="tricky-flag">★ tricky word!</span></div>':''}<div class="word-card-shell"><button class="word-sort-card" type="button" draggable="true" data-speak="${kqEsc(spoken)}" aria-pressed="false">${display}<span class="word-hear" aria-hidden="true">🔊</span></button></div><p class="word-sort-help">Drag the card, or tap it and then tap a bin.</p><div class="word-sort-bins">${['noun','adjective','verb'].map(role=>{const x=miasRoleInfo[role];return `<button class="word-bin ${role==='noun'?'noun-bin':role==='adjective'?'adjective-bin':'verb-bin'}" type="button" data-role="${role}" data-speak="${x.label}. ${x.detail}"><span class="bin-icon" aria-hidden="true">${x.icon}</span><strong>${x.label}</strong><small>${x.detail}</small></button>`;}).join('')}</div></div>`;
        setProgress();state.usedProblems.add(`miaswordsort:${state.grade}:${lessonIndex()}:${problem.word}:${problem.role}`);
        const card=$('.word-sort-card',panel),bins=$$('.word-bin',panel);let selected=false,suppressClick=false,touchDrag=null;
        const setSelected=value=>{selected=value;card.classList.toggle('selected',value);card.setAttribute('aria-pressed',String(value));};
        const choose=bin=>{if(!selected&&!card.classList.contains('dragging')){toast('Tap the word card first, then choose a bin.',false);return;}setSelected(false);bins.forEach(x=>x.classList.remove('ready'));card.style.transform='';if(bin.dataset.role===problem.role){card.classList.add('word-sort-celebrate');bin.classList.add('correct');toast(miasRoleInfo[problem.role].hint,false,1600);setTimeout(()=>correctThen(renderMiasWordSort,bin),180);}else wordSortWrong(bin,problem);};
        card.onclick=()=>{if(suppressClick)return;setSelected(!selected);if(selected)toast('Now choose a bin!');};
        card.ondragstart=e=>{setSelected(true);card.classList.add('dragging');e.dataTransfer.setData('text/plain','mias-word-card');e.dataTransfer.effectAllowed='move';};
        card.ondragend=()=>{card.classList.remove('dragging');card.style.transform='';bins.forEach(x=>x.classList.remove('ready'));};
        bins.forEach(bin=>{bin.onclick=()=>choose(bin);bin.ondragover=e=>{e.preventDefault();bin.classList.add('ready');e.dataTransfer.dropEffect='move';};bin.ondragleave=()=>bin.classList.remove('ready');bin.ondrop=e=>{e.preventDefault();card.classList.remove('dragging');choose(bin);};});
        card.onpointerdown=e=>{if(e.pointerType==='mouse')return;touchDrag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};card.setPointerCapture(e.pointerId);};
        card.onpointermove=e=>{if(!touchDrag||touchDrag.id!==e.pointerId)return;const dx=e.clientX-touchDrag.x,dy=e.clientY-touchDrag.y;if(Math.hypot(dx,dy)>9){touchDrag.moved=true;setSelected(true);card.classList.add('dragging');card.style.transform=`translate(${dx}px,${dy}px) rotate(${Math.max(-4,Math.min(4,dx/28))}deg)`;bins.forEach(bin=>{const r=bin.getBoundingClientRect();bin.classList.toggle('ready',e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom);});}};
        card.onpointerup=e=>{if(!touchDrag||touchDrag.id!==e.pointerId)return;const moved=touchDrag.moved;touchDrag=null;if(!moved)return;suppressClick=true;setTimeout(()=>suppressClick=false,80);card.classList.remove('dragging');card.style.visibility='hidden';const bin=document.elementFromPoint(e.clientX,e.clientY)?.closest('.word-bin');card.style.visibility='';card.style.transform='';if(bin)choose(bin);else{setSelected(false);bins.forEach(x=>x.classList.remove('ready'));toast('Try dropping the card inside a bin.',false);}};
      }



      /* === Isaiah's Reading Carpet (K-1 early reader: Words, Sentences, Stories) === */
      const carpetWords=[
        'pad lad mad bad sad had bag tag rag lag wag zap gap sap rap cab dab gab jab lab sack pack tack rack bib fib rib sib kid lid rid bid mid hid jig rig gig nip kip rip sip fix mix nix gin din jib lib rod cod nod pod cop lop bop sop dot cot lot rot tot jot sob rob lob mob gob fog cog hog mom tom leg peg beg gem hem men let set yell bell sell fell well bend send mend lend rest test nest vest pest less mess cub rub hub sub hut nut rut gut jut mum yum sum pun tug cud cuff huff puff bus luck duck tuck buck puck bank rank tank fill mill pill dill toss boss moss loss miss kiss hiss jazz lass glad clad slap flap vat rat tan ban'.split(' '),
        'smog smell smack snug sniff spot spun spunk swam swift swat slush slug slump sling stun stint stomp stack scuff scab scoff skiff split blush blimp blot clam club flop fling glum glint plus plot plank press print cross cramp drift drank frisk front grand gruff trust tromp shelf shut shell shrug shack shunt check chunk chug chump chum thick thump throb theft than which whisk whiff whack bang fang lick stick hang sang king wing ring gong back lack quack deck flick shock stuck shin smash crash gush mesh dish wish moth stitch catch latch bake fade date take pace dice hide rise note vote mute dune grape plate spine drive bone stone flute shade robe shine glaze swipe struck twist twang thrift chrome shrift chomp broth squash clink glob frock snatch splash posh prance drill frill thrash strut sprig squint when then'.split(' ')
      ];
      const carpetSentences=[
        [
          'Tim has a red bag.','A cat sat in a hat.','I can see a bus.','My mom has the mug.',
          'I see a pig in the mud.','Sam sat in my lap.','The bug is in the cup.','Dan can run to the hut.',
          'A pup sat in the sun.','It is a big box.','The fat rat sat.','I see a hot pot.',
          'A kid can yell.','Sam has my map.','The red pen is in my bag.','A big pig can dig.',
          'I see the sun up.','Bob has a hot dog.','It is in my den.','A hen can hop.',
          'I can tap the mat.','My cat is in a box.','Sam can mix the mud.','I see a yak.',
          'The pig hid in the mud.','A man ran to my hut.','The pup is up.','Can I see the bus?',
          'I sat in the van.','My dad can fix it.','The cob is in my bin.','A rat can get wet.',
          'I see a cod.','A bat can sit.','Sam has the best hut.','Dan has a big red van.'
        ],
        [
          'The ship has a big box.','I can see the black cat.','Sam shops at the shop.','The frog hops in the grass.',
          'I like the green dress.','He can swim in the pond.','She has my blue cup.','It is time to go.',
          'Can I bake it?','The drum is in the shed.','I stop at the dock.','He spun the top.',
          'Can she run with me?','She has the cash.','The fish is in the pond.','She likes my smile.',
          'The clock can ring.','He got the stamp.','I have a big wish.','The frog will not jump.',
          'Can I smell the snack?','She shops at the store.','It is time for bed.','He swam in the pond.',
          'I can grab the crab.','She helps the frog.','The plan is to fly.','He fixed the car.',
          'I see smoke in the sky.','Can she crack it?','The blimp can land.','I help at the farm.',
          'She swims with me.','The spring has bugs.','Can I use the drum?','He has my lunch.'
        ]
      ];
      const carpetStories=[
        [
          {t:'The Red Bag', s:['Sam has a red bag.','A cat is in the bag.','Sam can see the cat.']},
          {t:'My Big Bus', s:['I see a big bus.','The bus is up the hill.','Sam is in the bus.']},
          {t:'A Pig in Mud', s:['A pig is in the mud.','Dan can see the pig.','The pig is big and fat.']},
          {t:'The Hot Sun', s:['It is hot.','The sun is up.','I can see the sun.']},
          {t:'Dan and the Pan', s:['Dan has a pan.','A bun is in the pan.','Dan can get the bun.']},
          {t:'A Nap in the Van', s:['Sam is in the van.','I see Sam.','Sam has a nap.']}
        ],
        [
          {t:'The Fish Trip', s:['I like to fish.','I see a fish in the pond.','The fish can swim fast.','I can catch the fish.']},
          {t:'The Big Crash', s:['The sled can go fast.','It hits the big tree.','Crash! The sled stops.','I am fine.']},
          {t:'A Picnic', s:['She has a big lunch.','She has chips and milk.','I have the map.','Can I help?']},
          {t:'The Frog', s:['The frog hops.','It hops to the pond.','The frog swims in the pond.','I see the frog!']},
          {t:'A Trip to the Shop', s:['I go to the shop.','I see bread.','I get the milk.','I am back!']},
          {t:'The Big Storm', s:['The sky is black.','I hear the crash.','The wind can blow.','The storm is bad.']}
        ]
      ];
      (function checkReadingCarpet(){
        const lane=new Set();
        [0,1].forEach(b=>{
          phonicsBanks[b].forEach(w=>lane.add(w));
          dolchSight[b].forEach(w=>lane.add(String(w).toLowerCase()));
          rhymeFamilyLines[b].split('|').forEach(g=>g.split(' ').forEach(w=>lane.add(w)));
          familySets[b].forEach(row=>row.forEach(f=>f[1].forEach(w=>lane.add(w))));
          miasWordSortBands[b].forEach(p=>lane.add(p.word));
        });
        const allWords=[];
        carpetWords.forEach((bank,b)=>{
          if(bank.length!==144)throw new Error('Reading Carpet integrity failed: band '+b+' has '+bank.length+' words, expected 144.');
          bank.forEach(w=>{
            if(w!==w.toLowerCase())throw new Error('Reading Carpet integrity failed: word card "'+w+'" is not lowercase.');
            if(lane.has(w))throw new Error('Reading Carpet integrity failed: word "'+w+'" is already used by another K-1 reading game.');
            allWords.push(w);
          });
        });
        if(new Set(allWords).size!==288)throw new Error('Reading Carpet integrity failed: word cards must be 288 unique words.');
        carpetSentences.forEach((arr,b)=>{
          if(arr.length!==36)throw new Error('Reading Carpet integrity failed: band '+b+' has '+arr.length+' sentences, expected 36.');
          if(new Set(arr).size!==36)throw new Error('Reading Carpet integrity failed: duplicate sentence in band '+b+'.');
        });
        const storyTexts=[];
        carpetStories.forEach((arr,b)=>{
          if(arr.length!==6)throw new Error('Reading Carpet integrity failed: band '+b+' has '+arr.length+' stories, expected 6.');
          const titles=new Set();
          arr.forEach(st=>{
            if(titles.has(st.t))throw new Error('Reading Carpet integrity failed: duplicate story title "'+st.t+'".');
            titles.add(st.t);storyTexts.push(st.s.join(' '));
          });
        });
        if(new Set(storyTexts).size!==12)throw new Error('Reading Carpet integrity failed: stories must be 12 unique texts.');
        carpetStories.forEach((arr,b)=>arr.forEach(st=>st.s.forEach(line=>{
          if(carpetSentences[b].includes(line))throw new Error('Reading Carpet integrity failed: a story line duplicates a sentence: "'+line+'".');
        })));
      })();
      let carpetMode='words',carpetDone=false,carpetReadAlongOn=false,carpetSayToken=0,carpetKeyHandlerRef=null,carpetPraiseSpoken=false,carpetDecPhase=2;
      const carpetBand=()=>Math.min(1,Math.max(0,state.grade));
