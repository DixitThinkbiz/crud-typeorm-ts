// Import necessary functions
import { dummy } from "../../../domain/models/dummy";
import { deleteDummyData } from "../../../infrastructure/repositories/dummy/delete_dummy.repo";
import { selectDummy } from "../../../infrastructure/repositories/dummy/get_dummy.repo";

// Delete Dummy Usecase
export const deleteDummyUsecase = async (id: number) => {
    // Retrieve dummy data based on the provided ID
    const selectedUser:dummy[] = await selectDummy(id);

    // Check if a dummy with the specified ID exists
    if (selectedUser.length) {
        // If it exists, delete the dummy data
        await deleteDummyData(id);
    } else {
        // If no dummy with the specified ID exists, throw an error
        throw new Error("User does not exist");
    }
}
