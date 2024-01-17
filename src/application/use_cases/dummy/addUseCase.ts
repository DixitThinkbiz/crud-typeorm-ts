import Express from "express";
import { selectDummy } from "../../../infrastructure/repositories/dummy/get-user.repo";
import { checkUserEmailExist } from "../../../infrastructure/repositories/dummy/check-user-data-exist.repo";
import { addDummyData } from "../../../infrastructure/repositories/dummy/add-user.repo";
export const addDummyUsecase = async (dummyData:any) => {
    const selectedDummy:any= await checkUserEmailExist(dummyData.email);
    console.log(selectedDummy)
    if(selectedDummy.length){
        throw new Error("User Exist");
    }
    await addDummyData(dummyData);
}