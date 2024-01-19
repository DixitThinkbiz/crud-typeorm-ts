// Import necessary domain model
import { Dummy } from "../../../domain/models/dummy";
// Port defining the contract for interacting with dummy data in the repository
export type DummyRepositoryPort = {
  // Retrieve dummy data by ID
  getDummy(id: number): Promise<Dummy[]>;

  // Delete dummy data by ID
  deleteDummy(id: number): Promise<void>;

  // Update dummy data
  updateDummy(dummyData: Dummy): Promise<void>;

  // Add new dummy data
  addDummy(dummyData: Dummy): Promise<void>;

  // Check if a dummy with the specified email exists
  checkDummyEmailExist(email: string): Promise<Dummy>;
};
