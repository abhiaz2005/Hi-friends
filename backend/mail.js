import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { textToCustomer,textToAdmin } from "./public/text.js";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

export const generateOtp =  () => {
  const otp = uuidv4();
  return otp ;
};


export const transporter = nodemailer.createTransport({
  host: process.env.HOST_TYPE,
  port: 587,
  secure: false,
  auth: {
    user: process.env.HOST,
    pass: process.env.PASS,
  },
});

export const sendMessageToAdmin = async (subject, text, sender,res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.HOST,
      to: process.env.ADMIN,
      subject: subject,
      html: textToAdmin(sender,text),
    });

    res.status(201).json({
      message: "Sent succesfully",
    });
  } catch (error) {
    console.log("Message sent failed: ", error);
    res.status(500).json({
      message: "Message sent failed !!",
    });
  }
};

export const sendMessageToCustomer = async (to, subject) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.HOST,
      to: to,
      subject: subject,
      html: textToCustomer,
    });
  } catch (error) {
    console.log("Message sent failed: ", error);
  }
};

export const sendOTPToCustomer =  async (to,subject,otp,res) =>{
  try {
    const info = await transporter.sendMail({
      from: process.env.HOST,
      to: to,
      subject: subject,
      html: `
      <h1>Hi-Friends Community</h1>
      <p>Your Otp is <b>${otp}</b></p>
      `,
    });
    res.status(201).json({
      message: "Sent succesfully",
      otp: otp
    });
  } catch (error) {
    console.log("Message sent failed: ", error);
    res.status(500).json({
      message: "Some issue in sending the mail!!",
    });
  }
}