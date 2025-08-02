import { formatCurrency, renderListWithTemplate } from './utils.mjs';

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;

        this.products = [];
        this.init();
    }

    async init() {
        this.products = await this.dataSource.getData(this.category);
        this.renderList();
    }

    renderList() {
      renderListWithTemplate(generateProductTemplate, this.listElement, this.products, true);
    }
}

function generateProductTemplate(product = {}) {
    return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">${formatCurrency(product.FinalPrice)}</p>
    </a>
  </li>`;
}