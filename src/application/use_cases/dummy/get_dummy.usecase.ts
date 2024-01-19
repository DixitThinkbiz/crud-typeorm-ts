// Import necessary function
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import {  DummyRepositoryPort } from "../../port/repositories/dummy_reop.port";


// Get Dummy Usecase
export const getDummyUsecase = async (getDummyRepo :DummyRepositoryPort,id: number) => {
    // Retrieve dummy data based on the provided ID
    const selectedDummy: Dummy[] = await getDummyRepo.getDummy(id);
    // Check if an ID is provided
    if (id) {
        // If a dummy with the specified ID exists, return it; otherwise, throw an error
        if (selectedDummy.length) {
            return selectedDummy;
        } else {
            throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
        }
    } 
    return selectedDummy;
}
