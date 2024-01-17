import {DataSource} from 'typeorm'
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "Log(e)=1",
    database: "crud_test",
    synchronize: true,
    logging: true,
    entities: ["src/infrastructure/orm/typeorm/entities/*{.ts,.js}"]
})