// Import necessary database configurations and entity
import { dummy } from "../../../domain/models/dummy";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";

// Update dummy data in the database based on the provided information
export const updateDummyData = async (dummyData: dummy) => {
    // Use the TypeORM query builder to update the t_dummy table
    await AppDataSource
        .createQueryBuilder()
        .update(t_dummy)
        .set(dummyData)
        .where("id = :id", { id: dummyData.id })
        .execute();
        
}
