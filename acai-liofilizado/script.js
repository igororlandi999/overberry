document.addEventListener('DOMContentLoaded', function() {
    // Mostrar loading screen
    showLoadingScreen();

    // Simular carregamento da página
    setTimeout(() => {
        hideLoadingScreen();
        initializeProductPage();
    }, 2000); // 2 segundos de loading para página do produto
});

// Função para mostrar o loading screen
function showLoadingScreen() {
    const loadingHTML = `
        <div id="overberry-loading" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #2d1b45 0%, #1e293b 100%);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
            <div style="text-align: center; max-width: 400px;">
                <!-- Brand -->
                <div style="font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 3rem;">
                    Over<span style="color: #4ade80;">Berry</span>
                </div>
                
                <!-- Berry Animation -->
                <div style="position: relative; width: 120px; height: 120px; margin: 0 auto 2rem;">
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #4c1d95, #7c3aed, #8b5cf6);
                        border-radius: 50%;
                        position: relative;
                        animation: berryPulse 2s ease-in-out infinite;
                        box-shadow: 0 0 30px rgba(124, 58, 237, 0.4);
                    ">
                        <div style="
                            position: absolute;
                            top: 15%;
                            left: 20%;
                            width: 25%;
                            height: 25%;
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 50%;
                            animation: berryShine 2s ease-in-out infinite;
                        "></div>
                        <div style="
                            position: absolute;
                            top: -8px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 20px;
                            height: 12px;
                            background: #22c55e;
                            border-radius: 10px 10px 5px 5px;
                        "></div>
                    </div>
                </div>
                
                <!-- Progress -->
                <div style="width: 100%; max-width: 300px; margin: 0 auto;">
                    <div style="
                        width: 100%;
                        height: 4px;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 2px;
                        overflow: hidden;
                        margin-bottom: 1rem;
                    ">
                        <div style="
                            height: 100%;
                            background: linear-gradient(90deg, #7c3aed, #4ade80);
                            border-radius: 2px;
                            width: 0%;
                            animation: loadProgress 2s ease-in-out forwards;
                        "></div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            @keyframes berryPulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 0 30px rgba(124, 58, 237, 0.4);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 0 40px rgba(124, 58, 237, 0.6);
                }
            }

            @keyframes berryShine {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.6; }
            }

            @keyframes loadProgress {
                0% { width: 0%; }
                70% { width: 85%; }
                100% { width: 100%; }
            }
        </style>
    `;

    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
}

// Função para esconder o loading screen
function hideLoadingScreen() {
    const loading = document.getElementById('overberry-loading');
    if (loading) {
        loading.style.opacity = '0';
        loading.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
}

// Função principal que inicializa a página do produto
function initializeProductPage() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
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
    }

    // Navigation links functionality
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle internal navigation (hash links)
            if (this.getAttribute('href').includes('#')) {
                const href = this.getAttribute('href');
                
                // Check if it's a link to the main page with hash
                if (href.includes('index.html#')) {
                    // Let the default behavior handle navigation to main page
                    return;
                }
                
                // Handle same-page navigation
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    // Close mobile menu if it's a nav link
                    if (this.classList.contains('nav-link')) {
                        navMenu.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });

    // Smooth scroll function
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
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

    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');

    if (newsletterForm && newsletterInput && newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email) {
                if (validateEmail(email)) {
                    // Simulate successful subscription
                    showNotification('✅ Obrigado! Você foi inscrito na nossa newsletter.', 'success');
                    newsletterInput.value = '';
                } else {
                    showNotification('❌ Por favor, insira um e-mail válido.', 'error');
                }
            } else {
                showNotification('❌ Por favor, insira seu e-mail.', 'error');
            }
        });

        // Handle Enter key in newsletter input
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.usage-card, .details-card, .ingredient-item, .step-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Product image hover effect
    const productImg = document.querySelector('.hero-product-img');
    if (productImg) {
        productImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        productImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Smooth scroll for all internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buySection = document.getElementById('buy-section');
            if (buySection) {
                buySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // Add click effects to buttons
    const allButtons = document.querySelectorAll('button, .btn-buy-ml, .btn-buy-whatsapp, .btn-buy-ml-large, .btn-buy-whatsapp-large');
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            // Add ripple animation CSS if not exists
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            // Ensure button has relative positioning for ripple
            const position = window.getComputedStyle(this).position;
            if (position === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Parallax effect for hero image
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-product-img');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Initialize AOS (Animate On Scroll) alternative
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.usage-card, .details-card, .step-item');
        
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            animateOnScroll.observe(el);
        });
    }

    // Initialize scroll animations
    initScrollAnimations();

    // Track page interactions (for analytics)
    let interactions = {
        pageViews: 1,
        buttonClicks: 0,
        scrollDepth: 0
    };

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (currentScroll > maxScroll) {
            maxScroll = currentScroll;
            interactions.scrollDepth = Math.round(maxScroll);
        }
    });

    // Track button clicks
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn-buy-ml') || e.target.classList.contains('btn-buy-whatsapp')) {
            interactions.buttonClicks++;
            console.log('Button clicked:', e.target.textContent.trim());
        }
    });

    console.log('OverBerry Product Page carregada com sucesso! 🫐');
    console.log('Funcionalidades ativas: Navegação, Animações, Newsletter, Efeitos Visuais');
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        min-width: 300px;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 300);
}