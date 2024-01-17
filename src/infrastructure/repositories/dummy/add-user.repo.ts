import { pool } from "../../../../../crud-sql/src/repository/index";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/task";
export const addDummyData = async (userData : any) => {
    await AppDataSource
        .getRepository(t_dummy)
        .save(userData);
}


