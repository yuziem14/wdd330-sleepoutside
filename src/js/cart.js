import { getLocalStorage, formatCurrency } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  calculateAndDisplayCartTotal(cartItems);
}

function calculateAndDisplayCartTotal(items = []) {
  if(items.length == 0) return;

  const cartFooterElement = document.querySelector('.cart-footer');
  if(cartFooterElement.classList.contains('hide')) cartFooterElement.classList.remove('hide');

  const cartTotalElement = document.querySelector('.cart-total');
  const totalAmount = items.reduce((amount, item) => amount + item.FinalPrice, 0);
  cartTotalElement.innerHTML = [cartTotalElement.textContent, `<strong>${formatCurrency(totalAmount)}</strong>`].join(' ');
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
