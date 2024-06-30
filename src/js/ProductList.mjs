import {renderListWithTemplate} from "./utils.mjs";

const productCardTemplate = (item) => `<list class="product-card">
  <a href="/product_pages/?product=${item.Id}">
    <img src="${item.Images.PrimaryLarge}" alt="${item.Name}" />
    <h3 class="card__brand">${item.Brand.Name}</h3>
    <h2 class="card__name">${item.Name}</h2>
    <p class="product-card__price">$${item.FinalPrice}</p>
  </a>
</list>`;

export default class ProductListing {
  constructor(category, dataSource, listElement, numItemsToDisplay = 4) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.numItemsToDisplay = numItemsToDisplay;
  }

  renderProductList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list.slice(0, this.numItemsToDisplay));
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderProductList(list);
    let reformatString = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    document.querySelector(".page-title").innerHTML = `Top Products: ${reformatString}`;
  }
}