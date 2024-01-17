import express from "express";
import { getDummyController } from "../controllers/dummyControllers/get_controllers";
import {validateDummyPost } from "./utils";

import { addDummyUsecase } from "../../application/use_cases/dummy/addUseCase";
import { any } from "joi";
import { addDummyController } from "../controllers/dummyControllers/add_controllers";
import { deleteDummyController } from "../controllers/dummyControllers/delete_controller";

export const router = express.Router();

router.get("/",getDummyController);
router.get("/:id",getDummyController );

router.post("/",validateDummyPost,addDummyController);


router.patch("/", );

router.delete("/:id",deleteDummyController);

