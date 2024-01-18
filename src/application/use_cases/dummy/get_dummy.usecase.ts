import { selectDummy } from "../../../infrastructure/repositories/dummy/get_dummy.repo";
export const getDummyUsecase = async (id: number) => {
    const selectedDummy :any= await selectDummy(id)
    if(id){
      if(selectedDummy.length){
        return selectedDummy;
      }else{
        throw new Error("User not exist");
      }
    }
    else{
      if(selectedDummy.length){
        return selectedDummy;
      }else{
        throw new Error("Table is empty");
      }

    }
    
    
}