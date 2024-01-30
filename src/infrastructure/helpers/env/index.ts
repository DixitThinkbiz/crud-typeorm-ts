import dotenv from "dotenv";
dotenv.config();
export const Env = {
  TYPE: process.env.TYPE,
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.TYPE,
  DB: process.env.DB,
  PORT: process.env.PORT,
  ACCESS_KEY: process.env.ACCESS_KEY,
  REFRESH_KEY: process.env.REFRESH_KEY,
};
