import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const shoppingCart = new ShoppingCart(null, null);
const checkoutProcess = new CheckoutProcess(shoppingCart, '.order-summary');

checkoutProcess.displayOrderTotals();

loadHeaderFooter();