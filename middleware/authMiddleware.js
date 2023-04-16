import User from "../models/User.js";

export const authMiddleware = (req, res, next) => {
  User.findById(req.session.userId).then((user) => {
    if (!user) {
      return res.redirect("/");
    }

    console.log("User login successfully");
  });

  next();
};
