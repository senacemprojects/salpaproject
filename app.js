// Projeto Salpa - Interactive functionality

document.addEventListener('DOMContentLoaded', function () {

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Article Access Button
    const articleBtn = document.getElementById('article-btn');
    if (articleBtn) {
        articleBtn.addEventListener('click', function () {
            // Show alert with information about accessing the article
            showArticleModal();
        });
    }

    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(
        '.feature-card, .result-card, .gallery-item, .contact-btn'
    );

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'var(--color-surface)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Contact button interactions
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Gallery item hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });
    });

    // Feature cards stagger animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.hero__actions .btn--primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.animation = 'pulse 1s infinite';
        });

        button.addEventListener('mouseleave', function () {
            this.style.animation = '';
        });
    });

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
        
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(20px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }

        /* Dark mode media query styles for header scroll effect */
        @media (prefers-color-scheme: dark) {
            .header.scrolled {
                background-color: rgba(38, 40, 40, 0.95) !important;
            }
        }
        
        [data-color-scheme="dark"] .header.scrolled {
            background-color: rgba(38, 40, 40, 0.95) !important;
        }
    `;
    document.head.appendChild(style);

    // Scroll progress indicator
    createScrollProgressIndicator();

    // Initialize tooltips for technical features
    initializeTooltips();

    // Add keyboard navigation support
    addKeyboardNavigation();
});

// Function to show article access modal
function showArticleModal() {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        padding: 32px;
        max-width: 500px;
        width: 100%;
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--color-card-border);
        position: relative;
        animation: slideIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 16px;">📄</div>
            <h3 style="color: var(--color-text); margin-bottom: 16px; font-size: var(--font-size-2xl);">
                Artigo Científico
            </h3>
            <p style="color: var(--color-text-secondary); margin-bottom: 24px; line-height: 1.5;">
                O artigo científico completo do Projeto Salpa está disponível para consulta acadêmica. 
                Entre em contato conosco para solicitar acesso ao documento técnico.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:projeto.aquapure@gmail.com?subject=Solicitação de Acesso ao Artigo Científico - Projeto Salpa" 
                   class="btn btn--primary" style="text-decoration: none;">
                    Solicitar por E-mail
                </a>
                <button onclick="closeModal()" class="btn btn--outline">
                    Fechar
                </button>
            </div>
        </div>
    `;

    // Add slide-in animation
    const slideInStyle = document.createElement('style');
    slideInStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(slideInStyle);

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Close modal when clicking backdrop
    backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
    // Image zoom
    document.querySelectorAll('.image-placeholder').forEach(function (container) {
        const img = container.querySelector('.zoom-img');
        if (!img) return;
        container.addEventListener('mousemove', function (e) {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 100;
            const y = (e.clientY - rect.top) / rect.height * 100;
            img.style.transform = `scale(1.3) translate(-${x - 50}%, -${y - 50}%)`;
        });
        container.addEventListener('mouseleave', function () {
            img.style.transform = 'scale(1) translate(0,0)';
        });
    });

    // Make closeModal globally accessible
    window.closeModal = function () {
        if (backdrop && backdrop.parentNode) {
            backdrop.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                backdrop.parentNode.removeChild(backdrop);
                delete window.closeModal;
            }, 300);
        }
    };

    // Add fade out animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeOutStyle);
}

// Function to create scroll progress indicator
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--color-primary);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Function to initialize tooltips
function initializeTooltips() {
    const techListItems = document.querySelectorAll('.tech-list li');
    const tooltips = {
        'Sistema de captura por fluido magnetoreológico (MRF)': 'Fluido inteligente que muda suas propriedades quando exposto a campos magnéticos',
        'Controle de vazão eletrônico': 'Sistema automatizado que regula o fluxo de água através da boia',
        'Monitoramento remoto via interface Next.js': 'Aplicação web moderna para controle e monitoramento à distância',
        'Ímãs de neodímio até 9.500 Gauss': 'Ímãs de terras raras com alta força magnética para captura eficiente',
        'Alimentação solar': 'Sistema sustentável de energia renovável',
        'Design de baixo custo': 'Projeto economicamente viável para implementação em larga escala',
        'Operação autônoma': 'Funcionamento independente sem necessidade de intervenção constante'
    };

    techListItems.forEach(item => {
        const text = item.textContent.trim();
        if (tooltips[text]) {
            item.title = tooltips[text];
            item.style.cursor = 'help';
        }
    });
}

// Function to add keyboard navigation support
function addKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'BUTTON' || this.tagName === 'A') {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
}