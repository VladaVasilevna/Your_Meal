window.currentProduct = null;
window.count = 1;

const modalProduct = document.querySelector('.modal_product');
const catalogList = document.querySelector('.catalog__list');
const navButtons = document.querySelectorAll('.navigation__button');
const modalProductTitle = document.querySelector('.modal-product__title');
const modalProductImage = document.querySelector('.modal-product__image');
const modalProductDescription = document.querySelector('.modal-product__description');
const ingredientsList = document.querySelector('.ingredients__list');
const ingredientsCalories = document.querySelector('.ingredients__calories');
const modalProductPrice = document.querySelector('.modal-product__price');
const countMinus = document.querySelector('.count__minus');
const countPlus = document.querySelector('.count__plus');
const countAmount = document.querySelector('.count__amount');
const modalAddBtn = document.querySelector('.modal-product__btn');
const catalogTitle = document.querySelector('.catalog__title');

function fillModal(product) {
    modalProductTitle.textContent = product.title;
    modalProductImage.src = product.image;
    modalProductDescription.textContent = product.description;
    ingredientsList.textContent = '';
    const ingredientsListItems = product.ingredients.map((item) => {
        const li = document.createElement('li');
        li.classList.add('ingredients__item');
        li.textContent = item;
        return li;
    });
    ingredientsList.append(...ingredientsListItems);
    ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
    modalProductPrice.innerHTML = `${product.price * window.count} <span class="currency">₽</span>`;
}

function renderProducts(category) {
    catalogList.innerHTML = '';
    catalogTitle.textContent = category;
    const filtered = window.products.filter(product => product.category === category);
    filtered.forEach(product => {
        const li = document.createElement('li');
        li.className = 'catalog__item';
        li.innerHTML = `
            <article class="product">
                <img src="${product.image}" alt="${product.title}" class="product__image">
                <p class="product__price">${product.price}<span class="currency">₽</span></p>
                <h3 class="product__title">
                    <button class="product__detail">${product.title}</button>
                </h3>
                <p class="product__weight">${product.weight}г</p>
                <button class="product__add" type="button">Добавить</button>
            </article>
        `;
        catalogList.appendChild(li);
    });
}

let updateCountAndPrice = () => {};

countMinus.addEventListener('click', () => {
    if (window.count > 1) {
        window.count--;
        updateCountAndPrice();
    }
});

countPlus.addEventListener('click', () => {
    window.count++;
    updateCountAndPrice();
});

// Навигация по категориям
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('navigation__button_active'));
        btn.classList.add('navigation__button_active');
        const category = btn.dataset.category;
        renderProducts(category);
    });
});

// По умолчанию показываем бургеры
renderProducts('Бургеры');

catalogList.addEventListener('click', (event) => {
    const target = event.target;
    const productCard = target.closest('.product');
    if (!productCard) return;
    if (target.classList.contains('product__detail') || target.classList.contains('product__image')) {
        const title = productCard.querySelector('.product__detail').textContent.trim();
        const product = window.products.find(item => item.title === title);
        if (product) {
            window.count = 1;
            window.currentProduct = product;
            fillModal(product);
            updateCountAndPrice = () => {
                countAmount.textContent = window.count;
                modalProductPrice.innerHTML = `${window.currentProduct.price * window.count} <span class="currency">₽</span>`;
            };
            updateCountAndPrice();
            modalProduct.classList.add('modal_open');
        }
    }
    // Новый код для кнопки "Добавить" на карточке
    if (target.classList.contains('product__add')) {
        const title = productCard.querySelector('.product__detail').textContent.trim();
        const product = window.products.find(item => item.title === title);
        if (product) {
            window.addToCart(product, 1);
        }
    }
});

modalProduct.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.modal__close') || target === modalProduct) {
        modalProduct.classList.remove('modal_open');
    }
});

modalAddBtn.addEventListener('click', () => {
    if (!window.currentProduct) return;
    window.addToCart(window.currentProduct, window.count);
    modalProduct.classList.remove('modal_open');
});
