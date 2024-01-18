// Import necessary functions
import { checkUserEmailExist } from "../../../infrastructure/repositories/dummy/check_dummy_data_exist.repo";
import { addDummyData } from "../../../infrastructure/repositories/dummy/add_dummy.repo";
import { dummy } from "../../../domain/models/dummy";

// Add Dummy Usecase
export const addDummyUsecase = async (dummyData: dummy) => {
    // Check if a dummy with the specified email already exists
    const selectedDummy : dummy= await checkUserEmailExist(dummyData.email);

    // If a dummy with the same email exists, throw an error
    if (selectedDummy) {
        throw new Error("User already exists");
    }

    // Add the dummy data
    await addDummyData(dummyData);
}
