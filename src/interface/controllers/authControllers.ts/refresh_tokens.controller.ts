// Import necessary modules and use case
import { Request, Response } from "express";
import { constants } from "../../../infrastructure/config/constant";
import { displayFunction } from "../../../infrastructure/helpers/res_display";
import { EntityManager } from "typeorm";
import { refreshTokenUsecase } from "../../../application/use_cases/authUsecase/refresh_token.usecase";
import { AuthRepositoryPort } from "../../../application/port/repositories/auth_repo.port";
// Controller for retrieving dummy user information
export const refreshTokenController =
  (AuthRepo: AuthRepositoryPort) => async (req: Request, res: Response) => {
    try {
      const data = res.locals.user;
      const tokens = await AuthRepo.wrapTransaction(async (t: EntityManager) => {
        return await refreshTokenUsecase(AuthRepo,data, t);
      });
      return res.status(constants.SUCCESS_STATUS.OK).json({ tokens: tokens });
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
