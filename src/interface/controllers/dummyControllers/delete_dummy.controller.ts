// Import necessary modules and use cases
import Express from "express";
import { deleteDummyUsecase } from "../../../application/use_cases/dummy/delete_dummy.usecase";

// Controller for deleting a dummy user
export const deleteDummyController = async (req: Express.Request, res: Express.Response) => {
  try {
    // Call the deleteDummyUsecase to handle the deletion of the dummy user
    await deleteDummyUsecase(Number(req.params.id));
    return res.sendStatus(200);
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};
