// Import necessary functions
import { Dummy } from "../../../domain/models/dummy";
import { DummyRepositoryPort } from "../../port/repositories/dummy_reop.port";

// Add Dummy Usecase
export const addDummyUsecase = async (DummyRepo:DummyRepositoryPort,dummyData: Dummy) => {
    // Check if a dummy with the specified email already exists
    const selectedDummy : Dummy= await DummyRepo.checkDummyEmailExist(dummyData.email);

    // If a dummy with the same email exists, throw an error
    if (selectedDummy) {
        throw new Error("User already exists");
    }

    // Add the dummy data
    await DummyRepo.addDummy(dummyData);
}
