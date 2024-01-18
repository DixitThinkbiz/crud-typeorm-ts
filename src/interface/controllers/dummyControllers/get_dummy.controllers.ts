// Import necessary modules and use case
import Express from "express";
import { getDummyUsecase } from "../../../application/use_cases/dummy/get_dummy.usecase";

// Controller for retrieving dummy user information
export const getDummyController = async (req: Express.Request, res: Express.Response) => {
  try {
    // Call the getDummyUsecase to handle retrieving dummy user information
    const selectedDummy = await getDummyUsecase(Number(req.params.id));
    return res.status(200).json(selectedDummy);
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message });
    }
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
