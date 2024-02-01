// Import necessary modules and entities

import { wrapTransaction } from "../../helpers/transaction";
import { AuthRepositoryPort } from "../../../application/port/repositories/auth_repo.port";
import { EntityManager } from "typeorm";
import { t_dummy } from "../../orm/typeorm/entities/dummy";
import { AuthLogin, TokenPayload } from "../../../domain/models/auth";
import { otptable } from "../../orm/typeorm/entities/otp";

// Implementation of DummyRepositoryPort using TypeORM
// Implementation of DummyRepositoryPort using TypeORM
export const authRepo: AuthRepositoryPort = {
  // Retrieve dummy data by ID
  wrapTransaction,
  loginDetails: async (loginInfo: AuthLogin, entityManager: EntityManager) => {
    const selectedDummy = await entityManager
      .getRepository(t_dummy)
      .createQueryBuilder()
      .select("id,role")
      .where({ email: loginInfo.email })
      .andWhere(loginInfo.password ? { password: loginInfo.password } : "true")
      .getRawOne();

    // Return the selected user data
    return selectedDummy as TokenPayload;
  },
  registerDummy: async (dummyData, entityManager) => {
    await entityManager.getRepository(t_dummy).save(dummyData);
  },
  addRefreshToken: async (token, id, entityManager) => {
    await entityManager
      .createQueryBuilder()
      .update(t_dummy)
      .set({ refreshToken: token })
      .where({ id: id })
      .execute();
    return;
  },
  addOtp: async (email: string, otp: string, entityManager: EntityManager) => {
    await entityManager
      .getRepository(otptable)
      .upsert([{email:email,otp:otp}],['email'])
    return;
  },
  verifyOtp: async (
    email: string,
    otp: string,
    entityManager: EntityManager
  ) => {
    const time=await entityManager
      .getRepository(otptable)
      .createQueryBuilder()
      .select("createdAt , updatedAt")
      .where({ email: email })
      .andWhere({otp:otp})
      .getRawOne();
      return time ;
  },
  deleteOtp: async (email: string,
    otp: string,entityManager) => {
    await entityManager
      .getRepository(otptable)
      .createQueryBuilder()
      .delete()
      .where({ email: email })
      .andWhere({otp:otp})
      .execute();
  },
};
