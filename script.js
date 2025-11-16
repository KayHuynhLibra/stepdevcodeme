// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Dark Mode Styles (if not in CSS) =====
if (!document.querySelector('style[data-theme]')) {
    const style = document.createElement('style');
    style.setAttribute('data-theme', 'dynamic');
    style.textContent = `
        [data-theme="dark"] {
            --text-primary: #ffffff;
            --text-secondary: #b0b0b0;
            --bg-primary: #1a1a1a;
            --bg-secondary: #2d2d2d;
        }
        [data-theme="dark"] .navbar {
            background: rgba(26, 26, 26, 0.95);
        }
        [data-theme="dark"] .nav-link {
            color: #ffffff;
        }
        [data-theme="dark"] .course-card {
            background: #2d2d2d;
            border-color: #404040;
        }
        [data-theme="dark"] .course-title {
            color: #ffffff;
        }
        [data-theme="dark"] .course-description {
            color: #b0b0b0;
        }
        [data-theme="dark"] .tag {
            background: #404040;
            color: #667eea;
        }
    `;
    document.head.appendChild(style);
}

