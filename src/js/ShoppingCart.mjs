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
        const itemToAdd = {
            quantity: 1,
            product: item
        }
        
        let itemIndex = this.items.findIndex(({product}) => product.Id == item.Id);

        if(itemIndex != -1) {
            this.items[itemIndex].quantity += 1;
        } else {
            this.items.push(itemToAdd);
        }

        setLocalStorage(CART_STORAGE_KEY, this.items);
    }
    
    renderList() {
        if(this.items.length == 0) {
            this.cartListElement.innerHTML = `<h3>${this.getEmptyCardMessage()}</h3>`;
            return;
        }

        renderListWithTemplate(generateCartItemTemplate, this.cartListElement, this.items, true);
    }

    getEmptyCardMessage() {
        return this.#EMPTY_CART_MESSAGE;
    }

    getPriceTotal() {
        return this.items.reduce((amount, item) => amount + (item.product.FinalPrice * item.quantity), 0);
    }

    renderTotal() {
        if(this.items.length == 0) return;
        
        if(this.cartFooter.classList.contains('hide')) this.cartFooter.classList.remove('hide');

        const cartTotalElement = document.querySelector('.cart-total');
        cartTotalElement.innerHTML = [cartTotalElement.textContent, `<strong>${formatCurrency(this.getPriceTotal())}</strong>`].join(' ');
    }

    getItems() {
        return this.items;
    }
}

const template = document.getElementById('cart-card-template');
function generateCartItemTemplate(item = {}) {
  const { quantity, product} = item;

  const productLink = `/product_pages/?product=${product.Id}`;

  const cartItemElement = template.content.cloneNode(true);
    const [
        imageLink,
        image,
        nameLink,
        name,
        color,
        quantityElement,
        price,
    ] = cartItemElement.querySelectorAll('.cart-card__image, .cart-card__image img, a:has(.card__name), .card__name, .cart-card__color, .cart-card__quantity, .cart-card__price');
   
  imageLink.setAttribute('href', productLink);
  image.setAttribute('src', product.Images.PrimarySmall);
  image.setAttribute('alt', product.Name);
  nameLink.setAttribute('href', productLink);
  name.textContent = product.Name;
  color.textContent = product.Colors[0].ColorName;
  quantityElement.textContent = quantity;
  price.textContent = formatCurrency(product.FinalPrice);

  return cartItemElement.querySelector('li').outerHTML;
}