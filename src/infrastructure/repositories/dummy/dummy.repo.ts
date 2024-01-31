// Import necessary modules and entities
import { DummyRepositoryPort } from "../../../application/port/repositories/dummy_repo.port";
import { Dummy } from "../../../domain/models/dummy";
import { t_dummy } from "../../orm/typeorm/entities/dummy";
import { wrapTransaction } from "../../helpers/transaction";

// Implementation of DummyRepositoryPort using TypeORM
// Implementation of DummyRepositoryPort using TypeORM
export const dummuRepo: DummyRepositoryPort = {
  // Retrieve dummy data by ID
  getDummy: async (id, entityManager,email) => {
    const selectedDummy: Dummy[] = await entityManager
      .getRepository(t_dummy)
      .createQueryBuilder()
      .select("id, name, email,role, description")
      .where(id ? "id = :id" : "true", { id: id })
      .andWhere(email?{email:email}:"true")
      .getRawMany();
    // Return the selected dummy data
    return selectedDummy as Dummy[];
  },

  // Delete dummy data by ID
  deleteDummy: async (id, entityManager) => {
    await entityManager
      .getRepository(t_dummy)
      .createQueryBuilder()
      .softDelete()
      .where("id = :id", { id: id })
      .execute();
  },

  // Update dummy data
  updateDummy: async (id, dummyData, entityManager) => {
    await entityManager
      .createQueryBuilder()
      .update(t_dummy)
      .set(dummyData)
      .where("id = :id", { id: id })
      .execute();
  },

  // Add new dummy data
  addDummy: async (dummyData, entityManager) => {
    await entityManager.getRepository(t_dummy).save(dummyData);
  },

  // Check if a dummy with the specified email exists
  
  wrapTransaction,
};
