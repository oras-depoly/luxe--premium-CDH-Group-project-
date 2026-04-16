const products = [
    { id: 1, name: 'Pro ANC Headphones', cat: 'Electronics', price: 12999, oldPrice: 18999, rating: 4.8, reviews: 2341, badge: 'new', desc: 'Premium Active Noise Cancellation with 40-hour battery life. Studio-quality sound meets all-day comfort in this flagship headphone experience.', icon: 'fas fa-headphones', colors: ['Midnight Black', 'Pearl White', 'Navy Blue'], sizes: [] },
    { id: 2, name: 'Ultra Smart Watch', cat: 'Electronics', price: 18999, oldPrice: 24999, rating: 4.9, reviews: 1893, badge: 'hot', desc: 'Advanced health monitoring, GPS, always-on AMOLED display. Your ultimate fitness companion with 7-day battery life.', icon: 'fas fa-watch', colors: ['Space Grey', 'Rose Gold', 'Graphite'], sizes: [] },
    { id: 3, name: '4K OLED Monitor', cat: 'Electronics', price: 54999, oldPrice: 74999, rating: 4.7, reviews: 892, badge: 'sale', desc: '27-inch 4K OLED panel with 240Hz refresh rate and 0.1ms response time. Experience gaming and creativity like never before.', icon: 'fas fa-desktop', colors: ['Matte Black'], sizes: [] },
    { id: 4, name: 'Designer Graphic Tee', cat: 'Fashion', price: 2499, oldPrice: 3499, rating: 4.6, reviews: 3201, badge: 'new', desc: 'Premium 100% organic cotton with exclusive graphic print. Comfortable, sustainable, and undeniably stylish.', icon: 'fas fa-tshirt', colors: ['White', 'Black', 'Olive'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    { id: 5, name: 'Leather Crossbody Bag', cat: 'Fashion', price: 8999, oldPrice: 12999, rating: 4.8, reviews: 1102, badge: '', desc: 'Handcrafted full-grain leather with brass hardware. Timeless design meets everyday functionality.', icon: 'fas fa-shopping-bag', colors: ['Tan', 'Black', 'Burgundy'], sizes: [] },
    { id: 6, name: 'Running Sneakers Pro', cat: 'Fashion', price: 9499, oldPrice: 12000, rating: 4.7, reviews: 2788, badge: 'hot', desc: 'Ultra-light responsive foam with breathable mesh upper. Built for performance, designed for life.', icon: 'fas fa-shoe-prints', colors: ['White/Orange', 'Black/Silver', 'Navy'], sizes: ['6', '7', '8', '9', '10', '11', '12'] },
    { id: 7, name: 'Smart Air Purifier', cat: 'Home & Living', price: 14999, oldPrice: 19999, rating: 4.6, reviews: 445, badge: '', desc: 'HEPA H13 filtration capturing 99.97% of particles. Smart air quality monitoring with app control.', icon: 'fas fa-wind', colors: ['White'], sizes: [] },
    { id: 8, name: 'Minimalist Desk Lamp', cat: 'Home & Living', price: 3499, oldPrice: 4999, rating: 4.5, reviews: 1231, badge: 'sale', desc: 'Circadian lighting with 10 brightness levels and 5 color temperatures. Wireless charging base included.', icon: 'fas fa-lightbulb', colors: ['White', 'Black', 'Gold'], sizes: [] },
    { id: 9, name: 'Yoga Mat Premium', cat: 'Sports', price: 2999, oldPrice: 3999, rating: 4.7, reviews: 887, badge: 'new', desc: 'Extra thick 6mm natural rubber with alignment lines. Superior grip on both sides for stability in any pose.', icon: 'fas fa-running', colors: ['Teal', 'Purple', 'Black'], sizes: [] },
    { id: 10, name: 'Wireless Earbuds Pro', cat: 'Electronics', price: 8499, oldPrice: 12999, rating: 4.8, reviews: 4201, badge: 'hot', desc: 'True wireless with spatial audio, 36-hour total battery, and IPX5 water resistance. Premium sound, premium comfort.', icon: 'fas fa-podcast', colors: ['White', 'Black', 'Blue'], sizes: [] },
    { id: 11, name: 'Denim Jacket', cat: 'Fashion', price: 5499, oldPrice: 7999, rating: 4.5, reviews: 678, badge: '', desc: 'Classic denim jacket with a modern tailored fit. Premium stretch denim that moves with you.', icon: 'fas fa-user-tie', colors: ['Light Wash', 'Dark Wash', 'Black'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
    { id: 12, name: 'Smart LED Strip 10m', cat: 'Home & Living', price: 1999, oldPrice: 2999, rating: 4.4, reviews: 2345, badge: 'sale', desc: '16M colors with music sync and app control. Transform any room with dynamic, immersive lighting.', icon: 'fas fa-sun', colors: ['Multicolor'], sizes: [] },
];

const categories = [
    { name: 'Electronics', icon: 'fas fa-microchip', count: 4 },
    { name: 'Fashion', icon: 'fas fa-tshirt', count: 3 },
    { name: 'Home & Living', icon: 'fas fa-home', count: 3 },
    { name: 'Sports', icon: 'fas fa-dumbbell', count: 1 },
    { name: 'Beauty', icon: 'fas fa-spa', count: 0 },
    { name: 's', icon: 'fas fa-book', count: 0 },
    { name: 'ToyBooks', icon: 'fas fa-gamepad', count: 0 },
    { name: 'Food', icon: 'fas fa-utensils', count: 0 },
];

// ─── STATE ───
let cart = JSON.parse(localStorage.getItem('luxe_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('luxe_wish') || '[]');
let currentPage = 'home';
let prevPage = 'home';
let currentProduct = null;
let shopFilter = 'All';
let shopSort = 'default';
let pdQty = 1;
let pdColor = '';
let pdSize = '';
let selectedPayment = 'upi';

// ─── PERSIST ───
function saveState() {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
    localStorage.setItem('luxe_wish', JSON.stringify(wishlist));
}

// ─── CURSOR ───
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
    }, 60);
});
document.addEventListener('mousedown', () => { cursor.style.transform = 'translate(-50%,-50%) scale(0.7)'; });
document.addEventListener('mouseup', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });

// ─── NAVBAR SCROLL ───
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ─── NAVIGATE ───
function navigate(page) {
    prevPage = currentPage;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    currentPage = page;

    // Footer visibility
    const noFooter = ['checkout', 'success'];
    document.getElementById('mainFooter').style.display = noFooter.includes(page) ? 'none' : 'block';

    // Rebuild pages
    if (page === 'shop') renderShop();
    if (page === 'wishlist') renderWishlist();
    if (page === 'checkout') renderCheckout();

    // nav active
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const map = { home: 'nav-home', shop: 'nav-shop', about: 'nav-about' };
    if (map[page]) document.getElementById(map[page])?.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeAll();
}

function goBack() { navigate(prevPage === currentPage ? 'shop' : prevPage); }

// ─── MOBILE MENU ───
let mobileOpen = false;
function toggleMobile() {
    mobileOpen = !mobileOpen;
    document.getElementById('mobileMenu').classList.toggle('open', mobileOpen);
}

// ─── MARQUEE ───
function buildMarquee() {
    const items = ['Free Shipping Above ₹999', 'New Arrivals Every Week', '30-Day Easy Returns', '24/7 Customer Support', 'COD Available', 'Authentic Products Guaranteed'];
    const inner = document.getElementById('marqueeInner');
    inner.innerHTML = [...items, ...items].map(t => `<span class="marquee-item"><i class="fas fa-diamond"></i>${t}</span>`).join('');
}

// ─── CATEGORIES ───
function buildCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    grid.innerHTML = categories.map(c => `
    <div class="cat-card" onclick="filterCategory('${c.name}')">
      <div class="cat-icon"><i class="${c.icon}"></i></div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count > 0 ? c.count + ' Products' : 'Coming Soon'}</div>
      <div class="cat-arrow"><i class="fas fa-arrow-right"></i></div>
    </div>`).join('');
}

