import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);
product.init();
