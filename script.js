(function() {
    'use strict';

    if (typeof emailjs !== 'undefined') {
        emailjs.init("FKlcLUbZedV_wNlJU");
    }

    const themeToggle = document.getElementById('theme-toggle');
    const nav = document.getElementById('nav');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .project-card').forEach(el => {
        observer.observe(el);
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const templateParams = {
            user_name: formData.get('user_name'),
            user_email: formData.get('user_email'),
            user_subject: formData.get('user_subject'),
            user_message: formData.get('user_message')
        };

        emailjs.send('service_kbnpjmy', 'template_8ta5ygc', templateParams)
            .then(() => {
                formMessage.textContent = 'Message sent successfully';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            })
            .catch(() => {
                formMessage.textContent = 'Message not sent (service error)';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
            });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const speed = 0.2;
        
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent);
            border-radius: 50%;
            position: fixed;
            top: -10px;
            left: -10px;
            pointer-events: none;
            z-index: 9999;
            transition: width 0.3s, height 0.3s, opacity 0.3s;
            opacity: 0.5;
        }
        
        .custom-cursor.hover {
            width: 40px;
            height: 40px;
            opacity: 0.8;
        }
        
        @media (max-width: 1024px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
})();