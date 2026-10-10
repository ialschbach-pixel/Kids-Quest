function renderCommonMath(){
  const grade = state.grade; // 0=K, 1, 2, 3
  const seenKey = 'kqCommonMathSeen';
  const statsKey = 'kqCommonMathStats'; // per-family accuracy + best scores
  const ROUND_LEN = 10;

  let seen = new Set();
  try { seen = new Set(JSON.parse(localStorage.getItem(seenKey) || '[]')); } catch(e) {}
  const saveSeen = () => { try { localStorage.setItem(seenKey, JSON.stringify([...seen].slice(-5000))); } catch(e) {} };

  let stats = { families: {}, bestPractice: 0, bestSprint: 0, roundsPlayed: 0 };
  try { Object.assign(stats, JSON.parse(localStorage.getItem(statsKey) || '{}')); } catch(e) {}
  const saveStats = () => { try { localStorage.setItem(statsKey, JSON.stringify(stats)); } catch(e) {} };
  const famAcc = (fam) => { const f = stats.families[fam]; return f && f.n >= 3 ? f.c / f.n : null; };
  const recordFam = (fam, ok) => {
    if (!stats.families[fam]) stats.families[fam] = { c: 0, n: 0 };
    stats.families[fam].n++; if (ok) stats.families[fam].c++;
    saveStats();
  };

  const R = (n) => Math.floor(Math.random() * (n + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ---- Strategy family classification ----
  // Order: zero -> one -> double -> make10 -> neardouble -> factfamily -> other
  function familyOf(op, a, b){
    if (op === 'add' || op === 'sub'){
      if (b === 0) return 'zero';
      if (b === 1) return 'one';
      if (op === 'add' && a === b) return 'double';
      if (op === 'add' && a + b === 10) return 'make10';
      if (op === 'add' && Math.abs(a - b) === 1 && Math.min(a, b) > 1) return 'neardouble';
      return 'other';
    }
    if (op === 'mul'){
      if (b === 0 || b === 1 || a === 0 || a === 1) return 'zero-one';
      if (a === b) return 'double';
      return 'other';
    }
    return 'factfamily'; // division always pairs with multiplication
  }

  // ---- Strategy hint text per problem (R1: the game teaches, not just tests) ----
  function strategyHint(p){
    const { op, a, b, answer } = p;
    if (grade === 0){
      // K: count on from the bigger number
      if (op === 'add'){
        if (b === 0 || a === 0) return `Adding zero keeps the number the same: ${a} + ${b} = ${answer}.`;
        const big = Math.max(a, b), small = Math.min(a, b);
        const steps = []; for (let i = 1; i <= small; i++) steps.push(big + i);
        return `Count on from the bigger number: start at ${big}, then ${steps.join(', ')}.`;
      } else {
        if (b === 0) return `Taking away zero keeps the number the same: ${a} − ${b} = ${answer}.`;
        return `Count back from ${a}: take away ${b} one at a time.`;
      }
    }
    if (grade === 1){
      // Grade 1: the five 1.OA.C.6 strategies
      if (op === 'add'){
        if (a + b > 10 && (a === 8 || a === 9 || b === 8 || b === 9)){
          const m = a >= b ? a : b, n = a >= b ? b : a;
          const toTen = 10 - m, rest = n - toTen;
          return `Make 10 first: ${m} + ${n} = ${m} + ${toTen} + ${rest} = 10 + ${rest} = ${answer}.`;
        }
        if (a === b) return `Doubles are fast: ${a} + ${a} = ${answer}.`;
        if (Math.abs(a - b) === 1 && Math.min(a, b) > 1){
          const d = Math.min(a, b);
          return `Near-double: you know ${d} + ${d} = ${d * 2}, so one more is ${answer}.`;
        }
        const big = Math.max(a, b), small = Math.min(a, b);
        return `Count on from ${big}: ${Array.from({length: small}, (_, i) => big + i + 1).join(', ')}.`;
      } else {
        if (a > 10 && b > 0 && b >= a - 10){
          const toTen = a - 10, rest = b - toTen;
          return `Break it down: ${a} − ${b} = ${a} − ${toTen} − ${rest} = 10 − ${rest} = ${answer}.`;
        }
        return `Think addition: ${b} + ? = ${a}. What plus ${b} makes ${a}?`;
      }
    }
    if (grade === 2){
      if ((op === 'add' || op === 'sub') && (a >= 10 || b >= 10)){
        const at = Math.floor(a / 10) * 10, ao = a % 10, bt = Math.floor(b / 10) * 10, bo = b % 10;
        if (op === 'add') return `Split by place value: ${at} + ${bt} = ${at + bt}, and ${ao} + ${bo} = ${ao + bo}. Together: ${answer}.`;
        return `Split by place value: ${at} − ${bt} = ${at - bt}, then adjust the ones.`;
      }
      if (op === 'add' && a === b) return `Double it: ${a} + ${a} = ${answer}.`;
      if (op === 'mul') return `Groups of ${a}: ${Array.from({length: Math.min(b, 5)}, (_, i) => a * (i + 1)).join(', ')}${b > 5 ? '…' : ''}. That's ${b} groups of ${a}.`;
      return `Use what you know: break it into smaller facts.`;
    }
    // Grade 3
    if (op === 'div') return `Think multiplication: ${b} × ? = ${a}. What times ${b} makes ${a}?`;
    if (op === 'mul'){
      if (a > 5 && b > 5){
        const h1 = Math.floor(a / 2), h2 = a - h1;
        return `Break it apart: ${a} × ${b} = (${h1} × ${b}) + (${h2} × ${b}) = ${h1 * b} + ${h2 * b} = ${answer}.`;
      }
      return `Think of ${b} groups of ${a}.`;
    }
    return `Break it into parts you know, then put them together.`;
  }

  // ---- Problem generator (R2: sequenced by strategy family; R6: standards-calibrated) ----
  // pendingPairs: fact-family follow-ups scheduled within next few problems (R5)
  let pendingPairs = [];
  function genCandidate(){
    // R5: serve a scheduled fact-family pair first
    if (pendingPairs.length && Math.random() < 0.7){
      return pendingPairs.shift();
    }
    let p;
    if (grade === 0){
      // R6: K fluency bar is within 5; within-10 is stretch
      const within5 = Math.random() < 0.7;
      const max = within5 ? 5 : 10;
      if (Math.random() < 0.5){
        const a = R(max), b = R(max - a);
        p = { op: 'add', a, b, answer: a + b, text: `${a} + ${b} = ?`, key: `k-add-${a}-${b}` };
      } else {
        const a = R(max), b = R(a);
        p = { op: 'sub', a, b, answer: a - b, text: `${a} − ${b} = ?`, key: `k-sub-${a}-${b}` };
      }
    } else if (grade === 1){
      if (Math.random() < 0.5){
        const a = R(20), b = R(20 - a);
        p = { op: 'add', a, b, answer: a + b, text: `${a} + ${b} = ?`, key: `1-add-${a}-${b}` };
      } else {
        const a = R(20), b = R(a);
        p = { op: 'sub', a, b, answer: a - b, text: `${a} − ${b} = ?`, key: `1-sub-${a}-${b}` };
      }
    } else if (grade === 2){
      const r = Math.random();
      if (r < 0.30){
        // R6: single-digit sums get dedicated emphasis (2.OA.B.2)
        const a = R(9), b = R(9);
        p = { op: 'add', a, b, answer: a + b, text: `${a} + ${b} = ?`, key: `2-add1-${a}-${b}` };
      } else if (r < 0.55){
        const a = R(100), b = R(100 - a);
        p = { op: 'add', a, b, answer: a + b, text: `${a} + ${b} = ?`, key: `2-add-${a}-${b}` };
      } else if (r < 0.80){
        const a = R(100), b = R(a);
        p = { op: 'sub', a, b, answer: a - b, text: `${a} − ${b} = ?`, key: `2-sub-${a}-${b}` };
      } else {
        const t = pick([2, 5, 10]), b = R(10);
        p = { op: 'mul', a: t, b, answer: t * b, text: `${t} × ${b} = ?`, key: `2-mul-${t}-${b}` };
      }
    } else {
      const r = Math.random();
      if (r < 0.25){
        const a = R(1000), b = R(1000 - a);
        p = { op: 'add', a, b, answer: a + b, text: `${a} + ${b} = ?`, key: `3-add-${a}-${b}` };
      } else if (r < 0.50){
        const a = R(1000), b = R(a);
        p = { op: 'sub', a, b, answer: a - b, text: `${a} − ${b} = ?`, key: `3-sub-${a}-${b}` };
      } else if (r < 0.75){
        const a = 2 + R(10), b = 2 + R(10);
        p = { op: 'mul', a, b, answer: a * b, text: `${a} × ${b} = ?`, key: `3-mul-${a}-${b}` };
      } else {
        const b = 2 + R(10), q = 2 + R(10), a = b * q;
        p = { op: 'div', a, b, answer: q, text: `${a} ÷ ${b} = ?`, key: `3-div-${a}-${b}` };
      }
    }
    p.family = familyOf(p.op, p.a, p.b);
    // R5: schedule the fact-family partner
    if (p.op === 'add' && Math.random() < 0.5){
      const subA = p.answer, subB = Math.random() < 0.5 ? p.a : p.b;
      pendingPairs.push({ op: 'sub', a: subA, b: subB, answer: subA - subB,
        text: `${subA} − ${subB} = ?`, key: `ff-sub-${subA}-${subB}`, family: 'factfamily' });
    } else if (p.op === 'mul' && grade === 3 && Math.random() < 0.5){
      pendingPairs.push({ op: 'div', a: p.answer, b: p.a, answer: p.b,
        text: `${p.answer} ÷ ${p.a} = ?`, key: `ff-div-${p.answer}-${p.a}`, family: 'factfamily' });
    }
    return p;
  }

  function genProblem(problemNum){
    for (let tries = 0; tries < 200; tries++){
      const p = genCandidate();
      if (p && !seen.has(p.key)){
        // R2: early problems bias toward anchor families (zero, one, double)
        if (problemNum < 4 && !['zero', 'one', 'double', 'zero-one', 'make10'].includes(p.family) && Math.random() < 0.6){
          continue; // re-roll toward an anchor family
        }
        return p;
      }
    }
    return null;
  }

  // ---- Game state ----
  let mode = 'practice'; // or 'sprint'
  let roundNum = 0, correct = 0, current = null, input = '';
  let missedOnce = false; // for scaffolded retry (R4)
  let sprintTimer = null, sprintLeft = 60, sprintCorrect = 0, sprintTotal = 0;
  const sprintUnlocked = stats.bestPractice >= 8;

  function nextProblem(){
    current = genProblem(roundNum);
    if (!current){
      seen = new Set(); saveSeen();
      toast('You did them all! Starting fresh.');
      pendingPairs = [];
      current = genProblem(roundNum);
    }
    seen.add(current.key); saveSeen();
    input = ''; missedOnce = false;
    draw();
  }

  function draw(){
    const el = panel;
    const sprintBadge = mode === 'sprint'
      ? `<div style="font-size:18px;font-weight:700;color:#e65100;">⏱ ${sprintLeft}s · ${sprintCorrect} correct</div>`
      : `<div style="font-size:14px;color:#888;">Problem ${roundNum + 1} of ${ROUND_LEN} · ${correct} correct</div>`;
    el.innerHTML = `
      <div style="max-width:520px;margin:0 auto;padding:24px;text-align:center;font-family:system-ui;">
        ${sprintBadge}
        <div style="font-size:64px;font-weight:700;margin:24px 0 8px;letter-spacing:2px;">${current ? current.text : ''}</div>
        <button id="cmHintBtn" style="font-size:15px;padding:8px 18px;border:2px solid #90caf9;border-radius:20px;background:#e3f2fd;color:#333;cursor:pointer;margin-bottom:12px;">💡 Show me how</button>
        <div id="cmHint" style="display:none;font-size:16px;background:#fff8e1;color:#333;border:2px solid #ffe082;border-radius:12px;padding:14px;margin:0 auto 12px;max-width:440px;text-align:left;line-height:1.5;"></div>
        <div id="cmInput" style="font-size:48px;font-weight:600;min-height:64px;margin:8px 0 16px;padding:12px;border:3px solid #ddd;border-radius:12px;background:#fafafa;color:#333;">${input || '&nbsp;'}</div>
        <div id="cmPad" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:320px;margin:0 auto;">
          ${[1,2,3,4,5,6,7,8,9].map(n => `<button data-n="${n}" style="font-size:28px;padding:18px;border:2px solid #ddd;border-radius:12px;background:#fff;color:#333;cursor:pointer;">${n}</button>`).join('')}
          <button data-n="clear" style="font-size:20px;padding:18px;border:2px solid #ddd;border-radius:12px;background:#fff3f3;color:#333;cursor:pointer;">⌫</button>
          <button data-n="0" style="font-size:28px;padding:18px;border:2px solid #ddd;border-radius:12px;background:#fff;color:#333;cursor:pointer;">0</button>
          <button data-n="go" style="font-size:20px;padding:18px;border:2px solid #4caf50;border-radius:12px;background:#e8f5e9;color:#333;cursor:pointer;font-weight:700;">✓</button>
        </div>
        <div id="cmFeedback" style="font-size:20px;min-height:32px;margin-top:16px;font-weight:600;"></div>
      </div>`;

    $('#cmHintBtn').onclick = () => {
      const h = $('#cmHint');
      const showing = h.style.display !== 'none';
      if (showing){ h.style.display = 'none'; $('#cmHintBtn').textContent = '💡 Show me how'; }
      else {
        h.innerHTML = strategyHint(current);
        h.style.display = 'block';
        $('#cmHintBtn').textContent = '💡 Hide';
        beep('tap');
        if (typeof speak === 'function' && grade <= 1) speak(strategyHint(current));
      }
    };

    el.querySelectorAll('#cmPad button').forEach(btn => {
      btn.onclick = () => {
        const n = btn.dataset.n;
        if (n === 'clear'){ input = input.slice(0, -1); }
        else if (n === 'go'){ checkAnswer(); return; }
        else if (input.length < 6){ input += n; }
        $('#cmInput').innerHTML = input || '&nbsp;';
        beep('tap');
      };
    });
    el.onkeydown = (e) => {
      if (e.key >= '0' && e.key <= '9' && input.length < 6){ input += e.key; $('#cmInput').innerHTML = input; }
      else if (e.key === 'Backspace'){ input = input.slice(0, -1); $('#cmInput').innerHTML = input || '&nbsp;'; }
      else if (e.key === 'Enter'){ checkAnswer(); }
    };
    el.tabIndex = 0; el.focus();
  }

  function checkAnswer(){
    if (!input || !current) return;
    const fb = $('#cmFeedback');
    const got = parseInt(input, 10);
    const ok = got === current.answer;
    recordFam(current.family, ok);

    if (ok){
      correct++;
      if (mode === 'sprint') sprintCorrect++;
      fb.textContent = '✓ Correct!'; fb.style.color = '#2e7d32';
      beep('good');
      kqRecord(true, 'math.operations');
      setTimeout(advance, mode === 'sprint' ? 600 : 900);
    } else {
      // R4: scaffolded retry — show the strategy, let them try again
      if (!missedOnce && mode === 'practice'){
        missedOnce = true;
        fb.innerHTML = 'Not quite — here\'s a way to think about it:';
        fb.style.color = '#e65100';
        const h = $('#cmHint');
        h.innerHTML = strategyHint(current);
        h.style.display = 'block';
        $('#cmHintBtn').textContent = '💡 Hide';
        if (typeof speak === 'function' && grade <= 1) speak(strategyHint(current));
        beep('bad');
        kqRecord(false, 'math.operations');
        input = ''; $('#cmInput').innerHTML = '&nbsp;';
        // They get one more try at the same problem
      } else {
        // Second miss (or sprint mode): show the worked answer
        fb.innerHTML = `The answer is ${current.answer}. ${strategyHint(current)}`;
        fb.style.color = '#c62828';
        beep('bad');
        kqRecord(false, 'math.operations');
        setTimeout(advance, 2200);
      }
    }
    if (mode === 'sprint') sprintTotal++;
  }

  function advance(){
    if (mode === 'sprint'){ nextProblem(); return; } // sprint: timer controls the round, just move on
    roundNum++;
    if (roundNum >= ROUND_LEN) endPracticeRound();
    else nextProblem();
  }

  function endPracticeRound(){
    stats.roundsPlayed++;
    if (correct > stats.bestPractice) stats.bestPractice = correct;
    saveStats();
    const el = panel;
    const newlyUnlocked = correct >= 8 && !sprintUnlocked;
    el.innerHTML = `
      <div style="max-width:520px;margin:0 auto;padding:48px 24px;text-align:center;font-family:system-ui;">
        <div style="font-size:48px;margin-bottom:16px;">${correct >= 8 ? '🌟' : correct >= 5 ? '👍' : '💪'}</div>
        <div style="font-size:32px;font-weight:700;margin-bottom:8px;">${correct} out of ${ROUND_LEN}</div>
        <div style="font-size:18px;color:#666;margin-bottom:16px;">${correct >= 8 ? 'Excellent work!' : correct >= 5 ? 'Good job — keep practicing!' : 'Keep going — practice makes perfect!'}</div>
        ${newlyUnlocked ? `<div style="font-size:18px;background:#fff3e0;color:#333;border:2px solid #ffb74d;border-radius:12px;padding:14px;margin-bottom:24px;">🏎 <b>Sprint unlocked!</b> 60 seconds — beat your own best.</div>` : ''}
        ${stats.roundsPlayed >= 2 && stats.roundsPlayed % 2 === 0 ? `<div style="font-size:15px;color:#888;margin-bottom:24px;">Great work today — come back tomorrow and see how much faster those facts feel. Spacing beats cramming!</div>` : ''}
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button id="cmAgain" style="font-size:20px;padding:16px 32px;border:none;border-radius:12px;background:#4caf50;color:#fff;cursor:pointer;font-weight:700;">Practice Again</button>
          ${(sprintUnlocked || correct >= 8) ? `<button id="cmSprint" style="font-size:20px;padding:16px 32px;border:none;border-radius:12px;background:#ff9800;color:#fff;cursor:pointer;font-weight:700;">🏎 Sprint (60s)</button>` : ''}
        </div>
      </div>`;
    $('#cmAgain').onclick = () => { roundNum = 0; correct = 0; nextProblem(); };
    const sp = $('#cmSprint');
    if (sp) sp.onclick = startSprint;
    KQ.tickets+=correct;KQsave();
  }

  function startSprint(){
    mode = 'sprint';
    sprintLeft = 60; sprintCorrect = 0; sprintTotal = 0;
    roundNum = 0;
    nextProblem();
    sprintTimer = setInterval(() => {
      sprintLeft--;
      const badge = panel.querySelector('div div');
      if (badge) badge.innerHTML = `⏱ ${sprintLeft}s · ${sprintCorrect} correct`;
      if (sprintLeft <= 0){
        clearInterval(sprintTimer);
        endSprint();
      }
    }, 1000);
  }

  function endSprint(){
    mode = 'practice';
    if (sprintCorrect > stats.bestSprint) stats.bestSprint = sprintCorrect;
    saveStats();
    const el = panel;
    const beat = sprintCorrect > 0 && sprintCorrect >= stats.bestSprint;
    el.innerHTML = `
      <div style="max-width:520px;margin:0 auto;padding:48px 24px;text-align:center;font-family:system-ui;">
        <div style="font-size:48px;margin-bottom:16px;">🏁</div>
        <div style="font-size:32px;font-weight:700;margin-bottom:8px;">${sprintCorrect} in 60 seconds!</div>
        <div style="font-size:18px;color:#666;margin-bottom:8px;">${sprintTotal} attempted · Best: ${stats.bestSprint}</div>
        <div style="font-size:18px;color:#666;margin-bottom:32px;">${beat ? 'New personal best! 🎉' : 'Can you beat your best next time?'}</div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button id="cmBackPractice" style="font-size:20px;padding:16px 32px;border:none;border-radius:12px;background:#4caf50;color:#fff;cursor:pointer;font-weight:700;">Practice</button>
          <button id="cmSprintAgain" style="font-size:20px;padding:16px 32px;border:none;border-radius:12px;background:#ff9800;color:#fff;cursor:pointer;font-weight:700;">Sprint Again</button>
        </div>
      </div>`;
    $('#cmBackPractice').onclick = () => { roundNum = 0; correct = 0; nextProblem(); };
    $('#cmSprintAgain').onclick = startSprint;
    KQ.tickets+=sprintCorrect;KQsave();
  }

  nextProblem();
}
