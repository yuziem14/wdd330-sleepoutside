import { getSearchParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetail from './ProductDetail.mjs';

loadHeaderFooter();

const PRODUCT_PARAM = 'product';
const dataSource = new ProductData('tents');
const productId = getSearchParam(PRODUCT_PARAM);

const productDetail = new ProductDetail(productId, dataSource);

productDetail.init();
