/**
 * Sistema de Componentes OverBerry
 * Navbar e Footer padronizados para reutilização
 */

class OverBerryComponents {
    /**
     * Carrega o CSS dos componentes
     */
    static loadCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'components/components.css';
        document.head.appendChild(link);
    }

    /**
     * Cria o HTML da Navbar
     */
    /**
   * Cria o HTML da Navbar
   */
    static createNavbar() {
        // Detecta se está em subpasta
        const isInSubfolder = window.location.pathname.includes('/paginas-receitas/') ||
            window.location.pathname.includes('/receita-individual/');
        const basePath = isInSubfolder ? '../' : '';

        return `
        <header class="header">
            <nav class="nav">
                <!-- Logo -->
                <div class="logo" onclick="window.location.href='${basePath}index.html'">OverBerry</div>

                <!-- Navigation Menu -->
                <div class="nav-menu" id="navMenu">
                    <a href="${basePath}index.html#inicio" class="nav-link">Início</a>
                    <a href="${basePath}index.html#beneficios" class="nav-link">Benefícios</a>
                    <a href="${basePath}index.html#produto" class="nav-link">Produto</a>
                    <a href="${basePath}index.html#receitas" class="nav-link">Receita</a>
                    <a href="${basePath}index.html#sobre" class="nav-link">Sobre</a>
                    <a href="${basePath}index.html#contato" class="nav-link">Contato</a>
                </div>

                <!-- Mobile Menu Button -->
                <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu mobile">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <!-- CTA Button -->
                <button class="cta-button">Quero experimentar</button>
            </nav>
        </header>
    `;
    }
    /**
     * Cria o HTML do Footer
     */
    static createFooter() {
        return `
            <footer class="footer" id="contato">
                <div class="footer-container">
                    <div class="footer-content">
                        <!-- Coluna 1: OverBerry -->
                        <div class="footer-column">
                            <h3 class="footer-title">OverBerry</h3>
                            <p class="footer-description">
                                O poder do açaí amazônico preservado para sua saúde e bem-estar.
                            </p>
                            <div class="footer-social">
                                <button class="social-btn" data-social="instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                                    </svg>
                                    Instagram
                                </button>
                                <button class="social-btn" data-social="whatsapp">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                                    </svg>
                                    WhatsApp
                                </button>
                            </div>
                        </div>

                        <!-- Coluna 2: Produtos -->
                        <div class="footer-column">
                            <h4 class="footer-subtitle">Produtos</h4>
                            <ul class="footer-links">
                                <li><a href="acai-liofilizado.html" class="footer-link">OverBerry Original</a></li>
                                <li><a href="receitas.html" class="footer-link">Receitas Exclusivas</a></li>
                                <li><a href="#" class="footer-link">Kit Família</a></li>
                                <li><a href="#" class="footer-link">Assinatura Mensal</a></li>
                            </ul>
                        </div>

                        <!-- Coluna 3: Links Úteis -->
                        <div class="footer-column">
                            <h4 class="footer-subtitle">Links Úteis</h4>
                            <ul class="footer-links">
                                <li><a href="index.html#beneficios" class="footer-link">Benefícios</a></li>
                                <li><a href="index.html#sobre" class="footer-link">Nossa História</a></li>
                                <li><a href="#" class="footer-link">Blog</a></li>
                                <li><a href="#" class="footer-link">FAQ</a></li>
                            </ul>
                        </div>

                        <!-- Coluna 4: Contato -->
                        <div class="footer-column">
                            <h4 class="footer-subtitle">Contato</h4>
                            <div class="footer-contact">
                                <div class="contact-item">
                                    <span class="contact-icon">📧</span>
                                    <span class="contact-text">contato@overberry.com.br</span>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-icon">📱</span>
                                    <span class="contact-text">(11) 99999-9999</span>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-icon">📍</span>
                                    <span class="contact-text">São Paulo, SP</span>
                                </div>
                            </div>

                            <!-- Newsletter -->
                            <div class="newsletter">
                                <h5 class="newsletter-title">Newsletter</h5>
                                <div class="newsletter-form">
                                    <input type="email" placeholder="Seu e-mail" class="newsletter-input">
                                    <button class="newsletter-btn">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Bottom -->
                    <div class="footer-bottom">
                        <div class="footer-bottom-content">
                            <p class="footer-copyright">2024 OverBerry. Todos os direitos reservados.</p>
                            <div class="footer-bottom-right">
                                <span class="footer-cnpj">CNPJ: 00.000.000/0001-00</span>
                                <span class="footer-made">Feito com 💜 no Brasil</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <!-- Back to Top Button -->
            <button class="back-to-top" id="backToTop" aria-label="Voltar ao topo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m18 15-6-6-6 6"/>
                </svg>
            </button>
        `;
    }

    /**
     * Inicializa a navegação
     */
    static initNavigation() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        if (!mobileMenuBtn || !navMenu) return;

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Navigation links functionality
        const navLinks = document.querySelectorAll('.nav-link, .footer-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Se é um link interno com hash
                if (href && href.includes('#')) {
                    const isCurrentPage = href.startsWith('#') || href.includes(window.location.pathname);

                    if (isCurrentPage) {
                        e.preventDefault();

                        // Close mobile menu
                        if (this.classList.contains('nav-link')) {
                            navMenu.classList.remove('active');
                            mobileMenuBtn.classList.remove('active');
                        }

                        // Extract target ID
                        const targetId = href.split('#')[1];
                        const targetSection = document.getElementById(targetId);

                        if (targetSection) {
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                    // Para links externos com hash, deixa o comportamento padrão
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);

            if (!isClickInsideNav && !isClickOnMenuBtn && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            let isScrolled = false;

            window.addEventListener('scroll', () => {
                const shouldBeScrolled = window.pageYOffset > 10;

                if (shouldBeScrolled !== isScrolled) {
                    isScrolled = shouldBeScrolled;
                    header.classList.toggle('scrolled', isScrolled);
                }
            });
        }
    }

    /**
     * Inicializa os botões
     */
    /**
  * Inicializa os botões
  */
    static initButtons() {
        // Detecta se está em subpasta
        const isInSubfolder = window.location.pathname.includes('/paginas-receitas/') ||
            window.location.pathname.includes('/receita-individual/');
        const basePath = isInSubfolder ? '../' : '';

        // CTA Button
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function () {
                window.location.href = basePath + 'acai-liofilizado.html';
            });
        });

        // resto do código continua igual...

        // Social buttons
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(button => {
            button.addEventListener('click', function () {
                const social = this.getAttribute('data-social');

                switch (social) {
                    case 'instagram':
                        window.open('https://instagram.com/overberry', '_blank');
                        break;
                    case 'whatsapp':
                        window.open('https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20OverBerry', '_blank');
                        break;
                }
            });
        });

        // Newsletter button
        const newsletterButtons = document.querySelectorAll('.newsletter-btn');
        newsletterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const emailInput = this.parentElement.querySelector('.newsletter-input');
                const email = emailInput.value.trim();

                if (email && this.validateEmail(email)) {
                    // Simular envio
                    this.textContent = '✓';
                    this.style.background = '#10b981';
                    emailInput.value = '';

                    setTimeout(() => {
                        this.textContent = 'OK';
                        this.style.background = '';
                    }, 2000);

                    // Aqui você pode adicionar a lógica real de envio
                    console.log('Newsletter subscription:', email);
                } else {
                    // Erro de validação
                    emailInput.style.borderColor = '#ef4444';
                    emailInput.placeholder = 'E-mail inválido';

                    setTimeout(() => {
                        emailInput.style.borderColor = '';
                        emailInput.placeholder = 'Seu e-mail';
                    }, 3000);
                }
            }.bind(this));
        });

        // Newsletter input - enter key
        const newsletterInputs = document.querySelectorAll('.newsletter-input');
        newsletterInputs.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    this.parentElement.querySelector('.newsletter-btn').click();
                }
            });
        });
    }

    /**
     * Valida email
     */
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Inicializa o botão voltar ao topo
     */
    static initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');

        if (!backToTopBtn) return;

        let isVisible = false;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            const shouldBeVisible = window.pageYOffset > 300;

            if (shouldBeVisible !== isVisible) {
                isVisible = shouldBeVisible;
                backToTopBtn.classList.toggle('visible', isVisible);
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

    /**
     * Destaca o link ativo na navegação
     */
    static initActiveNavigation() {
        const sections = document.querySelectorAll('section, main');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));

                    // Add active class to corresponding nav link
                    const activeLink = document.querySelector(`a[href="#${sectionId}"], a[href*="#${sectionId}"]`);
                    if (activeLink && activeLink.classList.contains('nav-link')) {
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

    /**
     * Insere os componentes na página
     */
    static insertComponents() {
        const navbarContainer = document.getElementById('navbar-container');
        const footerContainer = document.getElementById('footer-container');

        if (navbarContainer) {
            navbarContainer.innerHTML = this.createNavbar();
        }

        if (footerContainer) {
            footerContainer.innerHTML = this.createFooter();
        }
    }

    /**
     * Inicializa todos os componentes
     */
    static init() {
        // Aguarda o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    /**
     * Inicializa os componentes após o DOM estar pronto
     */
    static initializeComponents() {
        // Carrega CSS
        this.loadCSS();

        // Insere componentes
        this.insertComponents();

        // Pequeno delay para garantir que os elementos foram inseridos
        setTimeout(() => {
            this.initNavigation();
            this.initButtons();
            this.initBackToTop();
            this.initActiveNavigation();
        }, 50);
    }
}

// Auto-inicializar se o arquivo for carregado diretamente
if (typeof window !== 'undefined') {
    OverBerryComponents.init();
}