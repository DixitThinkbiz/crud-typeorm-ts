// Import necessary function
import { EntityManager } from "typeorm";
import { Dummy } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import {  DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";
import { constants } from "../../../infrastructure/config/constant";
import {  DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";


// Get Dummy Usecase
export const getDummyUsecase = async (DummyRepo :DummyRepositoryPort,id: number,t:EntityManager) => {
    // Retrieve dummy data based on the provided ID
    const selectedDummy: Dummy[] = await DummyRepo.getDummy(id,t);
    // Check if an ID is provided
    if (id) {
        // If a dummy with the specified ID exists, return it; otherwise, throw an error
        if (selectedDummy.length) {
            await DummyRepo.checkDummyEmailExist(selectedDummy[0].email,t)
            return selectedDummy;
        } else {
            throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
            throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
        }
    } 
    
    return selectedDummy;
}
