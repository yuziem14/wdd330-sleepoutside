import { loadHeaderFooter } from './utils.mjs';
import { categories } from './ProductData.mjs'

const categoriesList = document.querySelector('.categories');

function renderCategories() {
    const html = Object.keys(categories).map(key => {
        const category = categories[key];
        const params = (new URLSearchParams({ category: category.value })).toString();
        const link = ['/product_listing/index.html', params.toString()].join('?');

        return `
             <a class="category" href="${link}">
                <img class="category__icon" src="${category.iconUrl}" alt="${category.title} Category Icon">
                <p class="category__name">${category.title}</p>
            </a>
        `
    }).join('');

    categoriesList.innerHTML = html;
}

loadHeaderFooter();
renderCategories();