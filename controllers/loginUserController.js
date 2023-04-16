import User from "../models/User.js";
import bcrypt from "bcrypt";

export const loginUserController = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    console.log(user);

    if (user) {
      let cmp = bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          req.session.userId = user._id;
          res.redirect("/home");
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
};
