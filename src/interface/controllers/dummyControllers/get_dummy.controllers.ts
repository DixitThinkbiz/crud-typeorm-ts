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
    return res.status(constants.response.SUCCESS.status).json(selectedDummy);
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if (error.message == "USER_NOT_FOUND") {
        return res.status(constants.response.USER_NOT_FOUND.status).json({ message: constants.response.USER_NOT_FOUND });
      }
      if (error.message == "EMPTY_TABLE") {
        return res.status(constants.response.EMPTY_TABLE.status).json({ message: constants.response.EMPTY_TABLE });
      }
    }
    res.status(constants.response.SERVER_ERROR.status).json(constants.response.SERVER_ERROR);
  }
};
