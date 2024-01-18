// Import DataSource from TypeORM
import { DataSource } from 'typeorm';
// Database connection configuration
export const AppDataSource = new DataSource({
    // Database type (MySQL in this case)
    type: "mysql",
    // Database connection details
    host: "localhost",
    username: "root",
    password: "Log(e)=1",
    database: "crud_test",
    // Synchronize database schema with entities
    synchronize: true,
    // Enable logging for debugging
    logging: true,
    // Specify the entities (database tables) to be managed by TypeORM
    entities: ["src/infrastructure/orm/typeorm/entities/*{.ts,.js}"]
});
