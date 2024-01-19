// Import necessary modules and use case
import Express,{Request,Response} from "express";
import { addDummyUsecase } from "../../../application/use_cases/dummy/add_dummy.usecase";
import { Dummy } from "../../../domain/models/dummy";
import { DummyRepo } from "../../../infrastructure/repositories/dummy/dummy.repo";
import { constants } from "../../../infrastructure/config/constant";


// Controller for adding a dummy user
export const addDummyController = async (req: Request, res: Response) => {
  try {
    // Call the addDummyUsecase to handle adding the dummy user
    const dummyData: Dummy=req.body;
    await addDummyUsecase(DummyRepo,dummyData);
    res.status(constants.SUCCESS_STATUS.CREATED).json({Message:constants.SUCCESS_MESSAGE.USER_ADDED});
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if(error.message===constants.ERROR_MESSAGE.USER_ALREADY_EXISTS){
        return res.status(constants.ERROR_STATUS.CONFLICT).
        json({Message:constants.ERROR_MESSAGE.USER_ALREADY_EXISTS})
      }
      
    }
    res.status(constants.ERROR_STATUS.INTERNAL_SERVER_ERROR).json({Message:constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
  }
};
