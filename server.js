const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const MemoryStore = require("memorystore")(session);
const homeRouter = require("./routes/home.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const cartRouter = require("./routes/cart.routes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      ttl: 1200000, // vrijeme nakon kojeg ce sesija isteci - 20min
    }),
  })
);

app.use("/home", homeRouter);
app.use("/cart", cartRouter);

app.listen(80);
