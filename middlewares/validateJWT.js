const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      status: "warning",
      msg: "Token not found",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.id = id;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      msg: "Token invalid",
    });
  }
};

const validateADMIN_ROLE = async (req, res, next) => {
  try {
    const id = req.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        status: "warning",
        msg: "User not exists",
      });
    }

    if (user.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        status: "warning",
        msg: "You don't have permissions",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      msg: "Error unexpected",
    });
  }
};

const validateADMIN_ROLE_SameUser = async (req, res, next) => {
  try {
    const id = req.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        status: "warning",
        msg: "User not exists",
      });
    }

    if (user.role === "ADMIN_ROLE" || id === req.params.id) {
      next();
    } else {
      return res.status(403).json({
        status: "warning",
        msg: "You don't have permissions",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      msg: "Error unexpected",
    });
  }
};

module.exports = {
  validateJWT,
  validateADMIN_ROLE,
  validateADMIN_ROLE_SameUser,
};
