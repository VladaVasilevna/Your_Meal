const orderList = document.querySelector('.order__list');
const orderTotalAmount = document.querySelector('.order__total-amount');
const orderCount = document.querySelector('.order__count');

window.cart = [];

window.addToCart = function(product, count) {
    const cartItem = window.cart.find(item => item.title === product.title);
    if (cartItem) {
        cartItem.count += count;
    } else {
        window.cart.push({
            ...product,
            count: count
        });
    }
    renderCart();
};

function renderCart() {
    orderList.innerHTML = '';
    let total = 0;
    let totalCount = 0;
    window.cart.forEach(item => {
        total += item.price * item.count;
        totalCount += item.count;
        const li = document.createElement('li');
        li.className = 'order__item';
        li.innerHTML = `
            <img class="order__image" src="${item.image}" alt="${item.title}">
            <div class="order__product">
                <h3 class="order__product-title">${item.title}</h3>
                <p class="order__product-weight">${item.weight}г</p>
                <p class="order__product-price">${item.price}
                    <span class="currency">₽</span>
                </p>
            </div>
            <div class="order__product-count count">
                <button class="count__minus" data-title="${item.title}">-</button>
                <p class="count__amount">${item.count}</p>
                <button class="count__plus" data-title="${item.title}">+</button>
            </div>
        `;
        orderList.appendChild(li);
    });
    orderTotalAmount.innerHTML = `${total} <span class="currency">₽</span>`;
    orderCount.textContent = totalCount;
}

orderList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('count__plus')) {
        const title = target.dataset.title;
        const cartItem = window.cart.find(item => item.title === title);
        if (cartItem) {
            cartItem.count++;
            renderCart();
        }
    }
    if (target.classList.contains('count__minus')) {
        const title = target.dataset.title;
        const cartItem = window.cart.find(item => item.title === title);
        if (cartItem) {
            cartItem.count--;
            if (cartItem.count <= 0) {
                window.cart = window.cart.filter(item => item.title !== title);
            }
            renderCart();
        }
    }
});

// --- Открытие/закрытие корзины на мобильных устройствах ---
const orderBlock = document.querySelector('.order');
const orderWrapTitle = document.querySelector('.order__wrap-title');
const orderCloseBtn = document.querySelector('.order__close');
const orderOverlay = document.querySelector('.order__overlay');

function openOrder() {
    orderBlock.classList.add('order_open');
    orderOverlay.style.display = 'block';
}
function closeOrder() {
    orderBlock.classList.remove('order_open');
    orderOverlay.style.display = 'none';
}

orderWrapTitle.addEventListener('click', openOrder);
if (orderCloseBtn) {
    orderCloseBtn.addEventListener('click', closeOrder);
}
if (orderOverlay) {
    orderOverlay.addEventListener('click', closeOrder);
}

renderCart();
