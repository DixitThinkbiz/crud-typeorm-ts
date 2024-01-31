// Import necessary modules and controllers
import express from "express";
import { loginController } from "../controllers/authControllers.ts/login.controller";
import { loginSchema } from "../../domain/schemas/auth_login.schema";
import { validateDummyData } from "../../infrastructure/helpers/middlewares/valiidate";
import { isAuthenticated } from "../../infrastructure/helpers/middlewares/Authenticate";
import { refreshTokenController } from "../controllers/authControllers.ts/refresh_tokens.controller";
import { Env } from "../../infrastructure/helpers/env";
import { authRepo } from "../../infrastructure/repositories/auth/auth.repo";
import { dummySchemaPost } from "../../domain/schemas/add_dummy.schema";
import { addDummyController } from "../controllers/authControllers.ts/add_dummy.controllers";

// Create an Express router
export const authRouter = express.Router();

authRouter.post(
  "/login",
  validateDummyData(loginSchema),
  loginController(authRepo)
);
authRouter.post(
  "/refreshtokens",
  isAuthenticated(Env.REFRESH_KEY),
  refreshTokenController(authRepo)
);

authRouter.post(
  "/create",
  validateDummyData(dummySchemaPost),
  addDummyController(authRepo)
);
