const CompagnieModel = require("../models/compagnie");
// const { route } = require("../routes/userRouter.js");
let routeGuard = async (req, res, next) => {
  let user = await CompagnieModel.findOne({_id: req.session.compagnieId});
  if (user) {
    next();
  } else {
    res.redirect("/main");
  }
};


module.exports = routeGuard