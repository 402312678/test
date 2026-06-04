ing · JS
/* loading.js — balloon pump, float, pop, redirect */
 
const body        = document.getElementById('balloonBody');
const shine       = document.getElementById('shine');
const knot        = document.getElementById('knot');
const stringEl    = document.getElementById('string');
const particles   = document.getElementById('particles');
const popFlash    = document.getElementById('popFlash');
const balloonWrap = document.getElementById('balloonWrap');
const loadText    = document.getElementById('loadText');
const progressFill= document.getElementById('progressFill');
 
// ── animation state ──────────────────────────────────────────────────────────
const PUMP_STEPS  = 18;       // how many "pump" keyframes
const PUMP_DELAY  = 120;      // ms between each step
const FLOAT_TIME  = 1400;     // ms of floating before pop
const REDIRECT_MS = 600;      // ms after pop before redirect
 
const labels = [
  'Getting your study space ready…',
  'Loading your subjects…',
  'Syncing your progress…',
  'Almost there…',
  'Ready! 🎉'
];
 
// ── helpers ───────────────────────────────────────────────────────────────────
function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; } // ease-in-out
 
function setAttr(el, attrs) {
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}
 
// ── pump sequence ─────────────────────────────────────────────────────────────
// Balloon grows from a flat line (rx=4,ry=5) to full size (rx=62,ry=72)
const START = { rx: 4, ry: 5 };
const END   = { rx: 62, ry: 72 };
 
// knot and shine also scale up
const KNOT_END  = { rx: 6, ry: 5 };
const SHINE_END = { rx: 14, ry: 10 };
 
let step = 0;
 
function pump() {
  if (step > PUMP_STEPS) {
    finishInflate();
    return;
  }
 
  const t  = ease(step / PUMP_STEPS);
  const rx = START.rx + (END.rx - START.rx) * t;
  const ry = START.ry + (END.ry - START.ry) * t;
 
  // balloon centre rises as it inflates (starts at y=190, ends at y=110)
  const cy = 190 - 80 * t;
 
  // fade in balloon
  const opacity = Math.min(t * 2, 1);
 
  setAttr(body, { cx: 100, cy, rx, ry, opacity });
 
  // shine (top-left highlight)
  const sRx = SHINE_END.rx * t;
  const sRy = SHINE_END.ry * t;
  setAttr(shine, { cx: 100 - rx * 0.28, cy: cy - ry * 0.28, rx: sRx, ry: sRy, opacity: 0.35 * t });
 
  // knot at bottom of balloon
  const kCy = cy + ry + 4;
  setAttr(knot, { cx: 100, cy: kCy, rx: KNOT_END.rx * t, ry: KNOT_END.ry * t, opacity });
 
  // string – appears once balloon is big enough
  if (t > 0.4) {
    const strY1 = kCy + 2;
    stringEl.setAttribute('d', `M100 ${strY1} Q93 ${strY1+18} 100 ${strY1+35}`);
    stringEl.setAttribute('opacity', (t - 0.4) / 0.6);
  }
 
  // label + progress
  const pct = Math.round((step / PUMP_STEPS) * 85);
  progressFill.style.width = pct + '%';
  const labelIdx = Math.min(Math.floor(t * (labels.length - 1)), labels.length - 2);
  loadText.textContent = labels[labelIdx];
 
  // squeeze effect every few steps (pump wobble)
  if (step > 0 && step % 3 === 0) {
    const squeezeRx = rx * 0.93;
    const squeezeRy = ry * 1.07;
    setAttr(body, { rx: squeezeRx, ry: squeezeRy });
    setTimeout(() => setAttr(body, { rx, ry }), PUMP_DELAY * 0.5);
  }
 
  step++;
  setTimeout(pump, PUMP_DELAY);
}
 
function finishInflate() {
  // show fully inflated — float gently
  progressFill.style.width = '95%';
  balloonWrap.classList.add('floating');
  loadText.textContent = labels[labels.length - 2];
 
  setTimeout(() => {
    popBalloon();
  }, FLOAT_TIME);
}
 
function popBalloon() {
  progressFill.style.width = '100%';
  loadText.textContent = labels[labels.length - 1];
 
  // hide balloon instantly
  body.setAttribute('opacity', 0);
  shine.setAttribute('opacity', 0);
  knot.setAttribute('opacity', 0);
  stringEl.setAttribute('opacity', 0);
  balloonWrap.classList.remove('floating');
 
  // scatter particles
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const parts = particles.querySelectorAll('circle');
  particles.setAttribute('opacity', 1);
 
  parts.forEach((p, i) => {
    const angle = (angles[i] * Math.PI) / 180;
    const dist  = 55 + Math.random() * 30;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    p.style.transition = 'none';
    p.setAttribute('cx', 100);
    p.setAttribute('cy', 110);
 
    // animate via JS since no WAAPI needed for simplicity
    let pStep = 0;
    const pSteps = 18;
    function animParticle() {
      if (pStep > pSteps) { p.setAttribute('opacity', 0); return; }
      const pt = pStep / pSteps;
      const eased = 1 - (1 - pt) * (1 - pt); // ease-out
      p.setAttribute('cx', 100 + tx * eased);
      p.setAttribute('cy', 110 + ty * eased - 20 * Math.sin(Math.PI * pt));
      p.setAttribute('opacity', 1 - pt);
      pStep++;
      requestAnimationFrame(animParticle);
    }
    requestAnimationFrame(animParticle);
  });
 
  // flash
  popFlash.classList.add('bang');
 
  setTimeout(() => {
    window.location.href = 'home.html';
  }, REDIRECT_MS + 300);
}
 
// ── start ─────────────────────────────────────────────────────────────────────
// Show balloon outlines immediately, then start pumping after a short pause
body.setAttribute('opacity', 0.01);
setTimeout(pump, 300);