import  Express  from "express";
import { addDummyUsecase } from "../../../application/use_cases/dummy/add_dummy.usecase";
import { deleteDummyUsecase } from "../../../application/use_cases/dummy/delete_dummy.usecase";
export const deleteDummyController = async (req : Express.Request, res : Express.Response) => {
  try {
    await deleteDummyUsecase(Number(req.params.id));
    return res.sendStatus(200);
  }
  catch (error) {
    if(error instanceof Error){
      return res.status(404).json({message:error.message})
    }
    res.status(500).json({ message: "Something went wrong" })
  }
};
