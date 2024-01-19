// Import necessary modules and use case
import Express, { Request, Response } from "express";
import { getDummyUsecase } from "../../../application/use_cases/dummy/get_dummy.usecase";
import { DummyRepo } from "../../../infrastructure/repositories/dummy/dummy.repo";
import { constants } from "../../../infrastructure/config/constant";


// Controller for retrieving dummy user information
export const getDummyController = async (req: Request, res: Response) => {
  try {
    // Call the getDummyUsecase to handle retrieving dummy user information
    const selectedDummy = await getDummyUsecase(DummyRepo, Number(req.params.id));
    return res.status(constants.SUCCESS_STATUS.OK).json(selectedDummy);
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if (error.message===constants.ERROR_MESSAGE.USER_NOT_FOUND) {
        return res.status(constants.ERROR_STATUS.NOT_FOUND).json({Message: constants.ERROR_MESSAGE.USER_NOT_FOUND});
      }
    }
    
    res.status(constants.ERROR_STATUS.INTERNAL_SERVER_ERROR).json({Message:constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
  }
};
