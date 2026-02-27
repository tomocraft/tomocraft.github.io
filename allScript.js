"use strict";

// === Theme Initialization (Run immediately to prevent flash) ===
(function () {
    const savedTheme = localStorage.getItem('tomocraft-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', function () {
    // === Theme Toggle Listener ===
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('tomocraft-theme', next);
        });
    }

    // === Language Toggle Listener ===
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function () {
            const currentPath = window.location.pathname;
            if (currentPath.startsWith('/ja')) {
                localStorage.setItem('tomocraft-lang', 'en');
                window.location.href = currentPath.replace(/^\/ja/, '/en');
            } else if (currentPath.startsWith('/en')) {
                localStorage.setItem('tomocraft-lang', 'ja');
                window.location.href = currentPath.replace(/^\/en/, '/ja');
            } else {
                localStorage.setItem('tomocraft-lang', 'en');
                window.location.href = '/en/';
            }
        });
    }

    // === Hamburger Menu ===
    let menuOpen = false;
    const hamburgerButton = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const headerContainer = document.querySelector('.header__container');
    const pageTop = document.querySelector('.page-top');

    hamburgerButton.addEventListener('click', function () {
        hamburgerButton.classList.toggle('open');
        nav.classList.toggle('open');
        headerContainer.classList.toggle('menu-open');
        if (menuOpen) {
            menuOpen = false;
            document.documentElement.style.overflow = 'unset';
        } else {
            menuOpen = true;
            setTimeout(() => {
                if (menuOpen) {
                    document.documentElement.style.overflow = 'hidden';
                }
            }, 500);
        }
    });

    // === Scroll: Header bg + Page-top button ===
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= 50) {
            headerContainer.classList.remove('transparent');
        } else {
            headerContainer.classList.add('transparent');
        }
        if (window.pageYOffset >= 200) {
            pageTop.style.display = "block";
            if (pageTop.style.opacity > 0) {
                pageTop.style.opacity = 0;
            }
            pageTop.style.opacity = 1;
        } else {
            pageTop.style.opacity = 0;
            this.setTimeout(() => {
                if (window.pageYOffset >= 200) return;
                pageTop.style.display = "none";
            }, 5000);
        }
    });

    // === Intersection Observer: Fade-in sections ===
    const fadeElements = document.querySelectorAll('.fade-in-section');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

});