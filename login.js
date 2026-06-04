/* login.js — Sign In page only */
 
// ===== PASSWORD VISIBILITY =====
document.querySelectorAll('.eye-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.textContent = input.type === 'password' ? '👁' : '🙈';
  });
});
 
// ===== HELPERS =====
function setValid(input, errEl)       { input.classList.add('valid'); input.classList.remove('invalid'); if (errEl) errEl.textContent = ''; }
function setInvalid(input, errEl, msg){ input.classList.add('invalid'); input.classList.remove('valid'); if (errEl) errEl.textContent = msg; }
function isValidEmail(v)              { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
 
// ===== SIGN IN SUBMIT =====
document.getElementById('signinForm')?.addEventListener('submit', e => {
  e.preventDefault();
 
  const email    = document.getElementById('si-email');
  const password = document.getElementById('si-password');
  const msg      = document.getElementById('si-message');
  let valid = true;
 
  if (!isValidEmail(email.value.trim())) {
    setInvalid(email, document.getElementById('si-email-err'), 'Enter a valid email address');
    valid = false;
  } else {
    setValid(email, document.getElementById('si-email-err'));
  }
 
  if (password.value.length < 1) {
    setInvalid(password, document.getElementById('si-password-err'), 'Password is required');
    valid = false;
  } else {
    setValid(password, document.getElementById('si-password-err'));
  }
 
  if (!valid) return;
 
  msg.textContent = '';
  const btn = document.getElementById('signinBtn');
  btn.textContent = 'Signing in…';
  btn.disabled = true;
 
  // Replace with real backend auth
  setTimeout(() => { window.location.href = 'home.html'; }, 1200);
});