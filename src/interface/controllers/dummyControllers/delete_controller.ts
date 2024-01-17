import  Express  from "express";
import { addDummyUsecase } from "../../../application/use_cases/dummy/addUseCase";
import { deleteDummyUsecase } from "../../../application/use_cases/dummy/deleteUseCase";
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
