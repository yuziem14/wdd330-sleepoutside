import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
import ShoppingCart from './ShoppingCart.mjs';
import ExternalServices from './ExternalServices.mjs';

const shoppingCart = new ShoppingCart(null, null);
const externalServices = new ExternalServices(null);
const checkoutProcess = new CheckoutProcess(externalServices, shoppingCart, '.order-summary');

loadHeaderFooter();

checkoutProcess.displayOrderTotals();
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    checkoutProcess.checkout(form).then(response => {
        alert(response.message);
    }).catch(() => {
        alert('Oops! Something went wrong');
    });
})