// Import necessary functions
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { DummyRepo} from "../../../infrastructure/repositories/dummy/dummy.repo";
import { DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";

// Delete Dummy Usecase
export const deleteDummyUsecase = async (deleteDummyRepo: DummyRepositoryPort,id: number) => {
    // Retrieve dummy data based on the provided ID
    const selectedUser:Dummy[] = await DummyRepo.getDummy(id);

    // Check if a dummy with the specified ID exists
    if (selectedUser.length) {
        // If it exists, delete the dummy data
        await DummyRepo.deleteDummy(id);
    } else {
        // If no dummy with the specified ID exists, throw an error
        throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
    }
}
