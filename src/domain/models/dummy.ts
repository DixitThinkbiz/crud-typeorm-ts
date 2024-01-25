import { Request } from "express";

export type Dummy ={
    id : number;
    name : string; 
    email : string;
    description? : string;
}
 export type AuthLogin={
    id?: number;
    email:string;
    password:string;
 }
 export interface CustomRequest extends Request  {
    locals?: {
        id?:number;
    };
  }