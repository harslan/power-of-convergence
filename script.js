document.addEventListener('DOMContentLoaded', () => {
    // --- Slide Navigation Logic ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideEl = document.getElementById('currentSlide');
    let currentSlide = 1;
    const totalSlides = slides.length; // Use dynamic length

    function goToSlide(n) {
        // Remove active from all
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Set new active
        currentSlide = n;
        slides[currentSlide - 1].classList.add('active');
        dots[currentSlide - 1].classList.add('active');
        currentSlideEl.textContent = currentSlide;

        // Update buttons
        prevBtn.disabled = currentSlide === 1;
        nextBtn.disabled = currentSlide === totalSlides;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 1) goToSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.slide));
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentSlide > 1) goToSlide(currentSlide - 1);
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSlide < totalSlides) {
                // Swipe left - next slide
                goToSlide(currentSlide + 1);
            } else if (diff < 0 && currentSlide > 1) {
                // Swipe right - previous slide
                goToSlide(currentSlide - 1);
            }
        }
    }

    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.icon') : null;
    const html = document.documentElement;

    if (themeToggleBtn && themeIcon) {
        // Check for saved user preference, if any, on load of the website
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                themeIcon.textContent = '☀️'; // Sun icon to switch to light
                themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
            } else {
                themeIcon.textContent = '🌙'; // Moon icon to switch to dark
                themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
            }
        }
    }
});
