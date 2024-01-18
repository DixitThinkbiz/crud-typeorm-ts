// Import necessary modules and use case
import Express,{Request,Response}  from "express";
import { getDummyUsecase } from "../../../application/use_cases/dummy/get_dummy.usecase";
import { DummyRepo } from "../../../infrastructure/repositories/dummy/dummy.repo";

// Controller for retrieving dummy user information
export const getDummyController = async (req: Request, res: Response) => {
  try {
    // Call the getDummyUsecase to handle retrieving dummy user information
    const selectedDummy = await getDummyUsecase(DummyRepo,Number(req.params.id));
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
