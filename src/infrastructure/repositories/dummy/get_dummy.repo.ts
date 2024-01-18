// Import necessary database configurations and entity
import { dummy } from "../../../domain/models/dummy";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";

// Select dummy data from the database based on the provided ID
export const selectDummy = async (id: number) => {
    // Define a condition for the query based on the presence of the ID
    const condition = id ? "id = :id" : "true";

    // Use the TypeORM query builder to select specific columns from the t_dummy table
    const selectedDummy: dummy[] = await AppDataSource
        .getRepository(t_dummy)
        .createQueryBuilder()
        .select("id, name, email, description")
        .where(condition, { id: id })
        .getRawMany();

    // Return the selected dummy data
    return selectedDummy;
}