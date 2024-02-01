export type Dummy = {
  id: number;
  name: string;
  email: string;
  otp?:string;
  role?:UserRoleType;
  description?: string;
};


export type UserRoleType = "admin" | "user";
