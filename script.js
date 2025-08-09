document.addEventListener('DOMContentLoaded', function() {
    // Mostrar loading screen
    showLoadingScreen();

    // Simular carregamento da página
    setTimeout(() => {
        hideLoadingScreen();
        initializeHomePage();
    }, 2000); // 2 segundos de loading para página inicial
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

// Função principal que inicializa a página inicial
function initializeHomePage() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

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
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .btn-buy, .btn-download, .btn-recipe');
    
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
            } else if (this.classList.contains('btn-recipe')) {
                // Redireciona para páginas específicas de receitas
                const recipeType = this.getAttribute('data-recipe');
                if (recipeType) {
                    // Mapeamento dos data-recipe para os nomes corretos dos arquivos
                    const recipeMapping = {
                        'smoothie': 'smoothie-energetico.html',
                        'acai-bowl': 'acai-bowl-completo.html', 
                        'vitamina': 'vitamina.html'
                    };
                    
                    const fileName = recipeMapping[recipeType] || `${recipeType}.html`;
                    window.location.href = `paginas-receitas/${fileName}`;
                }
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

    console.log('Página inicial OverBerry carregada com sucesso!');
    console.log('Funcionalidades ativas: Navegação, Animações, Botões, Scroll Effects');
}

// Função para animações da seção About
function setupAboutAnimations() {
    // Observer para elementos da seção About
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('values-list')) {
                    // Animar valores com delay
                    animateValues();
                }
            }
        });
    }, {
        threshold: 0.3
    });

    // Observar valores
    const valuesSection = document.querySelector('.values-list');
    
    if (valuesSection) aboutObserver.observe(valuesSection);
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