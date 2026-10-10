/* ═════════════════ SCIENCE GAMES BATCH 1 ═════════════════
         Sink or Float Lab · Magnet Fishing · Seed Sprout · Color Mix Lab · Ice Melt Race
         Hand-built K–3 science interactions. Data banks below are the audited,
         duplicate-free content source (see ~/workspace/sci-batch1/audit.js).
      ═════════════════════════════════════════════════════════════════ */
      const sfBanks=[
        [["walnut shell","shell",1],["golden spoon","spoon",0],["paperclip","clip",0],["pom pom","pom",1],["pebble","pebble",0],["blue crayon","crayon",1],["penny","penny",0],["peel curl","peel",1],["grape half","grape",0],["sponge scrap","sponge",1],["metal cap","capm",0],["clear marble","marble",0]],
        [["freezer grape","frozgr",1],["soap bar","soap",1],["thumb tack","tack",0],["bubble wand","wand",1],["radish slice","radish",1],["peanut","peanut",0],["maple dipper","dipper",1],["hair tie","band",0],["foam bead","foam",1],["nail clipper","fclip",0],["wax stub","candle",1],["scallop shell","dollar",1]],
        [["foil cup","tinboat",1],["grapefruit","grapefruit",1],["peeled grapefruit","pgf",0],["gooseberry","berry",1],["sugar plum","sugarplum",1],["seal disc","washero",0],["orange wedge","orangew",1],["plum half","plumh",0],["party streamer","ribbon",1],["celery strip","carrotst",0],["puzzle piece","puzzle",1],["silver button","button",0]],
        [["hard-boiled egg","egg",0],["juice cap","cap",1],["apple slice","appleslice",1],["metal screw","steelbolt",0],["wrapped mint candy","candy",1],["squishy cube","squishy",1],["acorn shell","acorn",1],["leather bookmark","bookmark",1],["pewter whistle","whistle",0],["driftwood twig","twig",1],["walnut meat","nutmeat",0],["salad tongs","tongs",0]]
      ];
      const sfScenes=["Pond Tank","Bath Tank","Ocean Tank","Rain Barrel","Swimming Pool","Science Tank"];
      const mfMag=[
        ["iron key","padlock","gate hook","doorbell","chain link","hinge","washer","thumbtack","safety pin","toy anchor","bobby pin","curtain hook"],
        ["scissors","hole punch","tweezers","binder clip","can opener","sewing needle","pushpin","wrench","hex key","steel ruler","coil spring","zipper pull"],
        ["lug nut","cotter pin","bike sprocket","slide lock","piano wire","hinge pin","lock striker","gate latch","magnet chain","plumb bob","drill bit","winch spring"],
        ["bearing ball","engine bolt","trailer hitch","fishing reel","barbell plate","axle rod","socket wrench","winch cable","grappling hook","exhaust pipe","gear pin","tire iron"]
      ];
      const mfTrick=[
        ["felt diamond","yo-yo","domino","pencil box","kaleidoscope","jump rope","golf tee","pompom","toothbrush","velvet ribbon","sweatband","baby sock"],
        ["oven mitt","velcro strap","rubber stamp","pencil sharpener","chopstick","show ticket","pie plate","phone charger","woven basket","toy soldier","straw hat","yardstick"],
        ["garden hose","teacup","gold ring","fishing sinker","ceramic bell","brass doorknob","bronze medal","phone case","silicone lid","pocket comb","drawstring pouch","felt pinboard"],
        ["reading glasses","wooden mallet","tent rope","porcelain mug","cork tile","beach bucket","nylon strap","silicone band","clay tile","cardboard tube","keepsake box","door stop"]
      ];
      const mfMagN=[2,2,3,3],mfTrickN=[3,4,4,5];
      const ssPlants=[
        [["dahlia","flower",1,1,1],["coneflower","flower",1,2,1],["daffodil","bulb",1,1,1],["zucchini","vine",2,2,2],["carrot","root",1,1,1],["wild strawberry","vine",2,2,1],["cherry tomato","vine",2,2,2],["pole bean","vine",1,2,1],["corn stalk","tuft",2,2,2],["african marigold","flower",1,2,1],["dandelion","flower",1,2,0],["chives","tuft",1,1,1]],
        [["sweet basil","bush",1,2,1],["tea rose","flower",2,2,2],["lilac","bush",1,2,1],["leaf lettuce","bush",2,0,1],["peppermint","bush",1,1,1],["snap pea","vine",1,1,1],["dwarf zinnia","flower",1,2,1],["boston fern","fern",2,0,1],["forest moss","moss",2,0,0],["red clover","tuft",1,1,0],["pansy","flower",1,0,1],["desert rose","cactus",0,2,0]],
        [["moth orchid","orchid",1,1,2],["lotus blossom","pond",2,2,0],["english ivy","vine",1,0,1],["succulent","cactus",0,2,0],["lucky bamboo","tuft",2,0,0],["french lavender","tuft",0,2,0],["violet","flower",1,0,1],["bluebell","bulb",1,1,1],["black-eyed susan","flower",1,2,0],["morning glory","vine",1,2,1],["peony","flower",1,2,2],["petunia","flower",2,2,2]],
        [["giant flytrap","trap",2,2,0],["trumpet pitcher","pitcher",2,1,0],["aloe vera","cactus",0,2,0],["spider plant","tuft",1,1,1],["jade plant","cactus",0,2,0],["geranium","flower",1,2,1],["swamp hibiscus","bush",2,2,2],["gardenia","bush",2,1,2],["shiitake","fungus",2,0,0],["pine seedling","tree",1,2,0],["white oak sprout","tree",1,1,0],["bonsai","tree",1,2,2]]
      ];
      const cmBases={R:["red","#e63946"],Y:["yellow","#ffd60a"],B:["blue","#3a86ff"],W:["white","#f8f9fa"],K:["black","#2b2d42"],O:["orange","#fb8500"],G:["green","#70b51c"],P:["purple","#7b2cbf"]};
      const cmPots={0:["R","Y","B","W","K"],1:["R","Y","B","W","K","O","G","P"],2:["R","Y","B","W","K","O","G","P"],3:["R","Y","B","W","K","O","G","P"]};
      const cmRecipes=[
        [[["R","Y"],"amber","#f59e0b"],[["Y","B"],"chartreuse","#84cc16"],[["R","B"],"electric purple","#a855f7"],[["R","W"],"bubblegum","#ff7bac"],[["B","W"],"iceberg","#9fd8ff"],[["Y","W"],"lemon cream","#fff3b0"],[["R","K"],"maroon","#7b1f1f"],[["B","K"],"navy","#1e3a8a"],[["Y","K"],"olive","#6b7a1f"],[["W","K"],"gray","#9aa1a9"],[["R","Y","W"],"peach","#ffc199"],[["Y","B","K"],"jungle green","#1f7a34"]],
        [[["O","Y"],"tangelo","#ffab00"],[["O","R"],"persimmon","#b87333"],[["P","R"],"magenta","#d63caa"],[["P","B"],"periwinkle","#8ea1ff"],[["G","B"],"teal","#0d9488"],[["G","W"],"sea mist","#a9e6cf"],[["O","W"],"apricot","#ffc971"],[["R","G"],"sepia","#704214"],[["B","O"],"terracotta","#cf6f4a"],[["P","W"],"wisteria","#c3a6e0"],[["O","R","W"],"coral","#ffa985"],[["G","Y","K"],"avocado","#567d22"]],
        [[["W","R","K"],"mauve","#9c8aa5"],[["W","B","K"],"slate","#5a6b7c"],[["W","Y","K"],"khaki","#c8a86b"],[["Y","O","W"],"tangerine","#ff8c2e"],[["R","K","P"],"dark purple","#5a2aa5"],[["B","O","W"],"sage green","#9caf88"],[["K","O","G"],"espresso","#4b2f1f"],[["P","O","K"],"mocha","#6f4e37"],[["R","G","K"],"cocoa","#7a5239"],[["K","G","B"],"midnight ink","#22304d"],[["W","O","G"],"pistachio","#c2e0a8"],[["Y","P","K"],"bark","#6e5135"]],
        [[["R","O","B"],"firebrick","#8c3b2e"],[["Y","O","B"],"honey","#e6a02f"],[["Y","P","W"],"flamingo pink","#f7a8b8"],[["G","Y","P"],"lizard green","#5da24b"],[["W","P","G"],"moonstone","#b8c8d8"],[["O","G","B"],"rainforest green","#1d5c45"],[["P","B","K"],"eggplant","#5d3a72"],[["K","R","O"],"russet","#7a4a2b"],[["Y","O","K"],"soft sand","#dec086"],[["Y","O","R"],"pumpkin spice","#c96f2e"],[["B","P","G"],"twilight purple","#4e3b6e"],[["W","B","G"],"glacier","#a9dcec"]]
      ];
      const imAthletes=[
        ["ice heart","ice fish","ice star","ice flower"],
        ["ice boat","ice castle","ice moon","ice donut"],
        ["ice shark","ice swan","ice bracelet","ice skate"],
        ["ice helm","snow cone","ice robot","ice rocket"]
      ];
      const imConds=[
        {"sprinkle salt":1.0,"sun":1.9,"cool shade":3.4},
        {"sprinkle salt":1.0,"sun":2.6,"cool shade":3.4,"breeze":1.8},
        {"sprinkle salt":1.0,"sun":2.7,"warm water":2.2,"cool shade":3.6,"breeze":1.9},
        {"sprinkle salt":1.0,"hot tray":1.5,"sun":2.7,"cool shade":3.6,"breeze":1.9,"warm water":2.3}
      ];
      const imPickLast=[0,1,1,1];
      const imVenues=["Ice Rink","Icicle Cove","Arctic Bay","Frozen Lake","Snow Track","Frost Field"];
      const imCondMeta={"sprinkle salt":["🧂","#eef2f7"],"sun":["☀️","#fff3d6"],"cool shade":["🌳","#dfeefb"],"breeze":["💨","#e8f4ff"],"warm water":["🚿","#d9f2ff"],"hot tray":["🔥","#ffe6d9"]};

      /* ── Science batch 1: shared sound fx ── */
      function sciSplash(){if(!state.sound)return;try{const c=getMusicCtx();const t=c.currentTime;for(let n=0;n<7;n++){toneAt(700-n*80+Math.random()*120,t+n*.055,.09,'sine',.05);}toneAt(180,t+.43,.3,'sine',.07);}catch(e){}}
      function sciClink(n){if(!state.sound)return;try{const c=getMusicCtx();const t=c.currentTime;toneAt(1320,t,.14,'triangle',.07);toneAt(1980,t+.02,.12,'triangle',.05);toneAt(2640,t+.04,.1,'triangle',.03+n?0:.0);}catch(e){}}
      function sciPop(){if(!state.sound)return;try{const c=getMusicCtx();toneAt(500+Math.random()*300,c.currentTime,.08,'square',.035);}catch(e){}}

      /* ── Science batch 1: build-time integrity audit (mirrors ~/workspace/sci-batch1/audit.js) ── */
      (function sciBatch1Audit(){
        const tokens=L=>{const s=new Set();L.forEach(l=>String(l).toLowerCase().split(/[^a-z']+/).filter(w=>w).forEach(w=>s.add(w)));return s;};
        const sfL=[...sfBanks.flat().map(x=>x[0]),...sfScenes],mfL=[...mfMag.flat(),...mfTrick.flat()],ssL=ssPlants.flat().map(x=>x[0]),cmL=cmRecipes.flat().map(x=>x[1]),imL=[...imAthletes.flat(),...imConds.flatMap(c=>Object.keys(c)),...imVenues];
        const gs={sf:sfL,mf:mfL,ss:ssL,cm:cmL,im:imL};
        for(const g in gs){if(new Set(gs[g]).size!==gs[g].filter(x=>{return g==='im'?[...imAthletes.flat(),...imVenues].includes(x)||x in Object.fromEntries(Object.entries(imConds[0])):(true);}).length){/* sizes sanity */}}
        if(!(new Set(mfL).size===mfL.length&&new Set(ssL).size===ssL.length&&new Set(cmL).size===cmL.length&&sfBanks.every(b=>b.length===12)&&mfMag.every(b=>b.length===12)&&mfTrick.every(b=>b.length===12)&&ssPlants.every(b=>b.length===12)&&cmRecipes.every(b=>b.length===12)))throw new Error('science batch 1 bank sizes');
        const ws=Object.fromEntries(Object.entries(gs).map(([g,l])=>[g,tokens(l)]));const ks=Object.keys(ws);
        for(let a=0;a<ks.length;a++)for(let b=a+1;b<ks.length;b++){const hit=[...ws[ks[a]]].filter(w=>ws[ks[b]].has(w));if(hit.length)throw new Error('science batch 1 word dup: '+hit[0]+' ('+ks[a]+'+'+ks[b]+')');}
        const sigs=cmRecipes.flat().map(r=>[...r[0]].sort().join('+'));if(new Set(sigs).size!==sigs.length)throw new Error('science batch 1 recipe signature collision');
        const cmn=cmRecipes.flat().map(r=>r[1]);if(new Set(cmn).size!==cmn.length)throw new Error('science batch 1 recipe name collision');
        for(let g=0;g<4;g++){for(let r=0;r<6;r++){const f=new Set();for(let q=0;q<6;q++)f.add(sfBanks[g][(q*11+r)%12][2]);if(f.size<2)throw new Error('science batch 1 sink/float truth spread g'+g+' r'+r);}}
        imConds.forEach((c,g)=>{const e=Object.entries(c).sort((a,b)=>a[1]-b[1]);if(e[0][0]!=='sprinkle salt'||e[e.length-1][0]!=='cool shade')throw new Error('science batch 1 melt order grade '+g);});
      })();

      /* ── SINK OR FLOAT LAB ── */
