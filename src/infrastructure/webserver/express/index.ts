// Import necessary modules and configurations
import express from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { userRouter } from "../../../interface/routes/dummy_routes";
import "reflect-metadata"
import swaggerUi from 'swagger-ui-express';
import { authRouter } from "../../../interface/routes/auth_routes";
const swaggerDocument = require('../../../../swagger/swagger.json');

// Load environment variables from the .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(express.json());

// Set the port for the server
const port = process.env.PORT;
// Define a basic route for testing
app.get("/", (req, res) => {
  res.send("Working");
});
// Use the defined routes from dummy_routes
app.use('/auth',authRouter)
app.use('/user', userRouter);

// Initialize the AppDataSource and start the server
AppDataSource.initialize().then(() => {
  console.log("Database connection successful");


  app.use('/user-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.listen(port, () => {

    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((e) => {
  console.log("Error initializing database connection:", e);
});
