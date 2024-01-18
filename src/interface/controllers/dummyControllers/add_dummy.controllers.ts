// Import necessary modules and use case
import Express,{Request,Response} from "express";
import { addDummyUsecase } from "../../../application/use_cases/dummy/add_dummy.usecase";
import { Dummy } from "../../../domain/models/dummy";
import { DummyRepo } from "../../../infrastructure/repositories/dummy/dummy.repo";

// Controller for adding a dummy user
export const addDummyController = async (req: Request, res: Response) => {
  try {
    // Call the addDummyUsecase to handle adding the dummy user
    const dummyData: Dummy=req.body;
    await addDummyUsecase(DummyRepo,dummyData);
    res.status(201).json({ message: "User Added" });
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};
