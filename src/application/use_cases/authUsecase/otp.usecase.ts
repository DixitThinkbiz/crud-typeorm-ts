// Import necessary function
import { EntityManager } from "typeorm";
import { constants } from "../../../infrastructure/config/constant";
import { Env } from "../../../infrastructure/helpers/env";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../../../domain/models/auth";
import { AuthRepositoryPort } from "../../port/repositories/auth_repo.port";
import { transporter } from "../../../infrastructure/helpers/send_mail";

// Get Dummy Usecase
export const otpUsecase = async (
  AuthRepo: AuthRepositoryPort,
  email: string,
  t: EntityManager
) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await AuthRepo.addOtp(email, otp, t);
  const mailOptions = {
    from: "23sendmail@gmail.com",
    to: `${email}`, // Replace with the recipient's email
    subject: "Your OTP for Verification",
    text: `Your OTP is ${otp}. Please use it to verify your account.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
  return otp;
};
