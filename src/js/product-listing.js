import { loadHeaderFooter, getParams } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list")
const productList = new ProductListing(category, dataSource, listElement);

productList.init();