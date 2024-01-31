// Import necessary modules and use case
import { Request, Response } from "express";
import { constants } from "../../../infrastructure/config/constant";
import { EntityManager } from "typeorm";

import { loginUsecase } from "../../../application/use_cases/authUsecase/login.usecase";

import { displayFunction } from "../../../infrastructure/helpers/res_display";
import { AuthRepositoryPort } from "../../../application/port/repositories/auth_repo.port";
import { AuthLogin } from "../../../domain/models/auth";

// Controller for retrieving dummy user information
export const loginController =
  (AuthRepo:AuthRepositoryPort) => async (req: Request, res: Response) => {
    try {
      const credentials: AuthLogin = req.body;
      const token = await AuthRepo.wrapTransaction(
        async (t: EntityManager) => {
          return await loginUsecase(AuthRepo, credentials, t);
        }
      );

      return res.status(constants.SUCCESS_STATUS.OK).json({ tokens: token });
    } catch (error) {
      // Handle errors, return appropriate status codes and messages
      if (error instanceof Error) {
        if (error.message === constants.ERROR_MESSAGE.AUTHENTICATION_FAILED) {
          return displayFunction(
            constants.ERROR_STATUS.AUTHENTICATION_FAILED,
            res,
            constants.ERROR_MESSAGE.AUTHENTICATION_FAILED
          );
        }
      }
      console.log(error);
      return displayFunction(
        constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
        res,
        constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  };
