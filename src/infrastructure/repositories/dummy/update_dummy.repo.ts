import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";

export const updateDummyData = async (dummyData:any) => {
    await AppDataSource
    .createQueryBuilder()
    .update(t_dummy)
    .set(dummyData)
    .where("id = :id", { id: dummyData.id })
    .execute()
}