function filterCategory(cat) {
    shopFilter = cat;
    navigate('shop');
}

// ─── PRODUCT CARD HTML ───
function productCardHTML(p) {
    const disc = p.oldPrice ? Math.round((p.oldPrice - p.price) / p.oldPrice * 100) : 0;
    const inWish = wishlist.includes(p.id);
    return `
  <div class="product-card" onclick="openProduct(${p.id})">
    <div class="product-img-wrap">
      <i class="${p.icon}"></i>
      <div class="product-badges">${p.badge ? `<span class="p-badge ${p.badge}">${p.badge}</span>` : ''}${disc > 0 ? `<span class="p-badge sale">-${disc}%</span>` : ''}</div>
      <div class="product-actions" onclick="event.stopPropagation()">
        <button class="p-act-btn add-cart" onclick="addToCart(${p.id})"><i class="fas fa-shopping-bag"></i> Add to Cart</button>
        <button class="p-act-btn wishlist" onclick="toggleWishlist(${p.id},this)">${inWish ? '<i class="fas fa-heart" style="color:var(--red)"></i>' : '<i class="far fa-heart"></i>'}</button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-cat">${p.cat}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-rating">
        <div class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</div>
        <div class="rating-count">(${p.reviews.toLocaleString()})</div>
      </div>
      <div class="product-price">
        <span class="price-main">₹${p.price.toLocaleString()}</span>
        ${p.oldPrice ? `<span class="price-old">₹${p.oldPrice.toLocaleString()}</span>` : ''}
        ${disc > 0 ? `<span class="price-off">${disc}% off</span>` : ''}
      </div>
    </div>
  </div>`;
}

