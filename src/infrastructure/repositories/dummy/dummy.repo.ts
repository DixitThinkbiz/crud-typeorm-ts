// Import necessary database configurations and entity
import { DummyRepositoryPort } from "../../../application/port/repositories/dummy_reop.port";
import { Dummy } from "../../../domain/models/dummy";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";

// Select dummy data from the database based on the provided ID


export const DummyRepo: DummyRepositoryPort = {
    getDummy: async (id) => {
        // Define a condition for the query based on the presence of the ID 
        // Use the TypeORM query builder to select specific columns from the t_dummy table
        const selectedDummy: Dummy[] = await AppDataSource
            .getRepository(t_dummy)
            .createQueryBuilder()
            .select("id, name, email, description")
            .where(id ? "id = :id" : "true", { id: id },)
            .getRawMany();
        // Return the selected dummy data

        return selectedDummy as Dummy[];
        // return selectedDummy;
    },
    deleteDummy: async (id) => {
        // Define a condition for the query based on the presence of the ID 
        // Use the TypeORM query builder to select specific columns from the t_dummy table
        await AppDataSource
            .getRepository(t_dummy)
            .createQueryBuilder()
            .softDelete()
            .where("id = :id", { id: id })
            .execute();
    },
    updateDummy: async (dummyData) => {
        await AppDataSource
            .createQueryBuilder()
            .update(t_dummy)
            .set(dummyData)
            .where("id = :id", { id: dummyData.id })
            .execute();
    },
    addDummy: async (dummyData) => {
        await AppDataSource
            .getRepository(t_dummy)
            .save(dummyData);
    },
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
}