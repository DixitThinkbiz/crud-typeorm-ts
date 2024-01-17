import { log } from "console";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/task";


export const deleteDummyData = async (id: number) => {
    await AppDataSource
        .getRepository(t_dummy)
        .createQueryBuilder()
        .softDelete()
        .where("id = :id", { id: id })
        .execute();
}

