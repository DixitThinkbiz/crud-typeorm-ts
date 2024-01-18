// Import necessary database configurations and entity
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";

// Check if a user with the specified email exists in the database
export const checkUserEmailExist = async (email: string) => {
    // Query the t_dummy table to find a user with the given email
    const selectedDummy = await AppDataSource
        .getRepository(t_dummy)
        .createQueryBuilder()
        .select("id")
        .where("email = :email", { email: email })
        .getRawOne();

    // Return the selected user data
    return selectedDummy;
}
