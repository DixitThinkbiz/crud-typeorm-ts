// Import necessary function
import { EntityManager } from "typeorm";
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";

// Get Dummy Usecase
export const getDummyUsecase = async (
  DummyRepo: DummyRepositoryPort,
 id:number,
  t: EntityManager
) => {
  // Retrieve dummy data based on the provided ID

  const selectedDummy: Dummy[] = await DummyRepo.getDummy(id, t);

  if (id) {
    // If a dummy with the specified ID exists, return it; otherwise, throw an error
    if (selectedDummy.length) {
      return selectedDummy[0];
    } else {
      throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
    }
  }

  return selectedDummy;
};
