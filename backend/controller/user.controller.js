import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  transporter,
  sendMessageToAdmin,
  sendMessageToCustomer,
  sendOTPToCustomer,
  generateOtp,
} from "../mail.js";
import cloudinary from "../cloudConfig.js";
import dotenv from "dotenv";
dotenv.config();

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOtp();
    sendOTPToCustomer(email, "Verify Your Mail", otp, res);
  } catch (error) {
    console.log("Error: " + error);
  }
};

//Contact us
export const sendQuery = async (req, res) => {
  try {
    const { email, queries } = req.body;
    sendMessageToCustomer(email, "For Giving Feedback");
    sendMessageToAdmin("Customer Giving A Query", queries, email, res);
  } catch (error) {
    console.log("Error: " + error);
  }
};

//Signup
export const userSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      image,
      age,
      phoneNumber,
      category,
      bio,
      address,
      password,
      gender
    } = req.body;
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "/hi-friends/users",
    });
    const hashedPassword = await bcryptjs.hash(password, 10);

    const createdUser = new User({
      name,
      password: hashedPassword,
      gender,
      photo: uploadResult.url,
      age,
      phoneNumber,
      email,
      category,
      bio,
      address,
    });

    const newUser = await createdUser.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
        category: newUser.category,
        email: newUser.email,
      },
      process.env.SECRET
    );

    res.status(201).json({
      message: "Signup successfully",
      token: token,
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      message: "Some error occured",
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          _id: user._id,
          category: user.category,
          email: user.email,
        },
        process.env.SECRET
      );

      res.status(201).json({
        message: "Login successfully",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      message: "Please give some valid info",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    let { token } = req.query;
    let user = await User.findById(token._id);
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        gender: user.gender ,
        phoneNumber:user.phoneNumber,
        photo: user.photo,
        category: user.category,
        bio:user.bio,
        email:user.email,
        orders:user.orders.length
      });
    } else {
      res.status(404).json({
        message:"User not found"
      })
    }
  } catch (err) {
    console.log("Error: " + err);
    res.status(401).json({ message: "Invalid token" });
  }
};
