import { Dummy } from "../../../domain/models/dummy"


export type DummyRepositoryPort={
    getDummy(id:number):Promise<Dummy[]>;
    deleteDummy(id:number):Promise<void>;
    updateDummy(dummyData: Dummy):Promise<void>;
    addDummy(dummyData: Dummy):Promise<void>;
    checkDummyEmailExist(email:string):Promise<Dummy>;
}

// export type deleteDummyRepositoryPort={
//     deleteDummy(id:number):Promise<void>;  
// }

// export type updateDummyRepositoryPort={
//     updateDummy():Promise<void>
// }