// Sidebar Toggle Functionality
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const body = document.body;

function toggleSidebar() {
    sidebar.classList.toggle('open');
    hamburger.classList.toggle('active');
}

function closeSidebarMenu() {
    sidebar.classList.remove('open');
    hamburger.classList.remove('active');
}

// Hamburger button click
if (hamburger) {
    hamburger.addEventListener('click', toggleSidebar);
}

// Close button click
if (closeSidebar) {
    closeSidebar.addEventListener('click', closeSidebarMenu);
}

// Close sidebar when a link is clicked
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebarMenu);
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            closeSidebarMenu();
        }
    }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeToggleSidebar = document.getElementById('themeToggleSidebar');
const body = document.body;

// Load theme preference from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeButtons('light');
}

function updateThemeButtons(mode) {
    if (themeToggle) {
        themeToggle.textContent = mode === 'dark' ? 'Light mode' : 'Dark mode';
    }
    if (themeToggleSidebar) {
        themeToggleSidebar.textContent = mode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

function toggleTheme() {
    const isLightMode = body.classList.toggle('light-mode');
    const theme = isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateThemeButtons(theme);
}

// Add event listeners to both theme toggle buttons
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleSidebar) {
    themeToggleSidebar.addEventListener('click', toggleTheme);
}

// Home link functionality
const homeLink = document.getElementById('home');
if (homeLink) {
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Welcome to home page');
    });
}

// Timer functionality
const timerButton = document.getElementById('timerButton');
const timerDisplay = document.getElementById('timer');

if (timerButton) {
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let isRunning = false;

    timerButton.addEventListener('click', function() {
        isRunning = !isRunning;
        timerButton.textContent = isRunning ? 'Pause' : 'Resume';

        if (isRunning) {
            const interval = setInterval(() => {
                if (timeLeft > 0 && isRunning) {
                    timeLeft--;
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    timerDisplay.textContent = 
                        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                } else if (timeLeft === 0) {
                    clearInterval(interval);
                    alert('Focus session complete! Time for a break.');
                    isRunning = false;
                    timeLeft = 25 * 60;
                    timerDisplay.textContent = '25:00';
                    timerButton.textContent = 'Start Timer';
                }
            }, 1000);
        }
    });
}
    
