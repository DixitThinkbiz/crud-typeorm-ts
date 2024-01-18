import { deleteDummyData } from "../../../infrastructure/repositories/dummy/delete_dummy.repo";
import { selectDummy } from "../../../infrastructure/repositories/dummy/get_dummy.repo";

export const deleteDummyUsecase = async (id:number) => {
    const selectedUser = await selectDummy(id);
    if (selectedUser.length) {  
      await deleteDummyData(id);
    }
    else{
        throw new Error("User Not Exist")
    }
}