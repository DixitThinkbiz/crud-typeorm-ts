// Import necessary database configurations and entity
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";

// Add dummy data to the database
export const addDummyData = async (userData: any) => {
    // Save the provided user data to the t_dummy table
    await AppDataSource
        .getRepository(t_dummy)
        .save(userData);
}
