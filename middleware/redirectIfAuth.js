export const redirectIfAuth = (req, res, next) => {
  if (req.session.userId) {
    console.log("authenticated");
    return res.redirect("/");
  }
  next();
};
