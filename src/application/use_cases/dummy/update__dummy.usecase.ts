// Import necessary functions
import { checkUserEmailExist } from "../../../infrastructure/repositories/dummy/check_dummy_data_exist.repo";
import { updateDummyData } from "../../../infrastructure/repositories/dummy/update_dummy.repo";
import { selectDummy } from "../../../infrastructure/repositories/dummy/get_dummy.repo";
import { dummy } from "../../../domain/models/dummy";

// Update Dummy Usecase
export const updateDummyUsecase = async (dummyData: dummy) => {
    // Check if the dummy data with the specified ID exists
    const checkDummyExist = await selectDummy(dummyData.id);
   
    // If the dummy data exists
    if (checkDummyExist.length) {
        // Check if another dummy with the same email already exists
        const selectedDummy: dummy = await checkUserEmailExist(dummyData.email);
       
        // If another dummy with the same email exists, throw an error
        if (selectedDummy) {
            throw new Error("User exists");
        }
        // Update the dummy data
        await updateDummyData(dummyData);
    } else {
        // If the dummy data does not exist, throw an error
        throw new Error("User not found");
    }
}