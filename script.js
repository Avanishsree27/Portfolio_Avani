/* ====================================
   Portfolio - Animation Engine JS
   ==================================== */

// === NAVBAR: Scroll shrink effect ===
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === NAVBAR: Smooth scroll and close mobile menu ===
document.querySelectorAll('.nav-link, .navbar-brand').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show') && link.classList.contains('nav-link')) {
            new bootstrap.Collapse(navbarCollapse).hide();
        }
    });
});

// === SCROLL SPY: Highlight active nav link ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// === FLOATING PARTICLES in Hero ===
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#818cf8', '#ec4899', '#f59e0b', '#06b6d4', '#a78bfa'];
    for (let i = 0; i < 28; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 8 + 3;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation-duration: ${Math.random() * 10 + 6}s;
            animation-delay: ${Math.random() * 5}s;
            border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
        `;
        container.appendChild(p);
    }
}
createParticles();

// === SCROLL REVEAL: IntersectionObserver ===
function setupScrollReveal() {
    // Auto-add reveal classes to key elements
    const revealMap = [
        { selector: '#about .col-lg-5', cls: 'reveal-left' },
        { selector: '#about .col-lg-7', cls: 'reveal-right' },
        { selector: '#skills .skill-card', cls: 'reveal-up' },
        { selector: '#projects .project-card', cls: 'reveal-up' },
        { selector: '.timeline-item', cls: 'reveal-up' },
        { selector: '.achievement-card', cls: 'reveal-right' },
        { selector: '.cert-card', cls: 'reveal-up' },
        { selector: '.edu-card', cls: 'reveal-up' },
        { selector: '.section-title', cls: 'reveal-up animate-underline' },
        { selector: '.profile-badge', cls: 'reveal-up' },
    ];

    revealMap.forEach(({ selector, cls }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            cls.split(' ').forEach(c => el.classList.add(c));
            el.style.transitionDelay = (i * 0.1) + 's';
        });
    });

    // Observe all reveal elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade')
        .forEach(el => observer.observe(el));
}
setupScrollReveal();

// === COUNTER ANIMATION for About Stats ===
function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const suffix = el.dataset.suffix || '';
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        el.textContent = start + suffix;
    }, 16);
}

function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting && !e.target.dataset.counted) {
                e.target.dataset.counted = 'true';
                animateCounter(e.target, parseInt(e.target.dataset.target), 1600);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
}

// Wrap about stats in counter spans
document.querySelectorAll('#about .row.text-center .col-4 h3').forEach(el => {
    const raw = el.textContent.trim();
    const num = parseInt(raw);
    const suffix = raw.replace(num, '');
    el.innerHTML = `<span class="stat-number" data-target="${num}" data-suffix="${suffix}">0${suffix}</span>`;
});
setupCounters();

// === SKILL CARD 3D TILT on Mouse Move ===
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / rect.height) * 14;
        const rotY = (x / rect.width) * 14;
        card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// === TYPEWRITER for Hero Tagline ===
function typewriter(el) {
    if (!el) return;
    const text = el.textContent;
    el.textContent = '';
    el.style.opacity = '1';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = 'animation: glowPulse 0.8s ease infinite; color: #818cf8; font-weight:300;';
    el.appendChild(cursor);
    const timer = setInterval(() => {
        if (i >= text.length) {
            clearInterval(timer);
            setTimeout(() => cursor.remove(), 2000);
            return;
        }
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
    }, 30);
}

// Start typewriter after a short delay for the hero text
setTimeout(() => {
    const tagline = document.querySelector('.typewriter-text');
    if (tagline) typewriter(tagline);
}, 1200);

// === SMOOTH SECTION ENTRANCE using Reveal on hero elements ===
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero elements in on load
    setTimeout(() => {
        document.querySelectorAll('.reveal-left, .reveal-right').forEach((el, i) => {
            if (el.closest('#hero')) {
                setTimeout(() => el.classList.add('revealed'), i * 300);
            }
        });
    }, 200);
});

// === CERTIFICATE LIGHTBOX MODAL ===
document.addEventListener('DOMContentLoaded', () => {
    const certModal = document.getElementById('certModal');
    if (certModal) {
        certModal.addEventListener('show.bs.modal', (event) => {
            const trigger = event.relatedTarget;
            document.getElementById('certModalImg').src = trigger.getAttribute('data-img');
            document.getElementById('certModalLabel').textContent = trigger.getAttribute('data-title');
        });
    }
});

// === TOGGLE EXPERIENCE ===
function toggleExperience() {
    const extras = document.querySelectorAll('.extra-exp');
    const btn = document.getElementById('toggleExpBtn');
    const isHidden = extras[0].classList.contains('d-none');
    extras.forEach(el => el.classList.toggle('d-none', !isHidden));
    btn.innerHTML = isHidden
        ? 'Show Less Journey <i class="fas fa-chevron-up ms-1"></i>'
        : 'Show More Journey <i class="fas fa-route ms-1"></i>';
}

// === CERT CAROUSEL DOTS ===
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cert-flip-card');
    const dotsContainer = document.getElementById('certDots');
    if (!dotsContainer || !cards.length) return;

    // Build one dot per card
    cards.forEach((card, i) => {
        const dot = document.createElement('button');
        dot.className = 'cert-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Cert ${i + 1}`);
        dot.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('flipped'));
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            dotsContainer.querySelectorAll('.cert-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
        dotsContainer.appendChild(dot);
    });

    // Update active dot when a card is clicked/flipped
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            dotsContainer.querySelectorAll('.cert-dot').forEach((d, j) => {
                d.classList.toggle('active', j === i);
            });
        });
    });
});

// === CERT FLIP CARD 3D MOUSE TILT ===
document.querySelectorAll('.cert-flip-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        if (card.classList.contains('flipped')) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / rect.height) * 12;
        const rotY = (x / rect.width) * 12;
        card.querySelector('.cert-flip-inner').style.transform =
            `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('flipped')) {
            card.querySelector('.cert-flip-inner').style.transform = '';
        }
    });
    // Ensure inline style doesn't compete with CSS flip animation
    card.addEventListener('click', () => {
        card.querySelector('.cert-flip-inner').style.transform = '';
    });
});

// === SKILLS BUBBLES GENERATION ===
function createSkillsBubbles() {
    const container = document.getElementById('skillsBubbles');
    if (!container) return;
    
    // Bubble configuration
    const count = 15;
    const sizes = [40, 60, 80, 100, 120];
    
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('skill-bubble');
        
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 10;
        
        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
        `;
        
        container.appendChild(bubble);
    }
}
createSkillsBubbles();

// === EXPERIENCE STARS GENERATION ===
function createExpStars() {
    const container = document.getElementById('expStars');
    if (!container) return;
    
    const count = 40;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('exp-star');
        
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 2 + Math.random() * 4;
        const delay = Math.random() * 5;
        
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: ${top}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(star);
    }
}
createExpStars();
