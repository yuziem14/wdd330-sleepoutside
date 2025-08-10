import { getSearchParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetail from './ProductDetail.mjs';

loadHeaderFooter();

const PRODUCT_PARAM = 'product';
const dataSource = new ExternalServices('tents');
const productId = getSearchParam(PRODUCT_PARAM);

const productDetail = new ProductDetail(productId, dataSource);

productDetail.init();
