document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Navigation links functionality
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for hash links (internal navigation)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if it's a nav link
                if (this.classList.contains('nav-link')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                // Get the target section ID from href
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                // Smooth scroll to target section
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For external links (like .html files), let the default behavior happen
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);

        if (!isClickInsideNav && !isClickOnMenuBtn && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Button click handlers
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .btn-buy, .btn-download');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.textContent);
            
            if (this.textContent.includes('experimentar') || this.textContent.includes('Comprar agora')) {
                // Redireciona para a página do produto
                window.location.href = 'acai-liofilizado.html';
            } else if (this.textContent.includes('benefícios')) {
                // Scroll suave para a seção de benefícios
                const benefitsSection = document.querySelector('.benefits-section');
                if (benefitsSection) {
                    benefitsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (this.textContent.includes('veja mais receitas')) {
                // Redireciona para a página de receitas
                window.location.href = 'receitas.html';
            }
        });
    });

    // Adicionar observer para animar os cards quando entrarem na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observar os cards de benefícios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Animações da seção About
    setupAboutAnimations();

    // Active navigation highlight
    setupActiveNavigation();

    // Back to top button functionality
    setupBackToTop();

    // Header scroll effect
    setupHeaderScroll();
});

// Função para animações da seção About
function setupAboutAnimations() {
    // Observer para elementos da seção About
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    // Animar contadores
                    animateCounters();
                } else if (entry.target.classList.contains('values-list')) {
                    // Animar valores com delay
                    animateValues();
                }
            }
        });
    }, {
        threshold: 0.3
    });

    // Observar estatísticas e valores
    const statsSection = document.querySelector('.about-stats');
    const valuesSection = document.querySelector('.values-list');
    
    if (statsSection) aboutObserver.observe(statsSection);
    if (valuesSection) aboutObserver.observe(valuesSection);
}

// Função para animar contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 60; // Duração de ~1 segundo (60fps)
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target === 100) {
                    counter.textContent = Math.floor(current) + '+';
                } else if (target === 5) {
                    counter.textContent = Math.floor(current) + ' anos';
                }
                requestAnimationFrame(updateCounter);
            } else {
                // Valor final
                if (target === 100) {
                    counter.textContent = target + '+';
                } else if (target === 5) {
                    counter.textContent = target + ' anos';
                }
            }
        };
        
        updateCounter();
    });
}

// Função para animar valores
function animateValues() {
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 150); // Delay de 150ms entre cada item
    });
}

// Função para destacar navegação ativa
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section, main');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
}

// Função para o botão "voltar ao topo"
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Função para efeito do header no scroll
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}