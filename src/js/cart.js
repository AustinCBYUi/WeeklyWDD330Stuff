import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");

//Maybe this should be a part of checkout?
//using the for loop worked really well, can't figure out how to
//put new stuff in the cart and refresh the page.
// async function increaseQuantity(itemId, category) {
//     // for (let i = countOfItems; i <= countOfItems; i++) {
//         const dataSource = new ProductData(category);
//         const product = new ProductDetails(itemId, dataSource);
//         await product.updateProduct()
//     // }
// }

async function htmlIncreaseDecrease(button, increment) {
    const quantityDisplay = button.parentNode.querySelector(".cart-card__quantity");
    const container = button.parentNode;
    const priceDisplay = container.parentNode.querySelector(".cart-card__price")
    const priceOfItem = button.parentNode.querySelector(".grabPrice");
    let currentQuantity = parseInt(quantityDisplay.textContent);
    let currentPrice = parseFloat(priceDisplay.textContent);

    if (increment) {
        currentQuantity += 1;
    } else {
        currentQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    }
    quantityDisplay.textContent = currentQuantity;
    currentPrice = currentQuantity * priceOfItem.textContent
    priceDisplay.textContent = `$${currentPrice.toFixed(2)}`;
}

//Quantity control
document.addEventListener("DOMContentLoaded", () => {
    const itemsInCart = document.querySelectorAll(".cart-card__divider");

    itemsInCart.forEach(item => {
        const increaseButton = item.querySelector(".increase-qty");
        const decreaseButton = item.querySelector(".decrease-qty");
        increaseButton.addEventListener("click", () => {
            htmlIncreaseDecrease(increaseButton, true);
        })
        decreaseButton.addEventListener("click", () => {
            htmlIncreaseDecrease(decreaseButton, false);
        })
    })
});

cart.init();
