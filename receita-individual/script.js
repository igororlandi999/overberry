document.addEventListener('DOMContentLoaded', function() {
    // Mostrar loading screen
    showLoadingScreen();

    // Simular carregamento da página
    setTimeout(() => {
        hideLoadingScreen();
        initializeRecipePage();
    }, 1500); // 1.5 segundos de loading para páginas individuais
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
                            animation: loadProgress 1.5s ease-in-out forwards;
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

// Função principal que inicializa a página de receita individual
function initializeRecipePage() {
    console.log('Página de receita individual carregada!');

    // Initialize page with smooth entrance animation
    initializePageAnimations();

    // Ingredients functionality
    setupIngredientsInteraction();
    
    // Instructions functionality
    setupInstructionsInteraction();
    
    // Shopping list functionality
    setupShoppingList();
    
    // Recipe scaling functionality
    setupRecipeScaling();
    
    // Share functionality
    setupShareButtons();
    
    // Related recipes functionality
    setupRelatedRecipes();
    
    // Image expand functionality
    setupImageExpand();
    
    // Back to top functionality
    setupBackToTop();
    
    // CTA button functionality
    setupCTAButtons();
    
    // Progress tracking
    setupProgressTracking();
    
    // Scroll animations
    setupScrollAnimations();
}

// Initialize page with smooth entrance animation
function initializePageAnimations() {
    const hero = document.querySelector('.recipe-hero');
    const content = document.querySelector('.recipe-content');
    
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(30px)';
        content.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Ingredients interaction
function setupIngredientsInteraction() {
    const ingredientItems = document.querySelectorAll('.ingredient-item');
    
    ingredientItems.forEach((item, index) => {
        const checkbox = item.querySelector('.ingredient-checkbox');
        
        if (checkbox) {
            // Click on item toggles checkbox
            item.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    updateIngredientState(item, checkbox.checked);
                }
            });
            
            // Checkbox change event
            checkbox.addEventListener('change', function() {
                updateIngredientState(item, this.checked);
            });
        }
    });
}

function updateIngredientState(item, isChecked) {
    if (isChecked) {
        item.classList.add('checked');
        // Add strikethrough animation
        item.style.animation = 'checkIngredient 0.3s ease';
    } else {
        item.classList.remove('checked');
        item.style.animation = '';
    }
    
    // Update progress
    updateIngredientProgress();
}

