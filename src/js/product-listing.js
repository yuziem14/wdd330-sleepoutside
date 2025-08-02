import { Category, categories, ProductData } from './ProductData.mjs'
import ProductList from './ProductList.mjs'
import { loadHeaderFooter, getSearchParam } from './utils.mjs';

loadHeaderFooter();
const category = getSearchParam('category') || Category.TENTS;

const listElement = document.querySelector('.product-list');

const tentsDataSource = new ProductData(category);
const productList = new ProductList(category, tentsDataSource, listElement);

const categoryTitle = document.querySelector('.category-title');

function renderCategoryTitle() {
    const value = Object.keys(categories).find(c => categories[c].value == category);
    categoryTitle.textContent = value ? categories[value].title : 'Invalid Category';
}


renderCategoryTitle();