// Import necessary functions
import { Dummy } from "../../../domain/models/dummy";
import { DummyRepositoryPort } from "../../port/repositories/dummy_reop.port";

// Update Dummy Usecase
export const updateDummyUsecase = async (DummyRepo:DummyRepositoryPort,dummyData: Dummy) => {
    // Check if the dummy data with the specified ID exists
    const checkDummyExist = await  DummyRepo.getDummy(dummyData.id);
   
    // If the dummy data exists
    if (checkDummyExist.length) {
        // Check if another dummy with the same email already exists
        const selectedDummy: Dummy = await DummyRepo.checkDummyEmailExist(dummyData.email);
       
        // If another dummy with the same email exists, throw an error
        if (selectedDummy) {
            throw new Error("User exists");
        }
        // Update the dummy data
        await DummyRepo.updateDummy(dummyData);
    } else {
        // If the dummy data does not exist, throw an error
        throw new Error("User not found");
    }
}