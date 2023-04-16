import User from "../models/User.js";

export const storeUserController = (req, res) => {
  console.log("req.body", req.body);
  User.create(req.body)
    .then(() => {
      console.log("User registered successfully!");
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);

      if (error) {
        const validationErrors = Object.keys(error.errors).map(
          (r) => error.errors[r]
        );
        req.flash("validationErrors", validationErrors);
        req.flash("data", req.body);

        return res.redirect("/register");
      }
    });
};
