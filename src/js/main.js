import { Category, ProductData } from './ProductData.mjs'
import ProductList from './ProductList.mjs'

const listElement = document.querySelector('.product-list');

const tentsDataSource = new ProductData(Category.TENTS);
const productList = new ProductList(Category.TENTS, tentsDataSource, listElement);