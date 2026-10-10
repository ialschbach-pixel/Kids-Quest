      function kqDay(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
      function kqWeekKey(d=new Date()){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()),day=(x.getDay()+6)%7;x.setDate(x.getDate()-day);return kqDay(x);}
      function kqInitSession(){const now=Date.now(),today=kqDay();if(KQ.session.day!==today){KQ.session={day:today,dailySeconds:0,continuousStartedAt:now,lastBreakAt:now,lastActive:now};}else if(now-(KQ.session.lastActive||now)>300000){KQ.session.continuousStartedAt=now;KQ.session.lastBreakAt=now;}KQ.session.lastActive=now;}
      kqInitSession();
      function kqDecayPet(){const now=Date.now(),hours=Math.max(0,(now-(Number(KQ.pet.lastAt)||now))/3600000);KQ.pet.hunger=Math.max(0,Math.round((Number(KQ.pet.hunger)||0)-hours*1.4));KQ.pet.happiness=Math.max(0,Math.round((Number(KQ.pet.happiness)||0)-hours*.8));KQ.pet.lastAt=now;KQsave();}
      kqDecayPet();
      const kqShop=[
        {id:'outfit-sun',kind:'outfit',slot:'set',name:'Sunshine Explorer',price:0,desc:'A sunny everyday look for both kids. A matching top, bottom, and shoes.'},
        {id:'outfit-space',kind:'outfit',slot:'set',name:'Space Suit',price:12,desc:'Blast off in a sparkly space suit. A matching top, bottom, and shoes.'},
        {id:'outfit-royal',kind:'outfit',slot:'set',name:'Royal Cape',price:16,desc:'A grand cape for quest royalty. A matching top, bottom, and shoes.'},
        {id:'outfit-ocean',kind:'outfit',slot:'set',name:'Ocean Overalls',price:10,desc:'Splash-ready ocean overalls. A matching top, bottom, and shoes.'},
        {id:'outfit-vest',kind:'outfit',slot:'set',name:'Explorer Vest',price:14,desc:'Pockets, patches and a jungle hat look. A matching top, bottom, and shoes.'},
        {id:'outfit-wizard',kind:'outfit',slot:'set',name:'Wizard Tunic',price:16,desc:'A starry tunic for spell quests. A matching top, bottom, and shoes.'},
        {id:'outfit-hero',kind:'outfit',slot:'set',name:'Superhero Suit',price:16,desc:'A bold suit for brave missions. A matching top, bottom, and shoes.'},
        {id:'outfit-party',kind:'outfit',slot:'set',name:'Party Star',price:15,desc:'Shine bright at every celebration. A matching top, bottom, and shoes.'},
        {id:'outfit-jersey',kind:'outfit',slot:'set',name:'Sport Jersey',price:12,desc:'Team jersey with sporty stripes. A matching top, bottom, and shoes.'},
        {id:'outfit-sailor',kind:'outfit',slot:'set',name:'Sailor Suit',price:13,desc:'A classic sea-voyage uniform. A matching top, bottom, and shoes.'},
        /* Mix-and-match wardrobe: each piece equips one of top/bottom/shoes so kids can mismatch; the sets above fill all three. */
        {id:'top-star',kind:'clothes',slot:'top',name:'Super Star Tee',price:8,desc:'A cobalt tee with a golden star.'},
        {id:'top-buddy',kind:'clothes',slot:'top',name:'Buddy Dino Tee',price:9,desc:'A green tee with a friendly dino.'},
        {id:'top-cozy',kind:'clothes',slot:'top',name:'Cozy Cloud Sweater',price:10,desc:'A fluffy sweater with soft clouds.'},
        {id:'top-bow',kind:'clothes',slot:'top',name:'Rainbow Ribbon Tee',price:7,desc:'A sunny tee with a rainbow arc.'},
        {id:'top-zap',kind:'clothes',slot:'top',name:'Hero Bolt Tee',price:9,desc:'A bright red tee with a yellow bolt.'},
        {id:'bottom-jeans',kind:'clothes',slot:'bottom',name:'Blue Adventure Jeans',price:9,desc:'Full-length jeans with roomy pockets.'},
        {id:'bottom-cargo',kind:'clothes',slot:'bottom',name:'Jungle Cargo Shorts',price:8,desc:'Sage shorts with big square pockets.'},
        {id:'bottom-comet',kind:'clothes',slot:'bottom',name:'Comet Joggers',price:10,desc:'Purple joggers with golden comet stripes.'},
        {id:'bottom-petal',kind:'clothes',slot:'bottom',name:'Petal Patch Shorts',price:7,desc:'Coral shorts with tiny flower patches.'},
        {id:'bottom-sun',kind:'clothes',slot:'bottom',name:'Sunny Skip Shorts',price:6,desc:'Sun-yellow shorts with a white sun.'},
        {id:'shoe-racer',kind:'clothes',slot:'shoes',name:'Rocket Racer Sneakers',price:8,desc:'Chunky red sneakers with white stripes.'},
        {id:'shoe-swirl',kind:'clothes',slot:'shoes',name:'Ocean Swirl Sneakers',price:7,desc:'Teal sneakers with ocean waves.'},
        {id:'shoe-star',kind:'clothes',slot:'shoes',name:'Stardust Light-Ups',price:9,desc:'Silver-blue sneakers with golden stars.'},
        {id:'shoe-boot',kind:'clothes',slot:'shoes',name:'Trail Cub Boots',price:6,desc:'Sturdy tan boots with rope laces.'},
        {id:'acc-bow',kind:'accessory',slot:'head',name:'Adventure Bow',price:7,desc:"Pops on your kid's head."},
        {id:'acc-crown',kind:'accessory',slot:'head',name:'Little Crown',price:14,desc:"Pops on your kid's head."},
        {id:'hat-cap',kind:'accessory',slot:'head',name:'Baseball Cap',price:10,desc:"Pops on your kid's head."},
        {id:'hat-sun',kind:'accessory',slot:'head',name:'Straw Sun Hat',price:8,desc:"Pops on your kid's head."},
        {id:'hat-bean',kind:'accessory',slot:'head',name:'Striped Beanie',price:9,desc:"Pops on your kid's head."},
        {id:'hat-explorer',kind:'accessory',slot:'head',name:'Explorer Hat',price:12,desc:"Pops on your kid's head."},
        {id:'hat-wizard',kind:'accessory',slot:'head',name:'Starry Wizard Hat',price:16,desc:"Pops on your kid's head."},
        {id:'hat-party',kind:'accessory',slot:'head',name:'Party Hat',price:6,desc:"Pops on your kid's head."},
        {id:'acc-glasses',kind:'accessory',slot:'glasses',name:'Star Glasses',price:8,desc:'Pops on your kid.'},
        {id:'ext-scarf',kind:'accessory',slot:'extra',name:'Cozy Scarf',price:8,desc:'A warm, swirly striped scarf.'},
        {id:'ext-pack',kind:'accessory',slot:'extra',name:'Adventure Backpack',price:12,desc:'Carry quest supplies in style.'},
        {id:'ext-bino',kind:'accessory',slot:'extra',name:'Explorer Binoculars',price:14,desc:'Spot far-off creatures and clues.'},
        {id:'ext-necklace',kind:'accessory',slot:'extra',name:'Star Necklace',price:9,desc:'A golden star to wear proudly.'},
        {id:'ext-mask',kind:'accessory',slot:'extra',name:'Hero Mask',price:10,desc:'A teal mask for secret missions.'},
        {id:'ext-sunnies',kind:'accessory',slot:'glasses',name:'Cool Sunglasses',price:10,desc:'Shade for sunny adventures.'},
        {id:'ext-gloves',kind:'accessory',slot:'extra',name:'Hero Gloves',price:8,desc:'Bright gloves for both hands.'},
        {id:'ext-bowtie',kind:'accessory',slot:'extra',name:'Shiny Bow Tie',price:6,desc:'A snappy golden bow tie.'},
        {id:'ext-medal',kind:'accessory',slot:'extra',name:'Quest Medal',price:12,desc:'A golden medal for champions.'},
        {id:'pet-bandana',kind:'pet',slot:'pet',name:'Pet Bandana',art:'🧣',price:6,desc:'Char wears it in his corner!'},
        {id:'pet-hat',kind:'pet',slot:'pet',name:'Pet Party Hat',art:'🎉',price:9,desc:'Char wears it in his corner!'},
        {id:'treat-beetle',kind:'treat',slot:'treat',name:'Crunchy Beetle',art:'🪲',price:5,desc:'A one-bite snack for Char — big bonus happiness!'},
        {id:'treat-worm',kind:'treat',slot:'treat',name:'Wiggly Worm',art:'🪱',price:7,desc:'A one-bite snack for Char — big bonus happiness!'},
        {id:'treat-fly',kind:'treat',slot:'treat',name:'Sparkle Fly',art:'🪰',price:10,desc:'A one-bite snack for Char — big bonus happiness!'},
        {id:'decor-lamp',kind:'decor',slot:'decor',name:'Moon Lamp',art:'🌙',price:5,desc:'A cheerful room decoration.'},
        {id:'decor-plant',kind:'decor',slot:'decor',name:'Room Plant',art:'🌿',price:5,desc:'A cheerful room decoration.'},
        {id:'decor-pillow',kind:'decor',slot:'decor',name:'Cloud Pillow',art:'☁️',price:6,desc:'A cheerful room decoration.'}
      ];
      const kqCritterList=['🐞','🐛','🦋','🐌','🐝','🪲','🦗','🕷️','🐜','🦟'];
      const kqSources=[
        ['ABCmouse','https://support.abcmouse.com/hc/en-us/articles/34386185477271-Detailed-Comparison-ABCmouse-vs-ABCmouse-Classic'],
        ['Khan Academy Kids','https://khankids.zendesk.com/hc/en-us/articles/360041615571-How-does-the-learning-level-adjust-and-how-do-I-view-my-child-s-progress'],
        ['LeapFrog','https://store.leapfrog.com/en-us/academy/landing'],
        ['Duolingo ABC','https://techcrunch.com/2020/03/26/duolingos-new-app-teaches-children-how-to-read-and-write/200'],
        ['Toca Boca','https://www.tocaboca.com/for-parents/toca-boca-world'],
        ['PBS KIDS','https://npr.brightspotcdn.com/7f/28/c3339715418fb1a237295a65cc24/pbsk-learninggoalsonesheet-sept24-eng.pdf'],
        ['BabyBus','https://www.babybus.com/global/en/index'],
        ['NASA — About the Planets','https://science.nasa.gov/solar-system/planets/'],
        ['NASA — Solar System Facts','https://science.nasa.gov/solar-system/solar-system-facts/'],
        ['NASA — Solar System Temperatures','https://science.nasa.gov/resource/solar-system-temperatures/'],
        ['NASA Space Place — Gravity','https://spaceplace.nasa.gov/en/search/gravity/']
      ];
      /* Avatar 2.0 paper-doll: full-dress outfit variant + fitted hat/extra overlays per child.
         All overlays are anchored sprites positioned by measured canvas fractions, per character.
         The frm_* art (512x768 master frames) is anchored the same way: its anchor fractions
         place the item's opaque region exactly on the doll via the standard kqSprStyle math.
         back:true renders the layer behind the base (e.g. backpack peek over the shoulders). */
      const kqCharNames={isaiah:'Isaiah',mia:'Mia'};
      function kqChar(){const c=KQ.avatar&&KQ.avatar.character;return c==='mia'?'mia':'isaiah';}
      function kqIsSetId(id){return typeof id==='string'&&id.indexOf('outfit-')===0;}
      function kqDollState(char){char=char||kqChar();const av=KQ.avatar||{},st=av[char]||{};const legacy=(typeof st.outfit==='string'&&st.outfit)?st.outfit:'outfit-sun';return{top:st.top||legacy,bottom:st.bottom||legacy,shoes:st.shoes||legacy,head:st.head||'none',glasses:st.glasses||'none',extra:st.extra||'none'};}
      const kqAvatarArt={
        frames:{},
        sprites:{
          'hat-bean':  {ar:0.8604,isaiah:{x:0.4746,y:0.2057,p:'b',w:0.3906},mia:{x:0.4668,y:0.2161,p:'b',w:0.3516}},
          'ext-mask':  {ar:2.9448,isaiah:{x:0.4746,y:0.2305,p:'c',w:0.2734},mia:{x:0.4668,y:0.2461,p:'c',w:0.2670}},
          'ext-scarf': {ar:1.4199,isaiah:{x:0.4766,y:0.2995,p:'t',w:0.4918},mia:{x:0.4844,y:0.3021,p:'t',w:0.4918}},
          'ext-bowtie':{ar:1.5809,isaiah:{x:0.4766,y:0.3385,p:'c',w:0.2752},mia:{x:0.4844,y:0.3398,p:'c',w:0.2752}},
          'ext-necklace':{ar:1.0729,isaiah:{x:0.4766,y:0.2995,p:'t',w:0.2951},mia:{x:0.4844,y:0.3021,p:'t',w:0.2951}},
          'ext-medal': {ar:1.2549,isaiah:{x:0.4766,y:0.2951,p:'t',w:0.2858},mia:{x:0.4844,y:0.2977,p:'t',w:0.2858}},
          'ext-bino':  {ar:1.2614,isaiah:{x:0.4766,y:0.3212,p:'t',w:0.4694},mia:{x:0.4844,y:0.3236,p:'t',w:0.3958}},
          'ext-gloves':{ar:0.9938,w:.1497,isaiah:[[0.1982,0.6302],[0.7920,0.6302]],mia:[[0.2842,0.6289],[0.7109,0.6289]]},
          'acc-bow':   {ar:1.0105,isaiah:{x:0.3523,y:0.1567,p:'c',w:0.2656},mia:{x:0.3425,y:0.1632,p:'c',w:0.2656}},
          'acc-crown': {ar:1.0536,isaiah:{x:0.4758,y:0.1054,p:'b',w:0.2875},mia:{x:0.4680,y:0.1054,p:'b',w:0.2875}},
          'hat-cap':   {ar:1.3873,isaiah:{x:0.4755,y:0.2113,p:'b',w:0.3484},mia:{x:0.4677,y:0.2217,p:'b',w:0.3484}},
          'hat-sun':   {ar:1.7195,isaiah:{x:0.4753,y:0.2142,p:'b',w:0.5091},mia:{x:0.4675,y:0.2246,p:'b',w:0.5091}},
          'hat-explorer':{ar:1.6986,isaiah:{x:0.4518,y:0.2246,p:'b',w:0.4739},mia:{x:0.4440,y:0.2350,p:'b',w:0.4739}},
          'hat-wizard':{ar:0.8409,isaiah:{x:0.4760,y:0.2064,p:'b',w:0.4148},mia:{x:0.4681,y:0.1888,p:'b',w:0.3972}},
          'hat-party': {ar:0.8736,isaiah:{x:0.4753,y:0.0994,p:'b',w:0.3151},mia:{x:0.4674,y:0.0994,p:'b',w:0.3151}},
          'acc-glasses':{ar:2.1206,isaiah:{x:0.4751,y:0.2347,p:'c',w:0.3086},mia:{x:0.4673,y:0.2503,p:'c',w:0.3086}},
          'ext-sunnies':{ar:2.0800,isaiah:{x:0.4755,y:0.2350,p:'c',w:0.2828},mia:{x:0.4677,y:0.2506,p:'c',w:0.2828}},
          'ext-pack':  {ar:0.8766,back:true,isaiah:{x:0.4754,y:0.5409,p:'c',w:0.5118},mia:{x:0.4675,y:0.5370,p:'c',w:0.5118}}
        },
        outfits:['sun','space','royal','ocean','vest','wizard','hero','party','jersey','sailor']
      };
      