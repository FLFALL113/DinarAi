// Моковые данные товаров
const products = [
    {
        id: 1,
        name: "Смартфон Neon X",
        price: 29999,
        category: "electronics",
        icon: "fas fa-mobile-alt",
        description: "Смартфон с AMOLED-экраном 6.7 дюйма, 128 ГБ памяти, тройной камерой 48 Мп.",
        rating: 4.7,
        reviews: 124,
        sizes: ["Не применимо"],
        delivery: "Доставка за 1-3 дня, бесплатно от 3000₽",
        inStock: true
    },
    {
        id: 2,
        name: "Беспроводные наушники",
        price: 7999,
        category: "electronics",
        icon: "fas fa-headphones",
        description: "Наушники с шумоподавлением, время работы до 30 часов.",
        rating: 4.5,
        reviews: 89,
        sizes: ["Не применимо"],
        delivery: "Доставка за 1-2 дня, бесплатно от 3000₽",
        inStock: true
    },
    {
        id: 3,
        name: "Футболка TechWear",
        price: 2499,
        category: "fashion",
        icon: "fas fa-tshirt",
        description: "Футболка из высококачественного хлопка с технологичным дизайном.",
        rating: 4.3,
        reviews: 56,
        sizes: ["XS", "S", "M", "L", "XL"],
        delivery: "Доставка за 2-4 дня, бесплатно от 3000₽",
        inStock: true
    },
    {
        id: 4,
        name: "Умные часы Pro",
        price: 15999,
        category: "electronics",
        icon: "fas fa-clock",
        description: "Умные часы с мониторингом здоровья, GPS и 7-дневной батареей.",
        rating: 4.8,
        reviews: 203,
        sizes: ["Регулируемый ремешок"],
        delivery: "Доставка за 1-3 дня, бесплатно от 3000₽",
        inStock: true
    },
    {
        id: 5,
        name: "Игровая мышь",
        price: 3499,
        category: "electronics",
        icon: "fas fa-mouse",
        description: "Игровая мышь с RGB-подсветкой, 16000 DPI и 6 программируемыми кнопками.",
        rating: 4.6,
        reviews: 78,
        sizes: ["Не применимо"],
        delivery: "Доставка за 1-2 дня, бесплатно от 3000₽",
        inStock: true
    },
    {
        id: 6,
        name: "Книга 'Web Development'",
        price: 1899,
        category: "books",
        icon: "fas fa-book",
        description: "Полное руководство по современной веб-разработке.",
        rating: 4.9,
        reviews: 45,
        sizes: ["Мягкая обложка, 450 стр."],
        delivery: "Доставка за 3-5 дней, бесплатно от 3000₽",
        inStock: true
    },
    {
        id: 7,
        name: "Беговая дорожка",
        price: 45999,
        category: "sports",
        icon: "fas fa-running",
        description: "Электрическая беговая дорожка с 12 программами тренировок.",
        rating: 4.4,
        reviews: 32,
        sizes: ["Размер: 150x70x130 см"],
        delivery: "Доставка за 5-7 дней, бесплатно от 30000₽",
        inStock: true
    },
    {
        id: 8,
        name: "Умная лампа",
        price: 2999,
        category: "home",
        icon: "fas fa-lightbulb",
        description: "Умная лампа с изменением цвета и управлением через приложение.",
        rating: 4.7,
        reviews: 112,
        sizes: ["Стандартный цоколь E27"],
        delivery: "Доставка за 1-3 дня, бесплатно от 3000₽",
        inStock: true
    }
];

// Функция для получения товара по ID
function getProductById(id) {
    return products.find(product => product.id == id);
}

// Функция для получения товаров по категории
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Функция для поиска товаров
function searchProducts(query) {
    return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
}