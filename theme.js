/**
 * Theme Switcher & Interactive Features
 * Handles dark/light mode toggle, scroll-to-top button, and scroll animations
 */

// ==================== THEME MANAGEMENT ====================
const themeToggle = {
    init() {
        this.createToggleButton();
        this.loadTheme();
        this.attachListeners();
    },

    createToggleButton() {
        const button = document.createElement('button');
        button.id = 'theme-toggle';
        button.className = 'theme-toggle-btn';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.innerHTML = `
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;

        const header = document.querySelector('header .container .right');
        if (header) {
            header.insertBefore(button, header.firstChild);
        }
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    },

    attachListeners() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.addEventListener('click', () => this.toggleTheme());
        }
    }
};

// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTop = {
    init() {
        this.createButton();
        this.attachListeners();
    },

    createButton() {
        const button = document.createElement('button');
        button.id = 'scroll-to-top';
        button.className = 'scroll-to-top-btn';
        button.setAttribute('aria-label', 'Scroll to top');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
        `;
        document.body.appendChild(button);
    },

    attachListeners() {
        const button = document.getElementById('scroll-to-top');

        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });

        // Scroll to top on click
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ==================== SCROLL ANIMATIONS ====================
const scrollAnimations = {
    init() {
        this.observeElements();
    },

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe sections and cards
        const elementsToAnimate = document.querySelectorAll('.step, .content-section, .guide-container > div, .personal-info, .course-info');
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
};

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
const smoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// ==================== INITIALIZE ALL FEATURES ====================
document.addEventListener('DOMContentLoaded', () => {
    themeToggle.init();
    scrollToTop.init();
    scrollAnimations.init();
    smoothScroll.init();

    console.log('🎨 Theme and interactive features loaded successfully!');
});
