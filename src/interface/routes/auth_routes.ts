// Import necessary modules and controllers
import express from "express";
import { loginController } from "../controllers/authControllers.ts/login.controller";
import { validateDummyData } from "./utils";
import { loginSchema } from "../../domain/schemas/auth_login.schema";
import { DummyRepo } from "../../infrastructure/repositories/dummy/dummy.repo";


// Create an Express router
export const authRouter = express.Router();

authRouter.post("/login",  validateDummyData(loginSchema),loginController((DummyRepo)));
