document.addEventListener('DOMContentLoaded', function() {
    // Mostrar loading screen
    showLoadingScreen();

    // Simular carregamento da página
    setTimeout(() => {
        hideLoadingScreen();
        initializeHomePage();
    }, 2000); // 2 segundos de loading
});

// Função para mostrar o loading screen - COPIADA DO CÓDIGO QUE FUNCIONA
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
    console.log('🚀 Inicializando OverBerry HomePage...');

    // ===== AGUARDAR COMPONENTES CARREGAREM =====
    waitForComponentsAndSetup();

    // Setup para outros botões (não navegação)
    setupOtherButtons();

    // Observers para animações
    setupCardAnimations();

    // Outras funcionalidades
    setupAboutAnimations();
    
    console.log('✅ HomePage inicializada - aguardando componentes...');
}

// ===== AGUARDAR E INTEGRAR COM COMPONENTS =====
function waitForComponentsAndSetup() {
    console.log('⏳ Aguardando componentes carregarem...');
    
    // Verificar se os componentes já foram carregados
    const checkInterval = setInterval(() => {
        const navbar = document.querySelector('.nav-menu');
        const backToTop = document.getElementById('backToTop');
        
        if (navbar && backToTop) {
            console.log('✅ Componentes carregados! Integrando navegação...');
            clearInterval(checkInterval);
            
            // Aguardar um pouco mais para garantir que todos os listeners do components.js foram adicionados
            setTimeout(() => {
                overrideComponentNavigation();
                setupEnhancedFeatures();
            }, 200);
        }
    }, 100);
    
    // Timeout de segurança - 10 segundos
    setTimeout(() => {
        clearInterval(checkInterval);
        console.log('⚠️ Timeout - forçando setup mesmo sem componentes completos');
        overrideComponentNavigation();
        setupEnhancedFeatures();
    }, 10000);
}

// ===== SOBRESCREVER NAVEGAÇÃO DO COMPONENTS.JS =====
function overrideComponentNavigation() {
    console.log('🔧 Sobrescrevendo navegação do components.js...');
    
    // Desabilitar scroll behavior padrão
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: auto !important;
        }
        
        .nav-link {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .nav-link:hover {
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(style);
    
    // Encontrar TODOS os links de navegação interna
    const internalNavLinks = document.querySelectorAll('a[href*="#"]:not([href^="http"])');
    console.log(`📍 Encontrados ${internalNavLinks.length} links de navegação`);
    
    internalNavLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`🔗 Link ${index + 1}: "${link.textContent.trim()}" -> ${href}`);
        
        // Verificar se é um link interno da página atual
        const isCurrentPageLink = href.startsWith('#') || 
                                 href.includes('index.html#') || 
                                 (href.includes('#') && window.location.pathname.includes('index.html'));
        
        if (isCurrentPageLink) {
            console.log(`✅ Configurando navegação animada para: ${link.textContent.trim()}`);
            
            // Remover listeners existentes clonando o elemento
            const newLink = link.cloneNode(true);
            
            // Adicionar nosso listener animado
            newLink.addEventListener('click', function(e) {
                console.log(`🎯 Clique interceptado: ${this.textContent.trim()}`);
                
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                // Fechar menu mobile se necessário
                closeMobileMenu();
                
                // Extrair ID da seção
                const targetId = href.split('#')[1];
                
                if (targetId) {
                    console.log(`🚀 Navegando para: ${targetId}`);
                    animatedScrollToSection(targetId);
                }
                
                return false;
            }, true);
            
            // Substituir o link
            link.parentNode.replaceChild(newLink, link);
        }
    });
    
    console.log('✅ Navegação sobrescrita com sucesso!');
}

// Fechar menu mobile
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (navMenu && mobileMenuBtn) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
}

// ===== SCROLL ANIMADO PRINCIPAL =====
function animatedScrollToSection(sectionId) {
    console.log(`🎯 Executando scroll animado para: ${sectionId}`);
    
    const targetSection = document.getElementById(sectionId);
    
    if (!targetSection) {
        console.error(`❌ Seção "${sectionId}" não encontrada!`);
        return;
    }
    
    // Mostrar indicadores visuais
    showScrollIndicators();
    
    // Calcular posição
    const headerHeight = getHeaderHeight();
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
    
    console.log(`📏 Scrolling para posição: ${offsetPosition}`);
    
    // Executar scroll suave customizado
    smoothScrollTo(offsetPosition, 1000);
    
    // Destacar seção após scroll
    setTimeout(() => {
        highlightTargetSection(targetSection);
    }, 500);
}

// Obter altura do header
function getHeaderHeight() {
    const header = document.querySelector('.header');
    return header ? header.offsetHeight : 80;
}

// Scroll suave customizado
function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            console.log('✅ Scroll concluído!');
        }
    }

    requestAnimationFrame(animation);
}

// ===== INDICADORES VISUAIS =====
function showScrollIndicators() {
    // Efeito ripple no centro da tela
    showRippleEffect();
}

