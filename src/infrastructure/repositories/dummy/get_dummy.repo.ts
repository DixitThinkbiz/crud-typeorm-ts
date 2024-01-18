import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/dummy";


export const selectDummy = async (id: number) => {
    var condition = "id = :id"

    const selectedDummy = await AppDataSource
        .getRepository(t_dummy)
        .createQueryBuilder()
        .select("id , name , email , description")
        .where(id ? condition : 'true', { id: id })
        .getRawMany();
        
    return selectedDummy;
}


