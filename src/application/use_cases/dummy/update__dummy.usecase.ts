// Import necessary functions
import { EntityManager } from "typeorm";
import { Dummy, AuthLogin } from "../../../domain/models/dummy";
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

  // If the dummy data exists
  if (checkDummyExist) {
    // Check if another dummy with the same email already exists
    const selectedDummy: AuthLogin = await DummyRepo.checkDummyEmailExist(
      dummyData.email,
      t
    );

    // If another dummy with the same email exists, throw an error
    if (selectedDummy) {
      throw new Error(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
    }
    // Update the dummy data
    await DummyRepo.updateDummy(id, dummyData, t);
  } else {
    // If the dummy data does not exist, throw an error
    throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  }
};
