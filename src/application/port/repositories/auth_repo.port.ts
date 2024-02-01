// Import necessary domain model

import { EntityManager } from "typeorm";
import { AuthLogin, OtpTime, TokenPayload } from "../../../domain/models/auth";
import { Dummy } from "../../../domain/models/dummy";

// Port defining the contract for interacting with dummy data in the repository

export type AuthRepositoryPort = {
  // Retrieve dummy data by ID
  loginDetails(
    loginInfo: AuthLogin,
    entityManager: EntityManager
  ): Promise<TokenPayload>;
  addRefreshToken(
    token: string,
    id: number,
    entityManager: EntityManager
  ): Promise<void>;
  addOtp(
    email: string,
    otp: string,
    entityManager: EntityManager
  ): Promise<void>;

  registerDummy(
    dummyData: Dummy,
    entityManager: EntityManager
    ): Promise<void>;

  verifyOtp(
    email: string,
    otp: string,
    entityManager: EntityManager
  ): Promise<OtpTime>;
  deleteOtp (email:string, otp:string,entityManager:EntityManager):Promise<void>;
  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
};
