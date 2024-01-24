// Import necessary modules and controllers
import express from "express";
import { getDummyController } from "../controllers/dummyControllers/get_dummy.controllers";
import { validateDummyData} from "./utils";
import { addDummyController } from "../controllers/dummyControllers/add_dummy.controllers";
import { deleteDummyController } from "../controllers/dummyControllers/delete_dummy.controller";
import { updateUserdata } from "../controllers/dummyControllers/update_dummy.controller";
import { dummySchemaPatch } from "../../domain/schemas/update-dummy.schema";
import { dummySchemaPost } from "../../domain/schemas/add_dummy.schema";
import { checkIdDummySchema } from "../../domain/schemas/check_id_dummy.schema";
import { DummyRepo } from "../../infrastructure/repositories/dummy/dummy.repo";


// Create an Express router
export const router = express.Router();

// Define routes for retrieving dummy data
router.get("/", getDummyController(DummyRepo));
router.get("/:id", validateDummyData(checkIdDummySchema),getDummyController(DummyRepo));

// Define route for adding dummy data with validation
router.post("/", validateDummyData(dummySchemaPost), addDummyController(DummyRepo));

// Define route for updating dummy data with validation
router.patch("/",  validateDummyData(dummySchemaPatch), updateUserdata(DummyRepo));

// Define route for deleting dummy data
router.delete("/:id",validateDummyData(checkIdDummySchema),deleteDummyController(DummyRepo));
