// Import necessary functions
import { EntityManager } from "typeorm";
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";

// Add Dummy Usecase
export const addDummyUsecase = async (
  DummyRepo: DummyRepositoryPort,
  dummyData: Dummy,
  t: EntityManager
) => {
  // Check if a dummy with the specified email already exists
  const selectedDummy: Dummy[] = await DummyRepo.getDummy(undefined,
    t,
    dummyData.email
  );
  console.log(selectedDummy,selectedDummy.length);
  
  // If a dummy with the same email exists, throw an error
  if (selectedDummy.length) {
    throw new Error(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
  }
  // Add the dummy data
  await DummyRepo.addDummy(dummyData, t);
};
