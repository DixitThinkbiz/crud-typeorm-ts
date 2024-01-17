import { pool } from "../../../../../crud-sql/src/repository/index";

export const updateUserData = async (updatedUserData : any, id :number) => {
    await pool.query(`update user set ? where id= ?`, [updatedUserData, id]);
}
