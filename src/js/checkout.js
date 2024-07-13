import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

//Finished here, need to continue on:
// https://github.com/matkat99/sleepoutside/tree/vite-team6/src/js
const myCheckout = new CheckoutProcess("so-cart", ".ordersummary");
myCheckout.init();

document
    .querySelector("#zip")
    .addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const check_status = myForm.checkValidity();
    myForm.reportValidity();
    if (check_status) {
        myCheckout.checkout();
    };
});

// document.forms["checkout"]
// .addEventListener("submit", (e) => {
//     e.preventDefault();
//     myCheckout.checkout();
// });