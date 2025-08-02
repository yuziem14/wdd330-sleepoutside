import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const productListDOM = document.querySelector('.product-list');
const cartFooterElement = document.querySelector('.cart-footer');

const shoppingCart = new ShoppingCart(productListDOM, cartFooterElement);

function renderCartContents() {
  shoppingCart.renderList();
  shoppingCart.renderTotal();
}

renderCartContents();
