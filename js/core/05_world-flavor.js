      const themeBanks = {
        planets: { pairs:[['🌍','Earth'],['🪐','Saturn'],['🚀','rocket'],['⭐','star'],['🌙','moon'],['☄️','comet'],['🔭','telescope'],['🛰️','satellite']], words:['sun','moon','star','space','rocket','planet','orbit','comet'] },
        animals: { pairs:[['🦁','lion'],['🐘','elephant'],['🦒','giraffe'],['🐒','monkey'],['🐸','frog'],['🦋','butterfly'],['🐯','tiger'],['🦜','parrot']], words:['lion','tiger','frog','bird','monkey','jungle','animal','giraffe'] },
        ocean: { pairs:[['🐳','whale'],['🐬','dolphin'],['🐢','turtle'],['🐠','fish'],['🐙','octopus'],['🪸','coral'],['⭐','starfish'],['🐚','shell']], words:['whale','fish','shell','coral','ocean','turtle','dolphin','octopus'] },
        sports: { pairs:[['⚽','soccer'],['🏀','basketball'],['🎾','tennis'],['🏈','football'],['⚾','baseball'],['🏐','volleyball'],['🥅','goal'],['🏆','trophy']], words:['team','goal','ball','score','coach','race','jump','sport'] },
        dinosaurs: { pairs:[['🦖','T-Rex'],['🦕','Brontosaurus'],['🥚','dinosaur egg'],['🌋','volcano'],['🌿','fern'],['🦴','fossil'],['🐊','reptile'],['🪨','rock']], words:['dinosaur','fossil','roar','scale','tail','claw','egg','fern'] },
        fashion: { pairs:[['👗','dress'],['👒','hat'],['👟','shoe'],['👜','bag'],['🎀','bow'],['🧥','coat'],['👑','crown'],['🪞','mirror']], words:['dress','style','color','fabric','button','pocket','shoe','hat'] }
      };
      /* World flavor packs: Questy dialogue + header garlands + reward toast lines per picked world.
         Applied at the shell level only via kqWorldFlavor(); reads live state.theme, nothing persisted.
         Mia's Maze Escape ('mazeescape') is excluded at each apply-site — it has its own world themes. */
      const kqWorldFlavors={
        planets:{garland:'🪐 ✨ 🚀 ✨ 🌙 ✨ ⭐ ✨',lines:["Blast off into learning, space cadet!","The stars are cheering for you today!","Let's orbit around some fun quests!","Houston, this learner is a star!"],rewards:["Mission accomplished, cadet!","That was out of this world!","You're a shining star! Tickets are yours!"]},
        animals:{garland:'🦁 🌿 🐵 🌿 🐘 🌿 🦒',lines:["Let's go on a wild learning safari!","Rawr! Ready for some fun quests?","Questy is your safari buddy today!","The jungle is calling you to learn!"],rewards:["Wild work, safari star! Tickets are yours!","You roared through that round!","The whole jungle is cheering!"]},
        ocean:{garland:'🐳 💧 🐠 💧 🦀 💧 🐬',lines:["Dive into today's quests, little minnow!","Let's make some waves with learning!","Shell-abrate! Questy is ready to swim with you!","The ocean of learning is all yours today!"],rewards:["You made a splash! Tickets bubble up for you!","Fin-tastic work, little fish!","You swam through that like a dolphin!"]},
        sports:{garland:'⚽ 🏀 🎾 🏅 ⚽ 🏀',lines:["Let's kick off some learning, champ!","Game on! Questy is your number-one fan!","Warm up those thinking muscles!","You're in the learning league now!"],rewards:["Goal! You earned more tickets!","That's a home run, champ!","Slam dunk! Amazing round!"]},
        dinosaurs:{garland:'🦕 🌿 🦖 🌿 🦴 🌿 🌋',lines:["Let's stomp through some learning, explorer!","Rawr! Time for a dino-mite quest!","Questy dug up some fun challenges for you!","Ready to roar through today's quests?"],rewards:["Dino-mite! You earned tickets!","You stomped that round flat!","The dino herd cheers for you!"]},
        fashion:{garland:'👑 👗 🎀 ✨ 👒 ✨',lines:["Strut into some learning, superstar!","You look fabulous — let's sparkle through quests!","Time to dress your brain in something smart!","Runway ready for today's challenges?"],rewards:["Fabulous! You earned stylish tickets!","You rocked that round, superstar!","Five stars on the cuteness runway!"]}
      };

      function kqWorldFlavor(){return kqWorldFlavors[state.theme]||kqWorldFlavors.planets;}
      /* Questy outfit per theme world — face always exposed, always recognizable. */
      function kqQuestyOutfit(){
        const t = state.theme;
        if (t === 'animals' && kqCastArt.safari) return kqCastArt.safari;
        if (t === 'ocean' && kqCastArt.sailor) return kqCastArt.sailor;
        if (t === 'planets' && kqCastArt.astronaut) return kqCastArt.astronaut;
        if (t === 'sports' && kqCastArt.sports) return kqCastArt.sports;
        if (t === 'dinosaurs' && kqCastArt.dino) return kqCastArt.dino;
        if (t === 'fashion' && kqCastArt.fashion) return kqCastArt.fashion;
        return kqCastArt.questy;
      }
      /* Character cameos (shell-level only): Questy explorer beside game intros, Isaiah/Mia in
         round-complete celebrations, and the full cast on the welcome splash. Decorative images are
         aria-hidden; the splash greeting speaks via the existing kq-flavor-speak selector class. */
      let kqSplashShown=false;
      function kqShowCastSplash(){
        if(kqSplashShown||$('#kqSplash'))return;kqSplashShown=true;
        let pName='Mia and Isaiah';try{pName=((typeof kqProfile==='function'?kqProfile():{})||{}).name||pName;}catch(e){}
        const line=`Welcome, ${pName}! Your quest crew is ready. Pick an adventure to begin!`;
        const host=document.createElement('div');
        host.innerHTML=`<div class="kq-splash" id="kqSplash" role="dialog" aria-modal="true" aria-labelledby="kqSplashTitle"><div class="kq-splash-card"><h2 id="kqSplashTitle">Meet your quest crew!</h2><img class="kq-splash-cast-img" src="${kqCastArt.splash}" alt="Questy the fox, Mia, Isaiah, and Char the lizard waving hello" style="width:100%;max-width:420px;border-radius:16px;margin:12px auto;display:block;"><p class="kq-splash-greet kq-flavor-speak choice-hear" id="kqSplashGreet" data-speak="${kqEsc(line)}">${kqEsc(line)}</p><button class="primary-btn" id="kqSplashGo" type="button">Let\u2019s go!</button></div></div>`;
        document.body.appendChild(host.firstElementChild);
        const close=()=>{const el=$('#kqSplash');if(el)el.remove();};
        $('#kqSplashGreet').addEventListener('click',()=>speak(line));
        $('#kqSplashGo').addEventListener('click',close);
        $('#kqSplash').addEventListener('click',e=>{if(e.target.id==='kqSplash')close();});
        const esc=e=>{if(e.key==='Escape'){close();document.removeEventListener('keydown',esc);}};
        document.addEventListener('keydown',esc);
        setTimeout(()=>{const b=$('#kqSplashGo');if(b)b.focus({preventScroll:true});},140);
      }
      const phonicsBanks = [
        'cat dog sun map pig bed fox cup hen jam log van red sit top bug pen rug fin hot mud cap jet six web gum pot lip bat fan win yak cob tub vet ram'.split(' '),
        'ship chin shop thin chat whip frog clap drum stop flag grip step plan twin crab brush clock sled swim snack black dress track chest thing fresh plant green spill crust stamp skunk spring strand shrimp'.split(' '),
        'cake bike home cube rain seed boat night day play team field coat snow star car fork bird turn fern storm chair fair bear deer near cloud sound boil coin book moon light right bright float'.split(' '),
        'curious discover journey ancient clever energy enormous protect replay preview unhappy dislike hopeful kindness teacher quickly slowly fearless careful sunlight rainbow notebook inside outside birthday wintertime wonderful helpful playful movement payment farmer artist inventor musician impossible'.split(' ')
      ];
      const dolchSight = [
        ['a','and','away','big','blue','can','come','down','find','for','funny','go','help','here','I','in','is','it','jump','little','look','make','me','my','not','one','play','red','run','said','see','the','three','to','two','up'],
        ['all','am','are','at','ate','be','black','brown','but','came','did','do','eat','four','get','good','have','he','into','like','must','new','no','now','on','our','out','please','pretty','ran','ride','saw','say','she','so','soon'],
        ['always','around','because','been','before','best','both','buy','call','cold','does',"don't",'fast','first','five','found','gave','goes','green','its','made','many','off','or','pull','read','right','sing','sit','sleep','tell','their','these','those','upon','us'],
        ['about','better','bring','carry','clean','cut','done','draw','drink','eight','fall','far','full','got','grow','hold','hot','hurt','if','keep','kind','laugh','light','long','much','myself','never','only','own','pick','seven','shall','show','six','small','start']
      ];
      const wordBanks = Object.fromEntries(phonicsBanks.map((words,grade)=>[grade,{words,sight:dolchSight[grade]}]));
      const meanings = {
        curious:['wanting to learn more','very sleepy','made of metal','moving slowly'],
        discover:['to find something new','to hide something','to forget a name','to close a door'],
        journey:['a trip from one place to another','a tiny snack','a loud sound','a kind of color'],
        ancient:['very old','brand new','very small','full of water'],
        clever:['quick at learning or solving','always noisy','hard to carry','covered in snow'],
        energy:['power to move or do work','a place to sleep','a type of plant','a quiet song'],
        enormous:['very large','very soft','very early','very round'],
        protect:['to keep safe','to mix together','to count twice','to speak softly']
      };
