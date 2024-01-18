import { checkUserEmailExist } from "../../../infrastructure/repositories/dummy/check_dummy_data_exist.repo";
import { addDummyData } from "../../../infrastructure/repositories/dummy/add_dummy.repo";
export const addDummyUsecase = async (dummyData:any) => {
    const selectedDummy:any= await checkUserEmailExist(dummyData.email);
    console.log(selectedDummy)
    if(selectedDummy.length){
        throw new Error("User Exist");
    }
    await addDummyData(dummyData);
}