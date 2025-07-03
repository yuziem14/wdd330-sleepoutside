import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const CART_STORAGE_KEY = "so-cart";
const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const productsInCart = getLocalStorage(CART_STORAGE_KEY) || [];
  productsInCart.push(product);
  setLocalStorage(CART_STORAGE_KEY, productsInCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
