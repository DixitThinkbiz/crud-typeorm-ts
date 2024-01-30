// Import necessary function
import { EntityManager } from "typeorm";
import { AuthLogin } from "../../../domain/models/dummy";
import { constants } from "../../../infrastructure/config/constant";
import { DummyRepositoryPort } from "../../port/repositories/dummy_repo.port";
import { Env } from "../../../infrastructure/helpers/env";
import jwt from "jsonwebtoken";


// Get Dummy Usecase
export const loginUsecase = async (
  DummyRepo: DummyRepositoryPort,
  dummy: AuthLogin,
  t: EntityManager
) => {
  const selectedDummy: AuthLogin = await DummyRepo.checkDummyEmailExist(
    dummy.email,
    t
  );
  if (!selectedDummy || selectedDummy.password != dummy.password) {
    throw new Error(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
  }
  const accessToken = jwt.sign(
    { id: selectedDummy.id, role: selectedDummy.role },
    Env.ACCESS_KEY,
    {
      expiresIn: constants.TIME.A_TIME,
    }
  );
  const refreshToken = jwt.sign(
    { id: selectedDummy.id, role: selectedDummy.role },
    Env.REFRESH_KEY,
    {
      expiresIn: constants.TIME.R_TIME,
    }
  );
  return { accessToken, refreshToken };
};
