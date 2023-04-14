import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const { email } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).send({ message: "Email Already Exits" });
    } else {
      const newCreatedUser = await newUser.save();
      res.status(201).send(newCreatedUser);
    }
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) return next(createError(404, "User Not Found!"));

    const pass = await bcrypt.compare(req.body.password, user.password);

    if (!pass) return next(createError(400, "Wrong Password!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

export const GoogleSignUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });

      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_TOKEN);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
