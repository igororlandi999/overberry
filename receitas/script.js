document.addEventListener('DOMContentLoaded', function() {
    // Mostrar loading screen
    showLoadingScreen();

    // Simular carregamento da página
    setTimeout(() => {
        hideLoadingScreen();
        initializeRecipesPage();
    }, 2000); // 2 segundos de loading
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

// Função principal que inicializa a página de receitas
function initializeRecipesPage() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter cards with animation
            filterCards(filterValue);
        });
    });

    function filterCards(category) {
        recipeCards.forEach((card, index) => {
            // Add fade out animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                const matchesCategory = category === 'all' || card.getAttribute('data-category') === category;
                const isLoadHidden = card.classList.contains('hidden-load');
                
                if (matchesCategory && !isLoadHidden) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    // Animate in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else if (matchesCategory && isLoadHidden) {
                    // Receita que combina com filtro mas está escondida pelo load more
                    card.classList.remove('hidden');
                    card.style.display = 'none'; // Mantém escondida pelo load more
                } else {
                    // Receita que não combina com o filtro
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }, 150);
        });

        // Update results count and load more button
        setTimeout(() => {
            updateResultsCount(category);
            updateLoadMoreButtonForFilter(category);
        }, 300);
    }

    function updateLoadMoreButtonForFilter(category) {
        const matchingCards = Array.from(recipeCards).filter(card => {
            return category === 'all' || card.getAttribute('data-category') === category;
        });
        
        const visibleMatchingCards = matchingCards.filter(card => 
            !card.classList.contains('hidden') && 
            !card.classList.contains('hidden-load')
        );
        
        const hiddenMatchingCards = matchingCards.filter(card => 
            !card.classList.contains('hidden') && 
            card.classList.contains('hidden-load')
        );
        
        if (hiddenMatchingCards.length === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.textContent = `Carregar mais receitas (${hiddenMatchingCards.length} restantes)`;
        }
    }

    function updateResultsCount(category) {
        const visibleCards = document.querySelectorAll('.recipe-card:not(.hidden):not(.hidden-load)');
        const loadMoreSection = document.querySelector('.load-more-section');
        
        if (loadMoreSection) {
            const loadMoreText = loadMoreSection.querySelector('.load-more-text');
            if (loadMoreText) {
                if (category === 'all') {
                    const totalVisible = visibleCards.length;
                    const totalHidden = document.querySelectorAll('.recipe-card.hidden-load:not(.hidden)').length;
                    loadMoreText.textContent = `${totalVisible} receitas exibidas${totalHidden > 0 ? ` (${totalHidden} aguardando)` : ' - Todas carregadas!'}`;
                } else {
                    const categoryNames = {
                        'cafe-da-manha': 'Café da Manhã',
                        'bebidas': 'Bebidas',
                        'sobremesa': 'Sobremesas',
                        'lanches': 'Lanches',
                        'pos-treino': 'Pós Treino'
                    };
                    loadMoreText.textContent = `${visibleCards.length} receitas de ${categoryNames[category]} exibidas`;
                }
            }
        }
    }

    // Button click handlers
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-cta');
    const recipeButtons = document.querySelectorAll('.btn-recipe');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // CTA buttons redirect to product page
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('CTA button clicked');
            // Redirect to product page
            window.location.href = 'acai-liofilizado.html';
        });
    });

    // Recipe buttons redirect to individual recipe pages
    recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeType = this.getAttribute('data-recipe');
            console.log('Recipe button clicked:', recipeType);
            
            if (recipeType) {
                // Feedback visual no botão
                const originalText = this.textContent;
                this.textContent = 'Abrindo receita...';
                this.style.transform = 'scale(0.98)';
                
                // Mapeamento dos data-recipe para os nomes corretos dos arquivos
                const recipeMapping = {
                    // Café da Manhã
                    'smoothie-energetico': 'smoothie-energetico.html',
                    'acai-bowl': 'acai-bowl-completo.html',
                    'panqueca-acai': 'panqueca-acai.html',
                    'overnight-oats': 'overnight-oats-acai.html',
                    'muffin-acai': 'muffin.html',
                    
                    // Bebidas
                    'vitamina-pre-treino': 'vitamina.html',
                    'limonada-acai': 'limonada.html',
                    'shake-proteico': 'shake.html',
                    'agua-saborizada': 'agua.html',
                    'bubble-tea': 'bubble.html',
                    
                    // Sobremesas
                    'mousse-acai': 'mousse.html',
                    'cheesecake-acai': 'cheeseecake.html',
                    'sorvete-acai': 'sorvete.html',
                    'pudim-acai': 'pudim.html',
                    
                    // Lanches
                    'barra-cereal': 'barrinha.html',
                    'bolinhas-energeticas': 'bolinhas.html',
                    'cookie-funcional': 'cookie.html',
                    'pao-acai-fit': 'pao.html',
                    
                    // Pós Treino
                    'smoothie-recovery': 'smoothie-recovery.html',
                    'bowl-proteico': 'bowl-proteico.html',
                    'shake-recuperacao': 'shake-recuperacao.html'
                };
                
                // Simula carregamento por 500ms e então redireciona
                setTimeout(() => {
                    // Pega o nome correto do arquivo ou usa o data-recipe como fallback
                    const fileName = recipeMapping[recipeType] || `${recipeType}.html`;
                    
                    // Redireciona para a página específica da receita
                    window.location.href = `paginas-receitas/${fileName}`;
                }, 500);
            }
        });
    });

    // Load more button functionality
    let recipesLoaded = 12; // Inicialmente mostrar 12 receitas
    const recipesPerLoad = 6; // Carregar 6 receitas por vez
    
    // Esconder receitas extras inicialmente
    function initializeRecipeDisplay() {
        recipeCards.forEach((card, index) => {
            if (index >= recipesLoaded) {
                card.style.display = 'none';
                card.classList.add('hidden-load');
            }
        });
        updateLoadMoreButton();
    }

    function updateLoadMoreButton() {
        const hiddenCards = document.querySelectorAll('.recipe-card.hidden-load').length;
        const loadMoreText = document.querySelector('.load-more-text');
        
        if (hiddenCards === 0) {
            loadMoreBtn.style.display = 'none';
            if (loadMoreText) {
                loadMoreText.textContent = 'Todas as receitas foram carregadas!';
            }
        } else {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.textContent = `Carregar mais receitas (${hiddenCards} restantes)`;
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            console.log('Load more clicked');
            
            // Encontrar receitas escondidas
            const hiddenCards = Array.from(document.querySelectorAll('.recipe-card.hidden-load'));
            const cardsToShow = hiddenCards.slice(0, recipesPerLoad);
            
            // Mostrar as próximas receitas com animação
            cardsToShow.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.classList.remove('hidden-load');
                    
                    // Animação de entrada
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                    
                }, index * 150); // Delay escalonado para cada card
            });
            
            // Atualizar contador
            recipesLoaded += cardsToShow.length;
            
            // Atualizar botão após as animações
            setTimeout(() => {
                updateLoadMoreButton();
                
                // Scroll suave para as novas receitas
                if (cardsToShow.length > 0) {
                    cardsToShow[0].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, cardsToShow.length * 150 + 600);
            
            // Feedback visual no botão
            this.textContent = 'Carregando...';
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // Inicializar display das receitas
    initializeRecipeDisplay();

    // Scroll animations for recipe cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all recipe cards
    recipeCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        cardObserver.observe(card);
    });

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

    // Initialize results count
    updateResultsCount('all');

    // Add hover effects to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Enhanced recipe card interactions
    recipeCards.forEach((card, index) => {
        // Stagger the initial animation
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add search functionality
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar receitas...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 0.75rem 1.5rem;
            border: 2px solid #e2e8f0;
            border-radius: 50px;
            font-size: 1rem;
            margin: 1rem auto;
            display: block;
            outline: none;
            transition: border-color 0.3s ease;
        `;

        // Add search input after filter buttons
        const filterContainer = document.querySelector('.filter-container');
        if (filterContainer) {
            filterContainer.appendChild(searchInput);

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                recipeCards.forEach(card => {
                    const title = card.querySelector('.recipe-title').textContent.toLowerCase();
                    const ingredients = Array.from(card.querySelectorAll('.ingredients-list li'))
                        .map(li => li.textContent.toLowerCase())
                        .join(' ');
                    
                    const shouldShow = title.includes(searchTerm) || ingredients.includes(searchTerm);
                    
                    if (shouldShow) {
                        card.classList.remove('hidden');
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.classList.add('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    }
                });

                // Update results count for search
                setTimeout(() => {
                    const visibleCards = document.querySelectorAll('.recipe-card:not(.hidden)');
                    const loadMoreText = document.querySelector('.load-more-text');
                    if (loadMoreText) {
                        if (searchTerm) {
                            loadMoreText.textContent = `${visibleCards.length} receitas encontradas para "${searchTerm}"`;
                        } else {
                            loadMoreText.textContent = `${visibleCards.length} receitas encontradas - Mais chegando em breve!`;
                        }
                    }
                }, 100);
            });

            searchInput.addEventListener('focus', function() {
                this.style.borderColor = '#7c3aed';
                this.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
            });

            searchInput.addEventListener('blur', function() {
                this.style.borderColor = '#e2e8f0';
                this.style.boxShadow = 'none';
            });
        }
    }

    // Initialize search functionality
    addSearchFunctionality();

    // Add category counter badges
    function addCategoryCounters() {
        const categoryCount = {
            'cafe-da-manha': 0,
            'bebidas': 0,
            'sobremesa': 0,
            'lanches': 0,
            'pos-treino': 0
        };

        // Count recipes per category
        recipeCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (categoryCount.hasOwnProperty(category)) {
                categoryCount[category]++;
            }
        });

        // Add counters to filter buttons
        filterButtons.forEach(button => {
            const filterValue = button.getAttribute('data-filter');
            if (filterValue !== 'all' && categoryCount[filterValue]) {
                const counter = document.createElement('span');
                counter.className = 'category-counter';
                counter.textContent = categoryCount[filterValue];
                counter.style.cssText = `
                    background: #4ade80;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    font-weight: 700;
                    margin-left: 0.5rem;
                    position: relative;
                    top: -2px;
                `;
                button.appendChild(counter);
            }
        });
    }

    // Initialize category counters
    addCategoryCounters();

    // Add scroll progress indicator
    function addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #7c3aed, #4ade80);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Initialize scroll progress
    addScrollProgress();

    // Add recipe sharing functionality
    function addSharingButtons() {
        recipeCards.forEach(card => {
            const shareBtn = document.createElement('button');
            shareBtn.innerHTML = '📤';
            shareBtn.className = 'share-btn';
            shareBtn.style.cssText = `
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
                cursor: pointer;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
                z-index: 5;
            `;

            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const recipeTitle = card.querySelector('.recipe-title').textContent;
                
                if (navigator.share) {
                    navigator.share({
                        title: `Receita OverBerry: ${recipeTitle}`,
                        text: `Confira esta deliciosa receita com açaí liofilizado!`,
                        url: window.location.href
                    });
                } else {
                    // Fallback for browsers without Web Share API
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        shareBtn.textContent = '✓';
                        setTimeout(() => {
                            shareBtn.innerHTML = '📤';
                        }, 2000);
                    });
                }
            });

            shareBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            });

            shareBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });

            card.querySelector('.recipe-image').appendChild(shareBtn);
        });
    }

    // Initialize sharing buttons
    addSharingButtons();

    // Add performance optimization - lazy loading for images
    function addLazyLoading() {
        const images = document.querySelectorAll('.recipe-img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Add loading class for smooth transition
                    img.classList.add('loading');
                    
                    // Simulate loading time for demo
                    setTimeout(() => {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                    }, 300);
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });

        // Add CSS for loading states
        const style = document.createElement('style');
        style.textContent = `
            .recipe-img.loading {
                opacity: 0.7;
                filter: blur(2px);
            }
            .recipe-img.loaded {
                opacity: 1;
                filter: none;
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize lazy loading
    addLazyLoading();

    console.log('Página de receitas OverBerry carregada com sucesso!');
    console.log(`Total de receitas: ${recipeCards.length}`);
    console.log('Funcionalidades ativas: Filtros, Busca, Animações, Compartilhamento, Redirecionamento');
}