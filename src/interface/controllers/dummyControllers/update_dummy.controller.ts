// Import necessary modules and use case
import Express,{Request,Response}  from "express";
import { updateDummyUsecase } from "../../../application/use_cases/dummy/update__dummy.usecase";
import { Dummy } from "../../../domain/models/dummy";
import { DummyRepo } from "../../../infrastructure/repositories/dummy/dummy.repo";
import { constants } from "../../../infrastructure/config/constant";

// Controller for updating dummy user data
export const updateUserdata = async (req: Request, res: Response) => {
  try {
    // Call the updateDummyUsecase to handle updating dummy user data
    const dummyData: Dummy=req.body;
    await updateDummyUsecase(DummyRepo,dummyData);
    // Respond with a success message
    res.status(constants.response.USER_UPDATED.status).json(constants.response.USER_UPDATED);
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if(error.message=="USER_NOT_FOUND"){
        return res.status(constants.response.USER_NOT_FOUND.status).json(constants.response.USER_NOT_FOUND);
      }
      if(error.message=="USER_ALREADY_EXISTS"){
        return res.status(constants.response.USER_ALREADY_EXISTS.status).json(constants.response.USER_ALREADY_EXISTS);

      }
    }
    res.status(constants.response.SERVER_ERROR.status).json(constants.response.SERVER_ERROR);
  }
};
