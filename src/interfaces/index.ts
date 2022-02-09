import { Request } from "express";

interface UserInterface {
  displayName: string;
  email: string;
  password: string;
  image?: string;
}

interface ReqPlusUser extends Request {
  user: {
    id: string,
    email: string,
  }
}

export { UserInterface, ReqPlusUser }