/* KQ-PHONICS-BLOCK-START
   Phonics spine for the K-3 reading retrofit (2026-10-01).
   Single source of truth: 13 cumulative phases, decodable validator,
   Questy micro-intros, phase-tagged decodable banks, K letter order.
   tools/check-decodable.js extracts this block and node-checks every
   decodable bank line with kqDecodableCheck. Keep this block
   self-contained: no references to state/panel/DOM in here.
   Validator logic: a word passes if it is a taught word (this or any
   earlier phase bank, sneaky-e pair, or phase sight word), else it must
   segment into cumulative graphemes AND contain no untaught vowel team
   (ar/er/ir/or/ur, ai/ay/ee/ea/oa/ow/igh/ie, oi/oy/ou/oo/aw).
   Limitation: split patterns (silent-e, -le) and irregular words that
   happen to segment with single letters (e.g. 'one') are not caught;
   author decodable lines from taught words and the sight lists.
   KQ-PHONICS-BLOCK-END */
const kqLetterOrder=['m','a','t','d','o','c','g','i','n','h','s','f','v','z','p','b','l','r','u','w','j','y','x','k','qu'];
const kqLetterSounds={m:'mmm',a:'ah',t:'t',d:'d',o:'aw',c:'k',g:'g',i:'ih',n:'nnn',h:'h',s:'sss',f:'fff',v:'vvv',z:'zzz',p:'p',b:'b',l:'lll',r:'rrr',u:'uh',w:'w',j:'j',y:'y',x:'ks',k:'k',qu:'kw'};
const kqLetterWords={m:'moon',a:'apple',t:'tiger',d:'dog',o:'ox',c:'cat',g:'goat',i:'igloo',n:'nest',h:'hat',s:'sun',f:'fish',v:'violin',z:'zebra',p:'pig',b:'ball',l:'lion',r:'rainbow',u:'umbrella',w:'whale',j:'jelly',y:'yoyo',x:'box',k:'kite',qu:'queen'};
const kqMicroMoments={0:['tat','dada','ad','ma','adam','dam','tam'],1:['toga','cicada','amigo','mica','mama','dodo','tic','doc','cad','coma','taco','atom','magic'],2:['sin','nan','him','nits','tins','fins','mints','hints','sift','shift','shaft','chant','nacho','nachos','mochas','fist','this','fiction','mantis','mint'],3:['pat','viz','zit','zits','ziti','pizza','pizzas','pizzazz','bozo','zips','pips','vips','tips','dips','sips','nips','hips','bap'],4:['lug','lull','lulls','rung','rungs','brunt','strung','sprung','wurst','wahoo','wows','wow','pow','law','laws','flaw','flaws','claw','claws','drawn','draws','drawl','crawl','brawl','trawl','scrawl','shawl','awl','bawl','paw','paws'],5:['kin','junky','juts','junk','junks','jumbo','jumpy','jinx','jinks','yuck','yucks','yucca','kicky','kook','kooky','kyak','kyaks','kayak','kayaks','yaks','flix','flux','flax','klutz','klutzy','waltz','malts','balks','talks','walks','chalks','hawks'],6:['quaff','quark','quart','quash','quasi','quill','quilt','quint','quip','quips']};
const kqPhonicsPhases={
 2:{n:2,name:'CVC Words',grade:0,intro:'Tap each sound, then smash them together: c-a-t... cat!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z'],words:['tad','zag','zig','yap','yip','wok','wax','sax','tax','tux','lax','lox','lux','vim','vex','fob','nub','nab','nib','dub','dud','quid','quiz','quit','keg','jag','rex','pug','rim','rum','lam','nom','pom','tum','bum','dim']},
 3:{n:3,name:'Blends',grade:1,intro:'Two letters, two sounds, best friends: b-l... blend!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','bl','br','cl','cr','dr','fl','fr','gl','gr','pl','pr','sl','sm','sn','sp','st','sw','tr','tw','sc','sk','str','spr','scr','shr','thr','spl','nd','nt','mp','nk','ft','lt','lp','lk','lf','pt','ct','xt'],words:['blab','blob','clod','flit','glib','glop','plod','plop','slot','slit','slum','slid','brad','bran','crib','crux','drab','dreg','grub','grit','grim','pram','prim','prod','trod','trot','smock','smug','snip','staff','stag','spat','spud','swab','swig','swum']},
 4:{n:4,name:'Digraphs',grade:1,intro:'Two letters, ONE new sound: sh says shhh!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','sh','ch','th','wh','ng','ck'],words:['shod','shuck','shim','shill','chick','chock','thrum','thwack','whup','song','tong','ding','zing','pang','rang','sung','hung','wrung','slung','flung','stung','clung','swung','trick','stock','mock','hock','tock','sick','kick','shush','chimp','shtick','thrush','shrub','champ']},
 5:{n:5,name:'Sneaky E',grade:1,intro:'When e is sneaky and silent, the vowel says its name: cake!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z'],words:['bade','wade','glade','spade','blade','trade','grade','crepe','gripe','wipe','snipe','dive','hive','strive','drove','grove','stove','prose','chose','nose','rose','hose','doze','blaze','pipe','whine','bite','pale','whale','brave','glide','pride','joke','spoke','prune','tune']},
 6:{n:6,name:'Glued Sounds',grade:2,intro:'Some letters love to stick together: -tch, -dge, -le!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','tch','dge','le'],words:['fetch','blotch','botch','notch','hutch','clutch','edge','hedge','dodge','lodge','budge','fudge','nudge','apple','giggle','wiggle','bubble','rumble','crumble','kettle','fry','cry','dry','shy','sly','spy','bunny','puppy','kitty','city','middle','rattle','battle','needle','sunny','trifle']},
 7:{n:7,name:'Chunks',grade:2,intro:'Big words are small words stuck together. Tap each chunk!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z'],words:['sun·set','rab·bit','nap·kin','mag·net','trum·pet','bas·ket','cac·tus','pub·lish','pump·kin','muf·fin','mit·ten','kit·ten','but·ton','pol·len','sud·den','hap·pen','pup·pet','poc·ket','roc·ket','jac·ket','pac·ket','rac·ket','tic·ket','sun·fish','pan·cake','cup·cake','pop·corn','sand·box','ban·dit','ti·mid','ab·sent','soc·ket','cat·fish','can·did','co·met','gob·lin']},
 8:{n:8,name:'R-Controlled',grade:2,intro:'When r bosses the vowel around, it makes a brand-new sound: ar!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','ar','er','ir','or','ur'],words:['shark','charm','harp','yarn','barn','march','starch','scarf','target','garden','marble','parcel','harbor','herb','perch','merge','ferret','merit','birth','stir','chirp','smirk','thirst','skirt','shirt','quirk','twirl','girl','squirt','born','darn','arch','porch','torch','north','murmur']},
 9:{n:9,name:'Vowel Teams',grade:2,intro:'Two vowels walk together - the first one does the talking: ai says ay!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','ai','ay','ee','ea','oa','ow','igh','ie'],words:['snail','frail','bait','wait','braid','sprain','drain','spray','stray','clay','belay','peach','cheat','wheat','treat','squeak','freak','sneak','beak','weak','seam','beam','steam','bead','feast','leaf','beep','steep','jeep','sigh','quail','slay','creak','heal','tight','flow']},
 10:{n:10,name:'Diphthongs',grade:2,intro:'Two vowels make a brand-new glide: oi! ou!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','oi','oy','ou','ow','oo','aw'],words:['coil','soil','join','point','hoist','moist','choice','voice','boy','toy','joy','pouch','couch','scout','shout','clout','mound','pound','bounce','mouth','south','cow','how','howl','plow','scowl','growl','foot','wood','shook','toil','ploy','drought','brook','spoon','smooth']},
 11:{n:11,name:'Endings',grade:3,intro:'Endings change words: hop becomes hopped. Watch the double letter!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','ed','ing','es'],words:['buzzed','fizzed','jabbed','grabbed','robbed','clubbed','flopped','dropped','hopped','mopped','popped','napped','rapped','trapped','zapped','tapped','grinned','bragged','buzzing','grabbing','hugging','hopping','popping','trapping','grinning','bragging','buzzes','fizzes','clashes','flashes','slapped','flapped','skinned','pinned','watches','patches']},
 12:{n:12,name:'Affixes',grade:3,intro:'Prefixes and suffixes are word parts with jobs: un- means not!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','un','re','dis','pre','ful','less','ness','ly','ment'],words:['rethink','reheat','repay','retell','remix','rewind','refund','remake','rename','revisit','unzip','unplug','unfold','unwind','unhook','unseen','unfair','disarm','disband','disown','disprove','distrust','prepay','pretest','thankful','bashful','restful','doubtful','harmless','endless','restless','spotless','darkness','boldness','weakness','gladness']},
 13:{n:13,name:'Multisyllable',grade:3,intro:'Long words are just chunks in a line. Read them left to right!',graphemes:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','u','v','w','x','y','z','mis','for','be','con','com','over','under'],words:['dis·a·gree','mis·place','mis·spell','for·give','for·get','be·come','be·tween','a·fraid','a·wake','bal·loon','car·toon','co·coon','rac·coon','com·plain','com·plete','con·ceal','con·firm','con·tain','con·test','mis·take','mis·step','dis·miss','dis·rupt','un·help·ful','re·paint·ed','un·plugged','o·ver·flow','o·ver·look','un·der·dog','sun·beam','mis·trust','be·side','a·bove','a·cross','al·most','a·side']},
};
const kqSneakyEPairs=[['pip','pipe'],['whin','whine'],['wad','wade'],['bit','bite']];
const kqPhaseSight={2:['the','a','is','it','in','on','and','can','see','big','red','of'],3:['the','a','is','it','in','on','and','can','see','big','red','of'],4:['the','a','is','it','in','on','and','can','see','big','red','of'],5:['the','a','is','it','in','on','and','can','see','big','red','of'],6:['the','a','is','it','in','on','and','can','see','big','red','of'],7:['the','a','is','it','in','on','and','can','see','big','red','of'],8:['the','a','is','it','in','on','and','can','see','big','red','of','her'],9:['the','a','is','it','in','on','and','can','see','big','red','of','for','we'],10:['the','a','is','it','in','on','and','can','see','big','red','of','with'],11:['the','a','is','it','in','on','and','can','see','big','red','of','she','they','are'],12:['the','a','is','it','in','on','and','can','see','big','red','of','to','for'],13:['the','a','is','it','in','on','and','can','see','big','red','of','to','do','not','I','will']};
const kqVowelTeams={8:['ar','er','ir','or','ur'],9:['ai','ay','ee','ea','oa','ow','igh','ie'],10:['oi','oy','ou','oo','aw']};
function kqHasFutureTeam(w,phase){for(const p of[8,9,10]){if(p>phase){for(const t of kqVowelTeams[p]){if(w.includes(t))return t;}}}return null;}
function kqSegmentWord(w,phase){
  const gs=[];for(let n=2;n<=phase;n++){const P=kqPhonicsPhases[n];if(P&&P.graphemes)gs.push(...P.graphemes);}
  gs.sort((a,b)=>b.length-a.length);let i=0;
  while(i<w.length){let hit=null;for(const g of gs){if(w.startsWith(g,i)){hit=g;break;}}if(!hit)return false;i+=hit.length;}
  return true;}
