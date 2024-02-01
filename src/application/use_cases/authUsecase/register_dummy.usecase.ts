// Import necessary functions
import { EntityManager } from "typeorm";
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { AuthRepositoryPort } from "../../port/repositories/auth_repo.port";

// Add Dummy Usecase
export const addDummyUsecase = async (
  authRepo: AuthRepositoryPort,
  dummyData: Dummy,
  t: EntityManager
) => {
  // Check if a dummy with the specified email already exists
  const {otp, ...restdata}=dummyData;
  const time=await authRepo.verifyOtp(restdata.email,otp,t);
  if(!time)
  {
    throw new Error("Otp in valid");
  }
  const otpTime=time.updatedAt?new Date(time.updatedAt):new Date(time.createdAt);
  const currTime=new Date;
  const diff=(currTime.getTime()-otpTime.getTime())/1000;
  if(diff>Number(constants.TIME.OTP_TIME)){
    throw new Error(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
  }
  const selectedDummy=await authRepo.loginDetails({email:dummyData.email},t);
  if(selectedDummy){
    throw new Error(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
  }
  await authRepo.registerDummy(restdata, t);
  await authRepo.deleteOtp(restdata.email,otp,t)
};
