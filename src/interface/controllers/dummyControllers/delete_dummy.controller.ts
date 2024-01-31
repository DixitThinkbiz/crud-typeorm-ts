// Import necessary modules and use cases
import { Request, Response } from "express";
import { deleteDummyUsecase } from "../../../application/use_cases/dummy/delete_dummy.usecase";
import { constants } from "../../../infrastructure/config/constant";

import { EntityManager } from "typeorm";
import { DummyRepositoryPort } from "../../../application/port/repositories/dummy_repo.port";
import { displayFunction } from "../../../infrastructure/helpers/res_display";

// Controller for deleting a dummy user
export const deleteDummyController =
  (DummyRepo: DummyRepositoryPort) => async (req: Request, res: Response) => {
    try {
        const id =  res.locals.user.role=="admin"? req.query.id?+req.query.id:undefined :  res.locals.user.id;
      // Call the deleteDummyUsecase to handle the deletion of the dummy user
      await DummyRepo.wrapTransaction(async (t: EntityManager) => {
        return await deleteDummyUsecase(
          DummyRepo,
          id,
          t
        );
      });
      return displayFunction(
        constants.SUCCESS_STATUS.OK,
        res,
        constants.SUCCESS_MESSAGE.REQUEST_SUCCEEDED
      );
    } catch (error) {
      // Handle errors, return appropriate status codes and messages
      if (error instanceof Error) {
        if (error.message === constants.ERROR_MESSAGE.USER_NOT_FOUND)
          return displayFunction(
            constants.ERROR_STATUS.NOT_FOUND,
            res,
            constants.ERROR_MESSAGE.USER_NOT_FOUND
          );
      }
      return displayFunction(
        constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
        res,
        constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  };
