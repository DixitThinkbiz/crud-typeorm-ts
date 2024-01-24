// Import necessary modules and use case
import {Request,Response}  from "express";
import { updateDummyUsecase } from "../../../application/use_cases/dummy/update__dummy.usecase";
import { Dummy } from "../../../domain/models/dummy";
import { DummyRepo } from "../../../infrastructure/repositories/dummy/dummy.repo";
import { constants } from "../../../infrastructure/config/constant";
import { displayFunction } from "./utils";
import { AppDataSource } from "../../../infrastructure/orm/typeorm/config/ormconfig";
import { EntityManager } from "typeorm";

// Controller for updating dummy user data
export const updateUserdata =(DummyRepo)=> async (req: Request, res: Response) => {
  try {
    // Call the updateDummyUsecase to handle updating dummy user 
    const dummyData: Dummy=req.body;
    await DummyRepo.wrapTransaction(async (t: EntityManager) => {
      await  updateDummyUsecase(DummyRepo,dummyData,t);
    })
  //   await AppDataSource.transaction(async (entityManager) => {
  //   await updateDummyUsecase(DummyRepo,dummyData,entityManager);
  //   // Respond with a success message
  // });
  return displayFunction(constants.SUCCESS_STATUS.OK,res,constants.SUCCESS_MESSAGE.USER_UPDATED);
    
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if(error.message===constants.ERROR_MESSAGE.USER_NOT_FOUND){
        return displayFunction(constants.ERROR_STATUS.NOT_FOUND,res,constants.ERROR_MESSAGE.USER_NOT_FOUND)
        }
      if(error.message===constants.ERROR_MESSAGE.USER_ALREADY_EXISTS){
        return displayFunction(constants.ERROR_STATUS.CONFLICT,res,constants.ERROR_MESSAGE.USER_ALREADY_EXISTS)
      }
    }
    res.status(constants.ERROR_STATUS.INTERNAL_SERVER_ERROR).json({message:constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
  }
};
