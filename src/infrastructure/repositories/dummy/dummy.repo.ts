// Import necessary modules and entities
import { DummyRepositoryPort } from "../../../application/port/repositories/dummy_repo.port";
import { Dummy, AuthLogin } from "../../../domain/models/dummy";
import { t_dummy } from "../../orm/typeorm/entities/dummy";
import { wrapTransaction } from "../../helpers/transaction";

// Implementation of DummyRepositoryPort using TypeORM
// Implementation of DummyRepositoryPort using TypeORM
export const DummyRepo: DummyRepositoryPort = {
    // Retrieve dummy data by ID
    getDummy: async (id, entityManager) => {
        const selectedDummy: Dummy[] = await entityManager
            .getRepository(t_dummy)
            .createQueryBuilder()
            .select("id, name, email, description")
            .where(id ? "id = :id" : "true", { id: id })
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
    updateDummy: async (id,dummyData, entityManager) => {
        await entityManager
            .createQueryBuilder()
            .update(t_dummy)
            .set(dummyData)
            .where("id = :id", { id: id})
            .execute();
    },

    // Add new dummy data
    addDummy: async (dummyData, entityManager) => {
        await entityManager
            .getRepository(t_dummy)
            .save(dummyData);
    },

    // Check if a dummy with the specified email exists
    checkDummyEmailExist: async (email, entityManager) => {
        // Query the t_dummy table to find a user with the given email
        const selectedDummy = await entityManager
            .getRepository(t_dummy)
            .createQueryBuilder()
            .select("id,email,password,role")
            .where({ email: email })
            .getRawOne();

        // Return the selected user data
        return selectedDummy as AuthLogin;
    },
    wrapTransaction
    
};
