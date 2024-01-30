// Import DataSource from TypeORM
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
// Database connection configuration
export const AppDataSource = new DataSource({
  // Database type (MySQL in this case)
  type: "mysql",
  // Database connection details
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  // Synchronize database schema with entities
  synchronize: false,
  // Enable logging for debugging
  logging: true,
  // Specify the entities (database tables) to be managed by TypeORM
  entities: ["src/infrastructure/orm/typeorm/entities/*{.ts,.js}"],
});
