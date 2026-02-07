import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Canvas Animations
    initAnimations();

    // Theme Toggler (Placeholder for now, can extend later)
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        // Simple visual feedback
        themeBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => themeBtn.style.transform = 'rotate(0deg)', 500);
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
