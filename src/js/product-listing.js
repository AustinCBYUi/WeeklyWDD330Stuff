import { loadHeaderFooter, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list")
const productList = new ProductListing(category, dataSource, listElement);

productList.init();