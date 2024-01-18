// Import necessary modules and use case
import Express from "express";
import { addDummyUsecase } from "../../../application/use_cases/dummy/add_dummy.usecase";

// Controller for adding a dummy user
export const addDummyController = async (req: Express.Request, res: Express.Response) => {
  try {
    // Call the addDummyUsecase to handle adding the dummy user
    await addDummyUsecase(req.body);
    res.status(201).json({ message: "User Added" });
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};
