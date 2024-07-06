import { getLocalStorage } from "./utils.mjs";

function productInCartTemplate(item, quant = 1) {
    const totalPrice = item.FinalPrice * quant;
    const newItemTemplate = `
<li class="cart-card__divider">
    <p hidden class="grabListElement"></p>
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img src="${item.Images.PrimaryLarge}" alt="${item.Name}"/>
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

export default class CartListing {
    constructor(key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
    }
    async renderCart() {
        if (!this.checkCartEmpty()) {
            const cartItems = await getLocalStorage(this.key);
            const cartHtml = checkDuplicates(cartItems);
            document.querySelector(this.parentElement).innerHTML = cartHtml;
        }
    }
    checkCartEmpty() {
        const cartItems = getLocalStorage(this.key);
        if (!cartItems || cartItems.length === 0) {
            document.querySelector(".product-list").innerHTML = "<h4>Your cart is empty!</h4>";
            return true;
        }
        return false;
    }
}