// Import necessary modules and controllers
import express from "express";
import { loginController } from "../controllers/authControllers.ts/login.controller";
import { loginSchema } from "../../domain/schemas/auth_login.schema";
import { DummyRepo } from "../../infrastructure/repositories/dummy/dummy.repo";
import { validateDummyData } from "../../infrastructure/helpers/middlewares/valiidate";
import { isAuthenticated } from "../../infrastructure/helpers/middlewares/Authenticate";
import { refreshTokenController } from "../controllers/authControllers.ts/refresh_tokens.controller";
import { Env } from "../../infrastructure/helpers/env";


// Create an Express router
export const authRouter = express.Router();

authRouter.post("/login",  validateDummyData(loginSchema),loginController((DummyRepo)));
authRouter.post("/refreshtokens",isAuthenticated(Env.REFRESH_KEY),refreshTokenController(DummyRepo))
