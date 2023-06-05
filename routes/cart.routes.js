const express = require("express");
const router = express.Router();
const cars = require("../data/data");

router.get("/add/:id", (req, res, next) => {
  // Provjerite postoji li session.cart, ako ne, inicijalizirajte ga kao prazan objekt
  if (!req.session.cart) {
    req.session.cart = {};
  }
  const addedCar = req.params.id;
  let categoryName = undefined;

  // Pronađite kategoriju proizvoda i dodijelite joj vrijednost categoryName
  for (const category of cars.categories) {
    for (const product of category.products) {
      if (product.name === addedCar) {
        categoryName = category.name;
        break;
      }
    }
  }
  if (categoryName) {
    // Ako već postoji proizvod u košarici, povećajte količinu za 1
    if (req.session.cart[addedCar]) {
      req.session.cart[addedCar]++;
    } else {
      // Inače, postavite količinu na 1
      req.session.cart[addedCar] = 1;
    }

    // res.redirect("/home/getProducts/" + categoryName);
    res.redirect(req.session.returnTo);
  } else {
    res.render("error", {
      msg: "Something went wrong. There is no product with name: " + addedCar,
    });
  }
  console.log(req.session.cart);
});

router.get("/remove/:id", (req, res, next) => {
  if (!req.session.cart) {
    // znaci da nema nista u kosarici pa nema potrebe za daljnjim provjerama i vracamo se tamo odkud je pozvana naredba
    res.redirect(req.session.returnTo);
  } else {
    let carToRemove = req.params.id;
    // nakon sto smo saznali koji proizvod zelimo ukloniti sad moramo provjeriti postoji li on u kosarici
    // ako da umanjujemo ga za 1, inace ne radi nista i usmjeri na stranicu popisa kosarice
    let entries = Object.entries(req.session.cart);
    for (let entry of entries) {
      if (entry[0] === carToRemove) {
        if (entry[1] === 1) {
          delete req.session.cart[carToRemove];
        } else {
          req.session.cart[carToRemove]--;
        }
        break;
      }
    }
    // res.redirect("/cart/getAll");
    res.redirect(req.session.returnTo);
  }
});

router.get("/getAll", (req, res, next) => {
  // console.log(req.session.cart);
  let backTo = req.session.returnTo;
  req.session.returnTo = req.originalUrl;
  res.render("cart", {
    title: "cart",
    cart: req.session.cart,
    backTo: backTo,
  });
});

module.exports = router;
