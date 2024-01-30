import { EntityManager } from "typeorm/entity-manager/EntityManager"
import { AppDataSource } from "../orm/typeorm/config/ormconfig"

export const wrapTransaction=async<T>(fun:(t:EntityManager)=>Promise<T>):Promise<T>=>{
    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        return fun(transactionalEntityManager)
    })
}