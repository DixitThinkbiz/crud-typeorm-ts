// Import necessary function
import { EntityManager } from "typeorm";
import { Dummy, AuthLogin } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import {  DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";


// Get Dummy Usecase
export const loginUsecase = async (DummyRepo :DummyRepositoryPort,dummy:AuthLogin,t:EntityManager) => {
    
    const selectedDummy: AuthLogin = await DummyRepo.checkDummyEmailExist(dummy.email,t);
    if (!selectedDummy || selectedDummy.password!=dummy.password) {
        throw new Error(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED) 
    } 
    return selectedDummy;
}