function updateIngredientProgress() {
    const totalIngredients = document.querySelectorAll('.ingredient-checkbox').length;
    const checkedIngredients = document.querySelectorAll('.ingredient-checkbox:checked').length;
    const progress = totalIngredients > 0 ? (checkedIngredients / totalIngredients) * 100 : 0;
    
    // Create or update progress bar if it doesn't exist
    let progressBar = document.querySelector('.ingredients-progress');
    if (!progressBar && totalIngredients > 0) {
        progressBar = document.createElement('div');
        progressBar.className = 'ingredients-progress';
        progressBar.innerHTML = `
            <div class="progress-label">Ingredientes preparados: <span class="progress-text">0/${totalIngredients}</span></div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
        `;
        
        const ingredientsContainer = document.querySelector('.ingredients-container');
        if (ingredientsContainer) {
            const actionsContainer = document.querySelector('.ingredients-actions');
            if (actionsContainer) {
                ingredientsContainer.insertBefore(progressBar, actionsContainer);
            } else {
                ingredientsContainer.appendChild(progressBar);
            }
        }
        
        // Add CSS for progress bar
        const style = document.createElement('style');
        style.textContent = `
            .ingredients-progress {
                margin: 1.5rem 0;
                padding: 1rem;
                background: white;
                border-radius: 12px;
                border: 2px solid #e2e8f0;
            }
            .progress-label {
                font-weight: 600;
                color: #374151;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #f1f5f9;
                border-radius: 4px;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #34d399);
                transition: width 0.3s ease;
            }
            @keyframes checkIngredient {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
            @keyframes celebrate {
                0%, 100% { transform: scale(1); }
                25% { transform: scale(1.05); }
                75% { transform: scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Update progress
    if (progressBar) {
        const progressFill = progressBar.querySelector('.progress-fill');
        const progressText = progressBar.querySelector('.progress-text');
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressText) progressText.textContent = `${checkedIngredients}/${totalIngredients}`;
        
        // Celebration animation when all ingredients are checked
        if (progress === 100) {
            progressBar.style.animation = 'celebrate 0.6s ease';
            setTimeout(() => {
                progressBar.style.animation = '';
            }, 600);
        }
    }
}

// Instructions interaction
function setupInstructionsInteraction() {
    const instructionSteps = document.querySelectorAll('.instruction-step');
    
    instructionSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            this.classList.toggle('completed');
            
            // Add completion animation
            if (this.classList.contains('completed')) {
                this.style.animation = 'completeStep 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
            
            updateInstructionProgress();
        });
        
        // Add step completion animation CSS
        if (index === 0) {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes completeStep {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); background: #f0f9ff; }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    });
}

function updateInstructionProgress() {
    const totalSteps = document.querySelectorAll('.instruction-step').length;
    const completedSteps = document.querySelectorAll('.instruction-step.completed').length;
    const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
    
    console.log(`Progresso das instruções: ${completedSteps}/${totalSteps} (${progress.toFixed(0)}%)`);
    
    // Show success message when all steps are completed
    if (progress === 100 && totalSteps > 0) {
        showSuccessMessage();
    }
}

function showSuccessMessage() {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) return;
    
    const recipeName = document.querySelector('.recipe-title')?.textContent || 'receita';
    
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <div class="success-icon">🎉</div>
            <h3>Parabéns!</h3>
            <p>Você completou a receita! Aproveite seu delicioso ${recipeName}!</p>
            <button class="btn-share-success">Compartilhar conquista</button>
        </div>
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: successAppear 0.5s ease;
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        backdrop-filter: blur(4px);
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(message);
    
    // Add success animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes successAppear {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .success-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        .success-icon {
            font-size: 3rem;
            animation: bounce 1s infinite;
        }
        .success-content h3 {
            color: #1e293b;
            margin: 0;
        }
        .success-content p {
            color: #64748b;
            margin: 0;
            line-height: 1.6;
        }
        .btn-share-success {
            background: linear-gradient(135deg, #10b981, #34d399);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-share-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Close message handlers
    overlay.addEventListener('click', closeSuccessMessage);
    message.querySelector('.btn-share-success').addEventListener('click', function() {
        shareSuccess();
        closeSuccessMessage();
    });
    
    function closeSuccessMessage() {
        overlay.remove();
        message.remove();
    }
}

function shareSuccess() {
    const recipeName = document.querySelector('.recipe-title')?.textContent || 'receita OverBerry';
    const text = `Acabei de fazer um delicioso ${recipeName} com OverBerry! 🎉`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Receita Concluída!',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text + ' ' + window.location.href);
        showNotification('Link copiado para a área de transferência!', 'success');
    }
}

// Shopping list functionality
function setupShoppingList() {
    const shoppingListBtn = document.getElementById('shoppingListBtn');
    
    if (shoppingListBtn) {
        shoppingListBtn.addEventListener('click', function() {
            generateShoppingList();
        });
    }
}

function generateShoppingList() {
    const ingredients = [];
    const ingredientItems = document.querySelectorAll('.ingredient-item:not(.checked)');
    
    ingredientItems.forEach(item => {
        const amountElement = item.querySelector('.ingredient-amount');
        const nameElement = item.querySelector('.ingredient-name');
        
        if (amountElement && nameElement) {
            const amount = amountElement.textContent;
            const name = nameElement.textContent;
            ingredients.push(`${amount} ${name}`);
        }
    });
    
    if (ingredients.length === 0) {
        showNotification('Todos os ingredientes já estão marcados! 🎉', 'success');
        return;
    }
    
    const recipeName = document.querySelector('.recipe-title')?.textContent || 'Receita OverBerry';
    
    const listText = `Lista de Compras - ${recipeName}:\n\n` + 
                    ingredients.map(item => `• ${item}`).join('\n') + 
                    '\n\n🛒 Criado com OverBerry - O melhor açaí liofilizado!';
    
    if (navigator.share) {
        navigator.share({
            title: `Lista de Compras - ${recipeName}`,
            text: listText
        });
    } else {
        navigator.clipboard.writeText(listText).then(() => {
            showNotification('Lista de compras copiada para a área de transferência!', 'success');
        });
    }
}

// Recipe scaling functionality
function setupRecipeScaling() {
    const scaleBtn = document.getElementById('scaleRecipeBtn');
    
    if (scaleBtn) {
        scaleBtn.addEventListener('click', function() {
            showScaleModal();
        });
    }
}

function showScaleModal() {
    const modal = document.createElement('div');
    modal.className = 'scale-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <h3>Ajustar Porções</h3>
            <p>Para quantas pessoas você quer fazer esta receita?</p>
            <div class="portion-selector">
                <button class="portion-btn" data-portions="1">1 pessoa</button>
                <button class="portion-btn active" data-portions="2">2 pessoas</button>
                <button class="portion-btn" data-portions="4">4 pessoas</button>
                <button class="portion-btn" data-portions="6">6 pessoas</button>
            </div>
            <div class="modal-actions">
                <button class="btn-cancel">Cancelar</button>
                <button class="btn-apply">Aplicar</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
        }
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            max-width: 400px;
            width: 90%;
            position: relative;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .modal-content h3 {
            color: #1e293b;
            margin-bottom: 1rem;
        }
        .modal-content p {
            color: #64748b;
            margin-bottom: 2rem;
        }
        .portion-selector {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
            margin-bottom: 2rem;
        }
        .portion-btn {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            color: #374151;
            padding: 0.75rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }
        .portion-btn:hover, .portion-btn.active {
            background: #7c3aed;
            color: white;
            border-color: #7c3aed;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
        }
        .btn-cancel, .btn-apply {
            flex: 1;
            padding: 0.75rem;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-cancel {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            color: #374151;
        }
        .btn-apply {
            background: #10b981;
            border: 2px solid #10b981;
            color: white;
        }
        .btn-cancel:hover {
            background: #f1f5f9;
        }
        .btn-apply:hover {
            background: #059669;
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(style);
    
    // Modal interactions
    let selectedPortions = 2;
    
    modal.querySelectorAll('.portion-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            modal.querySelectorAll('.portion-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedPortions = parseInt(this.dataset.portions);
        });
    });
    
    modal.querySelector('.btn-cancel').addEventListener('click', () => modal.remove());
    modal.querySelector('.modal-overlay').addEventListener('click', () => modal.remove());
    
    modal.querySelector('.btn-apply').addEventListener('click', function() {
        scaleRecipe(selectedPortions);
        modal.remove();
        showNotification(`Receita ajustada para ${selectedPortions} ${selectedPortions === 1 ? 'pessoa' : 'pessoas'}!`, 'success');
    });
}

function scaleRecipe(portions) {
    // Base amounts for 1 person (example values - adjust per recipe)
    const baseAmounts = {
        'OverBerry': 2,
        'Banana': 1,
        'Leite': 200,
        'Mel': 1,
        'Pasta': 1
    };
    
    document.querySelectorAll('.ingredient-item').forEach(item => {
        const amountElement = item.querySelector('.ingredient-amount');
        const nameElement = item.querySelector('.ingredient-name');
        
        if (!amountElement || !nameElement) return;
        
        const ingredientName = nameElement.textContent;
        
        // Find matching base amount
        for (const [baseName, baseAmount] of Object.entries(baseAmounts)) {
            if (ingredientName.includes(baseName) || ingredientName.toLowerCase().includes(baseName.toLowerCase())) {
                if (typeof baseAmount === 'number') {
                    const currentText = amountElement.textContent;
                    const unit = currentText.replace(/[\d.]/g, '').trim();
                    const newAmount = baseAmount * portions;
                    amountElement.textContent = `${newAmount} ${unit}`;
                }
                break;
            }
        }
    });
    
    // Update recipe meta
    const portionsValue = document.querySelector('.meta-item .meta-value');
    if (portionsValue && portionsValue.textContent.includes('pessoa')) {
        portionsValue.textContent = `${portions} ${portions === 1 ? 'pessoa' : 'pessoas'}`;
    }
}

// Share functionality
function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            shareRecipe(platform);
        });
    });
}

function shareRecipe(platform) {
    const title = document.querySelector('.recipe-title')?.textContent || 'Receita OverBerry';
    const url = window.location.href;
    const text = `Confira esta receita incrível: ${title} com OverBerry! 🍓`;
    
    switch (platform) {
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'instagram':
            navigator.clipboard.writeText(text + ' ' + url);
            showNotification('Link copiado! Cole no Instagram Stories ou posts.', 'success');
            break;
        case 'copy':
            navigator.clipboard.writeText(url).then(() => {
                showNotification('Link copiado para a área de transferência!', 'success');
            });
            break;
    }
}

// Related recipes functionality
function setupRelatedRecipes() {
    const relatedCards = document.querySelectorAll('.related-card');
    
    relatedCards.forEach(card => {
        card.addEventListener('click', function() {
            const recipeName = this.querySelector('.related-name')?.textContent;
            
            if (!recipeName) return;
            
            // Convert recipe name to URL-friendly format
            const recipeSlug = recipeName.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[áàâã]/g, 'a')
                .replace(/[éê]/g, 'e')
                .replace(/[í]/g, 'i')
                .replace(/[óô]/g, 'o')
                .replace(/[ú]/g, 'u')
                .replace(/[ç]/g, 'c')
                .replace(/[^a-z0-9-]/g, '');
            
            // Navegação para outras receitas
            showNotification(`Navegando para: ${recipeName}`, 'info');
            
            // Em produção, descomente a linha abaixo:
            // window.location.href = `${recipeSlug}.html`;
        });
    });
}

// Image expand functionality
function setupImageExpand() {
    const expandBtn = document.querySelector('.image-expand-btn');
    const recipeImg = document.querySelector('.recipe-main-img');
    
    if (expandBtn && recipeImg) {
        expandBtn.addEventListener('click', function() {
            showImageModal(recipeImg.src, recipeImg.alt);
        });
        
        recipeImg.addEventListener('dblclick', function() {
            showImageModal(this.src, this.alt);
        });
    }
}

function showImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-overlay"></div>
        <div class="image-modal-content">
            <img src="${src}" alt="${alt}" class="modal-image">
            <button class="close-modal">✕</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Add image modal styles
    const style = document.createElement('style');
    style.textContent = `
        .image-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(4px);
        }
        .image-modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        }
        .modal-image {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        .close-modal:hover {
            background: white;
            transform: scale(1.1);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('.image-modal-overlay').addEventListener('click', () => modal.remove());
    
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Back to top functionality
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
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

// CTA buttons functionality
function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn-buy-overberry, .cta-button');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Redirect to product page (ajustar caminho conforme estrutura)
            window.location.href = '../acai-liofilizado.html';
        });
    });
}

// Progress tracking
function setupProgressTracking() {
    // Track reading progress
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update progress bar if it exists
        let progressBar = document.querySelector('.reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #7c3aed, #10b981);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrolled + '%';
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.recipe-section, .sidebar-card, .tip-card, .related-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}