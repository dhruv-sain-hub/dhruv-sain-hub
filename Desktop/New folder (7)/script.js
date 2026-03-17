document.addEventListener('DOMContentLoaded', () => {

    /* --- THEME TOGGLER --- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const root = document.documentElement;

    // Check Local Storage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        let currentTheme = root.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('ri-sun-fill');
            themeIcon.classList.add('ri-moon-fill');
        } else {
            themeIcon.classList.remove('ri-moon-fill');
            themeIcon.classList.add('ri-sun-fill');
        }
    }

    /* --- CUSTOM CURSOR --- */
    const cursorBlob = document.querySelector('.cursor-blob');
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');

    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            if(cursorBlob) {
                cursorBlob.style.left = `${e.clientX}px`;
                cursorBlob.style.top = `${e.clientY}px`;
            }
        });

        hoverElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                if(cursorBlob) cursorBlob.classList.add('hover-effect');
            });
            elem.addEventListener('mouseleave', () => {
                if(cursorBlob) cursorBlob.classList.remove('hover-effect');
            });
        });
    }

    /* --- MAGNETIC BUTTONS --- */
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    /* --- SCROLL REVEAL (Intersection Observer) --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

});
