// Import necessary modules and entities
import { DummyRepositoryPort } from "../../../application/port/repositories/dummy_repo.port";
import { Dummy } from "../../../domain/models/dummy";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";

// Implementation of DummyRepositoryPort using TypeORM
export const DummyRepo: DummyRepositoryPort = {
    // Retrieve dummy data by ID
    getDummy: async (id) => {
        const selectedDummy: Dummy[] = await AppDataSource
            .getRepository(t_dummy)
            .createQueryBuilder()
            .select("id, name, email, description")
            .where(id ? "id = :id" : "true", { id: id })
            .getRawMany();
        // Return the selected dummy data
        return selectedDummy as Dummy[];
    },

    // Delete dummy data by ID
    deleteDummy: async (id) => {
        await AppDataSource
            .getRepository(t_dummy)
            .createQueryBuilder()
            .softDelete()
            .where("id = :id", { id: id })
            .execute();
    },

    // Update dummy data
    updateDummy: async (dummyData) => {
        await AppDataSource
            .createQueryBuilder()
            .update(t_dummy)
            .set(dummyData)
            .where("id = :id", { id: dummyData.id })
            .execute();
    },

    // Add new dummy data
    addDummy: async (dummyData) => {
        await AppDataSource
            .getRepository(t_dummy)
            .save(dummyData);
    },

    // Check if a dummy with the specified email exists
    checkDummyEmailExist: async (email) => {
        // Query the t_dummy table to find a user with the given email
        const selectedDummy = await AppDataSource
            .getRepository(t_dummy)
            .createQueryBuilder()
            .select("id")
            .where("email = :email", { email: email })
            .getRawOne();

        // Return the selected user data
        return selectedDummy as Dummy;
    }
};
