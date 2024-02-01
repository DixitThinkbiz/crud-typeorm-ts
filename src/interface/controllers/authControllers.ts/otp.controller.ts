// Import necessary modules and use case
import { Request, Response } from "express";
import { constants } from "../../../infrastructure/config/constant";
import { AuthRepositoryPort } from "../../../application/port/repositories/auth_repo.port";
import { EntityManager } from "typeorm";
import { otpUsecase } from "../../../application/use_cases/authUsecase/otp.usecase";
import { displayFunction } from "../../../infrastructure/helpers/res_display";
import { json } from "body-parser";

// Controller for retrieving dummy user information
export const otpController =
  (authRepo:AuthRepositoryPort) => async (req: Request, res: Response) => {
    try {
      const email=req.body.email;
      const otp= await authRepo.wrapTransaction(async (t:EntityManager)=>{
        return await otpUsecase(authRepo,email,t)
      })
      return displayFunction(constants.SUCCESS_STATUS.CREATED,res,otp)
    
     
    } catch (error) {
      // Handle errors, return appropriate status codes and messages
      return displayFunction(
        constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
        res,
        constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
      );
      
      
    }
  };
