      function safetyLine(){return `<p class="safety-line">Battery experiments are safe for kids. Only a grown-up touches outlets and plugs.</p>`;}
      function bindDragAndTap(parts,zones,onPlace){
        let dragging=null,moved=false,startX=0,startY=0;
        const resetPart=part=>{part.classList.remove('dragging');part.style.transform='';};
        parts.forEach(part=>{
          part.draggable=true;
          part.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',part.dataset.part));
          part.addEventListener('pointerdown',e=>{if(part.disabled)return;dragging=part;moved=false;startX=e.clientX;startY=e.clientY;part.setPointerCapture(e.pointerId);part.classList.add('dragging');});
          part.addEventListener('pointermove',e=>{if(!dragging||dragging!==part)return;const dx=e.clientX-startX,dy=e.clientY-startY;if(Math.hypot(dx,dy)>8)moved=true;if(moved)part.style.transform=`translate(${dx}px,${dy}px) scale(1.04)`;});
          part.addEventListener('pointerup',e=>{if(!dragging||dragging!==part)return;part.releasePointerCapture(e.pointerId);part.style.pointerEvents='none';const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-accept]');part.style.pointerEvents='';resetPart(part);if(target)onPlace(part,target);dragging=null;});
          part.addEventListener('pointercancel',()=>{if(dragging===part){resetPart(part);dragging=null;}});
          part.addEventListener('click',e=>{if(part.disabled||(moved&&e.detail>0))return;const match=zones.find(z=>!z.classList.contains('filled')&&z.dataset.accept===part.dataset.part);onPlace(part,match||zones.find(z=>!z.classList.contains('filled')));});
        });
        zones.forEach(zone=>{zone.addEventListener('dragover',e=>e.preventDefault());zone.addEventListener('drop',e=>{e.preventDefault();const part=parts.find(x=>x.dataset.part===e.dataTransfer.getData('text/plain')&&!x.disabled);if(part)onPlace(part,zone);});});
      }
