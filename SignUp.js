/* home.js */
 
// ===== SIDEBAR =====
const hamburger    = document.getElementById('hamburger');
const sidebar      = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
 
function openSidebar()  { sidebar.classList.add('open'); hamburger.classList.add('active'); }
function closeSidebarFn(){ sidebar.classList.remove('open'); hamburger.classList.remove('active'); }
 
hamburger   ?.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebarFn() : openSidebar());
closeSidebar?.addEventListener('click', closeSidebarFn);
 
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', () => { if (window.innerWidth <= 768) closeSidebarFn(); });
});
 
document.addEventListener('click', e => {
  if (window.innerWidth <= 768 && sidebar.classList.contains('open')
      && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    closeSidebarFn();
  }
});
 
// ===== THEME =====
const themeToggle        = document.getElementById('themeToggle');
const themeToggleSidebar = document.getElementById('themeToggleSidebar');
 
function applyTheme(mode) {
  document.body.classList.toggle('light-mode', mode === 'light');
  if (themeToggle)        themeToggle.textContent        = mode === 'light' ? '🌙 Dark'  : '☀️ Light';
  if (themeToggleSidebar) themeToggleSidebar.textContent = mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
}
 
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);
 
function toggleTheme() {
  const mode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
  applyTheme(mode);
}
themeToggle       ?.addEventListener('click', toggleTheme);
themeToggleSidebar?.addEventListener('click', toggleTheme);
 
// ===== SEARCH =====
const searchInput   = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
 
const cardData = Array.from(document.querySelectorAll('.card')).map(card => ({
  el: card,
  title: card.querySelector('h2')?.textContent || '',
  tags: card.dataset.title || ''
}));
 
searchInput?.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.style.display = 'none'; return; }
 
  const matches = cardData.filter(c =>
    c.title.toLowerCase().includes(q) || c.tags.toLowerCase().includes(q)
  );
 
  if (!matches.length) {
    searchResults.innerHTML = '<div class="search-result-item" style="color:var(--muted)">No results found</div>';
  } else {
    searchResults.innerHTML = matches.map(c =>
      `<div class="search-result-item" data-card="${c.title}">${c.title}</div>`
    ).join('');
    searchResults.querySelectorAll('.search-result-item').forEach((item, i) => {
      item.addEventListener('click', () => {
        matches[i].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        matches[i].el.style.boxShadow = '0 0 0 3px var(--accent)';
        setTimeout(() => matches[i].el.style.boxShadow = '', 1500);
        searchInput.value = '';
        searchResults.style.display = 'none';
      });
    });
  }
  searchResults.style.display = 'block';
});
 
document.addEventListener('click', e => {
  if (!searchResults.contains(e.target) && e.target !== searchInput) {
    searchResults.style.display = 'none';
  }
});
 
// ===== POMODORO TIMER =====
const timerDisplay  = document.getElementById('timer');
const timerLabel    = document.getElementById('timerLabel');
const timerButton   = document.getElementById('timerButton');
const timerReset    = document.getElementById('timerReset');
const sessionCount  = document.getElementById('sessionCount');
const ringFill      = document.getElementById('ringFill');
 
const CIRCUMFERENCE = 314; // 2 * PI * 50
const WORK_TIME  = 25 * 60;
const BREAK_TIME = 5  * 60;
 
let timeLeft   = WORK_TIME;
let isRunning  = false;
let isBreak    = false;
let sessions   = 0;
let interval   = null;
 
function updateRing(seconds, total) {
  const offset = CIRCUMFERENCE - (seconds / total) * CIRCUMFERENCE;
  ringFill.style.strokeDashoffset = offset;
  ringFill.style.stroke = isBreak ? '#22c55e' : '#3b82f6';
}
 
function formatTime(s) {
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}
 
function renderTimer() {
  timerDisplay.textContent = formatTime(timeLeft);
  const total = isBreak ? BREAK_TIME : WORK_TIME;
  updateRing(timeLeft, total);
}
 
function startTimer() {
  interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      renderTimer();
    } else {
      clearInterval(interval);
      isRunning = false;
      if (!isBreak) {
        sessions++;
        sessionCount.textContent = sessions;
        isBreak = true;
        timeLeft = BREAK_TIME;
        timerLabel.textContent = 'Break';
        timerButton.textContent = '▶ Start Break';
        showNotification('🎉 Focus session complete! Time for a 5-min break.');
      } else {
        isBreak = false;
        timeLeft = WORK_TIME;
        timerLabel.textContent = 'Focus';
        timerButton.textContent = '▶ Start';
        showNotification('💪 Break over! Ready for another session?');
      }
      renderTimer();
    }
  }, 1000);
}
 
timerButton?.addEventListener('click', () => {
  isRunning = !isRunning;
  if (isRunning) {
    startTimer();
    timerButton.textContent = '⏸ Pause';
  } else {
    clearInterval(interval);
    timerButton.textContent = '▶ Resume';
  }
});
 
timerReset?.addEventListener('click', () => {
  clearInterval(interval);
  isRunning = false;
  isBreak   = false;
  timeLeft  = WORK_TIME;
  timerLabel.textContent  = 'Focus';
  timerButton.textContent = '▶ Start';
  renderTimer();
});
 
renderTimer(); // initial render
 
// ===== NOTIFICATION TOAST =====
function showNotification(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '28px', right: '28px',
    background: 'var(--accent)', color: '#fff',
    padding: '14px 20px', borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    fontFamily: 'Inter, sans-serif', fontWeight: '600',
    fontSize: '14px', zIndex: '9999',
    animation: 'none', opacity: '1',
    maxWidth: '320px', lineHeight: '1.4'
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}