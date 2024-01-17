import { log } from "console";
import { deleteDummyData } from "../../../infrastructure/repositories/dummy/delete-user.repo";
import { selectDummy } from "../../../infrastructure/repositories/dummy/get-user.repo";
import { start } from "repl";

export const deleteDummyUsecase = async (id:number) => {
    const selectedUser = await selectDummy(id);
    if (selectedUser.length) {  
      await deleteDummyData(id);
    }
    else{
        throw new Error("User Not Exist")
    }
}