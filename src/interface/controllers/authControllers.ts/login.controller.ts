// Import necessary modules and use case
import { Request, Response } from "express";
import { constants } from "../../../infrastructure/config/constant";
import { EntityManager } from "typeorm";
import { DummyRepositoryPort } from "../../../application/port/repositories/dummy_repo.port";
import { displayFunction } from "../dummyControllers/utils";
import jwt from 'jsonwebtoken';
import { loginUsecase } from "../../../application/use_cases/authUsecase/login.usecase";
import { AuthLogin } from "../../../domain/models/dummy";
// Controller for retrieving dummy user information
export const loginController = (DummyRepo: DummyRepositoryPort) => async (req: Request, res: Response) => {
  try {
    const credentials: AuthLogin = req.body;
    const selectedDummy = await DummyRepo.wrapTransaction(async (t: EntityManager) => {
      return await loginUsecase(DummyRepo, credentials, t);
    })

    const token = jwt.sign(
      { id: selectedDummy.id },
      process.env.KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.status(constants.SUCCESS_STATUS.OK).json({token:token})

  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if (error.message === constants.ERROR_MESSAGE.AUTHENTICATION_FAILED) {
        return displayFunction(constants.ERROR_STATUS.AUTHENTICATION_FAILED, res, constants.ERROR_MESSAGE.AUTHENTICATION_FAILED)
      }
    }
    console.log(error); 
    return displayFunction(constants.ERROR_STATUS.INTERNAL_SERVER_ERROR, res, constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
  }
};
