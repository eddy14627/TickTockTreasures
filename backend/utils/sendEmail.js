import nodemailer from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import User from "../models/userModel.js";

export const sendEmail = async (filePath, details, email, emailSubject) => {
  try {
    const template = fs.readFileSync(filePath, "utf-8");
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(details);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw { message: "User with this email does not exist" };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      host: "smtp.googlemail.com",
      port: 465,
      secure: true,
    });

    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: emailSubject || "",
      html: html,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Otp Send : ${info.response}`);
      }
    });
  } catch (error) {
    console.log(error);
    throw { message: "Something went wrong in email sending" };
  }
};
