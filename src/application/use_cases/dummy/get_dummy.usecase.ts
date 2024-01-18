// Import necessary function
import { selectDummy } from "../../../infrastructure/repositories/dummy/get_dummy.repo";

// Get Dummy Usecase
export const getDummyUsecase = async (id: number) => {
    // Retrieve dummy data based on the provided ID
    const selectedDummy: any = await selectDummy(id);

    // Check if an ID is provided
    if (id) {
        // If a dummy with the specified ID exists, return it; otherwise, throw an error
        if (selectedDummy.length) {
            return selectedDummy;
        } else {
            throw new Error("User not found");
        }
    } else {
        // If no ID is provided, check if the table has any data
        // If data exists, return it; otherwise, throw an error
        if (selectedDummy.length) {
            return selectedDummy;
        } else {
            throw new Error("Table is empty");
        }
    }
}
