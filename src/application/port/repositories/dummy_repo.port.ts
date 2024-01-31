// Import necessary domain model

import { EntityManager } from "typeorm";
import { Dummy} from "../../../domain/models/dummy";
// Port defining the contract for interacting with dummy data in the repository

export type DummyRepositoryPort = {
  // Retrieve dummy data by ID
  getDummy(id: number, entityManager: EntityManager,email?:string,): Promise<Dummy[]>;

  // Delete dummy data by ID
  deleteDummy(id: number, entityManager: EntityManager): Promise<void>;

  // Update dummy data
  updateDummy(
    id: number,
    dummyData: Dummy,
    entityManager: EntityManager
  ): Promise<void>;

  // Add new dummy data
  addDummy(dummyData: Dummy, entityManager: EntityManager): Promise<void>;


  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
};
