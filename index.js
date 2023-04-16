import express from "express";
import mongoose from "mongoose";
import expressSession from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";
dotenv.config();

import {
  indexController,
  loginController,
  registerController,
  storeUserController,
  loginUserController,
  logoutController,
  homeController,
} from "./controllers/index.js";

import { redirectIfAuth } from "./middleware/redirectIfAuth.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

await mongoose.connect(process.env.MONGOBD_URL, {
  useNewUrlParser: true,
});

global.loggedIn = null;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  expressSession({
    secret: "node secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  console.log("loggedIn", loggedIn);
  next();
});

app.set("view engine", "ejs");

app.get("/", indexController);
app.get("/home", authMiddleware, homeController);
app.get("/login", redirectIfAuth, loginController);
app.get("/register", redirectIfAuth, registerController);
app.post("/user/register", redirectIfAuth, storeUserController);
app.post("/user/login", redirectIfAuth, loginUserController);
app.get("/logout", logoutController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
