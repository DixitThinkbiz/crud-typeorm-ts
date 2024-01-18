// Import necessary functions
import { checkUserEmailExist } from "../../../infrastructure/repositories/dummy/check_dummy_data_exist.repo";
import { addDummyData } from "../../../infrastructure/repositories/dummy/add_dummy.repo";

// Add Dummy Usecase
export const addDummyUsecase = async (dummyData: any) => {
    // Check if a dummy with the specified email already exists
    const selectedDummy: any = await checkUserEmailExist(dummyData.email);

    // If a dummy with the same email exists, throw an error
    if (selectedDummy.length) {
        throw new Error("User already exists");
    }

    // Add the dummy data
    await addDummyData(dummyData);
}
