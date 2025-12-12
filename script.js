// Основной скрипт для управления приложением
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    initApp();
    
    // Загрузка товаров на главную страницу
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
    
    // Настройка навигации
    setupNavigation();
    
    // Настройка взаимодействий
    setupInteractions();
});

// Инициализация приложения
function initApp() {
    console.log('TestName приложение загружено');
    
    // Установка текущего года в футере, если есть
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Загрузка рекомендованных товаров
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    // Получаем первые 4 товара как рекомендованные
    const featuredProducts = products.slice(0, 4);
    
    // Очищаем контейнер
    featuredContainer.innerHTML = '';
    
    // Добавляем товары в контейнер
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredContainer.appendChild(productCard);
    });
}

// Создание карточки товара
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${product.price} ₽</div>
            <div class="product-actions">
                <button class="add-to-favorite" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    // Добавляем обработчики событий
    const favoriteBtn = card.querySelector('.add-to-favorite');
    const cartBtn = card.querySelector('.add-to-cart');
    
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleFavorite(product.id);
        updateFavoriteButton(favoriteBtn, product.id);
    });
    
    cartBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        addToCart(product.id);
        updateCartCount();
    });
    
    // При клике на карточку переходим на страницу товара
    card.addEventListener('click', function() {
        window.location.href = `product.html?id=${product.id}`;
    });
    
    return card;
}

// Настройка навигации
function setupNavigation() {
    // Определяем текущую страницу
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    // Убираем активный класс у всех элементов навигации
    navItems.forEach(item => {
        item.classList.remove('active');
        
        // Проверяем, соответствует ли ссылка текущей странице
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
}

// Настройка взаимодействий
function setupInteractions() {
    // Поиск
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Поиск:', this.value);
            // В реальном приложении здесь будет фильтрация товаров
        });
    }
    
    // Кнопка уведомлений
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            alert('У вас нет новых уведомлений');
        });
    }
    
    // Инициализация кнопок избранного на странице
    document.querySelectorAll('.add-to-favorite').forEach(btn => {
        const productId = btn.dataset.id;
        updateFavoriteButton(btn, productId);
    });
}

// Управление избранным
function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(productId)) {
        // Удаляем из избранного
        favorites = favorites.filter(id => id !== productId);
    } else {
        // Добавляем в избранное
        favorites.push(productId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Обновляем счетчик в навигации
    updateFavoriteCount();
    
    return !favorites.includes(productId); // Возвращаем новое состояние
}

// Обновление кнопки избранного
function updateFavoriteButton(button, productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(productId)) {
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.style.color = '#ff66cc';
    } else {
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.style.color = '';
    }
}

// Обновление счетчика избранного
function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteCountElement = document.querySelector('.favorite-count');
    
    if (favoriteCountElement) {
        favoriteCountElement.textContent = favorites.length;
    }
}

// Добавление в корзину
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, есть ли уже товар в корзине
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Увеличиваем количество
        existingItem.quantity += 1;
    } else {
        // Добавляем новый товар
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Показываем уведомление
    showNotification('Товар добавлен в корзину');
}

// Обновление счетчика корзины
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Показ уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(18, 18, 37, 0.95);
        color: #00ccff;
        padding: 15px 20px;
        border-radius: 10px;
        border: 1px solid rgba(0, 150, 255, 0.3);
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
// Создание карточки товара для каталога (с улучшениями)
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    // Проверяем, есть ли товар в избранном
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(product.id);
    
    // Проверяем, есть ли товар в корзине
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === product.id);
    const inCart = cartItem ? cartItem.quantity : 0;
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
            ${product.inStock ? '' : '<div class="out-of-stock-label">Нет в наличии</div>'}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${product.price} ₽</div>
            <div class="product-rating-small">
                <i class="fas fa-star"></i> ${product.rating} (${product.reviews})
            </div>
            <div class="product-actions">
                <button class="add-to-favorite ${isFavorite ? 'active' : ''}" data-id="${product.id}">
                    <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button class="add-to-cart ${inCart > 0 ? 'active' : ''}" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                    ${inCart > 0 ? `<span class="cart-badge">${inCart}</span>` : ''}
                </button>
            </div>
        </div>
    `;
    
    // Добавляем обработчики событий
    const favoriteBtn = card.querySelector('.add-to-favorite');
    const cartBtn = card.querySelector('.add-to-cart');
    
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const wasAdded = toggleFavorite(product.id);
        updateFavoriteButton(favoriteBtn, product.id);
        
        // Показываем уведомление
        showNotification(wasAdded ? 'Добавлено в избранное' : 'Удалено из избранного');
    });
    
    cartBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        addToCart(product.id);
        updateCartButton(cartBtn, product.id);
        showNotification('Товар добавлен в корзину');
    });
    
    // При клике на карточку переходим на страницу товара
    card.addEventListener('click', function() {
        window.location.href = `product.html?id=${product.id}`;
    });
    
    return card;
}

// Обновление кнопки корзины
function updateCartButton(button, productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem && cartItem.quantity > 0) {
        button.classList.add('active');
        button.innerHTML = `<i class="fas fa-cart-plus"></i><span class="cart-badge">${cartItem.quantity}</span>`;
    } else {
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-cart-plus"></i>';
    }
}

// Инициализация кнопок корзины на странице
function updateAllCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        const productId = btn.dataset.id;
        updateCartButton(btn, productId);
    });
}
// Инициализация при загрузке страницы
updateCartCount();
updateFavoriteCount();