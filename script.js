// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeHeroParticles();
    initializeFormHandlers();
    initializeMobileMenu();
    initializeIntersectionObserver();
    
    // Enhanced features
    enhanceCTAButtons();
    enhanceProductShowcase();
    enhanceWhatsAppIntegration();
    enhanceFormValidation();
    enhanceAccessibility();
    initializeAnalytics();
    initializePerformanceMonitoring();
    
    // Performance optimizations
    optimizeImages();
    initializeParallaxEffects();
});

// Navigation Functions
function initializeNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for header styling
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.getElementById('header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Functions
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const icon = mobileMenuBtn.querySelector('i');
    
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const icon = mobileMenuBtn.querySelector('i');
    
    navMenu.classList.remove('active');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// Scroll Effects
function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animation Functions
function initializeAnimations() {
    // Enhanced hover effects for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .purchase-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Ensure elements start with proper initial state
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .fade-in-up');
    animatedElements.forEach(el => {
        // Force initial state to prevent flash of unstyled content
        if (!el.classList.contains('visible')) {
            el.style.visibility = 'visible';
        }
    });
}

// Hero Particles Animation
function initializeHeroParticles() {
    const particlesContainer = document.getElementById('hero-particles');
    
    if (particlesContainer) {
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            createParticle(particlesContainer, i);
        }
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 4 + 4;
    const animationDelay = Math.random() * 4;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = left + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = animationDuration + 's';
    particle.style.animationDelay = animationDelay + 's';
    
    container.appendChild(particle);
}

// Form Handlers
function initializeFormHandlers() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterForm && newsletterInput && newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletterSubmit);
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleNewsletterSubmit(e);
            }
        });
    }
    
    // WhatsApp integration
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Track WhatsApp click for analytics
            trackEvent('whatsapp_click', {
                button_location: getButtonLocation(button)
            });
        });
    });
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const input = document.querySelector('.newsletter-input');
    const button = document.querySelector('.newsletter-btn');
    const email = input.value.trim();
    
    if (!validateEmail(email)) {
        showEnhancedNotification('Por favor, insira um email válido.', 'error');
        input.focus();
        return;
    }
    
    // Show loading state
    const originalButtonContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showEnhancedNotification('🎉 Email cadastrado com sucesso! Em breve você receberá nossas novidades sobre superfoods.', 'success', 6000);
        input.value = '';
        
        // Reset button
        button.innerHTML = originalButtonContent;
        button.disabled = false;
        
        // Track newsletter signup
        trackEvent('newsletter_signup', { 
            email: email,
            source: 'footer_form',
            timestamp: new Date().toISOString()
        });
    }, 1500);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// FIXED Intersection Observer for Animations - No More Flickering!
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Single observer instance for all animations
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
                
                // CRITICAL: Immediately unobserve to prevent re-triggering
                scrollAnimationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements that need scroll animations
    const animatedElements = document.querySelectorAll(`
        .fade-in,
        .slide-in-left,
        .slide-in-right,
        .scale-in,
        .fade-in-up
    `);
    
    // Add staggered delays for better visual flow
    animatedElements.forEach((el) => {
        // Add staggered delay for elements in the same container
        const container = el.closest('.product-features, .benefits-grid, .usage-grid, .trust-grid, .purchase-options, .process-details');
        if (container) {
            const siblings = container.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .fade-in-up');
            const indexInContainer = Array.from(siblings).indexOf(el);
            if (indexInContainer > 0) {
                el.style.transitionDelay = (indexInContainer * 0.15) + 's';
            }
        }
        
        // Observe element for animation trigger
        scrollAnimationObserver.observe(el);
    });
    
    // Special handling for product mockup floating animation
    const productMockup = document.querySelector('.product-mockup');
    if (productMockup) {
        const productObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start the floating animation
                    productMockup.style.animation = 'productFloat 6s ease-in-out infinite';
                    productObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        productObserver.observe(productMockup);
    }
}

