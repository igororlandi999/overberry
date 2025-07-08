// OverBerry - Enhanced JavaScript Functionality
// Versão 2.0 - Completamente otimizada e moderna

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Enhanced Configuration
    const CONFIG = {
        whatsappNumber: '5519999999999', // Substitua pelo número real
        whatsappMessage: 'Olá! Gostaria de comprar o OverBerry - Açaí em Pó 100% Puro. Podem me ajudar com informações sobre preço e entrega?',
        scrollOffset: 80,
        animationDelay: 100,
        intersectionThreshold: 0.1,
        carouselAutoplay: false,
        carouselInterval: 5000,
        darkModeKey: 'overberry-dark-mode',
        version: '2.0.0'
    };

    // Enhanced Utility Functions
    const utils = {
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        generateWhatsAppURL: function() {
            const encodedMessage = encodeURIComponent(CONFIG.whatsappMessage);
            return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
        },

        smoothScrollTo: function(element, offset = CONFIG.scrollOffset) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        },

        isInViewport: function(element, threshold = CONFIG.intersectionThreshold) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            return (
                rect.top <= windowHeight * (1 - threshold) &&
                rect.bottom >= windowHeight * threshold &&
                rect.left <= windowWidth * (1 - threshold) &&
                rect.right >= windowWidth * threshold
            );
        },

        formatCurrency: function(value) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        },

        createRipple: function(event, element) {
            const rect = element.getBoundingClientRect();
            const ripple = document.createElement('span');
            const diameter = Math.max(rect.width, rect.height);
            const radius = diameter / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
                width: ${diameter}px;
                height: ${diameter}px;
                left: ${event.clientX - rect.left - radius}px;
                top: ${event.clientY - rect.top - radius}px;
            `;

            if (getComputedStyle(element).position === 'static') {
                element.style.position = 'relative';
            }
            element.style.overflow = 'hidden';

            element.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    };

    // Scroll Progress Bar
    class ScrollProgress {
        constructor() {
            this.progressBar = document.querySelector('.scroll-progress');
            this.init();
        }

        init() {
            if (this.progressBar) {
                window.addEventListener('scroll', 
                    utils.throttle(this.updateProgress.bind(this), 10)
                );
            }
        }

        updateProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            
            this.progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        }
    }

    // Dark Mode Controller
    class DarkModeController {
        constructor() {
            this.toggle = document.getElementById('theme-toggle');
            this.body = document.body;
            this.currentTheme = localStorage.getItem(CONFIG.darkModeKey) || 'light';
            this.init();
        }

        init() {
            this.applyTheme(this.currentTheme);
            if (this.toggle) {
                this.toggle.addEventListener('click', this.toggleTheme.bind(this));
            }

            // Auto-detect system preference if no stored preference
            if (!localStorage.getItem(CONFIG.darkModeKey)) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    this.applyTheme('dark');
                }
            }

            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(CONFIG.darkModeKey)) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }

        toggleTheme() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            localStorage.setItem(CONFIG.darkModeKey, this.currentTheme);
        }

        applyTheme(theme) {
            this.body.setAttribute('data-theme', theme);
            if (this.toggle) {
                const icon = this.toggle.querySelector('i');
                if (icon) {
                    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
            }
            this.currentTheme = theme;
        }
    }

    // Enhanced WhatsApp Integration
    class WhatsAppIntegration {
        constructor() {
            this.clickCount = 0;
            this.init();
        }

        init() {
            this.bindEvents();
            this.trackClicks();
            this.setupFloatingButton();
        }

        bindEvents() {
            const whatsappButtons = [
                '#whatsapp-header',
                '#whatsapp-hero', 
                '#whatsapp-final',
                '#whatsapp-footer',
                '#floating-whatsapp'
            ];

            whatsappButtons.forEach(selector => {
                const button = document.querySelector(selector);
                if (button) {
                    button.addEventListener('click', this.handleWhatsAppClick.bind(this));
                }
            });
        }

        handleWhatsAppClick(event) {
            event.preventDefault();
            
            const button = event.currentTarget;
            const originalContent = button.innerHTML;
            
            // Create ripple effect
            utils.createRipple(event, button);
            
            // Visual feedback
            button.style.transform = 'scale(0.95)';
            
            // Update button content
            if (button.id !== 'floating-whatsapp') {
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abrindo WhatsApp...';
            }
            
            // Analytics tracking
            this.trackWhatsAppClick(button.id);
            
            // Open WhatsApp with enhanced message
            setTimeout(() => {
                const enhancedMessage = this.getEnhancedMessage();
                const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(enhancedMessage)}`;
                window.open(url, '_blank');
                
                // Reset button
                setTimeout(() => {
                    button.style.transform = '';
                    if (button.id !== 'floating-whatsapp') {
                        button.innerHTML = originalContent;
                    }
                }, 1000);
            }, 500);

            this.clickCount++;
        }

        getEnhancedMessage() {
            const currentSection = this.getCurrentSection();
            const timestamp = new Date().toLocaleString('pt-BR');
            
            return `${CONFIG.whatsappMessage}

📍 Página: ${currentSection}
🕒 Horário: ${timestamp}
👤 Visitante interessado #${this.clickCount + 1}

Aguardo retorno! 😊`;
        }

        getCurrentSection() {
            const sections = document.querySelectorAll('section[id]');
            for (const section of sections) {
                if (utils.isInViewport(section, 0.3)) {
                    return section.id.charAt(0).toUpperCase() + section.id.slice(1);
                }
            }
            return 'Página Inicial';
        }

        setupFloatingButton() {
            const floatingBtn = document.getElementById('floating-whatsapp');
            if (floatingBtn) {
                // Show/hide based on scroll position
                window.addEventListener('scroll', utils.throttle(() => {
                    const scrollTop = window.pageYOffset;
                    if (scrollTop > 300) {
                        floatingBtn.style.opacity = '1';
                        floatingBtn.style.visibility = 'visible';
                        floatingBtn.style.transform = 'scale(1)';
                    } else {
                        floatingBtn.style.opacity = '0';
                        floatingBtn.style.visibility = 'hidden';
                        floatingBtn.style.transform = 'scale(0.8)';
                    }
                }, 100));
            }
        }

        trackWhatsAppClick(buttonId) {
            // Google Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'button_id': buttonId,
                    'page_location': window.location.href,
                    'click_count': this.clickCount
                });
            }

            // Facebook Pixel tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    content_name: 'WhatsApp Click',
                    content_category: buttonId,
                    value: 1
                });
            }

            console.log(`WhatsApp interaction: ${buttonId} (Click #${this.clickCount + 1})`);
        }

        trackClicks() {
            document.addEventListener('click', (event) => {
                const target = event.target.closest('.cta-btn-primary, .cta-btn-header');
                if (target) {
                    const buttonText = target.textContent.trim();
                    console.log(`CTA clicked: ${buttonText}`);
                }
            });
        }
    }

    // Enhanced Mobile Menu
    class MobileMenu {
        constructor() {
            this.toggle = document.getElementById('mobile-menu-toggle');
            this.nav = document.querySelector('.nav');
            this.isOpen = false;
            this.overlay = null;
            this.init();
        }

        init() {
            if (this.toggle && this.nav) {
                this.createMobileOverlay();
                this.toggle.addEventListener('click', this.toggleMenu.bind(this));
                this.bindNavLinks();
                this.bindKeyboardEvents();
            }
        }

        createMobileOverlay() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'mobile-overlay';
            this.overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
                backdrop-filter: blur(5px);
            `;
            document.body.appendChild(this.overlay);
            
            this.overlay.addEventListener('click', () => {
                if (this.isOpen) this.closeMenu();
            });
        }

        toggleMenu() {
            this.isOpen ? this.closeMenu() : this.openMenu();
        }

        openMenu() {
            this.isOpen = true;
            
            // Animate hamburger
            const spans = this.toggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            
            // Show navigation
            this.nav.style.cssText = `
                display: flex;
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                border-radius: 0 0 20px 20px;
                animation: slideDown 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
            `;
            
            // Show overlay
            this.overlay.style.opacity = '1';
            this.overlay.style.visibility = 'visible';
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Update aria
            this.toggle.setAttribute('aria-expanded', 'true');
        }

        closeMenu() {
            this.isOpen = false;
            
            // Reset hamburger
            const spans = this.toggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
            
            // Hide navigation
            this.nav.style.display = '';
            this.nav.style.position = '';
            this.nav.style.top = '';
            this.nav.style.left = '';
            this.nav.style.width = '';
            this.nav.style.background = '';
            this.nav.style.flexDirection = '';
            this.nav.style.padding = '';
            this.nav.style.boxShadow = '';
            this.nav.style.zIndex = '';
            this.nav.style.animation = '';
            this.nav.style.borderRadius = '';
            this.nav.style.backdropFilter = '';
            
            // Hide overlay
            this.overlay.style.opacity = '0';
            this.overlay.style.visibility = 'hidden';
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Update aria
            this.toggle.setAttribute('aria-expanded', 'false');
        }

        bindNavLinks() {
            const navLinks = this.nav.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isOpen) {
                        setTimeout(() => this.closeMenu(), 100);
                    }
                });
            });
        }

        bindKeyboardEvents() {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && this.isOpen) {
                    this.closeMenu();
                }
            });
        }
    }

    // Enhanced Carousel for Mobile
    class MobileCarousel {
        constructor() {
            this.track = document.getElementById('carousel-track');
            this.prevBtn = document.getElementById('carousel-prev');
            this.nextBtn = document.getElementById('carousel-next');
            this.dotsContainer = document.getElementById('carousel-dots');
            this.currentSlide = 0;
            this.totalSlides = 0;
            this.isAnimating = false;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.autoplayInterval = null;
            this.init();
        }

        init() {
            if (!this.track) return;
            
            this.totalSlides = this.track.children.length;
            this.setupEventListeners();
            this.updateCarousel();
            
            if (CONFIG.carouselAutoplay) {
                this.startAutoplay();
            }
        }

        setupEventListeners() {
            // Button navigation
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.goToPrevSlide());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.goToNextSlide());
            }

            // Dot navigation
            if (this.dotsContainer) {
                this.dotsContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('dot')) {
                        const slideIndex = Array.from(this.dotsContainer.children).indexOf(e.target);
                        this.goToSlide(slideIndex);
                    }
                });
            }

            // Touch events
            this.track.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            this.track.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
            this.track.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });

            // Mouse events for desktop
            this.track.addEventListener('mousedown', this.handleMouseDown.bind(this));
            this.track.addEventListener('mousemove', this.handleMouseMove.bind(this));
            this.track.addEventListener('mouseup', this.handleMouseUp.bind(this));
            this.track.addEventListener('mouseleave', this.handleMouseUp.bind(this));

            // Pause autoplay on hover
            if (CONFIG.carouselAutoplay) {
                this.track.addEventListener('mouseenter', () => this.pauseAutoplay());
                this.track.addEventListener('mouseleave', () => this.startAutoplay());
            }
        }

        goToPrevSlide() {
            if (this.isAnimating) return;
            this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.totalSlides - 1;
            this.updateCarousel();
        }

        goToNextSlide() {
            if (this.isAnimating) return;
            this.currentSlide = this.currentSlide < this.totalSlides - 1 ? this.currentSlide + 1 : 0;
            this.updateCarousel();
        }

        goToSlide(index) {
            if (this.isAnimating || index === this.currentSlide) return;
            this.currentSlide = index;
            this.updateCarousel();
        }

        updateCarousel() {
            if (!this.track) return;
            
            this.isAnimating = true;
            
            // Update track position
            const translateX = -this.currentSlide * 100;
            this.track.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            if (this.dotsContainer) {
                const dots = this.dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });
            }

            // Update buttons
            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentSlide === 0;
            }
            if (this.nextBtn) {
                this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
            }

            // Reset animation flag
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }

        // Touch handling
        handleTouchStart(e) {
            this.touchStartX = e.touches[0].clientX;
        }

        handleTouchMove(e) {
            this.touchEndX = e.touches[0].clientX;
        }

        handleTouchEnd() {
            if (!this.touchStartX || !this.touchEndX) return;
            
            const swipeDistance = this.touchStartX - this.touchEndX;
            const minSwipeDistance = 50;

            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.goToNextSlide();
                } else {
                    this.goToPrevSlide();
                }
            }

            this.touchStartX = 0;
            this.touchEndX = 0;
        }

        // Mouse handling (for desktop drag)
        handleMouseDown(e) {
            e.preventDefault();
            this.isMouseDown = true;
            this.touchStartX = e.clientX;
            this.track.style.cursor = 'grabbing';
        }

        handleMouseMove(e) {
            if (!this.isMouseDown) return;
            e.preventDefault();
            this.touchEndX = e.clientX;
        }

        handleMouseUp() {
            if (!this.isMouseDown) return;
            this.isMouseDown = false;
            this.track.style.cursor = '';
            this.handleTouchEnd();
        }

        startAutoplay() {
            if (!CONFIG.carouselAutoplay) return;
            this.pauseAutoplay();
            this.autoplayInterval = setInterval(() => {
                this.goToNextSlide();
            }, CONFIG.carouselInterval);
        }

        pauseAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }
    }

    // Enhanced FAQ Controller
    class FAQController {
        constructor() {
            this.faqItems = document.querySelectorAll('.faq-item');
            this.init();
        }

        init() {
            this.faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                if (question) {
                    question.addEventListener('click', () => this.toggleFAQ(item));
                    question.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.toggleFAQ(item);
                        }
                    });
                    question.setAttribute('tabindex', '0');
                    question.setAttribute('role', 'button');
                    question.setAttribute('aria-expanded', 'false');
                }
            });
        }

        toggleFAQ(item) {
            const isActive = item.classList.contains('active');
            const answer = item.querySelector('.faq-answer');
            const question = item.querySelector('.faq-question');
            
            // Close all other FAQs (accordion behavior)
            this.faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // Toggle current FAQ
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }

            // Smooth scroll to question if opening
            if (!isActive) {
                setTimeout(() => {
                    utils.smoothScrollTo(item, 100);
                }, 150);
            }
        }
    }

    // Enhanced Scroll Animations
    class ScrollAnimations {
        constructor() {
            this.animatedElements = [];
            this.observer = null;
            this.init();
        }

        init() {
            this.setupIntersectionObserver();
            this.findAnimatableElements();
            this.observeElements();
        }

        setupIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: CONFIG.intersectionThreshold
            };

            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                options
            );
        }

        findAnimatableElements() {
            const selectors = [
                '.beneficio-card',
                '.receita-card', 
                '.depoimento-card',
                '.section-title',
                '.timeline-item',
                '.faq-item'
            ];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((element, index) => {
                    element.classList.add('scroll-animate');
                    element.style.transitionDelay = `${index * CONFIG.animationDelay}ms`;
                    this.animatedElements.push(element);
                });
            });
        }

        observeElements() {
            this.animatedElements.forEach(element => {
                this.observer.observe(element);
            });
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.observer.unobserve(entry.target);
                }
            });
        }
    }

    // Enhanced Header Effects
    class HeaderEffects {
        constructor() {
            this.header = document.querySelector('.header');
            this.lastScrollTop = 0;
            this.isScrollingDown = false;
            this.init();
        }

        init() {
            if (this.header) {
                window.addEventListener('scroll', 
                    utils.throttle(this.handleScroll.bind(this), 10)
                );
            }
        }

        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const isScrollingDown = scrollTop > this.lastScrollTop;
            
            // Add/remove background based on scroll position
            if (scrollTop > 50) {
                this.header.style.background = 'rgba(255, 255, 255, 0.98)';
                this.header.style.backdropFilter = 'blur(20px)';
                this.header.style.borderBottomColor = 'rgba(107, 44, 145, 0.2)';
            } else {
                this.header.style.background = 'rgba(255, 255, 255, 0.95)';
                this.header.style.backdropFilter = 'blur(10px)';
                this.header.style.borderBottomColor = 'rgba(107, 44, 145, 0.1)';
            }

            // Hide/show header on scroll
            if (scrollTop > 200 && isScrollingDown && !this.isScrollingDown) {
                this.header.style.transform = 'translateY(-100%)';
                this.isScrollingDown = true;
            } else if ((!isScrollingDown || scrollTop <= 200) && this.isScrollingDown) {
                this.header.style.transform = 'translateY(0)';
                this.isScrollingDown = false;
            }

            this.lastScrollTop = scrollTop;
        }
    }

    // Smooth Scrolling Enhanced
    class SmoothScrolling {
        constructor() {
            this.init();
        }

        init() {
            this.bindNavLinks();
        }

        bindNavLinks() {
            const navLinks = document.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', this.handleSmoothScroll.bind(this));
            });
        }

        handleSmoothScroll(event) {
            event.preventDefault();
            
            const targetId = event.currentTarget.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add visual feedback
                const link = event.currentTarget;
                const originalTransform = link.style.transform;
                link.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    link.style.transform = originalTransform;
                }, 150);

                utils.smoothScrollTo(targetElement);
                
                // Update URL without triggering page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        }
    }

    // Performance Monitor Enhanced
    class PerformanceMonitor {
        constructor() {
            this.metrics = {};
            this.init();
        }

        init() {
            this.trackPageLoad();
            this.trackWebVitals();
            this.trackUserInteractions();
        }

        trackPageLoad() {
            window.addEventListener('load', () => {
                if ('performance' in window) {
                    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    this.metrics.loadTime = loadTime;
                    
                    console.log(`🚀 Page loaded in ${loadTime}ms`);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'page_load_time', {
                            'value': loadTime,
                            'metric_name': 'load_time'
                        });
                    }
                }
            });
        }

        trackWebVitals() {
            if ('PerformanceObserver' in window) {
                try {
                    // First Contentful Paint
                    const observer = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (entry.name === 'first-contentful-paint') {
                                this.metrics.fcp = entry.startTime;
                                console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`);
                            }
                        }
                    });
                    observer.observe({ entryTypes: ['paint'] });

                    // Largest Contentful Paint
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        this.metrics.lcp = lastEntry.startTime;
                        console.log(`🖼️ LCP: ${lastEntry.startTime.toFixed(2)}ms`);
                    });
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                } catch (error) {
                    console.log('Performance monitoring not fully supported');
                }
            }
        }

        trackUserInteractions() {
            let interactionCount = 0;
            
            document.addEventListener('click', () => {
                interactionCount++;
                if (interactionCount === 1) {
                    console.log('👆 First user interaction detected');
                }
            });

            // Track scroll depth
            let maxScrollDepth = 0;
            window.addEventListener('scroll', utils.throttle(() => {
                const scrollDepth = Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollDepth > maxScrollDepth) {
                    maxScrollDepth = scrollDepth;
                }
            }, 1000));

            window.addEventListener('beforeunload', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                        'value': maxScrollDepth,
                        'interactions': interactionCount
                    });
                }
            });
        }

        getMetrics() {
            return this.metrics;
        }
    }

    // Form Enhancements
    class FormEnhancements {
        constructor() {
            this.init();
        }

        init() {
            this.addButtonRippleEffect();
            this.addHoverEffects();
            this.addFocusEffects();
        }

        addButtonRippleEffect() {
            const buttons = document.querySelectorAll('.cta-btn-primary, .cta-btn-header, .carousel-btn');
            buttons.forEach(button => {
                button.addEventListener('click', (event) => {
                    utils.createRipple(event, button);
                });
            });
        }

        addHoverEffects() {
            const cards = document.querySelectorAll('.beneficio-card, .receita-card, .depoimento-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', this.handleCardHover.bind(this));
                card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
            });
        }

        handleCardHover(event) {
            const card = event.currentTarget;
            const icon = card.querySelector('.beneficio-icon, .receita-image');
            
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        }

        handleCardLeave(event) {
            const card = event.currentTarget;
            const icon = card.querySelector('.beneficio-icon, .receita-image');
            
            if (icon) {
                icon.style.transform = '';
            }
        }

        addFocusEffects() {
            const focusableElements = document.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );

            focusableElements.forEach(element => {
                element.addEventListener('focus', () => {
                    element.style.outline = '3px solid var(--accent-purple)';
                    element.style.outlineOffset = '2px';
                    element.style.boxShadow = '0 0 0 5px rgba(107, 44, 145, 0.1)';
                });

                element.addEventListener('blur', () => {
                    element.style.outline = '';
                    element.style.outlineOffset = '';
                    element.style.boxShadow = '';
                });
            });
        }
    }

    // Error Handler Enhanced
    class ErrorHandler {
        constructor() {
            this.errorCount = 0;
            this.init();
        }

        init() {
            this.setupGlobalErrorHandling();
            this.setupImageErrorHandling();
            this.setupConnectionErrorHandling();
        }

        setupGlobalErrorHandling() {
            window.addEventListener('error', (event) => {
                this.errorCount++;
                console.error('JavaScript Error:', event.error);
                this.logError('JavaScript Error', event.error);
                this.showErrorToast('Ops! Algo deu errado. Recarregue a página se necessário.');
            });

            window.addEventListener('unhandledrejection', (event) => {
                this.errorCount++;
                console.error('Unhandled Promise Rejection:', event.reason);
                this.logError('Promise Rejection', event.reason);
            });
        }

        setupImageErrorHandling() {
            document.addEventListener('error', (event) => {
                if (event.target.tagName === 'IMG') {
                    this.handleImageError(event.target);
                }
            }, true);
        }

        handleImageError(img) {
            img.style.cssText = `
                background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #999;
                font-size: 0.8rem;
                text-align: center;
                min-height: 100px;
                border-radius: 8px;
            `;
            img.textContent = '🖼️ Imagem temporariamente indisponível';
        }

        setupConnectionErrorHandling() {
            window.addEventListener('online', () => {
                this.showToast('Conexão restaurada! 🌐', 'success');
            });

            window.addEventListener('offline', () => {
                this.showToast('Sem conexão com a internet 📡', 'error');
            });
        }

        showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                color: white;
                font-weight: 600;
                z-index: 10001;
                transform: translateX(400px);
                transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
                max-width: 300px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                backdrop-filter: blur(10px);
                ${this.getToastStyles(type)}
            `;

            document.body.appendChild(toast);

            // Animate in
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
            }, 100);

            // Animate out and remove
            setTimeout(() => {
                toast.style.transform = 'translateX(400px)';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }

        showErrorToast(message) {
            this.showToast(message, 'error');
        }

        getToastStyles(type) {
            const styles = {
                success: 'background: linear-gradient(135deg, #28a745 0%, #20c997 100%);',
                error: 'background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);',
                warning: 'background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); color: #000;',
                info: 'background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%);'
            };
            return styles[type] || styles.info;
        }

        logError(type, error) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    'description': `${type}: ${error.message || error}`,
                    'fatal': false,
                    'error_count': this.errorCount
                });
            }
        }
    }

    // Initialize Enhanced Application
    function initializeEnhancedApp() {
        try {
            // Core functionality
            new ScrollProgress();
            new DarkModeController();
            new WhatsAppIntegration();
            new MobileMenu();
            new MobileCarousel();
            new FAQController();
            new SmoothScrolling();
            new ScrollAnimations();
            new HeaderEffects();
            
            // Enhancements
            new FormEnhancements();
            new PerformanceMonitor();
            new ErrorHandler();

            // Add custom animations
            addEnhancedAnimations();
            
            console.log('🎉 OverBerry Enhanced v2.0 initialized successfully!');
            
        } catch (error) {
            console.error('❌ Error initializing OverBerry:', error);
        }
    }

    // Enhanced Custom Animations
    function addEnhancedAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateY(-100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes ripple-animation {
                to { transform: scale(4); opacity: 0; }
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); }
                50% { box-shadow: 0 10px 30px rgba(107, 44, 145, 0.3); }
            }
            
            @keyframes shimmer {
                0% { background-position: -200px 0; }
                100% { background-position: calc(200px + 100%) 0; }
            }
            
            .loading-shimmer {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200px 100%;
                animation: shimmer 1.5s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Performance-optimized initialization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(initializeEnhancedApp, { timeout: 2000 });
    } else {
        setTimeout(initializeEnhancedApp, 100);
    }

    // Export enhanced utilities
    window.OverBerry = {
        config: CONFIG,
        utils: utils,
        version: '2.0.0',
        features: {
            darkMode: true,
            carousel: true,
            faq: true,
            performance: true,
            accessibility: true
        }
    };

    // Development helpers
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.OverBerryDebug = {
            showMetrics: () => {
                const monitor = new PerformanceMonitor();
                console.table(monitor.getMetrics());
            },
            testWhatsApp: () => {
                console.log('WhatsApp URL:', utils.generateWhatsAppURL());
            },
            toggleTheme: () => {
                const controller = new DarkModeController();
                controller.toggleTheme();
            }
        };
        console.log('🛠️ Debug tools available: window.OverBerryDebug');
    }
});