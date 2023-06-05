let productNames = document.querySelectorAll(".productName");
let productAmountIncrement = document.querySelectorAll(".amount-plus-button");
let productAmountDecrement = document.querySelectorAll(".amount-minus-button");

for (let i = 0; i < productNames.length; i++) {
  let currentProd = productNames[i].innerHTML;
  let currProdInc = productAmountIncrement[i];
  let currProdDec = productAmountDecrement[i];

  currProdDec.addEventListener("click", () => {
    removeClick(currentProd);
  });

  currProdInc.addEventListener("click", () => {
    addClick(currentProd);
  });
}

function addClick(id) {
  window.location.href = "/cart/add/" + id;
}

function removeClick(id) {
  window.location.href = "/cart/remove/" + id;
}
