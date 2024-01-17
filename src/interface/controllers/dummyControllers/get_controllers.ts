
import  Express  from "express";
import { getDummyUsecase } from "../../../application/use_cases/dummy/get_usecase";
export const getDummyController = async (req : Express.Request, res: Express.Response) => {
  try {
    const selectedDummy=await getDummyUsecase(Number(req.params.id));
    return res.status(200).json(selectedDummy)
  }
  catch (error ) {
    if(error instanceof Error){
        return res.status(404).json({message:"User not found"})
    }
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}