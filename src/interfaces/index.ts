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

interface IServices {
  code: number;
  response?: any;
}

interface IEmailPassword {
  email: string,
  password: string,
}

interface IPost {
  title: string,
  content: string,
  categoryIds: number[],
}

interface IExtendsPost extends IPost {
  id?: string;
  userId: string;
}

export { IPost, UserInterface, ReqPlusUser, dbInterface, IServices, IEmailPassword, IExtendsPost }