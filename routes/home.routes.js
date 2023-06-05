const express = require("express");
const router = express.Router();
const cars = require("../data/data");

router.get("/getCategories", (req, res, next) => {
  req.session.returnTo = req.originalUrl;
  let cartCount = undefined;
  if (req.session.cart !== undefined) {
    cartCount = 0;
    let values = Object.values(req.session.cart);
    for (let value of values) {
      cartCount += value;
    }
  }

  res.render("categories", {
    title: "Categories",
    cars: cars,
    cartCount: cartCount,
  });
});

router.get("/getProducts/:id", (req, res, next) => {
  // novo dodano
  req.session.returnTo = req.originalUrl;

  let currCategorie = req.params.id;
  let obj = cars.categories.find((category) => category.name === currCategorie);

  if (obj === undefined) {
    res.render("error", {
      msg: "Something went wrong. There is no category named: " + currCategorie,
    });
  }

  let cartCount = undefined;
  let entries = undefined;
  if (req.session.cart !== undefined) {
    cartCount = 0;
    let values = Object.values(req.session.cart);
    for (let value of values) {
      cartCount += value;
    }
    entries = Object.entries(req.session.cart);
  }

  res.render("home", {
    title: currCategorie,
    categoryProducts: obj.products,
    cartCount: cartCount,
    entries: entries,
  });
});

module.exports = router;