function kqDecodableCheck(text,phase){
  const P=kqPhonicsPhases[phase];if(!P)return{ok:false,bad:['unknown phase']};
  const allowed=new Set((kqPhaseSight[phase]||[]).map(w=>w.toLowerCase()));
  for(let n=2;n<=phase;n++){const Q=kqPhonicsPhases[n];if(Q)Q.words.forEach(w=>allowed.add(w.toLowerCase().replace(/·/g,'')));}
  kqSneakyEPairs.forEach(pr=>pr.forEach(w=>allowed.add(w)));
  const words=String(text).toLowerCase().replace(/[^a-z' ]/g,' ').split(/\s+/).filter(Boolean);
  const bad=[];
  for(const w of words){const clean=w.replace(/'/g,'');if(!clean)continue;if(allowed.has(clean))continue;const ft=kqHasFutureTeam(clean,phase);if(ft){bad.push(w+'('+ft+')');continue;}if(kqSegmentWord(clean,phase))continue;bad.push(w);}
  return{ok:bad.length===0,bad};}
const kqDecodableBanks={2:['The pug sat.','The big pig naps.','Sam has a red hat.','A cat naps in the sun.'],3:['Brad can grin and skip.','The crab grabs a clam.','The frog swims fast.','Snip it and clap.'],4:['The chick pecks.','Fish swim with a splash.','The ship sank in the fog.','I hung my hat on the rack.'],5:['Mike likes to hike and bike.','The rose is red.','I chose the blue stone.','Pete can dive in the lake.'],6:['The puppy wiggles.','A bunny hops in the sun.','I dodge the branch.','The apple crumbles.'],7:['The rabbit hops.','A magnet sticks.','Pop the popcorn.','The kitten naps in the sun.'],8:['The shark swims far.','A bird perched on the barn.','The girl twirls in her skirt.','March winds bring spring storms.'],9:['The snail leaves a trail.','We wait for the train.','The peach tree sways.','A weak beak can still eat seeds.'],10:['The cow moos.','The boy shouts with joy.','A mouse found cheese.','The woodchuck howls.'],11:['The bee buzzed and the kids grinned.','She hopped and skipped.','They are clapping and tapping.','The dishes clashed.'],12:['Please rethink the plan.','It is unfair to unplug the game.','The restless puppy is thankful for dinner.','Darkness falls and the stars shine.'],13:['Do not forget to forgive.','The balloon floats between the clouds.','I can become brave.','The underdog will win.']};
const kqPhonicsIntros={};Object.values(kqPhonicsPhases).forEach(P=>{kqPhonicsIntros[P.name]=P.intro;});

/* KQ-PHONICS-BLOCK-END */
