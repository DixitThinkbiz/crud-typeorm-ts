import  Express  from "express";
import { updateDummyUsecase } from "../../../application/use_cases/dummy/update__dummy.usecase";
export const updateUserdata = async (req : Express.Request, res : Express.Response) => {
  try {
    console.log("start")
    await updateDummyUsecase(req.body)
    console.log("end")
    res.status(201).json({message:"User Updated"});
  }
  catch (error) {
    if(error instanceof Error){
        return res.status(404).json(error.message)
    }
    res.status(500).json({ message: "Something went wrong" })
  }
};
