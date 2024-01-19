// Import necessary modules and use cases
import Express, { Request, Response } from "express";
import { deleteDummyUsecase } from "../../../application/use_cases/dummy/delete_dummy.usecase";
import { DummyRepo } from "../../../infrastructure/repositories/dummy/dummy.repo";
import { constants } from "../../../infrastructure/config/constant";

// Controller for deleting a dummy user
export const deleteDummyController = async (req: Request, res: Response) => {
  try {
    // Call the deleteDummyUsecase to handle the deletion of the dummy user
    await deleteDummyUsecase(DummyRepo, Number(req.params.id));
    return res.sendStatus(200);
  } catch (error) {
    // Handle errors, return appropriate status codes and messages
    if (error instanceof Error) {
      if (error.message == "USER_NOT_FOUND")
        return res.status(constants.response.USER_NOT_FOUND.status).
          json(constants.response.USER_NOT_FOUND);
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};
