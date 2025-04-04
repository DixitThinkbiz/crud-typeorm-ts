// Import necessary function
import { EntityManager } from "typeorm";
import { constants } from "../../../infrastructure/config/constant";
import { Env } from "../../../infrastructure/helpers/env";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../../../domain/models/auth";
import { AuthRepositoryPort } from "../../port/repositories/auth_repo.port";

// Get Dummy Usecase
export const refreshTokenUsecase = async (
  AuthRepo:AuthRepositoryPort,
  data: TokenPayload,
  t: EntityManager
) => {
  const accessToken = jwt.sign(data, Env.ACCESS_KEY, {
    expiresIn: constants.TIME.A_TIME,
  });
  const refreshToken = jwt.sign(data, Env.REFRESH_KEY, {
    expiresIn: constants.TIME.R_TIME,
  });
  await AuthRepo.addRefreshToken(refreshToken,data.id,t)
  

  return { accessToken, refreshToken };
};
