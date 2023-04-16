import User from "../models/User.js";

export const homeController = async (req, res) => {
  let userData = await User.findById(req.session.userId);

  res.render("home", { userData });
};
