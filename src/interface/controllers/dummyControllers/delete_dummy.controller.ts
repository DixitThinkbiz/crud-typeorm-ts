// Import necessary modules and use cases
import Express, { Request, Response } from "express";
import { deleteDummyUsecase } from "../../../application/use_cases/dummy/delete_dummy.usecase";
import { DummyRepo } from "../../../infrastructure/repositories/dummy/dummy.repo";
import { constants } from "../../../infrastructure/config/constant";
import { displayFunction } from "./utils";

// Controller for deleting a dummy user
export const deleteDummyController = async (req: Request, res: Response) => {
  try {
    // Call the deleteDummyUsecase to handle the deletion of the dummy user
    await deleteDummyUsecase(DummyRepo, Number(req.params.id));
    return displayFunction(constants.SUCCESS_STATUS.OK,res,constants.SUCCESS_MESSAGE.REQUEST_SUCCEEDED)
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if (error.message ===constants.ERROR_MESSAGE.USER_NOT_FOUND)
      return displayFunction(constants.ERROR_STATUS.NOT_FOUND,res,constants.ERROR_MESSAGE.USER_NOT_FOUND)
    }
    return displayFunction(constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,res,constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
  }
};
