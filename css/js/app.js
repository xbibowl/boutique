let products = [];
let cart = JSON.parse(localStorage.getItem('boutique_cart')) || [];
let currentFilter = 'All';
let currentSort = 'default';
let visibleCount = 6;
let settings = {};

// Initialize
function init() {
    products = db.getProducts();
    settings = db.getSettings();
    db.applyTheme(settings);
    
    renderProducts();
    updateCartCount();
    renderCart();
    populateFilters();
    
    // Prepare form for cart data
    document.getElementById('checkout-form').addEventListener('submit', prepareOrderData);
}

function populateFilters() {
    const categories = ['All', ...new Set(products.map(p => p.category))];
    const filterContainer = document.querySelector('.filters');
    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === currentFilter ? 'active' : ''}" onclick="setFilter('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function setFilter(cat) {
    currentFilter = cat;
    visibleCount = 6;
    renderProducts();
    populateFilters();
}

function setSort(val) {
    currentSort = val;
    renderProducts();
}

function renderProducts() {
    let filtered = products.filter(p => currentFilter === 'All' || p.category === currentFilter);
    
    if (currentSort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (currentSort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (currentSort === 'name-asc') filtered.sort((a, b) => a.title.localeCompare(b.title));

    const grid = document.querySelector('.products-grid');
    const toShow = filtered.slice(0, visibleCount);
    
    grid.innerHTML = toShow.map(p => `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='https://placehold.co/400x500?text=${p.title}'">
            </div>
            <div class="product-info">
                <div class="product-category">${p.category}</div>
                <div class="product-title">${p.title}</div>
                <div class="product-price">${p.price} ${settings.currency}</div>
            </div>
            <button class="add-to-cart" onclick="addToCart(${p.id})">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </button>
        </div>
    `).join('');

    const loadMoreBtn = document.querySelector('.load-more-container');
    if (visibleCount < filtered.length) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

function loadMore() {
    visibleCount += 6;
    renderProducts();
}

// Cart Logic
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    renderCart();
    toggleCart(true);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCart();
}

function saveCart() {
    localStorage.setItem('boutique_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').innerText = count;
}

function toggleCart(show) {
    const drawer = document.querySelector('.cart-drawer');
    if (show) drawer.classList.add('open');
    else drawer.classList.remove('open');
}

function renderCart() {
    const container = document.querySelector('.cart-items');
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://placehold.co/70x70?text=${item.title}'">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${item.price} ${settings.currency} x ${item.quantity}</div>
            </div>
            <div onclick="removeFromCart(${item.id})" style="cursor:pointer; color:var(--text-muted)">✕</div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector('.total-value').innerText = total + ' ' + settings.currency;
    
    if (cart.length > 0) {
        document.querySelector('.checkout-btn').style.display = 'block';
    } else {
        document.querySelector('.checkout-btn').style.display = 'none';
        document.querySelector('.checkout-form').classList.remove('visible');
    }
}

function showCheckout() {
    document.querySelector('.checkout-form').classList.add('visible');
}

function prepareOrderData() {
    const orderDetails = cart.map(item => `${item.title} (x${item.quantity}) - ${item.price * item.quantity} ${settings.currency}`).join('\n');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('order-details-input').value = orderDetails;
    document.getElementById('total-price-input').value = total + ' ' + settings.currency;
    
    // Clear cart after a short delay (so the form can submit first)
    setTimeout(() => {
        cart = [];
        saveCart();
    }, 1000);
}

document.addEventListener('DOMContentLoaded', init);
