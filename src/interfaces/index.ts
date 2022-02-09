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

interface dbInterface {
  Categories: () => any;
  PostsCategories: () => any;
  Users: () => any;
  BlogPosts: () => any;
}

export { UserInterface, ReqPlusUser, dbInterface }