function showRippleEffect() {
    // Adicionar efeito de onda na página
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        z-index: 9999;
        pointer-events: none;
        animation: scrollRipple 0.8s ease-out forwards;
    `;

    document.body.appendChild(ripple);

    // Remover após animação
    setTimeout(() => ripple.remove(), 800);
}

// Destacar seção alvo
function highlightTargetSection(section) {
    console.log('🎨 Destacando seção alvo...');
    
    const highlight = document.createElement('div');
    highlight.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(76, 221, 128, 0.1));
        border: 2px solid rgba(124, 58, 237, 0.4);
        border-radius: 15px;
        pointer-events: none;
        z-index: 10;
        opacity: 0;
        transition: all 0.5s ease;
        animation: sectionHighlight 2.5s ease-in-out;
    `;

    // Garantir position relative na seção
    const originalPosition = section.style.position;
    section.style.position = 'relative';
    section.appendChild(highlight);

    // Animar entrada
    setTimeout(() => {
        highlight.style.opacity = '1';
    }, 100);

    // Remover após animação
    setTimeout(() => {
        highlight.style.opacity = '0';
        setTimeout(() => {
            if (highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
                section.style.position = originalPosition;
            }
        }, 500);
    }, 2000);
}

// ===== RECURSOS ADICIONAIS =====
function setupEnhancedFeatures() {
    console.log('🎨 Configurando recursos visuais adicionais...');
    
    // Melhorar o back to top existente
    enhanceBackToTop();
    
    // Adicionar navegação ativa melhorada
    setupEnhancedActiveNavigation();
}

function enhanceBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Remover listener existente clonando
        const newBtn = backToTopBtn.cloneNode(true);
        
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔝 Back to top com animação');
            showRippleEffect();
            smoothScrollTo(0, 800);
        });
        
        backToTopBtn.parentNode.replaceChild(newBtn, backToTopBtn);
        console.log('✅ Back to top melhorado');
    }
}

function setupEnhancedActiveNavigation() {
    const sections = document.querySelectorAll('section, main');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.style.transform = '';
                });
                
                // Add active class with animation
                const activeLink = document.querySelector(`a[href="#${sectionId}"], a[href*="#${sectionId}"]`);
                if (activeLink && activeLink.classList.contains('nav-link')) {
                    activeLink.classList.add('active');
                    
                    // Micro animação
                    activeLink.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        activeLink.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '-80px 0px -40% 0px'
    });
    
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
    
    console.log('✅ Navegação ativa melhorada configurada');
}

// Setup para outros botões (não navegação)
function setupOtherButtons() {
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .btn-buy, .btn-download, .btn-recipe');
    
    actionButtons.forEach(button => {
        // Verificar se não é um link de navegação
        if (!button.getAttribute('href') || !button.getAttribute('href').includes('#')) {
            button.addEventListener('click', function() {
                console.log('🔘 Button clicked:', this.textContent);
                
                if (this.textContent.includes('experimentar') || this.textContent.includes('Comprar agora')) {
                    window.location.href = 'acai-liofilizado.html';
                } else if (this.textContent.includes('benefícios')) {
                    animatedScrollToSection('beneficios');
                } else if (this.textContent.includes('veja mais receitas')) {
                    window.location.href = 'receitas.html';
                } else if (this.classList.contains('btn-recipe')) {
                    const recipeType = this.getAttribute('data-recipe');
                    if (recipeType) {
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
        }
    });
}

// Setup para animações de cards - VERSÃO MELHORADA
function setupCardAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                
                // Melhorar cards de benefícios quando entrarem na viewport
                if (entry.target.classList.contains('benefit-card')) {
                    setTimeout(() => {
                        enhanceBenefitCard(entry.target);
                    }, 200);
                }
            }
        });
    }, observerOptions);

    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
        
        // Adicionar delay escalonado
        card.style.animationDelay = `${index * 0.15}s`;
    });
}

