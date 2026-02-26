"use strict";
function getUrlQueries() {
    let queryStr = window.location.search.slice(1);
    let queries_1 = {};
    if (!queryStr) {
        return queries_1;
    }
    queryStr.split('&').forEach(function (queryStr) {
        let queryArr = queryStr.split('=');
        queries_1[queryArr[0]] = queryArr[1];
    });
    return queries_1;
}
const query_1 = getUrlQueries();
if (query_1.lang === "ja") {
    document.documentElement.lang = "ja";
    const elements = document.querySelectorAll("#move");
    for (const eleme of elements) {
        eleme.href = eleme.href + "?lang=ja";
    }
    const headElement = document.querySelector("head");
    const metaElements = headElement.querySelectorAll("meta");
    metaElements.forEach(function (metaElement) {
        if (metaElement.getAttribute("property") === "og:locale") {
            metaElement.setAttribute("content", "ja_JP");
        }
    });
}
if (query_1.lang) {
    if (query_1.lang === "ja") {
        fetch("https://tomocraft.github.io/lang.json")
            .then(response => response.json())
            .then(lang => {
                const elements = Array.from(document.body.querySelectorAll('*')).filter(element => lang.ja_JP[element.textContent]);
                for (const element of elements) {
                    try {
                        element.textContent = lang.ja_JP[element.textContent];
                    } catch (e) {
                    }
                }
                setTimeout(() => {
                    const elements = Array.from(document.body.querySelectorAll('*')).filter(element => lang.ja_JP[element.textContent]);
                    for (const element of elements) {
                        try {
                            element.textContent = lang.ja_JP[element.textContent];
                        } catch (e) {
                        }
                    }
                }, 1000);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

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

    // === Lightweight Particle Background ===
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 30;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.8 + 0.4;
                this.speedX = (Math.random() - 0.5) * 0.25;
                this.speedY = (Math.random() - 0.5) * 0.25;
                this.opacity = Math.random() * 0.25 + 0.03;
                this.hue = Math.random() > 0.7 ? 0 : 240;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                const theme = document.documentElement.getAttribute('data-theme');
                const lightness = theme === 'light' ? '35%' : '50%';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 60%, ${lightness}, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }
});