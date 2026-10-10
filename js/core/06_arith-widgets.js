/* ══════════════════════════════════════════════════════════════════════
         Overnight arithmetic expansion: Leap Pads (addition), Dino Munch (subtraction),
         Array Bakery (multiplication), Fair Share (division).
         Hands-on K–3 arithmetic per the curriculum brief: add/subtract K–1,
         multiply 2–3, divide 3. The kid drags, taps and builds; no quiz shells.
         Standard lifecycle: correctThen() → score/adaptive → finishRound().
         Uniqueness: every problem registered in state.usedProblems.
         ══════════════════════════════════════════════════════════════════════ */

      /* ---------- shared widgets: number keypad + +/- stepper ---------- */
      function arithNumPadHTML(){
        const keys=[1,2,3,4,5,6,7,8,9,'C',0,'B'];
        return `<div class="arith-numpad" role="group" aria-label="Number keypad">
          <div class="arith-numdisplay" aria-live="polite"><span class="arith-numval arith-empty">?</span></div>
          <div class="arith-numkeys">`+keys.map(k=>{
            const lbl=k==='B'?'Backspace':k==='C'?'Clear':`Number ${k}`;
            const show=k==='B'?'⌫':String(k);
            return `<button class="kq-numkey${k==='B'||k==='C'?' arith-softkey':''}" type="button" data-k="${k}" data-speak="${lbl}" data-quiet-read="1" aria-label="${lbl}">${show}</button>`;
          }).join('')+`</div></div>`;
      }
      function arithNumPadWire(root,opts){
        opts=opts||{};
        const display=root.querySelector('.arith-numval');let val='';
        const maxDigits=opts.maxDigits||3;
        const draw=()=>{display.textContent=val||'?';display.classList.toggle('arith-empty',!val);if(opts.onChange)opts.onChange(val);};
        root.querySelectorAll('.kq-numkey').forEach(k=>k.addEventListener('click',()=>{
          if(state.locked)return;
          const d=k.dataset.k;
          if(d==='C')val='';
          else if(d==='B')val=val.slice(0,-1);
          else if(val.length<maxDigits)val+=d;
          beep('good');draw();
        }));
        draw();
        return{get value(){return val;},reset(){val='';draw();},setValue(v){val=String(v);draw();}};
      }
      function arithStepperHTML(id,max,aria){
        return `<div class="arith-stepper" id="${id}" role="group" aria-label="${aria||'Counter'}">
          <button class="arith-step-btn" type="button" data-d="-1" data-speak="one less" aria-label="One less">−</button>
          <span class="arith-step-val" aria-live="polite" tabindex="0" data-speak="My count: 0">0</span>
          <button class="arith-step-btn" type="button" data-d="1" data-speak="one more" aria-label="One more">+</button>
        </div>`;
      }
      function arithStepperWire(root,max){
        const valEl=root.querySelector('.arith-step-val');let v=0;
        const draw=()=>{valEl.textContent=v;valEl.dataset.speak=`My count: ${v}`;};
        root.querySelectorAll('.arith-step-btn').forEach(b=>b.addEventListener('click',()=>{
          if(state.locked)return;
          v=clamp(v+Number(b.dataset.d),0,max);beep('good');draw();
        }));
        draw();
        return{get value(){return v;},reset(){v=0;draw();},setValue(n){v=clamp(n,0,max);draw();}};
      }
      /* generic pointer-drag helper: press an item, slide over targets, release */
      function arithDrag(surface,opts){
        // opts: itemSel, targetSel, onHover(targetEl), onDrop(targetEl), onCancel()
        let active=false,started=false;
        const dropTargetFor=e=>{
          const el=document.elementFromPoint(e.clientX,e.clientY);
          return el&&el.closest?el.closest(opts.targetSel):null;
        };
        surface.addEventListener('pointerdown',e=>{
          const item=e.target.closest?e.target.closest(opts.itemSel):null;
          if(!item||item.dataset.locked||state.locked)return;
          e.preventDefault();
          active=true;started=false;
          try{surface.setPointerCapture(e.pointerId);}catch(err){}
          if(opts.onDown)opts.onDown(item,e);
        });
        surface.addEventListener('pointermove',e=>{
          if(!active)return;
          started=true;
          const t=dropTargetFor(e);
          if(opts.onHover)opts.onHover(t,e);
          if(opts.onDrag)opts.onDrag(t,e);
        });
        const finish=e=>{
          if(!active)return;active=false;
          const t=e.type==='pointercancel'?null:dropTargetFor(e);
          if(started&&t&&opts.onDrop)opts.onDrop(t,e);
          else if(opts.onTap)opts.onTap(e);
          if(opts.onUp)opts.onUp(e);
        };
        surface.addEventListener('pointerup',finish);
        surface.addEventListener('pointercancel',finish);
      }

      /* ══════════════════════════════════════════════════════════════════════
         Leap Pads (addition on the number line, K–1).
         Frog hops drag/tap/keyboard across lily pads: result-unknown (go),
         word problems, change-unknown (hops), start-unknown (back-hop).
         ══════════════════════════════════════════════════════════════════════ */
      const frogStories=[['Mia','marbles'],['Isaiah','stickers'],['Questy','acorns'],['a squirrel','nuts'],['a bunny','carrots'],['a sparrow','seeds']];
