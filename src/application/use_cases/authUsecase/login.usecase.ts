// Import necessary function
import { EntityManager } from "typeorm";
import { constants } from "../../../infrastructure/config/constant";
import { Env } from "../../../infrastructure/helpers/env";
import jwt from "jsonwebtoken";
import { AuthRepositoryPort } from "../../port/repositories/auth_repo.port";
import { AuthLogin } from "../../../domain/models/auth";


// Get Dummy Usecase
export const loginUsecase = async (
  AuthRepo:AuthRepositoryPort,
  dummy:AuthLogin ,
  t: EntityManager
) => {
  const selectedDummy=await AuthRepo.loginDetails(dummy, t) 
  
 if(selectedDummy){
  const accessToken = jwt.sign(
    { id: selectedDummy.id, role: selectedDummy.role },
    Env.ACCESS_KEY,
    {
      expiresIn: constants.TIME.ACCESS_TOKEN_TIME,
    }
  );
  const refreshToken = jwt.sign(
    { id: selectedDummy.id, role: selectedDummy.role },
    Env.REFRESH_KEY,
    {
      expiresIn: constants.TIME.REFRESH_TOKEN_TIME,
    }
  );
  await AuthRepo.addRefreshToken(refreshToken,selectedDummy.id,t)
  return { accessToken, refreshToken };
 }
 throw new Error(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
 
};
