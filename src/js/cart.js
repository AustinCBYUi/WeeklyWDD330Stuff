import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
async function htmlIncreaseDecrease(button, increment) {
    const quantityDisplay = button.parentNode.querySelector(".cart-card__quantity");
    const decreaseButton = button.parentNode.querySelector(".decrease-qty");
    const increaseButton = button.parentNode.querySelector(".increase-qty");
    let currentQuantity = parseInt(quantityDisplay.textContent);

    if (increment) {
        currentQuantity += 1;
    } else {
        currentQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    }
    quantityDisplay.textContent = currentQuantity;
}

//Quantity control
document.addEventListener("DOMContentLoaded", () => {
    const increaseButton = document.querySelectorAll(".increase-qty");
    const decreaseButton = document.querySelectorAll(".decrease-qty");

    increaseButton.forEach(button => {
        button.addEventListener("click", () => {
            htmlIncreaseDecrease(button, true);
            increaseQuantity(button);
        });
    })
    decreaseButton.forEach(button => {
        button.addEventListener("click", () => {
            htmlIncreaseDecrease(button, false);
        })
    })

    async function increaseQuantity(buttonId){
        const item = buttonId.parentNode.querySelector(".grabItemId").textContent;
        const category = buttonId.parentNode.querySelector(".grabCategory").textContent;
        const dataSource = new ProductData(category);
        const product = new ProductDetails(item, dataSource);
        product.updateProduct();
    }
})

cart.renderCart();
