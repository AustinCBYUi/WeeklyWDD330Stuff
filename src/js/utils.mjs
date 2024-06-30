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
export function appendToCart(key, newItem) {
  var cart = getLocalStorage(key);
  if (cart === null) cart = [];
  cart.push(newItem);
  setLocalStorage(key, cart);
}
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export const renderListWithTemplate = (templateFn, parentElement, list, position = "afterbegin", clear = false) => {
  const htmlString = list.map(templateFn);
  if (clear)
    parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback)
    callback(data)
}
async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}
export async function loadHeaderFooter() {
  const headerTem = await loadTemplate("/partials/header.html");
  const footerTem = await loadTemplate("/partials/footer.html");
  const getHeader = document.querySelector("#dyn-header");
  const getFooter = document.querySelector("#dyn-footer");
  renderWithTemplate(headerTem, getHeader);
  renderWithTemplate(footerTem, getFooter);
}