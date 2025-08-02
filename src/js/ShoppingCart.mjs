import { getLocalStorage, renderListWithTemplate, formatCurrency, CART_STORAGE_KEY, setLocalStorage } from './utils.mjs';

export default class ShoppingCart {
    #EMPTY_CART_MESSAGE = 'No products added to cart.';
    constructor(cartListElement, cartFooter) {
        this.items = getLocalStorage(CART_STORAGE_KEY) || [];
        this.cartListElement = cartListElement;
        this.cartFooter = cartFooter;
    }

    addItem(item = null) {
        if(!item) return;

        this.items.push(item);
        setLocalStorage(CART_STORAGE_KEY, this.items);
    }
    
    renderList() {
        if(this.items.lenght == 0) {
            this.cartListElement.innerHTML = `<h3>${this.getEmptyCardMessage()}</h3>`;
            return;
        }

        renderListWithTemplate(generateCartItemTemplate, this.cartListElement, this.items, true);
    }

    getEmptyCardMessage() {
        return this.#EMPTY_CART_MESSAGE;
    }

    getPriceTotal() {
        return this.items.reduce((amount, item) => amount + item.FinalPrice, 0);
    }

    renderTotal() {
        if(this.cartFooter.classList.contains('hide')) this.cartFooter.classList.remove('hide');

        const cartTotalElement = document.querySelector('.cart-total');
        cartTotalElement.innerHTML = [cartTotalElement.textContent, `<strong>${formatCurrency(this.getPriceTotal())}</strong>`].join(' ');
    }
}

const template = document.getElementById('cart-card-template');
function generateCartItemTemplate(item = {}) {
  const productLink = `/product_pages/?product=${item.Id}`;

  const cartItemElement = template.content.cloneNode(true);
    const [
        imageLink,
        image,
        nameLink,
        name,
        color,
        quantity,
        price,
    ] = cartItemElement.querySelectorAll('.cart-card__image, .cart-card__image img, a:has(.card__name), .card__name, .cart-card__color, .cart-card__quantity, .cart-card__price');
   
  imageLink.setAttribute('href', productLink);
  image.setAttribute('src', item.Image);
  image.setAttribute('alt', item.Name);
  nameLink.setAttribute('href', productLink);
  name.textContent = item.Name;
  color.textContent = item.Colors[0].ColorName;
  quantity.textContent = '1';
  price.textContent = formatCurrency(item.FinalPrice);

  return cartItemElement.querySelector('li').outerHTML;
}