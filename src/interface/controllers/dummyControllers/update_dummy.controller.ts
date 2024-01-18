// Import necessary modules and use case
import Express from "express";
import { updateDummyUsecase } from "../../../application/use_cases/dummy/update__dummy.usecase";
import { dummy } from "../../../domain/models/dummy";

// Controller for updating dummy user data
export const updateUserdata = async (req: Express.Request, res: Express.Response) => {
  try {
    // Call the updateDummyUsecase to handle updating dummy user data
    const dummyData: dummy=req.body;
    await updateDummyUsecase(dummyData);
    // Respond with a success message
    res.status(201).json({ message: "User Updated" });
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};
