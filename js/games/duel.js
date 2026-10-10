      let duelPower=0,duelDifficulty=0;

      /* Missing-number round type (folded in from Number Bonds 2026-10-01):
         every 3rd question hides one operand — "? + 5 = 12", "7 − ? = 4". */
      function duelMissingRound(p,i){
        let problem=p.problem,answer=p.answer;
        if(p.op==='+'){if(i%2){problem=`? + ${p.b} = ${p.answer}`;answer=p.a;}else{problem=`${p.a} + ? = ${p.answer}`;answer=p.b;}}
        else if(p.op==='−'){if(i%2){problem=`? − ${p.b} = ${p.answer}`;answer=p.a;}else{problem=`${p.a} − ? = ${p.answer}`;answer=p.b;}}
        else if(p.op==='×'){if(i%2){problem=`? × ${p.b} = ${p.answer}`;answer=p.a;}else{problem=`${p.a} × ? = ${p.answer}`;answer=p.b;}}
        else if(p.op==='÷'){problem=`${p.a} ÷ ? = ${p.answer}`;answer=p.b;}
        /* 'missing' problems already show a ? — keep them; count/fraction stay standard */
        return {problem,answer};
      }
      function renderDuel(){const p=makeArithmeticProblem('duel'),i=lessonIndex(),isMissing=(state.q%3===2&&['+','−','×','÷','missing'].includes(p.op)),mp=isMissing?duelMissingRound(p,i):null,answer=isMissing?mp.answer:p.answer,problem=isMissing?mp.problem:p.problem;panel.innerHTML=progressMarkup()+`<h2 class="prompt">${isMissing?'Can you find the missing number to cast a spell?':`Can you solve ${problem} to cast a spell?`}</h2>${isMissing?`<div class="visual-prompt">${problem}</div>`:''}<div class="duel-stage"><span>🧙‍♀️</span><span>⚡</span><span>🧙</span></div><div class="power-meter"><span style="width:${duelPower*20}%"></span></div><p style="text-align:center;color:var(--muted);font-weight:800">Spell power ${duelPower}/5</p><div class="answer-grid">${optionsFor(answer,Math.max(0,answer-8),answer+10).map(o=>`<button class="answer" type="button" data-value="${o}">${o}</button>`).join('')}</div>`;setProgress();$$('.answer',panel).forEach(btn=>btn.addEventListener('click',()=>{if(Number(btn.dataset.value)===answer){duelPower=Math.min(5,duelPower+1);if(duelPower>=3)duelDifficulty=Math.min(3,duelDifficulty+1);correctThen(renderDuel,btn);}else{duelPower=Math.max(0,duelPower-1);duelDifficulty=Math.max(0,duelDifficulty-1);wrong(btn);const guess=Number(btn.dataset.value);if(!Number.isNaN(guess))toast(guess<answer?'Too small — think bigger!':'Too big — think smaller!',false,1500);}}));}
