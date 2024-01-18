import { checkUserEmailExist } from "../../../infrastructure/repositories/dummy/check_dummy_data_exist.repo";
import { updateDummyData } from "../../../infrastructure/repositories/dummy/update_dummy.repo";
import { selectDummy } from "../../../infrastructure/repositories/dummy/get_dummy.repo";
export const updateDummyUsecase = async (dummyData: any) => {
    const checkDummyExist = await selectDummy(dummyData.id);
    console.log("dummy id"+dummyData.id);
    
    if (checkDummyExist.length) {
        const selectedDummy: any = await checkUserEmailExist(dummyData.email);
        console.log(selectedDummy.id)
        if (selectedDummy.length && selectedDummy.id != dummyData.id) {
            throw new Error("User with data Exist");
        }
        await updateDummyData(dummyData);
    }
    else{
        throw new Error("User not Exist");
    }
}