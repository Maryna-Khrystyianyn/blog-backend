import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    console.log("register");
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pass, salt);

    const doc = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      avatar: req.body.avatar,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { password, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );
    if (!isValidPass) {
      res.status(404).json({ message: "Incorect email or password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { password, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return req.status(404).json({ message: "User does not exist" });
    }

    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    console.error(error);
  }
};
