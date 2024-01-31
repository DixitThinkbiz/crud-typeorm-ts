// Import necessary modules and controllers
import express from "express";
import { getDummyController } from "../controllers/dummyControllers/get_dummy.controllers";
import { addDummyController } from "../controllers/authControllers.ts/add_dummy.controllers";
import { deleteDummyController } from "../controllers/dummyControllers/delete_dummy.controller";
import { updateUserdata } from "../controllers/dummyControllers/update_dummy.controller";
import { dummySchemaPatch } from "../../domain/schemas/update-dummy.schema";
import { dummySchemaPost } from "../../domain/schemas/add_dummy.schema";
import { dummuRepo } from "../../infrastructure/repositories/dummy/dummy.repo";
import { isAuthenticated } from "../../infrastructure/helpers/middlewares/Authenticate";
import { validateDummyData } from "../../infrastructure/helpers/middlewares/valiidate";
import { Env } from "../../infrastructure/helpers/env";
import { idSchema } from "../../domain/schemas/dummy_is.schema";

// Create an Express router
export const userRouter = express.Router();

// Define routes for retrieving dummy data
userRouter.get(
  "/",validateDummyData(idSchema),
  isAuthenticated(Env.ACCESS_KEY),
  getDummyController(dummuRepo)
);

// Define route for adding dummy data with validation


// Define route for updating dummy data with validation
userRouter.patch(
  "/",
  validateDummyData(dummySchemaPatch),
  isAuthenticated(Env.ACCESS_KEY),
  updateUserdata(dummuRepo)
);

// Define route for deleting dummy data
userRouter.delete(
  "/",
  isAuthenticated(Env.ACCESS_KEY),
  deleteDummyController(dummuRepo)
);
