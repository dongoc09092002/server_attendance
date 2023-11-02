const jwt = require("jsonwebtoken");
const { Admins } = require("../models");
const middleware = async (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];

    console.log("this is token", token);
    if (!token) {
      return res.json({
        errCode: 1,
        message: "You are not login",
        data: null,
      });
    } else {
      const admin = jwt.verify(token, "MYKEY");
      if (!admin) {
        return res.json({
          errCode: 1,
          message: "wrong token",
        });
      }
      const checkAdmin = await Admins.findOne({
        where: { id: admin.admin.id },
      });
      if (!checkAdmin) {
        return res.json({
          errCode: 1,
          message: "Dont find admin",
        });
      } else {
        req.AdminId = parseInt(admin.admin.id);
        next();
      }
    }
  } catch (error) {
    return res.json({
      errCode : -1,
      message : 'Error server',
      data : error
    });
  }
};

module.exports = {
  middleware: middleware,
};
