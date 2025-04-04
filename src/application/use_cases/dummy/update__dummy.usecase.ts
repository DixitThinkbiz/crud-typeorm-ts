// Import necessary functions
import { EntityManager } from "typeorm";
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";

// Update Dummy Usecase
export const updateDummyUsecase = async (
  DummyRepo: DummyRepositoryPort,
  id: number,
  dummyData: Dummy,
  t: EntityManager
) => {
  // Check if the dummy data with the specified ID exists
  const checkDummyExist = await DummyRepo.getDummy(id, t);
  console.log(checkDummyExist);
  
  // If the dummy data exists
  if (checkDummyExist.length) {
    // Check if another dummy with the same email already exists
    const selectedDummy: Dummy[] = await DummyRepo.getDummy(undefined,
      t,
      dummyData.email
    );

    // If another dummy with the same email exists, throw an error
    if (selectedDummy.length) {
      throw new Error(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
    }
    // Update the dummy data
    await DummyRepo.updateDummy(id, dummyData, t);
  } else {
    // If the dummy data does not exist, throw an error
    throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  }
};
