import jwt from "jsonwebtoken";

export declare type User = {
  id: number;
  email: string;
  login: string;
  token?: string;
};