// Função para melhorar um card de benefício específico
function enhanceBenefitCard(card) {
    // Adicionar efeito de brilho se não existir
    if (!card.querySelector('.shine-effect')) {
        const shineEffect = document.createElement('div');
        shineEffect.className = 'shine-effect';
        shineEffect.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.4), 
                transparent);
            transition: left 0.6s ease;
            z-index: 3;
            pointer-events: none;
        `;
        card.appendChild(shineEffect);
    }
    
    // Adicionar pontos decorativos se não existirem
    if (!card.querySelector('.decorative-dots')) {
        const decorativeDots = document.createElement('div');
        decorativeDots.className = 'decorative-dots';
        decorativeDots.style.cssText = `
            position: absolute;
            bottom: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 2;
        `;
        
        // Adicionar pseudo-elementos via CSS se não existirem
        if (!document.getElementById('decorative-dots-style')) {
            const style = document.createElement('style');
            style.id = 'decorative-dots-style';
            style.textContent = `
                .decorative-dots::before,
                .decorative-dots::after {
                    content: '';
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #10b981;
                    border-radius: 50%;
                }
                .decorative-dots::before {
                    top: 0;
                    left: 0;
                    animation: dot1 2s ease-in-out infinite;
                }
                .decorative-dots::after {
                    bottom: 0;
                    right: 0;
                    animation: dot2 2s ease-in-out infinite 0.5s;
                }
                @keyframes dot1 {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.5); opacity: 1; }
                }
                @keyframes dot2 {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.5); opacity: 1; }
                }
                .benefit-card:hover .decorative-dots {
                    opacity: 1;
                }
                .benefit-card:hover .shine-effect {
                    left: 100%;
                }
            `;
            document.head.appendChild(style);
        }
        
        card.appendChild(decorativeDots);
    }
    
    // Adicionar tabindex para acessibilidade
    card.setAttribute('tabindex', '0');
    
    // Adicionar evento de keyboard para acessibilidade
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Simular hover com foco
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.15)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 300);
        }
    });
}

// Função para animações da seção About
function setupAboutAnimations() {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('values-list')) {
                    animateValues();
                }
            }
        });
    }, { threshold: 0.3 });

    const valuesSection = document.querySelector('.values-list');
    if (valuesSection) aboutObserver.observe(valuesSection);
}

function animateValues() {
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 150);
    });
}

// Adicionar CSS para animações e efeitos hover dos cards
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* ===== EFEITOS HOVER DOS CARDS DE BENEFÍCIOS ===== */
    .benefit-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        will-change: transform, box-shadow;
    }

    .benefit-card:hover {
        transform: translateY(-15px) scale(1.03) !important;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15) !important;
        border-color: rgba(16, 185, 129, 0.3) !important;
    }

    /* Gradiente animado no topo */
    .benefit-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 2;
    }

    .benefit-card:hover::before {
        transform: scaleX(1);
    }

    /* Fundo gradiente sutil */
    .benefit-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(16, 185, 129, 0.02) 0%, 
            rgba(52, 211, 153, 0.05) 50%, 
            rgba(110, 231, 183, 0.02) 100%);
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: 1;
        border-radius: 20px;
    }

    .benefit-card:hover::after {
        opacity: 1;
    }

    /* Ícone com animações */
    .benefit-card .card-icon {
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        position: relative;
        z-index: 3;
    }

    .benefit-card:hover .card-icon {
        transform: scale(1.1) rotate(5deg) !important;
    }

    /* Fundo do ícone */
    .benefit-card .card-icon::after {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .benefit-card:hover .card-icon::after {
        transform: scale(1.3) !important;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.1)) !important;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2) !important;
    }

    /* Animação dos ícones SVG */
    .benefit-card .card-icon svg {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.2));
        will-change: filter;
    }

    .benefit-card:hover .card-icon svg {
        filter: drop-shadow(0 8px 20px rgba(16, 185, 129, 0.4)) !important;
    }

    /* Títulos com efeito */
    .benefit-card .card-title,
    .benefit-card .card-subtitle {
        position: relative;
        z-index: 3;
        transition: all 0.3s ease !important;
    }

    .benefit-card:hover .card-title {
        color: #059669 !important;
        transform: translateY(-3px) !important;
    }

    .benefit-card:hover .card-subtitle {
        color: #047857 !important;
        transform: translateY(-2px) !important;
    }

    /* Descrição com animação */
    .benefit-card .card-description {
        position: relative;
        z-index: 3;
        transition: all 0.3s ease !important;
    }

    .benefit-card:hover .card-description {
        color: #374151 !important;
        transform: translateY(-2px) !important;
    }

    /* Efeito de foco (acessibilidade) */
    .benefit-card:focus {
        outline: none !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3) !important;
    }

    /* Responsivo */
    @media (max-width: 900px) {
        .benefit-card:hover {
            transform: translateY(-8px) scale(1.02) !important;
        }
    }

    @media (max-width: 600px) {
        .benefit-card:hover {
            transform: translateY(-5px) scale(1.01) !important;
        }
        
        .benefit-card:hover .card-icon {
            transform: scale(1.05) rotate(3deg) !important;
        }
    }

    /* ===== ANIMAÇÕES ORIGINAIS ===== */
    @keyframes scrollRipple {
        0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
        }
        100% { 
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }

    @keyframes sectionHighlight {
        0%, 100% { 
            box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4);
        }
        50% { 
            box-shadow: 0 0 0 15px rgba(124, 58, 237, 0);
        }
    }

    /* Melhorar transições dos links */
    .nav-link {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        position: relative;
    }

    .nav-link:hover {
        transform: translateY(-1px) !important;
    }

    .nav-link.active {
        animation: activeNavPulse 0.5s ease-out;
    }

    @keyframes activeNavPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    /* Desabilitar scroll behavior padrão */
    html {
        scroll-behavior: auto !important;
    }
`;

document.head.appendChild(animationStyles);