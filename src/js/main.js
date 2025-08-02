import { Category, ProductData } from './ProductData.mjs'
import ProductList from './ProductList.mjs'
import { loadHeaderFooter } from './utils.mjs';

const listElement = document.querySelector('.product-list');

const tentsDataSource = new ProductData(Category.TENTS);
const productList = new ProductList(Category.TENTS, tentsDataSource, listElement);

loadHeaderFooter();