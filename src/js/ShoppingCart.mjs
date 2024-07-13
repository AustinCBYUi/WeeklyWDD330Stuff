import { getLocalStorage } from "./utils.mjs";

function productInCartTemplate(item, quant = 1) {
    const totalPrice = item.FinalPrice * quant;
    const newItemTemplate = `
<li class="cart-card__divider">
    <p hidden class="grabListElement"></p>
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}"/>
    </a>
    <a href="/product_pages/index.html/?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="quantity-controller">
        <p hidden class="grabItemId">${item.Id}</p>
        <p hidden class="grabCategory">${item.Category}</p>
        <p hidden class="grabPrice">${item.FinalPrice}</p>
        <button class="decrease-qty">-</button>
        <p>Quantity: </p>
        <span class="cart-card__quantity">${quant}</span>
        <button class="increase-qty" data-product-id="${item.Id}" id="addToCart">+</button>
    </div>
    <p class="cart-card__price">$${totalPrice.toFixed(2)}</p>
</li>
`;
return newItemTemplate;
}

//Checks if items are already in the cart to increase the quantity.
function checkDuplicates(cart) {
    const updatedCart = [];

    cart.forEach(item => {
        const duplicateItem = updatedCart.find(cartItem => cartItem.Id === item.Id);

        if (duplicateItem) {
            duplicateItem.quantity += 1;
        } else {
            updatedCart.push({ ...item, quantity: 1 })
        }
    });
    return updatedCart.map(cartItem => productInCartTemplate(cartItem, cartItem.quantity)).join("");
}

// function renderCartTotal() {
//     const cartItems = getLocalStorage("so-cart");
//     var subtotal = 0;
//     var taxRate = .056;
//     cartItems.map((item) => {
//         subtotal += parseFloat(item.FinalPrice);
//     })
//     var taxedTotal = parseFloat(subtotal * taxRate).toFixed(2);
//     const totals = `
//     <p>Subtotal: $${subtotal.toFixed(2)}</p>
//     <p>Taxes: $${taxedTotal}</p>
//     <p>Total: $${(subtotal + parseFloat(taxedTotal)).toFixed(2)}</p>
//     `
//     document.querySelector(".totals").innerHTML = totals;
// }

export default class CartListing {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
        this.total = 0;
    }
    async init() {
        const list = getLocalStorage(this.key);
        this.checkCartEmpty();
        this.calculateListTotal(list);
        this.renderCart(list);
    }
    calculateListTotal(list) {
        const amounts = list.map((item) => item.FinalPrice);
        this.total = amounts.reduce((sum, item) => sum + item);
    }
    async renderCart() {
        if (!this.checkCartEmpty()) {
            const cartItems = getLocalStorage(this.key);
            const cartHtml = checkDuplicates(cartItems);
            const itemsInCart = cartItems.map((item) => productInCartTemplate(item));
            document.querySelector(this.parentSelector).innerHTML = cartHtml, itemsInCart.join("");
            document.querySelector(".list-total").innerText += `$${this.total.toFixed(2)}`;
        }
    }
    checkCartEmpty() {
        const cartItems = getLocalStorage(this.key);
        if (!cartItems || cartItems.length === 0) {
            document.querySelector(".product-list").innerHTML = `<h4 class="empty">Your cart is empty!</h4>`;
            return true;
        }
        return false;
    }
}