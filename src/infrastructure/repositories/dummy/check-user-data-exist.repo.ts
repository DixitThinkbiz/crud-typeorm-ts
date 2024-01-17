import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { t_dummy } from "../../orm/typeorm/entities/task";

export const checkUserEmailExist = async (email :string) => {
    const selectedDummy =await AppDataSource
    .getRepository(t_dummy)
    .createQueryBuilder()
    .select("id").
    where("email = :email", { email : email })
    .getRawMany();
    console.log("check"+selectedDummy)
    return selectedDummy;
}

