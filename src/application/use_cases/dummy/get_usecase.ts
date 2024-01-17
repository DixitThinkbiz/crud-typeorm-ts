import Express from "express";
import { selectDummy } from "../../../infrastructure/repositories/dummy/get-user.repo";
export const getDummyUsecase = async (id: number) => {
    const selectedDummy :any= await selectDummy(id)
    if(selectedDummy.length){
      return selectedDummy;
    }else{
      throw new Error("not exist");
    }
    
}