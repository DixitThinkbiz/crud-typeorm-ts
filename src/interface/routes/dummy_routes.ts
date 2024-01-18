import express from "express";
import { getDummyController } from "../controllers/dummyControllers/get_dummy.controllers";
import {validateDummyPatch, validateDummyPost } from "./utils";

import { addDummyController } from "../controllers/dummyControllers/add_dummy.controllers";
import { deleteDummyController } from "../controllers/dummyControllers/delete_dummy.controller";
import { updateUserdata } from "../controllers/dummyControllers/update_dummy.controller";

export const router = express.Router();

router.get("/",getDummyController);
router.get("/:id",getDummyController );

router.post("/",validateDummyPost,addDummyController);


router.patch("/", validateDummyPatch,updateUserdata);

router.delete("/:id",deleteDummyController);

