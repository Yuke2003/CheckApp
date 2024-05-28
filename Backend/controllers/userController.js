const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
// const Apperror = require("./../utils/errorHandler");

dotenv.config({path:"./config.env"});

const usertoken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
console.log(process.env.JWT_SECRET);

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role,
    });

    const token = usertoken(newUser.id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    const token = usertoken(user.id);

    if (!user || !isCorrectPassword) {
      return res
        .status(401)
        .json({ error: "please provide valid credentials" });
    }

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log("error in login controller", err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "You do not have permission to perform this action" });
    }
    next();
  };
};

exports.getOneUser = async (req, res, next) => {
  try {
    const getOneUser = await User.findById(req.params.id).populate(
      "rentDetails"
    );

    res.status(200).json({
      status: "success",
      data: {
        getOneUser,
      },
    });
    next();
  } catch (err) {
    console.log(err.message);
  }
};
