export type TokenPayload = {
  id: number;
  role: string;
};

export type AuthLogin = {
  email: string;
  password?: string;
};

export type OtpTime={
  createdAt:string;
  updatedAt:string ;
}