// ─── FEATURED ───
function buildFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    const feat = products.filter(p => ['hot', 'new'].includes(p.badge)).slice(0, 4);
    grid.innerHTML = feat.map(productCardHTML).join('');
}

// ─── SHOP PAGE ───
function renderShop() {
    // Filters
    const filterDiv = document.getElementById('shopFilters');
    const cats = ['All', ...new Set(products.map(p => p.cat))];
    filterDiv.innerHTML = cats.map(c => `<button class="filter-tab ${c === shopFilter || (shopFilter === 'All' && c === 'All') ? 'active' : ''}" onclick="setShopFilter('${c}')">${c}</button>`).join('');

    let filtered = shopFilter === 'All' ? [...products] : products.filter(p => p.cat === shopFilter);

    if (shopSort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (shopSort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (shopSort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (shopSort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

    document.getElementById('shopGrid').innerHTML = filtered.map(productCardHTML).join('');
}

function setShopFilter(f) {
    shopFilter = f;
    renderShop();
}

function sortProducts(val) {
    shopSort = val;
    renderShop();
}

// ─── PRODUCT DETAIL ───
function openProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    currentProduct = p;
    pdQty = 1;
    pdColor = p.colors[0] || '';
    pdSize = p.sizes[0] || '';
    const disc = p.oldPrice ? Math.round((p.oldPrice - p.price) / p.oldPrice * 100) : 0;
    const inner = document.getElementById('productDetailInner');
    inner.innerHTML = `
    <div>
      <div class="pd-img-main"><i class="${p.icon} float"></i></div>
      <div class="pd-thumbs">
        ${[1, 2, 3].map((t, i) => `<div class="pd-thumb ${i === 0 ? 'active' : ''}" onclick="selectThumb(this)"><i class="${p.icon}"></i></div>`).join('')}
      </div>
    </div>
    <div class="pd-info">
      <div class="product-cat">${p.cat}</div>
      <h1 class="pd-name">${p.name}</h1>
      <div class="pd-rating">
        <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
        <span class="rating-count">${p.rating} · (${p.reviews.toLocaleString()} reviews)</span>
      </div>
      <div class="pd-price-row">
        <span class="pd-price-main">₹${p.price.toLocaleString()}</span>
        ${p.oldPrice ? `<span class="pd-price-old">₹${p.oldPrice.toLocaleString()}</span>` : ''}
        ${disc > 0 ? `<span class="pd-price-off">${disc}% OFF</span>` : ''}
      </div>
      <p class="pd-desc">${p.desc}</p>
      ${p.colors.length ? `<div class="pd-options-title">Color</div><div class="pd-options">${p.colors.map((c, i) => `<button class="pd-opt ${i === 0 ? 'selected' : ''}" onclick="selectOpt(this,'color','${c}')">${c}</button>`).join('')}</div>` : ''}
      ${p.sizes.length ? `<div class="pd-options-title">Size</div><div class="pd-options">${p.sizes.map((s, i) => `<button class="pd-opt ${i === 0 ? 'selected' : ''}" onclick="selectOpt(this,'size','${s}')">${s}</button>`).join('')}</div>` : ''}
      <div class="pd-qty-row">
        <div class="pd-qty">
          <button class="pd-qty-btn" onclick="changePdQty(-1)"><i class="fas fa-minus"></i></button>
          <span class="pd-qty-val" id="pdQtyVal">1</span>
          <button class="pd-qty-btn" onclick="changePdQty(1)"><i class="fas fa-plus"></i></button>
        </div>
        <span style="font-size:0.78rem;color:var(--green)"><i class="fas fa-check-circle"></i> In Stock</span>
      </div>
      <div class="pd-actions">
        <button class="btn btn-primary" onclick="addToCartDetail()"><i class="fas fa-shopping-bag"></i> Add to Cart</button>
        <button class="btn btn-outline" onclick="toggleWishlistDetail()"><i class="${wishlist.includes(p.id) ? 'fas' : 'far'} fa-heart"></i> Wishlist</button>
      </div>
      <div class="pd-features">
        <div class="pd-feature"><i class="fas fa-truck"></i> Free delivery on orders above ₹999</div>
        <div class="pd-feature"><i class="fas fa-undo"></i> 30-day easy returns</div>
        <div class="pd-feature"><i class="fas fa-shield-alt"></i> 1-year warranty included</div>
        <div class="pd-feature"><i class="fas fa-lock"></i> Secure & encrypted checkout</div>
      </div>
    </div>`;
    navigate('product');
}

function selectThumb(el) {
    document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

function selectOpt(el, type, val) {
    el.closest('.pd-options').querySelectorAll('.pd-opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    if (type === 'color') pdColor = val;
    if (type === 'size') pdSize = val;
}

function changePdQty(delta) {
    pdQty = Math.max(1, Math.min(10, pdQty + delta));
    document.getElementById('pdQtyVal').textContent = pdQty;
}

function addToCartDetail() {
    if (!currentProduct) return;
    for (let i = 0; i < pdQty; i++) addToCart(currentProduct.id, true);
    toast(`Added ${pdQty}× ${currentProduct.name} to cart!`);
}

function toggleWishlistDetail() {
    if (!currentProduct) return;
    toggleWishlist(currentProduct.id);
    // refresh icon
    const btn = document.querySelector('.pd-actions .btn-outline i');
    if (btn) btn.className = wishlist.includes(currentProduct.id) ? 'fas fa-heart' : 'far fa-heart';
}

// ─── CART ───
function addToCart(id, silent = false) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ id, qty: 1 });
    saveState();
    updateCartBadge();
    if (!silent) toast(`${p.name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveState();
    updateCartBadge();
    renderCartSidebar();
}

function changeCartQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveState();
    updateCartBadge();
    renderCartSidebar();
}

function updateCartBadge() {
    const total = cart.reduce((a, i) => a + i.qty, 0);
    document.getElementById('cartBadge').textContent = total;
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('overlay').classList.add('open');
    renderCartSidebar();
}

function closeAll() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
    document.getElementById('searchModal').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
    mobileOpen = false;
}

function renderCartSidebar() {
    const itemsDiv = document.getElementById('cartItems');
    const footerDiv = document.getElementById('cartFooter');
    if (!cart.length) {
        itemsDiv.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p></div>`;
        footerDiv.innerHTML = `<button class="btn btn-primary" style="width:100%;justify-content:center" onclick="closeAll();navigate('shop')"><i class="fas fa-arrow-right"></i> Start Shopping</button>`;
        return;
    }
    const subtotal = cart.reduce((a, i) => {
        const p = products.find(x => x.id === i.id);
        return a + (p ? p.price * i.qty : 0);
    }, 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    itemsDiv.innerHTML = cart.map(i => {
        const p = products.find(x => x.id === i.id);
        if (!p) return '';
        return `<div class="cart-item">
      <div class="cart-item-img"><i class="${p.icon}"></i></div>
      <div class="cart-item-details">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-variant">${p.cat}</div>
        <div class="cart-item-bottom">
          <div class="cart-item-price">₹${(p.price * i.qty).toLocaleString()}</div>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeCartQty(${p.id},-1)"><i class="fas fa-minus"></i></button>
            <span class="qty-val">${i.qty}</span>
            <button class="qty-btn" onclick="changeCartQty(${p.id},1)"><i class="fas fa-plus"></i></button>
            <button class="remove-item" onclick="removeFromCart(${p.id})"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>`;
    }).join('');

    footerDiv.innerHTML = `
    <div class="cart-summary">
      <div class="summary-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--green)">Free</span>' : '₹' + shipping}</span></div>
      <div class="summary-row total"><span>Total</span><span style="color:var(--accent)">₹${total.toLocaleString()}</span></div>
    </div>
    <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="closeAll();navigate('checkout')"><i class="fas fa-lock"></i> Checkout · ₹${total.toLocaleString()}</button>
    <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:10px" onclick="closeAll();navigate('shop')">Continue Shopping</button>`;
}

// ─── WISHLIST ───
function toggleWishlist(id, btnEl) {
    const p = products.find(x => x.id === id);
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(x => x !== id);
        if (btnEl) btnEl.innerHTML = '<i class="far fa-heart"></i>';
        toast(`${p?.name} removed from wishlist`, true);
    } else {
        wishlist.push(id);
        if (btnEl) btnEl.innerHTML = '<i class="fas fa-heart" style="color:var(--red)"></i>';
        toast(`${p?.name} added to wishlist!`);
    }
    document.getElementById('wishBadge').textContent = wishlist.length;
    saveState();
}

function renderWishlist() {
    const grid = document.getElementById('wishlistGrid');
    const empty = document.getElementById('wishlistEmpty');
    if (!wishlist.length) {
        grid.innerHTML = '';
        empty.style.display = 'block';
    } else {
        empty.style.display = 'none';
        const items = products.filter(p => wishlist.includes(p.id));
        grid.innerHTML = items.map(productCardHTML).join('');
    }
}

// ─── CHECKOUT ───
function renderCheckout() {
    if (!cart.length) { navigate('shop'); return; }
    const subtotal = cart.reduce((a, i) => { const p = products.find(x => x.id === i.id); return a + (p ? p.price * i.qty : 0); }, 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    document.getElementById('checkoutGrid').innerHTML = `
    <div>
      <div class="checkout-form-section" style="margin-bottom:24px">
        <div class="form-section-title"><i class="fas fa-map-marker-alt" style="color:var(--accent);margin-right:10px"></i>Delivery Address</div>
        <div class="form-grid">
          <div class="form-group"><label>First Name</label><input type="text" id="cf-fname" placeholder="Sujal"></div>
          <div class="form-group"><label>Last Name</label><input type="text" id="cf-lname" placeholder="Makwana"></div>
          <div class="form-group full"><label>Email</label><input type="email" id="cf-email" placeholder="sujal@luxestore.in"></div>
          <div class="form-group"><label>Phone</label><input type="tel" id="cf-phone" placeholder="+91 98765 43210"></div>
          <div class="form-group"><label>Pincode</label><input type="text" id="cf-pin" placeholder="380001"></div>
          <div class="form-group full"><label>Address Line 1</label><input type="text" id="cf-addr1" placeholder="House/Flat No., Building Name"></div>
          <div class="form-group full"><label>Address Line 2</label><input type="text" id="cf-addr2" placeholder="Street, Area, Landmark"></div>
          <div class="form-group"><label>City</label><input type="text" id="cf-city" placeholder="Ahmedabad"></div>
          <div class="form-group"><label>State</label><input type="text" id="cf-state" placeholder="Gujarat"></div>
        </div>
      </div>
      <div class="checkout-form-section">
        <div class="form-section-title"><i class="fas fa-credit-card" style="color:var(--accent);margin-right:10px"></i>Payment Method</div>
        <div class="payment-methods">
          ${[
            { id: 'upi', icon: 'fas fa-mobile-alt', name: 'UPI / QR Code', sub: 'Google Pay, PhonePe, Paytm' },
            { id: 'card', icon: 'fas fa-credit-card', name: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
            { id: 'netbanking', icon: 'fas fa-university', name: 'Net Banking', sub: 'All major banks supported' },
            { id: 'cod', icon: 'fas fa-money-bill-wave', name: 'Cash on Delivery', sub: 'Available for orders up to ₹10,000' },
        ].map(m => `
            <div class="pay-method ${selectedPayment === m.id ? 'selected' : ''}" onclick="selectPayment('${m.id}')">
              <div class="pay-method-radio"></div>
              <div><div class="pay-method-name">${m.name}</div><div class="pay-method-sub">${m.sub}</div></div>
              <i class="${m.icon}"></i>
            </div>`).join('')}
        </div>
        ${selectedPayment === 'card' ? `
          <div class="form-grid" style="margin-top:20px">
            <div class="form-group full"><label>Card Number</label><input type="text" placeholder="1234 5678 9012 3456" maxlength="19"></div>
            <div class="form-group"><label>Expiry</label><input type="text" placeholder="MM/YY" maxlength="5"></div>
            <div class="form-group"><label>CVV</label><input type="text" placeholder="•••" maxlength="3"></div>
          </div>` : ''}
      </div>
    </div>
    <div>
      <div class="order-summary-card">
        <div class="order-summary-title">Order Summary (${cart.reduce((a, i) => a + i.qty, 0)} items)</div>
        ${cart.map(i => {
            const p = products.find(x => x.id === i.id);
            return p ? `<div class="order-item">
            <div class="order-item-img"><i class="${p.icon}"></i></div>
            <div class="order-item-info"><div class="order-item-name">${p.name}</div><div class="order-item-qty">Qty: ${i.qty}</div></div>
            <div class="order-item-price">₹${(p.price * i.qty).toLocaleString()}</div>
          </div>` : '';
        }).join('')}
        <div class="promo-row">
          <div class="promo-input"><input type="text" placeholder="Enter promo code"></div>
          <button class="promo-btn" onclick="toast('Promo code applied! 🎉')">Apply</button>
        </div>
        <div class="order-total-rows">
          <div class="order-total-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
          <div class="order-total-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--green)">FREE</span>' : '₹' + shipping}</span></div>
          <div class="order-total-row"><span>Tax (GST 18%)</span><span>₹${Math.round(subtotal * 0.18).toLocaleString()}</span></div>
          <div class="order-total-row grand-total"><span>Total</span><span style="color:var(--accent)">₹${(total + Math.round(subtotal * 0.18)).toLocaleString()}</span></div>
        </div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:20px;padding:16px" onclick="placeOrder()">
          <i class="fas fa-lock"></i> Place Order Securely
        </button>
        <p style="text-align:center;font-size:0.72rem;color:var(--text3);margin-top:12px"><i class="fas fa-shield-alt" style="color:var(--accent)"></i> 256-bit SSL encryption · PCI compliant</p>
      </div>
    </div>`;
}

function selectPayment(id) {
    selectedPayment = id;
    renderCheckout();
}

function placeOrder() {
    const fname = document.getElementById('cf-fname')?.value.trim();
    const email = document.getElementById('cf-email')?.value.trim();
    if (!fname || !email) { toast('Please fill in required fields', true); return; }
    const orderNum = 'LX' + Date.now().toString().slice(-8).toUpperCase();
    cart = []; saveState(); updateCartBadge();
    document.getElementById('orderConfirmNum').textContent = 'Order #' + orderNum;
    navigate('success');
}

// ─── SEARCH ───
function openSearch() {
    document.getElementById('searchModal').classList.add('open');
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}

function closeSearch(e) {
    if (!e || e.target === document.getElementById('searchModal')) {
        document.getElementById('searchModal').classList.remove('open');
        document.getElementById('searchInput').value = '';
        document.getElementById('searchResults').style.display = 'none';
    }
}

function handleSearch(val) {
    const res = document.getElementById('searchResults');
    if (!val.trim()) { res.style.display = 'none'; return; }
    const matches = products.filter(p => p.name.toLowerCase().includes(val.toLowerCase()) || p.cat.toLowerCase().includes(val.toLowerCase()));
    if (!matches.length) {
        res.style.display = 'block';
        res.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text3);font-size:0.85rem">No products found</div>';
        return;
    }
    res.style.display = 'block';
    res.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="document.getElementById('searchModal').classList.remove('open');openProduct(${p.id})">
      <div class="sri-icon"><i class="${p.icon}"></i></div>
      <div class="sri-info"><div class="sri-name">${p.name}</div><div class="sri-cat">${p.cat}</div></div>
      <div class="sri-price">₹${p.price.toLocaleString()}</div>
    </div>`).join('');
}

// ─── NEWSLETTER ───
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email || !email.includes('@')) { toast('Please enter a valid email address', true); return; }
    toast('🎉 Subscribed! Welcome to the LUXE family!');
    document.getElementById('newsletterEmail').value = '';
}

// ─── TOAST ───
function toast(msg, isError = false) {
    const t = document.createElement('div');
    t.className = 'toast' + (isError ? ' error' : '');
    t.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i> ${msg}`;
    document.getElementById('toastContainer').appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; setTimeout(() => t.remove(), 400); }, 3000);
}

// ─── INIT ───
function init() {
    buildMarquee();
    buildCategories();
    buildFeatured();
    updateCartBadge();
    document.getElementById('wishBadge').textContent = wishlist.length;

    // Scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.cat-card, .product-card, .value-card, .team-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
        observer.observe(el);
    });
}

window.addEventListener('load', init);

// ESC to close
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
});