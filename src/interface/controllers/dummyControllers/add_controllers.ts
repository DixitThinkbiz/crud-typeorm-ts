import  Express  from "express";
import { addDummyUsecase } from "../../../application/use_cases/dummy/addUseCase";
export const addDummyController = async (req : Express.Request, res : Express.Response) => {
  try {
    console.log("Started"); 
    await addDummyUsecase(req.body)
    res.status(201).json({message:"User Added"});
  }
  catch (error) {
    if(error instanceof Error){
      return res.status(404).json({message:error.message})
    }
    res.status(500).json({ message: "Something went wrong" })
  }
};
