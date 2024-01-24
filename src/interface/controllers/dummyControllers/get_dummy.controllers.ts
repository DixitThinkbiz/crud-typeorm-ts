// Import necessary modules and use case
import { Request, Response } from "express";
import { getDummyUsecase } from "../../../application/use_cases/dummy/get_dummy.usecase";
import { constants } from "../../../infrastructure/config/constant";
import { displayFunction } from "./utils";
import { EntityManager } from "typeorm";
import { DummyRepositoryPort } from "../../../application/port/repositories/dummy_repo.port";

// Controller for retrieving dummy user information
export const getDummyController = (DummyRepo: DummyRepositoryPort) => async (req: Request, res: Response) => {
  try {
    //Call the getDummyUsecase to handle retrieving dummy user information
    const selectedDummy = await DummyRepo.wrapTransaction(async (t: EntityManager) => {
      return await getDummyUsecase(DummyRepo, Number(req.params.id), t);
    })
    return displayFunction(constants.SUCCESS_STATUS.OK, res, selectedDummy);
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if (error.message === constants.ERROR_MESSAGE.USER_NOT_FOUND) {
        return displayFunction(constants.ERROR_STATUS.NOT_FOUND, res, constants.ERROR_MESSAGE.USER_NOT_FOUND)
      }
    }
    return displayFunction(constants.ERROR_STATUS.INTERNAL_SERVER_ERROR, res, constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
  }
};
