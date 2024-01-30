// Import necessary function
import { EntityManager } from "typeorm";
import {  AuthLogin } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import {  DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";
import { Env } from "../../../infrastructure/helpers/env";
import jwt from 'jsonwebtoken';

// Get Dummy Usecase
export const loginUsecase = async (DummyRepo :DummyRepositoryPort,dummy:AuthLogin,t:EntityManager) => {
    
    const selectedDummy: AuthLogin = await DummyRepo.checkDummyEmailExist(dummy.email,t);
    if (!selectedDummy || selectedDummy.password!=dummy.password) {
        throw new Error(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED) 
    } 
    return jwt.sign(
        { id: selectedDummy.id },
        Env.ACCESS_KEY,
        {
          expiresIn: "1h",
        }
      );
}