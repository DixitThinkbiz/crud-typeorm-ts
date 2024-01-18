// Import necessary modules and controllers
import express from "express";
import { getDummyController } from "../controllers/dummyControllers/get_dummy.controllers";
import { validateDummyPatch, validateDummyPost } from "./utils";
import { addDummyController } from "../controllers/dummyControllers/add_dummy.controllers";
import { deleteDummyController } from "../controllers/dummyControllers/delete_dummy.controller";
import { updateUserdata } from "../controllers/dummyControllers/update_dummy.controller";

// Create an Express router
export const router = express.Router();

// Define routes for retrieving dummy data
router.get("/", getDummyController);
router.get("/:id", getDummyController);

// Define route for adding dummy data with validation
router.post("/", validateDummyPost, addDummyController);

// Define route for updating dummy data with validation
router.patch("/", validateDummyPatch, updateUserdata);

// Define route for deleting dummy data
router.delete("/:id", deleteDummyController);
