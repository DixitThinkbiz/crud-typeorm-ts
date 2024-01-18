// Import necessary modules and database configurations
import { log } from "console";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";

// Soft delete dummy data from the database
export const deleteDummyData = async (id: number) => {
    // Use the TypeORM query builder to soft delete the entry with the specified ID
    await AppDataSource
        .getRepository(t_dummy)
        .createQueryBuilder()
        .softDelete()
        .where("id = :id", { id: id })
        .execute();
}