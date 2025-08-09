import { formatCurrency } from './utils.mjs';

export default class CheckoutProcess {
    #TAX_RATE = 0.06 /** 6% */;
    #FIRST_ITEM_SHIPPING_COST = 10;
    #ITEM_SHIPPING_COST  = 2;

    constructor(shoppingCart, outputSelector) {
        this.shoppingCart = shoppingCart;
        this.outputSelector = outputSelector;
        this.tax = 0;
        this.itemTotal = 0;
        this.shipping = 0;
        this.orderTotal = 0;
        this.baseUrl = import.meta.env.VITE_SERVER_URL;

        this.calculateSubTotal();
        this.calculateTax();
        this.calculateShipping();
        this.calculateOrderTotal();
    }

    calculateSubTotal() {
        this.itemTotal = this.shoppingCart.getPriceTotal();
        return this.itemTotal;
    }

    calculateTax() {
        this.tax = this.calculateSubTotal() * this.#TAX_RATE;
        return this.tax;
    }

    calculateShipping() {
        const totalItems = this.shoppingCart.items.length || 0;
        if(totalItems == 0) {
            this.shipping = 0;
        }
        
        if(totalItems == 1) {
            this.shipping = this.#FIRST_ITEM_SHIPPING_COST;
        } else if (totalItems > 1) {
            this.shipping = this.#FIRST_ITEM_SHIPPING_COST + ((totalItems - 1) * this.#ITEM_SHIPPING_COST);
        }

        return this.shipping;
    }

    calculateOrderTotal() {
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
    }

    displayOrderTotals() {
        const taxElement = document.querySelector(`${this.outputSelector} #tax`);
        const subTotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
        const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
        const totalElement = document.querySelector(`${this.outputSelector} #total`);
        
        subTotalElement.textContent = formatCurrency(this.itemTotal);
        taxElement.textContent = formatCurrency(this.tax);
        shippingElement.textContent = formatCurrency(this.shipping);
        totalElement.textContent = formatCurrency(this.orderTotal);
    }
}