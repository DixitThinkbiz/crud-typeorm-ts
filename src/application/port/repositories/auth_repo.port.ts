// Import necessary domain model

import { EntityManager } from "typeorm";
import { AuthLogin, TokenPayload } from "../../../domain/models/auth";

// Port defining the contract for interacting with dummy data in the repository

export type AuthRepositoryPort = {
  // Retrieve dummy data by ID
  loginDetails(
    loginInfo:AuthLogin,
    entityManager: EntityManager
  ): Promise<TokenPayload>;
  addRefreshToken(token:string,id:number,entityManager:EntityManager):Promise<void>;
  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
};
