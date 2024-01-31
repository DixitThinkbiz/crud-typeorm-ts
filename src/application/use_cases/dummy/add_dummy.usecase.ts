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

  const selectedDummy=await authRepo.loginDetails({email:dummyData.email},t);
  if(selectedDummy){
    throw new Error(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
    
  }
  await authRepo.addDummy(dummyData, t);
};
