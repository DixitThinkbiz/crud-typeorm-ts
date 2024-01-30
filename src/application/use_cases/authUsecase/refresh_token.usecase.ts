// Import necessary function
import { EntityManager } from "typeorm";
import { AuthLogin } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";
import { Env } from "../../../infrastructure/helpers/env";
import jwt, { JwtPayload } from "jsonwebtoken";
import { access } from "fs";
import { TokenPayload } from "../../../domain/models/auth";

// Get Dummy Usecase
export const refreshTokenUsecase = async (
  data: TokenPayload,
  t: EntityManager
) => {

  const accessToken = jwt.sign(data, Env.ACCESS_KEY, {
    expiresIn: constants.TIME.A_TIME,
  });
  const refreshToken = jwt.sign(
    data,
    Env.REFRESH_KEY,
    {
      expiresIn: constants.TIME.R_TIME,
    })
   
    
  return {accessToken,refreshToken};
};
