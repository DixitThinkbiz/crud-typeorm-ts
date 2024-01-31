// Import necessary modules and entities

import { wrapTransaction } from "../../helpers/transaction";
import { AuthRepositoryPort } from "../../../application/port/repositories/auth_repo.port";
import { EntityManager } from "typeorm";
import { t_dummy } from "../../orm/typeorm/entities/dummy";
import { AuthLogin, TokenPayload } from "../../../domain/models/auth";

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
      .andWhere(loginInfo.password ?{ password: loginInfo.password }:"true")
      .getRawOne();

    // Return the selected user data
    return selectedDummy as TokenPayload;
  },
  addDummy: async (dummyData, entityManager) => {
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
};
