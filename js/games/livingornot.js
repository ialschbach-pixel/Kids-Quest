
      const livingBanks=[
        'puppy,oak sapling,butterfly,goldfish,mushroom,ant,robin,grass blade,snail,flower,kitten,frog,bean sprout,worm,duckling,bee,turtle,cactus,rock,toy car,spoon,cloud,pencil,chair,ball,water bottle,book,brick,kite,sock,crayon,bicycle,cup,button,clock,blanket',
        'seedling,coral polyp,yeast,earthworm,maple tree,minnow,beetle,moss patch,sunflower,gecko,sparrow,algae,rabbit,fern,cricket,clam,shrimp,bacteria,sand grain,plastic block,rain puddle,metal nail,glass jar,paper clip,rubber band,wooden desk,computer,backpack,coin,magnet,flashlight,rope,plate,window,drum,marble',
        'amoeba,lichen,kelp frond,oak seedling,salamander,plankton,mold colony,sea sponge,cicada,mangrove,orchid,hawk,cattail,starfish,millipede,trout,lichen fungus,pine tree,mineral crystal,river water,oxygen molecule,soil particle,fossil shell,feather,fallen twig,empty nest,volcanic rock,plastic bottle,steel beam,ceramic tile,paper sheet,glass lens,cotton cloth,ice cube,air bubble,copper wire',
        'archaea,mycelium,diatom,cyanobacteria,protozoan,germinating embryo,lichen symbiosis,coral colony,redwood,desert shrub,marine worm,krill,dragonfly nymph,tardigrade,moss gametophyte,fern sporophyte,bee larva,oak gall,virus particle,water vapor,oxygen gas,carbon dioxide,granite,clay,humus sample,fossil imprint,shed antler,empty shell,wooden plank,wool sweater,paper carton,aluminum can,silicon chip,glass bead,rubber tire,salt crystal'
      ].map(x=>x.split(','));

      function renderLivingOrNot(){const i=lessonIndex(),item=livingBanks[state.grade][i],answer=i<18?'Living':'Not living',vocab=['grows and needs resources','carries out life processes','uses energy and responds to its environment','is made of cells and performs life functions'][state.grade];renderChoiceLesson(`Is ${item} living or not living?`,state.grade?`Use this clue: a living thing ${vocab}.`:'Living things grow and need water or food.',answer,['Living','Not living'],renderLivingOrNot);}

      /* Reward, family, and accessibility systems. The host may persist this one JSON-safe object. */
      const KQ=window.KQState;
      let kqLastActionAt=Date.now();
      const kqDefaults={
        version:2,tickets:20,owned:{'outfit-sun':true},avatar:{character:'isaiah',isaiah:{top:'outfit-sun',bottom:'outfit-sun',shoes:'outfit-sun',head:'none',glasses:'none',extra:'none'},mia:{top:'outfit-sun',bottom:'outfit-sun',shoes:'outfit-sun',head:'none',glasses:'none',extra:'none'}},
        pet:{hunger:82,happiness:86,lastAt:Date.now(),accessory:'none',met:false},trophies:{},profiles:{kid1:{name:'Mia and Isaiah',stats:{},history:[]}},activeProfile:'kid1',
        review:[],gift:{week:'',item:''},treats:{},critters:{},narration:'self',settings:{dailyMinutes:0},session:{day:'',dailySeconds:0,continuousStartedAt:Date.now(),lastBreakAt:Date.now(),lastActive:Date.now()},
        gameProgress:{},journey:{pos:null,world:null},journeyFeet:{}
      };
      Object.keys(kqDefaults).forEach(k=>{if(KQ[k]===undefined)KQ[k]=kqDefaults[k];});
      if(KQ.streak!==undefined)delete KQ.streak; /* day streak retired 2026-10-01: drop stored counts */
      if(KQ.settings&&KQ.settings.parentPin!==undefined)delete KQ.settings.parentPin; /* parent PIN retired 2026-10-01 */
      if(!KQ.owned||typeof KQ.owned!=='object')KQ.owned={'outfit-sun':true};
      if(!KQ.treats||typeof KQ.treats!=='object')KQ.treats={};
      (function kqMigrateAvatar20(){const av=KQ.avatar,empty={top:'outfit-sun',bottom:'outfit-sun',shoes:'outfit-sun',head:'none',glasses:'none',extra:'none'};
        if(!av||typeof av!=='object'){KQ.avatar=JSON.parse(JSON.stringify(kqDefaults.avatar));return;}
        if(av.isaiah&&typeof av.isaiah==='object'&&av.mia&&typeof av.mia==='object'&&av.character){return;}
        const headIds=['acc-bow','acc-crown'],per={...empty};
        if(typeof av.outfit==='string'&&av.outfit){per.top=per.bottom=per.shoes=av.outfit;}
        if(typeof av.head==='string'&&av.head!=='none')per.head=av.head;else if(headIds.includes(av.accessory))per.head=av.accessory;
        if(typeof av.extra==='string'&&av.extra!=='none')per.extra=av.extra;else if(av.accessory&&av.accessory!=='none'&&!headIds.includes(av.accessory))per.extra=av.accessory;
        let nm='';try{nm=((kqProfile()||{}).name||'').toLowerCase();}catch(e){}
        KQ.avatar={character:/mia/.test(nm)?'mia':'isaiah',isaiah:{...per},mia:{...per}};
      })();
      /* Avatar 3.0: legacy single 'outfit' slot expands to top/bottom/shoes; the original ten
         full-dress outfits become "sets" filling all three at once. Old glasses ids that lived
         on the extra slot move to the new glasses slot. Unknown values fall back to the
         starter set — the doll never renders broken. */
      (function kqMigrateAvatar30(){const av=KQ.avatar;if(!av||typeof av!=='object')return;['isaiah','mia'].forEach(c=>{
        const st=av[c];if(!st||typeof st!=='object')return;
        if(typeof st.outfit==='string'&&st.outfit&&st.outfit!=='none'&&st.top===undefined&&st.bottom===undefined&&st.shoes===undefined){st.top=st.bottom=st.shoes=st.outfit;}
        ['top','bottom','shoes'].forEach(k=>{if(typeof st[k]!=='string'||!st[k])st[k]='outfit-sun';});
        if(typeof st.glasses!=='string'||!st.glasses)st.glasses='none';
        if(typeof st.head!=='string'||!st.head)st.head='none';
        if(typeof st.extra!=='string'||!st.extra)st.extra='none';
        if(st.extra==='acc-glasses'||st.extra==='ext-sunnies'){st.glasses=st.extra;st.extra='none';}
      });if(av.character!=='mia'&&av.character!=='isaiah')av.character='isaiah';})();
      if(!KQ.profiles||typeof KQ.profiles!=='object')KQ.profiles={kid1:{name:'Mia and Isaiah',stats:{},history:[]}};
      if(!KQ.profiles[KQ.activeProfile])KQ.activeProfile=Object.keys(KQ.profiles)[0];if(!KQ.settings)KQ.settings={parentPin:'',dailyMinutes:0};if(!KQ.session)KQ.session={day:'',dailySeconds:0,continuousStartedAt:Date.now(),lastBreakAt:Date.now(),lastActive:Date.now()};function kqProfile(){return KQ.profiles[KQ.activeProfile];}
