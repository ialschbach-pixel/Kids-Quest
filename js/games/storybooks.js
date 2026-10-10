      function renderStorybooks(){
        try{
        if(window.__sbKeyHandler){document.removeEventListener('keydown',window.__sbKeyHandler);window.__sbKeyHandler=null;}
        const sbImg=k=>(typeof questyArt!=='undefined'&&questyArt.storyArt&&questyArt.storyArt[k])||null;
        const G={
          meadow:'linear-gradient(180deg,#aee3ff 0%,#cdeecb 70%,#a9dd9a 100%)',
          sky:'linear-gradient(180deg,#8fd3ff 0%,#e3f6ff 100%)',
          night:'linear-gradient(180deg,#0b1e4b 0%,#2a4a8f 100%)',
          dawn:'linear-gradient(180deg,#ffd9a0 0%,#ffb3a7 55%,#c9f0c0 100%)',
          garden:'linear-gradient(180deg,#c4ec9b 0%,#8fd07a 100%)',
          soil:'linear-gradient(180deg,#6b4a2e 0%,#3a2716 100%)',
          snow:'linear-gradient(180deg,#dfefff 0%,#ffffff 100%)',
          sunset:'linear-gradient(180deg,#ff9a56 0%,#ff7d9c 100%)',
          moon:'linear-gradient(180deg,#101b3c 0%,#3b5bdb 100%)',
          cozy:'linear-gradient(180deg,#ffe8c9 0%,#ffd1a1 100%)',
          savanna:'linear-gradient(180deg,#ffe29a 0%,#f7b95c 60%,#d9984a 100%)',
          summer:'linear-gradient(180deg,#7ed6ff 0%,#fef9c3 70%)'
        };
        const storybookShelves=[
{name:'Questy & Friends',emoji:'🦊',blurb:'Brand-new adventures with Questy, Char, Mia, and Isaiah.',books:[
            {title:'Questy and the Lost Star',hero:'🦊',tag:'Questy Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.night,art:'🦊🌠🌙',text:'One quiet night, Questy saw something streak across the sky. Plip! A tiny star landed in the grass.', img:sbImg('17/0')},
              {bg:G.night,art:'⭐😢🦊',text:'The little star was crying. \u201cI fell out of the sky! I want to go home!\u201d', img:sbImg('17/1')},
              {bg:G.night,art:'🦊⭐🤝',text:'\u201cDo not cry,\u201d said Questy kindly. \u201cI will help you get back up there.\u201d', img:sbImg('17/2')},
              {bg:G.night,art:'⭐🤸',text:'First they tried a trampoline. Boing! Too bouncy \u2014 the star tumbled right off.', img:sbImg('17/3')},
              {bg:G.cozy,art:'🛏️⭐🦊',text:'Then they stacked every pillow in the house. But the sky was still far, far away.', img:sbImg('17/4')},
              {bg:G.night,art:'🦉🦉⭐',text:'Questy had an idea! He asked the owls for a ride. \u201cHop on!\u201d they hooted.', img:sbImg('17/5')},
              {bg:G.night,art:'🌌🦉⭐😄',text:'Up, up, up they flew! The little star giggled the whole way home.', img:sbImg('17/6')},
              {bg:G.night,art:'✨🦊👋',text:'The star twinkled happily in its own spot. \u201cThank you, Questy!\u201d And Questy waved goodnight.', img:sbImg('17/7')}
            ]},
            {title:'Char\u2019s Big Day',hero:'🦎',tag:'Char Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.cozy,art:'🦎☀️🏠',text:'Char the lizard woke up in his cozy terrarium. Today felt like an adventure day!', img:sbImg('18/0')},
              {bg:G.garden,art:'🦎🪨👑',text:'First, Char climbed the big rock. \u201cI am the king of the rock!\u201d he declared.', img:sbImg('18/1')},
              {bg:G.garden,art:'🦎🍃🕳️',text:'Then he spotted something new \u2014 a tunnel made of leaves! Should he go inside?', img:sbImg('18/2')},
              {bg:G.soil,art:'🦎🌑✨',text:'Char took a deep breath and tiptoed in. It was dark... and exciting!', img:sbImg('18/3')},
              {bg:G.soil,art:'🔵🦎😲',text:'Deep inside, he found a treasure \u2014 a shiny blue marble! \u201cWow!\u201d', img:sbImg('18/4')},
              {bg:G.soil,art:'🦎👃🥬',text:'But uh-oh \u2014 the tunnel twisted and turned! Which way was out? Char sniffed the air and followed the smell of lunch.', img:sbImg('18/5')},
              {bg:G.cozy,art:'🦎🥗😋',text:'He popped out right beside his food bowl! Crunch, crunch. Adventure makes a lizard hungry.', img:sbImg('18/6')},
              {bg:G.night,art:'🦎💤🔵',text:'That night, Char curled up with his marble. Being brave had made it the best day ever.', img:sbImg('18/7')}
            ]},
            {title:'Mia and the Talking Garden',hero:'👧',tag:'Mia Tale',ages:'Ages 5\u20138',pages:[
              {bg:G.dawn,art:'👧🌅',text:'Mia woke up very early, before anyone else. The sun was just peeking over the fence.', img:sbImg('19/0')},
              {bg:G.garden,art:'👧🌷👂',text:'She tiptoed into the garden. And then she heard it \u2014 a tiny, papery whisper!', img:sbImg('19/1')},
              {bg:G.garden,art:'🌼🌸😄',text:'\u201cWho said that?\u201d Mia asked. The daisies wiggled. \u201cWe did!\u201d they giggled.', img:sbImg('19/2')},
              {bg:G.garden,art:'🥕💧👧',text:'The carrots grumbled in their sleepy voices, \u201cWe are thirsty!\u201d Mia ran for the watering can.', img:sbImg('19/3')},
              {bg:G.garden,art:'💧🌱😊',text:'Glug, glug! The garden drank it all up. \u201cThank you, Mia,\u201d sighed the happy plants.', img:sbImg('19/4')},
              {bg:G.garden,art:'🐝🌻',text:'A buzzy bee stopped by. \u201cThe sunflowers keep the sweetest nectar,\u201d he told her.', img:sbImg('19/5')},
              {bg:G.garden,art:'👧👂🌿',text:'Mia sat very still and just listened. The garden had so much to say!', img:sbImg('19/6')},
              {bg:G.dawn,art:'🌅👧🌷',text:'Now Mia visits every morning at dawn. If you listen closely, the garden might talk to you too.', img:sbImg('19/7')}
            ]},
            {title:'Pip the Brave Little Seed',hero:'🌱',tag:'Pip Tale',ages:'Ages 5\u20138',pages:[
              {bg:G.cozy,art:'🌱📦✨',text:'Pip was a tiny seed, no bigger than a freckle. He lived in a paper packet, waiting.', img:sbImg('21/0')},
              {bg:G.garden,art:'👧🌱🟤',text:'One spring morning, a child tucked Pip into the warm soil. \u201cGrow big, little seed!\u201d', img:sbImg('21/1')},
              {bg:G.soil,art:'🌑🌱☀️',text:'Underground it was dark and quiet. Pip felt a little scared \u2014 but the sun warmed the soil above.', img:sbImg('21/2')},
              {bg:G.soil,art:'🌱⬆️💪',text:'Pip pushed out a tiny root. Then a tiny sprout. Push, push, push!', img:sbImg('21/3')},
              {bg:G.dawn,art:'☀️🌱🎉',text:'Pop! Pip\u2019s sprout broke through into the sunshine. \u201cI did it!\u201d he cheered.', img:sbImg('21/4')},
              {bg:G.garden,art:'🌧️🌱🍃',text:'Soft rain came. Drip, drop! Pip drank it up and unfolded two green leaves.', img:sbImg('21/5')},
              {bg:G.garden,art:'🌱📏',text:'Day by day, Pip grew taller... and taller... until a round bud appeared!', img:sbImg('21/6')},
              {bg:G.garden,art:'🌻🎉',text:'The bud opened into a giant, golden sunflower! Pip had done it. Great things take time.', img:sbImg('21/7')}
            ]},
            {title:"Questy’s Rainy Day Parade",hero:"🦊",tag:"Questy Tale",ages:"Ages 4–7",pages:[
              { bg:G.sky, art:"🦊🌧️", text:"Questy woke up ready for a sunny adventure. But drip, drop — rain was pouring down outside!", img:sbImg('0/0') },
              { bg:G.cozy, art:"🦊🦎👧👦☙️", text:"“Our picnic is ruined,” sighed Mia. “And my rocket launch too,” said Isaiah. Everyone felt grumpy.", img:sbImg('0/1') },
              { bg:G.cozy, art:"🦊💡", text:"Then Questy got an idea — a big, bouncy, brilliant idea! “If we cannot go out to the fun,” he said, “we will bring the fun inside!”", img:sbImg('0/2') },
              { bg:G.cozy, art:"🍳🥁🦊", text:"He grabbed pots and wooden spoons. Bang, bang! “Every parade needs a band,” said Questy.", img:sbImg('0/3') },
              { bg:G.cozy, art:"🦎🎺👧🎀", text:"Char marched with a paper-tube trumpet — toot, toot! Mia twirled a ribbon like a flag. Swish, swish!", img:sbImg('0/4') },
              { bg:G.cozy, art:"👦🥁🎈", text:"Isaiah drummed on a cookie tin and tied balloons to his chair. It was the silliest parade ever!", img:sbImg('0/5') },
              { bg:G.cozy, art:"🦊🦎👧👦🎉", text:"They marched around the living room, around the kitchen, and back again. Nobody felt grumpy anymore!", img:sbImg('0/6') },
              { bg:G.sky, art:"🌈🦊", text:"At last the rain stopped, and a rainbow stretched across the sky. You do not have to wait for fun — you can make it yourself!", img:sbImg('0/7') }
            ]},
            {title:"Char’s Slow Morning",hero:"🦎",tag:"Char Tale",ages:"Ages 4–7",pages:[
              { bg:G.dawn, art:"🦎🦊💨", text:"Char the lizard woke up early. But by the time he finished stretching, Questy had already zoomed off!", img:sbImg('1/0') },
              { bg:G.meadow, art:"🦎😟👧👦", text:"“Wait for me!” called Char, but Mia and Isaiah were already far ahead. Being slow felt like no fun at all.", img:sbImg('1/1') },
              { bg:G.garden, art:"🦎🐢", text:"Char sighed and sat down in the garden, where a turtle was ambling by. “Slow, too?” smiled Char. “Slow, too,” said the turtle.", img:sbImg('1/2') },
              { bg:G.garden, art:"🦎👀✨", text:"Then Char noticed something sparkly in the grass — something everyone else had rushed right past!", img:sbImg('1/3') },
              { bg:G.garden, art:"🦎🔑🎉", text:"It was Mia’s tiny lost key! She had been searching for it all morning.", img:sbImg('1/4') },
              { bg:G.garden, art:"🦎👧💛", text:"“My key!” cheered Mia, running back. “Char, how did you ever spot it?” “I was going slow enough to see,” said Char.", img:sbImg('1/5') },
              { bg:G.meadow, art:"🦊🦎🐢🎉", text:"Questy grinned. “Slow eyes are super eyes!” Even the turtle nodded proudly.", img:sbImg('1/6') },
              { bg:G.sunset, art:"🦎😊🌅", text:"Char smiled all the way home. Going slow is not a problem — sometimes it is a superpower.", img:sbImg('1/7') }
            ]},
            {title:"Mia and the Echo Cave",hero:"👧",tag:"Mia Tale",ages:"Ages 5–8",pages:[
              { bg:G.meadow, art:"👧🦊⛰️", text:"Mia and Questy hiked all the way up the big hill. At the very top, they found a dark, round cave.", img:sbImg('2/0') },
              { bg:G.soil, art:"👧📢", text:"“Hello?” Mia called into the cave, and the cave called back: “Hello... hello... hello!”", img:sbImg('2/1') },
              { bg:G.soil, art:"👧😄🦊", text:"Mia giggled. “It is copying me!” Questy laughed too. “That is an echo — the cave bounces your voice right back.”", img:sbImg('2/2') },
              { bg:G.soil, art:"👧🎵✨", text:"Mia sang a little song. The cave sang it back to her, soft and echo-y and sweet.", img:sbImg('2/3') },
              { bg:G.soil, art:"🦎😠📢", text:"Then Char stomped in, feeling grumpy, and shouted, “I AM ANGRY!” The cave shouted right back: “Angry... angry... angry!”", img:sbImg('2/4') },
              { bg:G.soil, art:"🦎😟", text:"Char’s shoulders drooped. Hearing his own angry voice come back made him feel even grumpier.", img:sbImg('2/5') },
              { bg:G.soil, art:"👧🦎💛📢", text:"“Try this,” said Mia kindly, and together they shouted, “WE ARE FRIENDS!” The cave sang back: “Friends... friends... friends!”", img:sbImg('2/6') },
              { bg:G.sunset, art:"👧🦊🦎💛", text:"Char smiled at last. What you send into the world comes back to you — so send something kind.", img:sbImg('2/7') }
            ]},
            {title:"Isaiah’s Fix-It Shop",hero:"👦",tag:"Isaiah Tale",ages:"Ages 5–8",pages:[
              { bg:G.cozy, art:"👦🚚😢", text:"Isaiah’s favorite toy truck lost a wheel. Clunk! It would not roll anymore.", img:sbImg('3/0') },
              { bg:G.cozy, art:"👦🔧💨", text:"“I can fix it fast!” said Isaiah, and he pushed and twisted and yanked. Snap! Now the door fell off too.", img:sbImg('3/1') },
              { bg:G.cozy, art:"👦😤", text:"Isaiah huffed. Fixing things fast was only breaking them faster!", img:sbImg('3/2') },
              { bg:G.cozy, art:"🦊👦🔍", text:"Questy padded over. “Slow down, fixer — let us look at the pieces together,” he said.", img:sbImg('3/3') },
              { bg:G.cozy, art:"👦🧩", text:"They laid out every piece in a neat row. “First we find where each part goes,” said Isaiah.", img:sbImg('3/4') },
              { bg:G.cozy, art:"👦🪛✨", text:"Click went the wheel. Click went the door. Isaiah turned the tiny screwdriver very, very carefully.", img:sbImg('3/5') },
              { bg:G.cozy, art:"🚚💨👦🎉", text:"Vroom! The truck rolled across the floor, good as new. Isaiah cheered!", img:sbImg('3/6') },
              { bg:G.cozy, art:"👦🦊🔧", text:"That afternoon Isaiah opened his own Fix-It Shop. His rule: slow hands, sharp eyes — and it is always okay to ask for help.", img:sbImg('3/7') }
            ]},
            {title:"The Great Picnic Mix-Up",hero:"🧺",tag:"Questy Tale",ages:"Ages 4–7",pages:[
              { bg:G.meadow, art:"🦊🦎👧👦🧺", text:"It was picnic day, and Questy, Char, Mia, and Isaiah each packed a lunchbox. “Do not peek at mine!” they all said.", img:sbImg('4/0') },
              { bg:G.meadow, art:"🧺🧺🧺🧺😬", text:"Four lunchboxes sat in a row. They all looked exactly the same! Uh-oh.", img:sbImg('4/1') },
              { bg:G.garden, art:"🦊😲⭐🥪", text:"Questy opened his box and found a sandwich shaped like a star! “That is not mine!” he laughed.", img:sbImg('4/2') },
              { bg:G.garden, art:"🦎🪲😋", text:"Char opened his box and found crunchy roasted crickets. “Mine!” he cheered — lizards love a crunchy lunch.", img:sbImg('4/3') },
              { bg:G.garden, art:"👧👦🍎🧀😄", text:"Mia got Isaiah’s apple slices, and Isaiah got Mia’s cheese cubes. “Trade?” they giggled.", img:sbImg('4/4') },
              { bg:G.garden, art:"🦊💡🍽️", text:"Then Questy had an idea. “Let us put it ALL in the middle and share everything!”", img:sbImg('4/5') },
              { bg:G.meadow, art:"🎉🧺😋", text:"Star sandwiches, apple slices, cheese cubes, and crunchy crickets (Char ate most of those). Yum, yum, yum!", img:sbImg('4/6') },
              { bg:G.sunset, art:"🦊🦎👧👦💛", text:"It was the yummiest picnic ever. Sharing does not just mix up lunch — it mixes up the fun!", img:sbImg('4/7') }
            ]},
            {title:"Mia Learns to Swim",hero:"👧",tag:"Mia Tale",ages:"Ages 4–7",pages:[
              { bg:G.sky, art:"👧🏊", text:"It was the first hot day of summer, and Mia stood at the edge of the pool. The water sparkled blue and inviting, but Mia's toes curled tight on the warm concrete.", img:sbImg('5/0') },
              { bg:G.sky, art:"🦊👧", text:"\"I don't know,\" Mia said quietly. \"What if I sink?\" Questy gave her his bravest smile. \"Everyone feels wobbly at first,\" he said. \"I will be right here.\"", img:sbImg('5/1') },
              { bg:G.sky, art:"👦💦", text:"Isaiah splashed in first with a giant grin. \"The water is like a hug!\" he laughed. \"Come on, Mia, I will hold your hand.\"", img:sbImg('5/2') },
              { bg:G.sky, art:"👧🦎", text:"Mia sat on the steps and let the water lap at her legs. It felt cool and tickly. Char dipped one tiny claw in and shivered. \"Brrr-illiant!\" he squeaked.", img:sbImg('5/3') },
              { bg:G.sky, art:"👧🌊", text:"\"Now lie back,\" said the swim teacher kindly. \"Let the water hold you up.\" Mia took a big breath — and floated! \"I am floating! I am really floating!\"", img:sbImg('5/4') },
              { bg:G.sky, art:"👧💦", text:"Next Mia learned to kick. Splash, splash went her feet! She paddled her arms like a puppy dog. \"Look at me go!\" she shouted, beaming.", img:sbImg('5/5') },
              { bg:G.sky, art:"🎉👧", text:"Questy, Isaiah, and Char cheered from the side. \"Go, Mia, go!\" Mia swam all the way to the rope, all by herself.", img:sbImg('5/6') },
              { bg:G.sunset, art:"⭐👧", text:"That evening, Mia got a shiny star sticker. \"I was scared,\" she told everyone proudly, \"but I tried anyway. Trying is the bravest part!\"", img:sbImg('5/7') },
            ]},
            {title:"Isaiah's Trampoline Park Trip",hero:"👦",tag:"Isaiah Tale",ages:"Ages 4–7",pages:[
              { bg:G.dawn, art:"👦🎒", text:"\"Today is the day!\" Isaiah shouted, bouncing out of bed. Today the whole crew was going to the trampoline park!", img:sbImg('6/0') },
              { bg:G.meadow, art:"🏟️😲", text:"The trampoline park was enormous — wall-to-wall bouncy squares in every color. Mia gasped. Questy's eyes went wide. Even Char's tail wiggled with excitement.", img:sbImg('6/1') },
              { bg:G.meadow, art:"👦🦅", text:"Boing! Isaiah bounced higher than anyone. \"I am flying!\" he laughed, arms spread wide like an eagle.", img:sbImg('6/2') },
              { bg:G.meadow, art:"👧🤸", text:"Mia tried a seat drop — bounce, sit, bounce! \"Wheee!\" she giggled. Questy attempted a spin and landed in a giggly heap. \"Ten out of ten for style!\" said Isaiah.", img:sbImg('6/3') },
              { bg:G.meadow, art:"🦎⬆️", text:"Then Char climbed onto a trampoline. He crouched... he wiggled... BOING! He shot straight up like a popcorn kernel! \"Again! Again!\" he squeaked.", img:sbImg('6/4') },
              { bg:G.meadow, art:"🏷️🦊", text:"They played trampoline tag, bouncing and dodging. Questy was \"it\" three times in a row because he kept bouncing the wrong way.", img:sbImg('6/5') },
              { bg:G.meadow, art:"🫧👦", text:"In the foam pit, they all dove into soft blue cubes. Char disappeared completely! \"Where is Char?\" Then — pop! — his little green head popped up. Everyone roared.", img:sbImg('6/6') },
              { bg:G.sunset, art:"🚗😴", text:"On the way home, Isaiah was still bouncing in his seat. \"Best day ever!\" he said. And Char, exhausted, fell asleep mid-bounce in Mia's lap.", img:sbImg('6/7') },
            ]},
            {title:"Questy's First Snow Day",hero:"🦊",tag:"Questy Tale",ages:"Ages 4–7",pages:[
              { bg:G.snow, art:"🦊❄️", text:"Questy woke up and gasped. Everything outside was white! \"What happened to the colors?\" he whispered.", img:sbImg('7/0') },
              { bg:G.snow, art:"👧☃️", text:"\"It snowed!\" cheered Mia, already in her puffy coat. \"It is called snow, and it is the best!\" Isaiah tossed a snowball gently at Questy's nose. Plop!", img:sbImg('7/1') },
              { bg:G.snow, art:"🦊❄️", text:"Questy touched a snowflake with his paw. It was cold and soft and melted into a tiny drop. \"It tickles!\" he laughed.", img:sbImg('7/2') },
              { bg:G.snow, art:"⛄👧", text:"They rolled three big snowballs — small, medium, and huge. \"Our snowman needs a face!\" said Mia. Char found two shiny pebbles for eyes.", img:sbImg('7/3') },
              { bg:G.snow, art:"⛄🥕", text:"Isaiah found a carrot for the nose and sticks for arms. \"He needs a hat!\" Questy plopped his own scarf around the snowman's neck instead.", img:sbImg('7/4') },
              { bg:G.snow, art:"🛷❄️", text:"Then came sledding! Mia went first — whoosh! Isaiah went next — wheee! Questy squeezed on behind Isaiah, and Char rode in Questy's pocket.", img:sbImg('7/5') },
              { bg:G.snow, art:"😂❄️", text:"They zoomed down the hill, snow spraying everywhere. At the bottom, they tumbled into a soft pile, laughing so hard their tummies hurt.", img:sbImg('7/6') },
              { bg:G.cozy, art:"☕🦊", text:"Back inside with hot cocoa, Questy sighed happily. \"Snow is the most magical surprise,\" he said. \"I cannot wait for it to come back!\"", img:sbImg('7/7') },
            ]},
            {title:"Char's Big Adventure",hero:"🦎",tag:"Char Tale",ages:"Ages 4–7",pages:[
              { bg:G.garden, art:"🦎🔍", text:"Char the lizard was tiny — no bigger than Mia's hand. But today, as he stared at the huge backyard, he felt like an explorer.", img:sbImg('8/0') },
              { bg:G.garden, art:"🦎📢", text:"\"I am going on an adventure!\" he announced. Questy waved. \"Be careful, little buddy!\" Mia packed him a crumb of cookie for the road.", img:sbImg('8/1') },
              { bg:G.garden, art:"🦎🌿", text:"The grass was a towering green forest. Char pushed through the giant blades. Swish, swish! A ladybug the size of a bus waved hello.", img:sbImg('8/2') },
              { bg:G.soil, art:"🦎⛰️", text:"He climbed Mount Flowerpot — all the way to the top! From up there, he could see the whole yard. \"I am the king of the world!\" he squeaked.", img:sbImg('8/3') },
              { bg:G.soil, art:"🦎🚿", text:"Then he heard it — drip, drip. A garden hose had sprung a leak! To Char, it was a roaring waterfall. He took a brave shower underneath.", img:sbImg('8/4') },
              { bg:G.garden, art:"🦎💎", text:"In the sandbox desert, Char found ancient treasure: a shiny bottle cap! He polished it with his tail. \"A real jewel for my collection!\"", img:sbImg('8/5') },
              { bg:G.sunset, art:"🦎🌆", text:"But then the shadows grew long. The backyard suddenly felt very big. Char's tummy rumbled. Maybe adventure time was over.", img:sbImg('8/6') },
              { bg:G.night, art:"👧🦎", text:"He scampered home as fast as his little legs could carry him. \"You were so brave!\" said Mia, scooping him up. Char curled up, full of stories. Big adventures come in small packages.", img:sbImg('8/7') },
            ]},
            {title:"Mia and the Lost Puppy",hero:"👧",tag:"Mia Tale",ages:"Ages 4–7",pages:[
              { bg:G.meadow, art:"👧🐶", text:"On her walk home, Mia heard a tiny sound. Whimper... whimper. Behind the big oak tree sat a small brown puppy, all alone.", img:sbImg('9/0') },
              { bg:G.meadow, art:"👧🐶", text:"\"Oh, you poor thing!\" Mia said softly. The puppy's tail thumped. It had no collar, no tag — just big, worried eyes.", img:sbImg('9/1') },
              { bg:G.meadow, art:"👧🦊👦🦎", text:"Mia ran to get Questy, Isaiah, and Char. \"We have to help him find his home!\" The puppy licked Char's nose. Char giggled.", img:sbImg('9/2') },
              { bg:G.meadow, art:"🖍️📝", text:"They made \"FOUND PUPPY\" signs with crayons. Isaiah drew the puppy's floppy ears perfectly. They taped signs to every lamppost.", img:sbImg('9/3') },
              { bg:G.meadow, art:"📮🐶", text:"They walked the neighborhood, asking everyone. \"Have you lost a puppy?\" Mrs. Lee shook her head. Mr. Park shook his head too.", img:sbImg('9/4') },
              { bg:G.sunset, art:"🌅👦", text:"Just as the sun started to set, they heard a voice. \"Biscuit? BISCUIT!\" A little boy came running. The puppy's ears shot up!", img:sbImg('9/5') },
              { bg:G.sunset, art:"🐶👦", text:"\"Biscuit!\" The puppy zoomed into the boy's arms, tail wagging like crazy. \"Thank you for taking care of him!\" the boy said, hugging Mia.", img:sbImg('9/6') },
              { bg:G.sunset, art:"🌇👧", text:"Walking home, Mia felt warm all over. \"We did a good thing today,\" said Questy. Mia nodded. Helping feels better than anything.", img:sbImg('9/7') },
            ]},
            {title:"Isaiah's Rocket Ship",hero:"👦",tag:"Isaiah Tale",ages:"Ages 5–8",pages:[
              { bg:G.cozy, art:"👦📦", text:"Isaiah found the biggest cardboard box in the whole garage. His eyes sparkled. \"This is not a box,\" he announced. \"It is a ROCKET SHIP!\"", img:sbImg('10/0') },
              { bg:G.cozy, art:"🎨📦", text:"Mia painted flames on the sides. Questy stuck on shiny star stickers. Char contributed a bottle-cap control panel. \"Blast-off buttons!\" he squeaked.", img:sbImg('10/1') },
              { bg:G.cozy, art:"👦🧸", text:"Isaiah climbed in with his teddy bear co-pilot. \"Ten... nine... eight...\" everyone counted together. \"BLAST OFF!\" Whoosh!", img:sbImg('10/2') },
              { bg:G.sky, art:"☁️🚀", text:"In their imaginations, they soared past the clouds. Mia waved at the birds. \"Look how small our house is!\" Questy pressed his nose to the pretend window.", img:sbImg('10/3') },
              { bg:G.moon, art:"🌙🦎", text:"They landed on the moon with a soft bounce. Everything was gray and dusty and wonderful. Char took one giant leap for lizard-kind!", img:sbImg('10/4') },
              { bg:G.moon, art:"🌍👀", text:"\"Look!\" Isaiah pointed. Earth hung in the sky like a blue marble. \"That is where we live,\" Mia whispered. \"It is beautiful.\"", img:sbImg('10/5') },
              { bg:G.moon, art:"🧀🌙", text:"They collected moon rocks (gray pebbles), met a friendly moon mouse, and shared space snacks (cheese cubes). \"Best mission ever,\" said Questy.", img:sbImg('10/6') },
              { bg:G.cozy, art:"📦💭", text:"\"Time to come home,\" said Isaiah. They closed their eyes... and landed back in the garage. But in their hearts, they had really flown. Imagination can take you anywhere.", img:sbImg('10/7') },
            ]},
            {title:"The Great Camping Trip",hero:"🦊",tag:"Questy Tale",ages:"Ages 4–7",pages:[
              { bg:G.meadow, art:"👧🎒", text:"\"We are going camping!\" Mia cheered, stuffing her backpack. Tent? Check. Snacks? Double check. Flashlight? Triple check!", img:sbImg('11/0') },
              { bg:G.meadow, art:"⛺😅", text:"At the campsite, Isaiah and Questy wrestled with the tent poles. \"This goes... where?\" Pop! Up it sprang — a little lopsided, but standing!", img:sbImg('11/1') },
              { bg:G.sky, art:"👧🪨", text:"They hiked to the lake and skipped stones. Mia's stone skipped four times! Char tried to skip a stone but just made a big splash. Everyone laughed.", img:sbImg('11/2') },
              { bg:G.sunset, art:"🔥🍡", text:"As the sun set, they built a campfire. Crackle, pop! They roasted marshmallows until they were golden brown and gooey.", img:sbImg('11/3') },
              { bg:G.night, art:"🦊📖", text:"\"Tell a story!\" begged Isaiah. Questy told the tale of the brave little firefly. And right on cue — blink, blink! Real fireflies appeared!", img:sbImg('11/4') },
              { bg:G.night, art:"🦎✨", text:"Char's eyes went wide. He chased the fireflies, tongue out. \"Got one!\" he whispered, holding a jar with a blinking light inside. \"We will let it go in the morning,\" Mia promised.", img:sbImg('11/5') },
              { bg:G.moon, art:"🌌🦎", text:"They lay on the blanket and stared at the stars. \"That one looks like a lizard!\" Mia pointed. Char puffed up proudly.", img:sbImg('11/6') },
              { bg:G.night, art:"⛺😴", text:"Snuggled in their sleeping bags, Questy whispered, \"This was the best day.\" The crickets sang them to sleep. The end... until next adventure!", img:sbImg('11/7') },
            ]},
            {title:"Questy's Birthday Surprise",hero:"🦊",tag:"Questy Tale",ages:"Ages 4–7",pages:[
              { bg:G.cozy, art:"👧🤫", text:"\"Questy's birthday is tomorrow!\" Mia whispered to Isaiah. \"We have to make it the BEST surprise ever!\"", img:sbImg('12/0') },
              { bg:G.cozy, art:"🎂🎈", text:"While Questy napped, they got to work. Mia baked a cake (a little lopsided, very delicious-looking). Isaiah blew up balloons until his cheeks hurt.", img:sbImg('12/1') },
              { bg:G.cozy, art:"🦎🎨", text:"Char painted a banner. It read \"HAPPY BIRTHDAY QUESTY!\" in wobbly green letters. \"It is perfect,\" Mia said, \"because you made it.\"", img:sbImg('12/2') },
              { bg:G.cozy, art:"🎁🎁", text:"They wrapped presents: a shiny red ball from Mia, a comic book from Isaiah, and a smooth lucky stone from Char.", img:sbImg('12/3') },
              { bg:G.cozy, art:"🦊😴", text:"The next morning, Questy yawned and stretched. \"Isn't it a lovely day?\" he said, not suspecting a thing. Mia and Isaiah exchanged giggly glances.", img:sbImg('12/4') },
              { bg:G.cozy, art:"🎉🦊", text:"\"SURPRISE!\" they shouted when he walked into the living room! Balloons! Banner! Cake! Questy's jaw dropped. \"For... me?\"", img:sbImg('12/5') },
              { bg:G.cozy, art:"🪑🦎", text:"They played party games all afternoon. Char won musical chairs by hiding under a chair. Questy laughed until his sides ached.", img:sbImg('12/6') },
              { bg:G.cozy, art:"🦊💛", text:"\"This is the happiest birthday ever,\" Questy said, hugging everyone tight. \"Not because of the presents — because of my friends.\" Surprises are sweet, but friends are sweeter.", img:sbImg('12/7') },
            ]},
            {title:"Mia's Garden",hero:"👧",tag:"Mia Tale",ages:"Ages 4–7",pages:[
              { bg:G.garden, art:"👧🌱", text:"Mia held a tiny paper packet. Inside were seeds — smaller than freckles! \"We are going to grow a garden,\" she told Questy and Isaiah.", img:sbImg('13/0') },
              { bg:G.soil, art:"👧🕳️", text:"They dug little holes in the soft soil. Plop went each seed. \"Grow big and strong!\" Mia whispered to them. Char patted the soil flat with his tail.", img:sbImg('13/1') },
              { bg:G.garden, art:"💧🌱", text:"Every morning, Mia watered the garden. Drip, drop! \"Drink up, little seeds,\" she sang. Questy held the watering can when her arms got tired.", img:sbImg('13/2') },
              { bg:G.garden, art:"👧😟", text:"Days passed. Nothing happened. Mia frowned. \"Maybe they are broken?\" Isaiah shook his head. \"Growing takes time. Be patient.\"", img:sbImg('13/3') },
              { bg:G.dawn, art:"🌱🎉", text:"Then one morning — POP! Tiny green sprouts poked through the soil! \"They are alive!\" Mia cheered, dancing around the garden bed.", img:sbImg('13/4') },
              { bg:G.garden, art:"🦎🪲", text:"The sprouts grew taller every day. Leaves unfolded. Buds appeared. Char stood guard against hungry bugs. \"Not on my watch!\" he declared.", img:sbImg('13/5') },
              { bg:G.garden, art:"🌻🌈", text:"One sunny morning, the first flower opened — bright yellow and smiling at the sun! Then another... and another! The garden was a rainbow!", img:sbImg('13/6') },
              { bg:G.garden, art:"👧💐", text:"Mia picked a flower for everyone. \"You grew these with love and patience,\" said Questy. Mia beamed. Good things grow for those who wait.", img:sbImg('13/7') },
            ]},
            {title:"Isaiah and the Dinosaur Bone",hero:"👦",tag:"Isaiah Tale",ages:"Ages 5–8",pages:[
              { bg:G.garden, art:"👦⛏️", text:"Isaiah was digging in the dirt when — CLUNK! His shovel hit something hard. He pulled it out. It was long, white, and pointy!", img:sbImg('14/0') },
              { bg:G.garden, art:"👦🦴", text:"\"A DINOSAUR BONE!\" Isaiah shouted. Mia ran over. Questy's eyes went huge. \"It really looks like one!\" Char sniffed it carefully.", img:sbImg('14/1') },
              { bg:G.garden, art:"🔍🦴", text:"\"We need a real fossil dig!\" Isaiah declared. They got brushes, buckets, and magnifying glasses. The backyard became Dinosaur Discovery Park!", img:sbImg('14/2') },
              { bg:G.garden, art:"👧🖌️", text:"Mia brushed dirt gently off the \"bone.\" Questy mapped the dig site with sticks and string. \"Scientists are very careful,\" he said importantly.", img:sbImg('14/3') },
              { bg:G.garden, art:"🐚🦎", text:"They found more treasures: a curly shell, a smooth round stone, and a funny-shaped stick. \"This was a dinosaur's toothbrush!\" giggled Char.", img:sbImg('14/4') },
              { bg:G.garden, art:"🔍🤔", text:"Isaiah examined the big bone with his magnifying glass. Hmm... it had bark on one end. \"Wait a minute,\" he said slowly. \"Is this... a STICK?\"", img:sbImg('14/5') },
              { bg:G.garden, art:"😂🦴", text:"Everyone laughed! It WAS a stick — a very cool, bone-looking stick. \"The best fossil ever found in a backyard!\" Mia said, hugging him.", img:sbImg('14/6') },
              { bg:G.cozy, art:"👦🏆", text:"Isaiah kept his \"dinosaur bone\" on his shelf. \"Real scientists make mistakes too,\" he said proudly. \"The adventure is what matters!\" And he was right.", img:sbImg('14/7') },
            ]},
            {title:"Questy's Halloween Night",hero:"🦊",tag:"Questy Tale",ages:"Ages 4–7",pages:[
              { bg:G.night, art:"🦊🎃", text:"It was Halloween night, and the moon was big and round. Questy stared at his closet. \"What should I be?\" he wondered.", img:sbImg('15/0') },
              { bg:G.night, art:"👧⚔️", text:"Mia dressed up as a brave knight with a shiny cardboard sword. \"I will protect us from spooky things!\" she declared.", img:sbImg('15/1') },
              { bg:G.night, art:"👦🤖", text:"Isaiah was a friendly robot, all silver boxes and blinking lights. \"Beep boop!\" he said. \"I am a helpful robot!\"", img:sbImg('15/2') },
              { bg:G.night, art:"🦎👻", text:"Char wrapped himself in a white sheet. \"I am a ghost!\" he squeaked. \"A very small, very cute ghost!\" Everyone giggled.", img:sbImg('15/3') },
              { bg:G.night, art:"🦊🦸", text:"Questy chose to be a superhero, with a red cape that fluttered behind him. \"Super Questy, ready for candy!\" he announced proudly.", img:sbImg('15/4') },
              { bg:G.night, art:"🍬🏠", text:"They went door to door. \"Trick or treat!\" At each house, friendly neighbors dropped candy into their buckets. Char's bucket filled up fastest!", img:sbImg('15/5') },
              { bg:G.night, art:"🐈‍⬛🦊", text:"A black cat crossed their path and meowed. Questy jumped! But the cat just wanted a pet. \"Even spooky things can be friendly,\" Mia said.", img:sbImg('15/6') },
              { bg:G.cozy, art:"🍬🦊", text:"Back home, they sorted their candy and told stories. \"Best Halloween ever!\" Questy yawned, still wearing his cape. Friendly frights are the best frights.", img:sbImg('15/7') },
            ]},
            {title:"The Cast Takes a Plane Trip",hero:"🦊",tag:"Questy Tale",ages:"Ages 4–7",pages:[
              { bg:G.dawn, art:"👦🧳", text:"\"We are going on an airplane!\" Isaiah shouted, dragging his little suitcase. Mia clutched her backpack. Questy bounced with excitement.", img:sbImg('16/0') },
              { bg:G.sky, art:"✈️👀", text:"At the airport, they watched giant planes take off through the huge windows. \"That one is going to our adventure!\" Mia pointed.", img:sbImg('16/1') },
              { bg:G.sky, art:"🧳🔔", text:"Going through security was like a game. They put their bags on the belt and walked through the beeping arch. \"I did not beep!\" Char cheered.", img:sbImg('16/2') },
              { bg:G.sky, art:"✈️☁️", text:"On the plane, Mia got the window seat. Questy peeked over her shoulder. The plane rumbled... and then — whoosh! — they were in the sky!", img:sbImg('16/3') },
              { bg:G.sky, art:"☁️👀", text:"\"Look at the clouds!\" Mia pressed her nose to the window. They looked like fluffy white mountains. Char thought they looked like mashed potatoes.", img:sbImg('16/4') },
              { bg:G.sky, art:"🍪✈️", text:"The flight attendant brought snacks. Isaiah got pretzels. Questy got cookies. Char got a tiny cup of water and drank it very carefully.", img:sbImg('16/5') },
              { bg:G.sunset, art:"🌃✈️", text:"\"We are landing!\" The plane tilted down. Through the window, they saw a brand-new city with twinkling lights. \"A whole new adventure!\" Mia whispered.", img:sbImg('16/6') },
              { bg:G.sunset, art:"✈️🗺️", text:"Stepping off the plane, Questy took a deep breath. \"We flew through the sky like birds!\" he said. \"Where should we explore first?\" The end... until the next trip!", img:sbImg('16/7') },
            ]},
          
{title:'The New Kid on the Block',hero:'🏡',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.dawn,art:'🚚🦊👧👦',text:'A big moving truck rumbled down the street. \u201cSomeone new is moving in!\u201d said Mia, bouncing with excitement.', img:sbImg('22/0')},
              {bg:G.dawn,art:'👧📦👋',text:'A girl with curly hair in two puffs stepped out, hugging a box. \u201cHi! I am Zara,\u201d she said softly. \u201cWe just moved here.\u201d', img:sbImg('22/1')},
              {bg:G.meadow,art:'🦊🌸👧',text:'Questy picked the sunniest flower he could find. \u201cWelcome to our street, Zara!\u201d he said. Zara smiled a little bigger.', img:sbImg('22/2')},
              {bg:G.meadow,art:'🥁👧👀',text:'\u201cI brought my drum,\u201d said Zara. \u201cBack home, we danced every evening!\u201d Just then, three more faces peeked over the fence.', img:sbImg('22/3')},
              {bg:G.meadow,art:'👏🎶😄',text:'Zara taught everyone a clap-and-stomp rhythm. Clap, clap, STOMP! Soon the whole street was dancing and laughing.', img:sbImg('22/4')},
              {bg:G.sunset,art:'🌅🤝👧',text:'As the sun went down, Zara was not the new kid anymore. She was their friend. \u201cBest moving day ever,\u201d she whispered.', img:sbImg('22/5')},
              {bg:G.cozy,art:'🖼️👧💛',text:'That night, Zara hung up a drawing \u2014 her, Questy, Mia, Isaiah, and all her new friends. Home already felt like home.', img:sbImg('22/6')},
              {bg:G.night,art:'🌙👋✨',text:'From her window, Zara waved at the stars. Tomorrow would bring new adventures \u2014 with friends. The end... for now!', img:sbImg('22/7')}
            ]},
{title:'Friends\u2019 Potluck Picnic',hero:'🧺',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.meadow,art:'🧺🦊🌳',text:'\u201cA potluck picnic!\u201d announced Questy. \u201cEveryone brings a dish from their family. Then we all share!\u201d', img:sbImg('23/0')},
              {bg:G.meadow,art:'👵🍲😋',text:'Omar brought kibbeh his grandma made. \u201cMy teta says food tastes better when shared,\u201d he said proudly.', img:sbImg('23/1')},
              {bg:G.meadow,art:'🍛👧🎨',text:'Priya brought samosas and mango lassi. \u201cIn my family, we eat with our hands and share everything!\u201d she explained.', img:sbImg('23/2')},
              {bg:G.meadow,art:'🌮🥟🍗',text:'Tacos, dumplings, fried chicken, spring rolls \u2014 the blanket was covered with foods from all over the world!', img:sbImg('23/3')},
              {bg:G.meadow,art:'😋💃🦎',text:'Zara did a happy dance after her first dumpling. Char nibbled a crumb and did a lizard wiggle. Delicious!', img:sbImg('23/4')},
              {bg:G.meadow,art:'🥢😄👦',text:'Yuki taught Omar to use chopsticks. Plip! The dumpling fell. They both giggled and tried again.', img:sbImg('23/5')},
              {bg:G.sunset,art:'☁️😌🧺',text:'Full and happy, the friends watched the clouds drift by. \u201cMy favorite was... everything!\u201d said Isaiah.', img:sbImg('23/6')},
              {bg:G.sunset,art:'📸🎉🍽️',text:'\u201cSame time next year!\u201d they all cheered. Different foods, different families \u2014 one big picnic family. The end.', img:sbImg('23/7')}
            ]},
{title:'The Big Playground Build',hero:'🔨',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.dawn,art:'🏗️🔨👦',text:'The empty lot had a sign: FUTURE PLAYGROUND. \u201cWe get to help build it!\u201d said Mateo, lifting his toolbox.', img:sbImg('24/0')},
              {bg:G.meadow,art:'📋🦊👧',text:'Mateo unrolled his blueprint. \u201cSwings here, slide there, and a sandbox for Char!\u201d Everyone pointed and planned.', img:sbImg('24/1')},
              {bg:G.meadow,art:'🎨🖌️🌈',text:'Priya was in charge of colors. \u201cRainbow fence!\u201d she declared. Soon every plank was a different bright color.', img:sbImg('24/2')},
              {bg:G.meadow,art:'📏👧🦽',text:'Amara measured for the ramp. \u201cEveryone should be able to reach the top \u2014 including me!\u201d she said firmly.', img:sbImg('24/3')},
              {bg:G.meadow,art:'🪵🔨🦊',text:'Omar and Yuki carried boards. Questy hammered \u2014 bonk! \u2014 only one bent nail. \u201cGetting better!\u201d laughed Mia.', img:sbImg('24/4')},
              {bg:G.meadow,art:'🎶🔨💪',text:'Zara started a work song. Hammer, hammer, paint, paint! The work felt like play when they sang together.', img:sbImg('24/5')},
              {bg:G.sunset,art:'🛝🌅🎉',text:'And there it was \u2014 THEIR playground. Swings, slide, sandbox, and a ramp for everyone. They built it together.', img:sbImg('24/6')},
              {bg:G.sunset,art:'🎠😄🦽',text:'Amara zoomed down the ramp, arms in the air. \u201cAGAIN!\u201d she shouted. Best playground ever \u2014 because friends built it. The end.', img:sbImg('24/7')}
            ]},
{title:'Rainy Day Friends',hero:'🌧️',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.sky,art:'🌧️🪟😞',text:'Drip, drop, POUR. The park day was cancelled. \u201cNow what?\u201d sighed Isaiah, nose pressed to the window.', img:sbImg('25/0')},
              {bg:G.cozy,art:'📚👧🦽',text:'Amara pulled out a book. \u201cMy grandma tells the best rain stories,\u201d she said. \u201cThis one is about Anansi the spider!\u201d', img:sbImg('25/1')},
              {bg:G.cozy,art:'🕷️📖👀',text:'Questy acted out Anansi with eight wiggly arms. Everyone giggled. Stories from far away felt close in the cozy room.', img:sbImg('25/2')},
              {bg:G.cozy,art:'🏮🎨👧',text:'\u201cIn my family, we make lanterns for Diwali, the festival of lights!\u201d said Priya. Soon the room glowed with paper lanterns.', img:sbImg('25/3')},
              {bg:G.cozy,art:'🦢📄😄',text:'Yuki taught origami cranes. Omar\u2019s crane looked more like a potato. \u201cA potato crane!\u201d he announced. Everyone cheered.', img:sbImg('25/4')},
              {bg:G.cozy,art:'💃🌧️🎶',text:'\u201cWhen it rains, we dance!\u201d said Zara. They stomped and twirled until the floor shook with laughter.', img:sbImg('25/5')},
              {bg:G.cozy,art:'🏕️🔦🦎',text:'Mateo engineered the ultimate blanket fort. Inside, with flashlights and friends, the rain sounded like music.', img:sbImg('25/6')},
              {bg:G.night,art:'🌈🪟💛',text:'The rain stopped. A rainbow stretched across the sky. \u201cRainy days,\u201d said Mia, \u201care for visiting each other\u2019s worlds.\u201d The end.', img:sbImg('25/7')}
            ]},
{title:'Char\u2019s Birthday Party',hero:'🎂',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.dawn,art:'🤫🦎🎉',text:'\u201cShhh! It is Char\u2019s birthday tomorrow!\u201d whispered Mia. \u201cA surprise party!\u201d The friends nodded. Operation Party was on.', img:sbImg('26/0')},
              {bg:G.meadow,art:'🍰👦👵',text:'Omar and his teta baked a tiny cake \u2014 lizard-sized! \u201cOne strawberry on top,\u201d said Omar. \u201cChar loves strawberries.\u201d', img:sbImg('26/1')},
              {bg:G.meadow,art:'🎨🖐️🎂',text:'Priya made a banner with everyone\u2019s handprints. Zara\u2019s, Mateo\u2019s, Amara\u2019s, Yuki\u2019s, Omar\u2019s \u2014 and one tiny lizard print!', img:sbImg('26/2')},
              {bg:G.meadow,art:'🎩📏🦎',text:'Mateo engineered a tiny party hat. He measured the sleeping Char very, very carefully. \u201cPerfect fit,\u201d he whispered.', img:sbImg('26/3')},
              {bg:G.meadow,art:'🎶✨👦',text:'Zara planned the drum parade. Yuki caught fireflies for living lanterns. Every friend had a special job.', img:sbImg('26/4')},
              {bg:G.sunset,art:'🎉😲🦎',text:'\u201cSURPRISE!\u201d Char woke up to banners, cake, music, and all his friends. His little lizard eyes went wide with joy.', img:sbImg('26/5')},
              {bg:G.sunset,art:'🎂🎩🎶',text:'Char wore his tiny hat and nibbled his strawberry cake. Everyone sang \u2014 Zara drummed along. Best birthday ever!', img:sbImg('26/6')},
              {bg:G.night,art:'💛🦎🌙',text:'That night, Char fell asleep surrounded by birthday cards. He dreamed of drums and cake and friends. The end.', img:sbImg('26/7')}
            ]},
{title:'The Lost Kite',hero:'🪁',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.sky,art:'🪁💨😄',text:'It was the perfect kite day \u2014 windy and bright. The friends\u2019 big rainbow kite was ready to fly!', img:sbImg('27/0')},
              {bg:G.sky,art:'🪁😲💨',text:'Up, up it went! Then WHOOSH \u2014 a giant gust! The string slipped right out of Isaiah\u2019s hands!', img:sbImg('27/1')},
              {bg:G.meadow,art:'🪁🌳😟',text:'The kite was stuck at the very top of the tallest tree. \u201cOh no,\u201d said Priya. \u201cHow do we get it down?\u201d', img:sbImg('27/2')},
              {bg:G.meadow,art:'💡📝🤔',text:'Mateo sketched ideas. \u201cWhat if we...\u201d Amara said, \u201cWhat if we ALL try something together?\u201d', img:sbImg('27/3')},
              {bg:G.meadow,art:'🧗🪜🤝',text:'Yuki climbed as high as safe. Omar reached with a long stick. Zara and Mia held a blanket below \u2014 just in case!', img:sbImg('27/4')},
              {bg:G.meadow,art:'🧥🔗💡',text:'\u201cTie our jackets together!\u201d said Amara. Sleeve to sleeve, they made the longest jacket-rope ever.', img:sbImg('27/5')},
              {bg:G.meadow,art:'🪁🎉🤗',text:'The kite wiggled free and floated right into the blanket! \u201cWE DID IT!\u201d they cheered. Teamwork wins!', img:sbImg('27/6')},
              {bg:G.sunset,art:'🪁🌅💪',text:'This time, everyone held the string together. The kite soared \u2014 because friends are stronger together. The end.', img:sbImg('27/7')}
            ]},
{title:'Friends\u2019 Art Show',hero:'🎨',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.dawn,art:'🖼️🎨🏫',text:'Today was the big art show! Each friend brought something they made. \u201cArt can be anything,\u201d said Priya.', img:sbImg('28/0')},
              {bg:G.cozy,art:'🌸🎨👧',text:'Priya made a rangoli \u2014 a flower pattern from colored sand. \u201cIn India, we make these to welcome happiness!\u201d', img:sbImg('28/1')},
              {bg:G.cozy,art:'🤖🔩👦',text:'Mateo built a robot from bottle caps and boxes. \u201cHis name is Captain Recycle,\u201d he announced. \u201cHe runs on imagination!\u201d', img:sbImg('28/2')},
              {bg:G.cozy,art:'🍂🌸👦',text:'Yuki\u2019s collage was made of leaves, bark, and pressed flowers. \u201cNature is the best art supply,\u201d he said softly.', img:sbImg('28/3')},
              {bg:G.cozy,art:'🥁🎨💃',text:'Zara painted music itself \u2014 drums, dancers, and rhythm in wild colors. You could almost hear it!', img:sbImg('28/4')},
              {bg:G.cozy,art:'🧵📚🦽',text:'Amara sewed a story quilt \u2014 each square a memory they shared. \u201cOur friendship,\u201d she said, \u201cstitched together.\u201d', img:sbImg('28/5')},
              {bg:G.cozy,art:'🍉🍊🎨',text:'Omar arranged fruit into a rainbow. \u201cArt you can eat!\u201d he grinned. It was almost too pretty to taste. Almost.', img:sbImg('28/6')},
              {bg:G.sunset,art:'🏆🎨🎉',text:'Families wandered, amazed. Six friends, six kinds of art. \u201cEveryone is an artist,\u201d said Mia, \u201cin their own way.\u201d The end.', img:sbImg('28/7')}
            ]},
{title:'The Community Garden',hero:'🌱',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.dawn,art:'🌱🏚️🦊',text:'Behind the community center was just dirt. \u201cWhat if we made a garden?\u201d said Questy, shaking seed packets.', img:sbImg('29/0')},
              {bg:G.garden,art:'📋🌱👧',text:'Everyone chose seeds from their family\u2019s traditions. \u201cMy grandma grows mint for tea,\u201d said Omar. \u201cI will plant mint!\u201d', img:sbImg('29/1')},
              {bg:G.garden,art:'🌿🌼🥕',text:'Mint, marigolds, carrots, tomatoes \u2014 the garden was becoming a map of all their families.', img:sbImg('29/2')},
              {bg:G.garden,art:'🌻🌿🦽',text:'Zara planted sunflowers. \u201cThey dance toward the sun, like me!\u201d Amara\u2019s raised bed was perfect for her herbs.', img:sbImg('29/3')},
              {bg:G.garden,art:'💧🦎😄',text:'They made a watering-can chain. Char rode on top like a captain. \u201cSteady!\u201d he squeaked. (Probably.)', img:sbImg('29/4')},
              {bg:G.summer,art:'🦋🌻🌱',text:'Weeks later \u2014 WOW. Sunflowers towered. Tomatoes glowed red. Butterflies danced over the marigolds.', img:sbImg('29/5')},
              {bg:G.summer,art:'🧺🍅🤝',text:'They filled baskets and shared with neighbors. Mrs. Chen got tomatoes. Mr. Garcia got mint. Everyone got something.', img:sbImg('29/6')},
              {bg:G.sunset,art:'🥗🌅💛',text:'They ate a salad from their own garden. \u201cWe grew this,\u201d said Yuki quietly. \u201cTogether.\u201d Best salad ever. The end.', img:sbImg('29/7')}
            ]},
{title:'A Friend Feels Left Out',hero:'💛',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.meadow,art:'⚽😞👦',text:'Everyone was playing soccer \u2014 everyone except Yuki. He sat on the bench, watching, feeling invisible.', img:sbImg('30/0')},
              {bg:G.meadow,art:'🦋😔🚶',text:'Yuki walked home alone. A butterfly landed beside him. \u201cAt least you see me,\u201d he whispered to it.', img:sbImg('30/1')},
              {bg:G.cozy,art:'🍽️💭👩',text:'That night Amara told her mom, \u201cYuki was quiet today.\u201d Her mom said, \u201cSometimes the quietest friend needs the loudest love.\u201d', img:sbImg('30/2')},
              {bg:G.dawn,art:'🤔👧👦',text:'Next morning Amara asked, \u201cDid anyone notice Yuki yesterday?\u201d The friends looked at each other. They had not.', img:sbImg('30/3')},
              {bg:G.meadow,art:'🐞💛😢',text:'They found Yuki watching ladybugs. \u201cI felt left out,\u201d he said quietly. \u201cWe are so sorry,\u201d said Mia. \u201cYou matter to us.\u201d', img:sbImg('30/4')},
              {bg:G.meadow,art:'🐞👀✨',text:'Yuki showed them the ladybugs\u2019 spots and wings. For the first time in days, his eyes sparkled. Friends listened.', img:sbImg('30/5')},
              {bg:G.meadow,art:'🏅🐞🎉',text:'They made Yuki the official Bug Captain \u2014 badge and all. \u201cEvery team needs someone who notices small things,\u201d said Mateo.', img:sbImg('30/6')},
              {bg:G.sunset,art:'🤗💛🌅',text:'From that day on, they all tried to notice. Because a good friend does not just play beside you \u2014 they SEE you. The end.', img:sbImg('30/7')}
            ]},
{title:'The Talent Show',hero:'🌟',tag:'Friends Tale',ages:'Ages 4\u20137',pages:[
              {bg:G.dawn,art:'🎭🌟😬',text:'The school talent show! Backstage, the friends were nervous AND excited. \u201cWe each do something from our family,\u201d said Zara.', img:sbImg('31/0')},
              {bg:G.cozy,art:'🥁💃🎶',text:'Zara drummed and danced, and soon the whole audience was clapping. Rhythm is a language everyone speaks!', img:sbImg('31/1')},
              {bg:G.cozy,art:'👨‍🍳🍲😋',text:'Omar cooked his teta\u2019s recipe on stage. The whole auditorium smelled amazing. \u201cFood is love you can taste!\u201d he said.', img:sbImg('31/2')},
              {bg:G.cozy,art:'💃🎨✨',text:'Priya danced a classical dance from India \u2014 graceful as flowing water. The audience watched, spellbound.', img:sbImg('31/3')},
              {bg:G.cozy,art:'⚙️🎈🎉',text:'Mateo\u2019s crazy machine clinked and clanked... and POPPED the balloon! The crowd roared. \u201cScience is magic!\u201d he bowed.', img:sbImg('31/4')},
              {bg:G.cozy,art:'📖🎤🦽',text:'Amara told Anansi\u2019s story, her voice strong and clear. You could hear a pin drop. Stories are superpowers.', img:sbImg('31/5')},
              {bg:G.cozy,art:'🌱🦋🎬',text:'Yuki showed a film of his garden growing \u2014 seeds to sunflowers, ladybugs to butterflies. Quiet... and beautiful.', img:sbImg('31/6')},
              {bg:G.night,art:'🌟🤝🎉',text:'For the finale, they all held hands and bowed. Six talents, six families, one friendship. The loudest cheer was for all of them. The end.', img:sbImg('31/7')}
            ]},
            {title:"Isaiah and Dad's Wrestling Time",hero:"👦",tag:"Isaiah Tale",ages:"Ages 4–7",pages:[
              { bg:G.cozy, art:"👦🛋️", text:"Saturday morning! Isaiah bounced out of bed and shouted, “DAD! It is WRESTLING TIME!” Dad stretched his arms wide. “Oh no! The champ is awake!”", img:sbImg('32/0') },
              { bg:G.cozy, art:"🛋️🤼", text:"They cleared the living room cushions and built a soft, squishy wrestling ring. “Remember the rules,” said Dad. “Gentle hands, silly moves, and lots of laughing.”", img:sbImg('32/1') },
              { bg:G.cozy, art:"👦💨", text:"Ding ding! Isaiah charged like a speedy little rhino. Dad wobbled and wibbled. “Whoa! Too strong!” he cried, flopping onto the pillows.", img:sbImg('32/2') },
              { bg:G.cozy, art:"🤣👦", text:"Dad tried his famous tickle tornado. Isaiah giggled so hard he could barely move! “No fair!” he laughed. “That is the silliest move ever!”", img:sbImg('32/3') },
              { bg:G.cozy, art:"✈️👦", text:"Then Dad lifted Isaiah high in the air like an airplane. “Flying Isaiah!” Zoom! They both landed in a giggly heap on the cushions.", img:sbImg('32/4') },
              { bg:G.cozy, art:"👦🏔️", text:"Isaiah saw his chance. He climbed up Dad's back like a mountain goat and shouted, “THE ISAIAH SLAM!” Dad made the biggest, most dramatic fall in history.", img:sbImg('32/5') },
              { bg:G.cozy, art:"👧3️⃣🏆", text:"Mia counted the pin: “One! Two! THREE!” Isaiah threw his arms in the air. “I AM THE CHAMPION!” Dad groaned happily from under the pillows.", img:sbImg('32/6') },
              { bg:G.cozy, art:"🤗💛", text:"Dad scooped Isaiah up for the biggest hug. “Best wrestling match ever,” he said. Isaiah grinned. “Same time next Saturday?” “You bet, champ.”", img:sbImg('32/7') }
            ]},
            {title:"Isaiah Learns Basketball: Practice Day",hero:"👦",tag:"Isaiah Tale",ages:"Ages 4–7",pages:[
              { bg:G.meadow, art:"👦🏀", text:"Isaiah held a brand-new basketball. Today was his very first practice! “I am going to learn EVERYTHING,” he told Questy.", img:sbImg('33/0') },
              { bg:G.meadow, art:"🏀⬇️", text:"Coach Dana clapped her hands. “First rule of basketball: dribble! Bounce the ball, don't carry it.” Isaiah tried. Boing! Boing! “Like this?”", img:sbImg('33/1') },
              { bg:G.meadow, art:"🤝🏀", text:"“Next: passing! Push the ball to your teammate, nice and easy.” Isaiah passed to Mia. She caught it! “Great pass!” cheered the coach.", img:sbImg('33/2') },
              { bg:G.meadow, art:"🎯🏀", text:"“Now shooting! Bend your knees, aim for the square, and follow through.” Isaiah's first shot bonked off the rim. “Again!” he said.", img:sbImg('33/3') },
              { bg:G.meadow, art:"🚶🏀", text:"Coach taught the trickiest rule: “No traveling! You cannot run with the ball — dribble or pass.” Isaiah practiced walking, then bouncing, then walking again.", img:sbImg('33/4') },
              { bg:G.meadow, art:"🔶🏀", text:"Drill time! Dribble around the cones, pass to a friend, take a shot. Isaiah went slower than everyone... but he did every step right!", img:sbImg('33/5') },
              { bg:G.meadow, art:"🏀🎉", text:"On his last try, Isaiah dribbled, stopped, aimed... SWISH! Nothing but net! The whole team cheered. “Did you SEE that?!” he shouted.", img:sbImg('33/6') },
              { bg:G.sunset, art:"⭐👦", text:"“You learned so much today,” said Coach Dana, handing him a practice star. Isaiah beamed. “Next stop: the big game!”", img:sbImg('33/7') }
            ]},
            {title:"Isaiah's Big Game",hero:"👦",tag:"Isaiah Tale",ages:"Ages 4–7",pages:[
              { bg:G.meadow, art:"👕7️⃣", text:"Game day! Isaiah pulled on his jersey — number 7! His team, the Lightning Foxes, huddled up. “Play hard, play fair, have fun!” said Coach Dana.", img:sbImg('34/0') },
              { bg:G.meadow, art:"🏀💨", text:"The whistle blew! Isaiah dribbled down the court, remembering: bounce, don't carry. He passed to his teammate Jayden. “Nice!” shouted Dad from the stands.", img:sbImg('34/1') },
              { bg:G.meadow, art:"⭐🛡️", text:"The other team scored first. Uh oh! But Isaiah's team did not give up. “Defense!” called Coach. Isaiah stuck his arms out wide like a starfish.", img:sbImg('34/2') },
              { bg:G.meadow, art:"🏀🎯", text:"Mia passed to Isaiah. He caught it, bent his knees, aimed for the square... SWISH! His first basket in a real game! The crowd went wild!", img:sbImg('34/3') },
              { bg:G.meadow, art:"⏱️😬", text:"Back and forth they went! Jayden scored, then the other team scored. The score was tied with one minute left. Isaiah's heart was pounding.", img:sbImg('34/4') },
              { bg:G.meadow, art:"🤝🏀", text:"Ten seconds left! Isaiah got the ball. He dribbled past one defender... and passed to his friend Amara, who was wide open. She shot...", img:sbImg('34/5') },
              { bg:G.meadow, art:"🎉🏆", text:"SWISH! The buzzer sounded! The Lightning Foxes WON! The whole team jumped up and down, cheering and hugging. “WE DID IT!”", img:sbImg('34/6') },
              { bg:G.sunset, art:"💛👦", text:"After the game, Isaiah's teammates lifted him up. “Best pass ever!” said Amara. Isaiah grinned at Dad. “Basketball is the BEST.”", img:sbImg('34/7') }
            ]},
            {title:"Mia Learns Gymnastics: First Class",hero:"👧",tag:"Mia Tale",ages:"Ages 4–7",pages:[
              { bg:G.cozy, art:"👧🤝", text:"Mia stood outside the gymnastics gym, holding Mom's hand tight. Her tummy felt fluttery. “What if I cannot do it?” she whispered.", img:sbImg('35/0') },
              { bg:G.cozy, art:"👩‍🏫💛", text:"Coach Priya smiled warmly. “Welcome, Mia! In gymnastics, we all start as beginners. Let's learn together.” Mia took a deep breath and stepped inside.", img:sbImg('35/1') },
              { bg:G.cozy, art:"🤸‍♀️😄", text:"First: forward rolls! Coach showed her how to tuck like a tiny roly-poly bug. Mia tried... and flopped sideways! Everyone giggled kindly, including Mia.", img:sbImg('35/2') },
              { bg:G.cozy, art:"✅🤸‍♀️", text:"“Tuck your chin, push with your legs!” Mia tried again. Roll... roll... She did it! “I rolled!” she cheered, popping up with a big smile.", img:sbImg('35/3') },
              { bg:G.cozy, art:"✈️⚖️", text:"Next was the balance beam — low and wide, just for beginners. Mia stepped on carefully, arms out like airplane wings. “Look at me!”", img:sbImg('35/4') },
              { bg:G.cozy, art:"😬⚖️", text:"She wobbled! “Whoa!” But she steadied herself and kept going, one careful step at a time. Coach clapped. “Wonderful balance, Mia!”", img:sbImg('35/5') },
              { bg:G.cozy, art:"🎡👧", text:"Then cartwheels! “Hands down, kick over!” Mia's first try was more of a cart-flop. Her second try? A real, wobbly, wonderful cartwheel!", img:sbImg('35/6') },
              { bg:G.sunset, art:"⭐👧", text:"At the end of class, Coach gave Mia a shiny sticker. “You were brave today,” she said. Mia's fluttery tummy was gone. “I cannot wait to come back!”", img:sbImg('35/7') }
            ]},
            {title:"Mia's Gymnastics Showcase",hero:"👧",tag:"Mia Tale",ages:"Ages 4–7",pages:[
              { bg:G.cozy, art:"👨‍👩‍👧‍👦🎪", text:"Today was the big day — the gymnastics showcase! Mia's family filled the front row: Mom, Dad, Isaiah, and even Questy with a tiny foam finger.", img:sbImg('36/0') },
              { bg:G.cozy, art:"🧘‍♀️💛", text:"Backstage, Mia's tummy felt fluttery again. Coach Priya knelt down. “Butterflies mean you care. Breathe with me: in... out. You are ready.”", img:sbImg('36/1') },
              { bg:G.cozy, art:"🤸‍♀️✨", text:"Mia's name was called! She walked out and waved. The music started. First up: her forward roll sequence. Tuck, roll, pop up — perfect!", img:sbImg('36/2') },
              { bg:G.cozy, art:"⚖️💪", text:"Next, the balance beam. Mia stepped up, arms wide like airplane wings. Step... step... She felt steady and strong.", img:sbImg('36/3') },
              { bg:G.cozy, art:"😬💪", text:"Uh oh — a wobble! Mia's foot slipped a tiny bit. But she remembered: breathe, steady, keep going. She found her balance again!", img:sbImg('36/4') },
              { bg:G.cozy, art:"🎡🎡🎡", text:"Now the cartwheels! One... two... THREE cartwheels in a row, each one better than the last! The audience gasped and clapped.", img:sbImg('36/5') },
              { bg:G.cozy, art:"🌟👏", text:"For her finale, Mia struck her best pose — arms up high, biggest smile. “Ta-da!” The whole gym erupted in applause!", img:sbImg('36/6') },
              { bg:G.sunset, art:"🏅💛", text:"After the show, Isaiah ran up. “You were AMAZING!” Mom and Dad hugged her tight. Mia held her medal high. Being brave felt better than being perfect.", img:sbImg('36/7') }
            ]}
          ]}
];
        let sbShelf=-1,sbBook=-1,sbPage=0;
        const sbLib=()=>storybookShelves[sbShelf],sbBk=()=>storybookShelves[sbShelf].books[sbBook];
        function sbCoverHTML(s,b){const bk=storybookShelves[s].books[b];
          const coverImg=bk.pages&&bk.pages[0]&&bk.pages[0].img;
          const coverArt=coverImg
            ?`<img src="${coverImg}" alt="" aria-hidden="true" style="width:100%;height:130px;object-fit:cover;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.2)">`
            :`<span style="font-size:64px;line-height:1" aria-hidden="true">${bk.hero}</span>`;
          return `<button type="button" class="sb-cover" data-shelf="${s}" data-book="${b}" data-speak="${kqEsc(bk.title)}. ${kqEsc(bk.tag)}." aria-label="Open ${kqEsc(bk.title)}" style="background:linear-gradient(135deg,#fff8e7 0%,#ffefd2 100%);border:4px solid #8b5a2b;border-left:14px solid #8b5a2b;border-radius:6px 16px 16px 6px;padding:18px 14px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;gap:8px;min-height:230px;justify-content:center">
            ${coverArt}
            <span style="font-weight:800;font-size:1.15rem;color:#d35400;text-align:center;text-shadow:1px 1px 0 #fff3d6">${kqEsc(bk.title)}</span>
            <span style="font-size:.8rem;background:#8b5a2b;color:#fff;border-radius:20px;padding:3px 12px">${kqEsc(bk.tag)}</span>
            <span style="font-size:.8rem;color:#8b5a2b">${kqEsc(bk.ages)}</span>
            <span style="font-size:.9rem;color:#b07d3c">📖 Tap to open</span>
          </button>`;}
        function drawLibrary(){
          if(!Array.isArray(storybookShelves)){
            console.error('drawLibrary: storybookShelves is not an array:', typeof storybookShelves);
            panel.innerHTML='<div style="max-width:600px;margin:40px auto;text-align:center;color:#8b5a2b"><h2>📚 Story Books</h2><p>The library is not available right now.</p></div>';
            return;
          }
          panel.innerHTML=`<div style="max-width:900px;margin:0 auto;padding:8px">
            <h2 class="prompt" style="text-align:center">📚 Story Books</h2>
            <p style="text-align:center;color:#6b4f2e;max-width:560px;margin:0 auto 16px">Pick a book, turn the pages, and tap any page to hear it read aloud.</p>
            ${storybookShelves.map((sh,s)=>{
              if(!sh||!Array.isArray(sh.books)){
                console.error('drawLibrary: shelf '+s+' has no books array:', sh);
                return '';
              }
              return `<section aria-label="${kqEsc(sh.name)}" style="margin-bottom:26px">
              <h3 style="color:#4a2f18;border-bottom:3px solid #e8c87a;padding-bottom:6px"><span aria-hidden="true">${sh.emoji}</span> ${kqEsc(sh.name)}</h3>
              <p style="color:#8b6b45;margin:4px 0 12px">${kqEsc(sh.blurb)}</p>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px">${sh.books.map((_,b)=>sbCoverHTML(s,b)).join('')}</div>
            </section>`;}).join('')}
          </div>`;
          $$('.sb-cover',panel).forEach(c=>{c.addEventListener('click',()=>{sbShelf=+c.dataset.shelf;sbBook=+c.dataset.book;sbPage=0;drawReader();kqRecordTime();});});
        }
        function sbPageHTML(){const bk=sbBk(),pg=bk.pages[sbPage],n=bk.pages.length;
          const dots=Array.from({length:n},(_,i)=>`<span aria-hidden="true" style="display:inline-block;width:10px;height:10px;border-radius:50%;margin:0 3px;background:${i===sbPage?'#8b5a2b':'#d9c39a'}"></span>`).join('');
          return `<div style="max-width:640px;margin:0 auto">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px">
              <button type="button" class="sb-close" aria-label="Back to the library" style="font-size:1.1rem;font-weight:700;background:#8b5a2b;color:#fff;border:none;border-radius:12px;padding:8px 14px;cursor:pointer">📚 Library</button>
              <h2 style="margin:0;font-size:1.7rem;color:#d35400;text-align:center;flex:1;text-shadow:1px 2px 0 #fff3d6,-1px 1px 0 #a04000;letter-spacing:.5px;border-bottom:3px dashed #e8a838;padding-bottom:4px">${kqEsc(bk.title)}</h2>
              <button type="button" class="sb-read" aria-label="Read this page aloud" style="font-size:1.1rem;background:#4a7c3a;color:#fff;border:none;border-radius:12px;padding:8px 14px;cursor:pointer">🔊 Read to me</button>
            </div>
            <div id="sbBook" class="sb-book" tabindex="0" role="region" aria-label="${kqEsc(bk.title)}, page ${sbPage+1} of ${n}. Swipe or use arrow keys to turn pages." style="background:#fffdf4;border:6px solid #8b5a2b;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.22);overflow:hidden;touch-action:pan-y">
              <div id="sbPage" style="min-height:420px;display:flex;flex-direction:column">
                ${pg.img?`<div style="background:${pg.bg};text-align:center;padding:18px 12px" aria-hidden="true"><img src="${pg.img}" alt="" style="max-width:100%;max-height:360px;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,.25)"></div>`:`<div style="background:${pg.bg};font-size:88px;text-align:center;padding:44px 12px;line-height:1.2" aria-hidden="true">${pg.art}</div>`}
                <div class="kq-flavor-speak" data-speak="${kqEsc(pg.text)}" style="padding:26px 28px;font-size:1.35rem;line-height:1.65;color:#3a2a16;flex:1" title="Tap to hear this page">${kqEsc(pg.text)}</div>
                ${sbPage===n-1?'<div style="text-align:center;padding:0 0 14px;font-size:1.2rem;color:#8b5a2b">🎉 The End 🎉</div>':''}
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;gap:10px">
              <button type="button" class="sb-prev" aria-label="Previous page" ${sbPage===0?'disabled':''} style="font-size:1.4rem;background:${sbPage===0?'#e8dcc3':'#8b5a2b'};color:#fff;border:none;border-radius:12px;padding:10px 22px;cursor:${sbPage===0?'default':'pointer'}">◀</button>
              <div style="text-align:center" aria-live="polite"><div>${dots}</div><div style="color:#8b6b45;margin-top:4px">Page ${sbPage+1} of ${n}</div></div>
              <button type="button" class="sb-next" aria-label="Next page" ${sbPage===n-1?'disabled':''} style="font-size:1.4rem;background:${sbPage===n-1?'#e8dcc3':'#8b5a2b'};color:#fff;border:none;border-radius:12px;padding:10px 22px;cursor:${sbPage===n-1?'default':'pointer'}">▶</button>
            </div>
          </div>`;}
        function drawReader(){panel.innerHTML=sbPageHTML();bindReader();}
        function bindReader(){
          const bookEl=$('#sbBook',panel);if(!bookEl)return;
          $('.sb-close',panel).addEventListener('click',()=>{sbShelf=-1;sbBook=-1;drawLibrary();});
          $('.sb-read',panel).addEventListener('click',()=>{speak(sbBk().pages[sbPage].text);});
          $('.sb-prev',panel).addEventListener('pointerdown',e=>{e.preventDefault();turnPage(-1);});
          $('.sb-next',panel).addEventListener('pointerdown',e=>{e.preventDefault();turnPage(1);});
          let sx=0;
          bookEl.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
          bookEl.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)turnPage(dx<0?1:-1);},{passive:true});
        }
        function turnPage(dir){const bk=sbBk(),n=bk.pages.length,next=sbPage+dir;if(next<0||next>=n)return;
          const pageEl=$('#sbPage',panel);
          if(pageEl){pageEl.style.transition='opacity .1s ease,transform .1s ease';pageEl.style.opacity='0';pageEl.style.transform=`translateX(${dir>0?'-24px':'24px'})`;
            setTimeout(()=>{sbPage=next;drawReader();kqRecordTime();
              const np=$('#sbPage',panel);
              if(np){np.style.opacity='0';np.style.transform=`translateX(${dir>0?'24px':'-24px'})`;
                const raf=window.requestAnimationFrame||(cb=>setTimeout(cb,16));
                raf(()=>raf(()=>{np.style.transition='opacity .1s ease,transform .1s ease';np.style.opacity='1';np.style.transform='translateX(0)';}));}
            },110);
          }else{sbPage=next;drawReader();kqRecordTime();}
        }
        window.__sbKeyHandler=e=>{if(state.game!=='storybooks'||sbBook<0)return;
          if(e.key==='ArrowRight'){e.preventDefault();turnPage(1);}
          else if(e.key==='ArrowLeft'){e.preventDefault();turnPage(-1);}
          else if(e.key==='Escape'){sbShelf=-1;sbBook=-1;drawLibrary();}};
        document.addEventListener('keydown',window.__sbKeyHandler);
        drawLibrary();
        }catch(err){
          console.error('renderStorybooks failed:', err);
          if(panel) panel.innerHTML='<div style="max-width:600px;margin:40px auto;text-align:center;color:#8b5a2b"><h2>📚 Story Books</h2><p>Sorry, the library could not load. Please try again.</p></div>';
        }
      }
