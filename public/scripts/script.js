// console.log(buttons[0].innerHTML);

const buttons = document.querySelectorAll(".js-select-button");

for (let button of buttons) {
  button.addEventListener("click", () => {
    onClickFunctionHome(button.innerHTML);
  });
}

function onClickFunctionHome(siteParameter) {
  window.location.href = "/home/getProducts/" + siteParameter;
}

function onClickFunctionCart(siteParameter) {
  window.location.href = "/cart/add/" + siteParameter;
}

const cards = document.querySelectorAll(".products");
const cartButtons = document.querySelectorAll(".js-buton-cart");
const nameTags = document.querySelectorAll("#carName");
const productTitle = document.querySelector("#js-title");

for (let i = 0; i < cards.length; i++) {
  let card = cards[i];
  let cartButton = cartButtons[i];
  card.addEventListener("mouseover", () => {
    cartButton.style.display = "inline";
  });
  card.addEventListener("mouseleave", () => {
    cartButton.style.display = "none";
  });

  cartButton.addEventListener("click", () => {
    onClickFunctionCart(nameTags[i].innerHTML);
  });
}
