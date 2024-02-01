// Import necessary modules and use case
import { Request, Response } from "express";
import { addDummyUsecase as registerDummyUsecase } from "../../../application/use_cases/authUsecase/register_dummy.usecase";
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { EntityManager } from "typeorm";
import { displayFunction } from "../../../infrastructure/helpers/res_display";
import { AuthRepositoryPort } from "../../../application/port/repositories/auth_repo.port";

// Controller for adding a dummy user
export const registerDummyController =
  (authRepo: AuthRepositoryPort) => async (req: Request, res: Response) => {
    try {
      // Call the addDummyUsecase to handle adding the dummy user
      const dummyData: Dummy = req.body;
      
      await authRepo.wrapTransaction(async (t: EntityManager) => {
        await registerDummyUsecase(authRepo, dummyData, t);
      });
      return displayFunction(
        constants.SUCCESS_STATUS.CREATED,
        res,
        constants.SUCCESS_MESSAGE.USER_ADDED
      );
    } catch (error) {
      // Handle errors, return appropriate status codes and messages
      if (error instanceof Error) {
        if (error.message === constants.ERROR_MESSAGE.USER_ALREADY_EXISTS) {
          return displayFunction(
            constants.ERROR_STATUS.CONFLICT,
            res,
            constants.ERROR_MESSAGE.USER_ALREADY_EXISTS
          );
        }
        if(error.message===constants.ERROR_MESSAGE.OTP_INVALID){
          return displayFunction(
            constants.ERROR_STATUS.AUTHENTICATION_FAILED,
            res,
            constants.ERROR_MESSAGE.OTP_INVALID
          );
        }
      }
      
      return displayFunction(
        constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
        res,
        constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  };
