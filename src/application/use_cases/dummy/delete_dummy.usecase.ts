// Import necessary functions
import { EntityManager } from "typeorm";
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";


// Delete Dummy Usecase
export const deleteDummyUsecase = async (
  DummyRepo: DummyRepositoryPort,
  id: number,
  t: EntityManager
) => {
  if(id){
    const selectedUser: Dummy []= await DummyRepo.getDummy(id, t);
  // Check if a dummy with the specified ID exists

  
  if (selectedUser.length) {
    // If it exists, delete the dummy data
    return await DummyRepo.deleteDummy(id, t);
  }
  }
  throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  // Retrieve dummy data based on the provided ID
   
};
