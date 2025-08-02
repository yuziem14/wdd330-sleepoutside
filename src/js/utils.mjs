// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

/* Formatters */
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(amount = 0) {
  return currencyFormatter.format(amount);
}

export function getSearchParam(name = '') {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  return params.get(name) || '';
}

export function renderListWithTemplate(templateFn, parentElement, list, clear = false, position = 'afterbegin') {
  if(clear) parentElement.innerHTML = '';

  const generatedTemplates = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, generatedTemplates.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);
  if(callback) callback(data);
}

export async function loadTemplate(path = '') {
  const response = await fetch(path);
  return await response.text();
}

export async function loadHeaderFooter() {
  const header = document.querySelector('#main-header');
  const footer = document.querySelector('#main-footer');
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
}

export const CART_STORAGE_KEY = 'so-cart';