// Enhanced WhatsApp Integration
function enhanceWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], .whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get current product context for better messaging
            const productInfo = getProductContext();
            
            // Create personalized message based on user's current section
            let message = 'Olá! Tenho interesse no Açaí Liofilizado OverBerry. ' + productInfo;
            
            // Update href with enhanced message
            const originalHref = button.getAttribute('href');
            const phone = originalHref.match(/wa\.me\/(\d+)/)?.[1] || '5519999999999';
            const encodedMessage = encodeURIComponent(message);
            
            button.setAttribute('href', 'https://wa.me/' + phone + '?text=' + encodedMessage);
            
            // Track WhatsApp interaction
            trackEvent('whatsapp_click', {
                button_location: getButtonLocation(button),
                section: getCurrentSection(),
                message_type: productInfo
            });
        });
    });
    
    // Add WhatsApp button entrance animation
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (whatsappFloat) {
        setTimeout(() => {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'translateY(0)';
        }, 2000);
        
        // Initialize with hidden state
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'translateY(100px)';
        whatsappFloat.style.transition = 'all 0.5s ease-out';
    }
}

function getProductContext() {
    const currentSection = getCurrentSection();
    const contextMessages = {
        'home': 'Vi o site e me interessei pelo produto.',
        'produto': 'Gostaria de saber mais detalhes sobre o açaí liofilizado.',
        'beneficios': 'Me interessei pelos benefícios da liofilização.',
        'como-usar': 'Quero saber mais sobre formas de consumo.',
        'onde-comprar': 'Gostaria de fazer uma compra.'
    };
    
    return contextMessages[currentSection] || 'Gostaria de mais informações sobre o OverBerry.';
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 200;
    
    for (let section of sections) {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            return section.id;
        }
    }
    return 'home';
}

// Enhanced CTA Button Interactions with Ripple Effect
function enhanceCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button-hero, .cta-button-strong, .purchase-btn');
    
    ctaButtons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = 
                'position: absolute;' +
                'width: ' + size + 'px;' +
                'height: ' + size + 'px;' +
                'left: ' + x + 'px;' +
                'top: ' + y + 'px;' +
                'background: rgba(255, 255, 255, 0.5);' +
                'border-radius: 50%;' +
                'transform: scale(0);' +
                'animation: ripple 0.6s linear;' +
                'pointer-events: none;' +
                'z-index: 1;';
            
            // Ensure button has relative positioning for ripple
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Track CTA clicks
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                button_type: this.className,
                section: getCurrentSection()
            });
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add CSS for ripple animation if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = 
            '@keyframes ripple {' +
            'to {' +
            'transform: scale(2);' +
            'opacity: 0;' +
            '}' +
            '}';
        document.head.appendChild(style);
    }
}

// Product Showcase Enhancements
function enhanceProductShowcase() {
    const productMockup = document.querySelector('.product-mockup');
    
    if (productMockup) {
        // Add 3D tilt effect on mouse move
        productMockup.addEventListener('mousemove', (e) => {
            const rect = productMockup.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            productMockup.style.transform = 
                'perspective(1000px) ' +
                'rotateX(' + rotateX + 'deg) ' +
                'rotateY(' + rotateY + 'deg) ' +
                'translateZ(20px)';
        });
        
        productMockup.addEventListener('mouseleave', () => {
            productMockup.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }
}

// Smooth Parallax Effects
function initializeParallaxEffects() {
    const hero = document.querySelector('.hero');
    const productGlow = document.querySelector('.product-glow');
    
    if (hero || productGlow) {
        const handleParallax = debounce(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = 'translateY(' + rate + 'px)';
            }
            
            if (productGlow) {
                const productSection = productGlow.closest('.section');
                if (productSection) {
                    const rect = productSection.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        productGlow.style.transform = 'translate(-50%, -50%) scale(' + (0.8 + progress * 0.4) + ')';
                    }
                }
            }
        }, 16);
        
        window.addEventListener('scroll', handleParallax);
    }
}

