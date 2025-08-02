import { formatCurrency } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs'

export default class ProductDetail {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        this.shoppingCart = new ShoppingCart(null, null);
    }

    init() {
        this.dataSource.findProductById(this.productId).then(product => {
            this.product = product;
            this.renderProductDetails();
            document
                .getElementById('addToCart')
                .addEventListener('click', this.addProductToCart.bind(this));
        });
    }

    addProductToCart() {
        this.shoppingCart.addItem(this.product);
      }

    renderProductDetails() {
        renderTemplate(this.product);
    }
}

const template = document.getElementById('product-detail-template');
const mainElement = document.querySelector('main');

function renderTemplate(product = {}) {
    const productDetailElement = template.content.cloneNode(true);
    const [
        brandName,
        nameWithoutBrand,
        image,
        price,
        color,
        description,
        addCartButton
    ] = productDetailElement.querySelectorAll('h3, h2, img, .product-card__price, .product__color, .product__description, #addToCart');

    const nameWithoutBrandValue = product.NameWithoutBrand;
    brandName.textContent = product.Brand.Name;
    nameWithoutBrand.textContent = nameWithoutBrandValue;
    image.setAttribute('src', product.Images.PrimaryLarge);
    image.setAttribute('alt', nameWithoutBrandValue);
    price.textContent = formatCurrency(product.FinalPrice);
    color.textContent = product.Colors[0].ColorName;
    description.innerHTML = product.DescriptionHtmlSimple;
    addCartButton.setAttribute('data-id', product.Id);

    mainElement.appendChild(productDetailElement);
}