// Optimize Images and Performance
function optimizeImages() {
    // Implement lazy loading for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe lazy images if any
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Enhanced Error Handling and User Feedback
function showEnhancedNotification(message, type, duration) {
    type = type || 'info';
    duration = duration || 4000;
    
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    
    // Add icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = 
        '<i class="' + (icons[type] || icons.info) + '"></i>' +
        '<span>' + message + '</span>' +
        '<button class="notification-close">&times;</button>';
    
    // Style the notification
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.cssText = 
        'position: fixed;' +
        'top: 100px;' +
        'right: 20px;' +
        'background: ' + (colors[type] || colors.info) + ';' +
        'color: ' + (type === 'warning' ? '#000' : '#fff') + ';' +
        'padding: 1rem 1.5rem;' +
        'border-radius: 15px;' +
        'box-shadow: 0 15px 35px rgba(0,0,0,0.2);' +
        'z-index: 10000;' +
        'transform: translateX(100%);' +
        'transition: transform 0.4s ease-out;' +
        'max-width: 350px;' +
        'word-wrap: break-word;' +
        'display: flex;' +
        'align-items: center;' +
        'gap: 1rem;' +
        'font-family: "Poppins", sans-serif;' +
        'font-weight: 500;';
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = 
        'background: none;' +
        'border: none;' +
        'color: inherit;' +
        'font-size: 1.2rem;' +
        'cursor: pointer;' +
        'padding: 0;' +
        'margin-left: auto;' +
        'opacity: 0.8;' +
        'transition: opacity 0.3s ease;';
    
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.8';
    });
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after duration
    setTimeout(() => {
        hideNotification(notification);
    }, duration);
}

function hideNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }
}

// Advanced Form Validation
function enhanceFormValidation() {
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterInput) {
        // Real-time validation
        newsletterInput.addEventListener('input', (e) => {
            const email = e.target.value;
            const isValid = validateEmail(email);
            
            if (email.length > 0) {
                if (isValid) {
                    e.target.style.borderColor = '#28a745';
                    e.target.style.background = 'rgba(40, 167, 69, 0.1)';
                } else {
                    e.target.style.borderColor = '#dc3545';
                    e.target.style.background = 'rgba(220, 53, 69, 0.1)';
                }
            } else {
                e.target.style.borderColor = '';
                e.target.style.background = '';
            }
        });
        
        // Clear validation on focus
        newsletterInput.addEventListener('focus', (e) => {
            e.target.style.borderColor = 'var(--primary-purple)';
            e.target.style.background = 'rgba(91, 44, 135, 0.1)';
        });
    }
}

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add keyboard navigation for buttons
    const interactiveElements = document.querySelectorAll('button, a, input');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
                    e.preventDefault();
                    element.click();
                }
            }
        });
    });
    
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = 
        'button:focus, a:focus, input:focus {' +
        'outline: 2px solid var(--primary-purple);' +
        'outline-offset: 2px;' +
        '}' +
        '.sr-only {' +
        'position: absolute;' +
        'width: 1px;' +
        'height: 1px;' +
        'padding: 0;' +
        'margin: -1px;' +
        'overflow: hidden;' +
        'clip: rect(0, 0, 0, 0);' +
        'white-space: nowrap;' +
        'border: 0;' +
        '}';
    document.head.appendChild(style);
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        trackEvent('page_performance', {
            load_time: loadTime,
            dom_ready: perfData.domContentLoadedEventEnd - perfData.navigationStart,
            rating: loadTime <= 3000 ? 'fast' : loadTime <= 5000 ? 'average' : 'slow'
        });
    });
}

// Analytics
function initializeAnalytics() {
    // Track page views
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', debounce(() => {
        const scrollPercent = Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (scrollPercent % 25 === 0) {
                trackEvent('scroll_depth', { scroll_percent: scrollPercent });
            }
        }
    }, 100));
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', { seconds: timeSpent });
    });
}

// Utility Functions
function trackEvent(eventName, parameters) {
    parameters = parameters || {};
    
    // Integration with Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, parameters);
}

function getButtonLocation(button) {
    const section = button.closest('section');
    return section ? section.id || 'unknown' : 'unknown';
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const args = arguments;
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    updateActiveNavigation();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno
    });
});

// Progressive Web App Features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered successfully');
            })
            .catch((registrationError) => {
                console.log('ServiceWorker registration failed:', registrationError);
            });
    });
}

// Smooth scroll polyfill for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
}

// Initialize polyfill
smoothScrollPolyfill();