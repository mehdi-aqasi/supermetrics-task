import { IClientToken } from "../../Security/Logic/Token/IToken";

export interface IUserPost {
  getAllPosts(
    sl_token: IPostCaller["sl_token"],
    page: IPostCaller["page"]
  ): Promise<IPosts | null>;
  sortPosts(posts: Array<IPost>, sortType: ESortType): Array<IPost> | [];
  getUsersPostSearch(
    partOfName?: string,
    partOfPost?: string
  ): Array<IPost> | [];
  getUsersPostInfo(user: IUser["from_id"], posts: Array<IPost>): IUser;
  getUsersIDs(post?: Array<IPost>): Array<string>;
  getUsers(posts?: Array<IPost>): Array<IUser>;
  getUsersSearch(partOfName?: string): Array<IUser> | [];
  getNumberOfUsersPost(user: string, posts: Array<IPost>): number;
}

export interface IUser {
  from_id?: string;
  from_name?: string;
  number_of_posts?: number;
}

export interface IUsers {
  users?: Array<IUser>;
}

export interface IUser {
  from_id?: string;
  from_name?: string;
  number_of_posts?: number;
}

export interface IUsersIDs {
  users?: Array<string>;
}

export interface IPostCaller extends IPosts, IClientToken {}

export interface IPost {
  id?: string;
  from_name?: string;
  from_id?: string;
  message?: string;
  type?: string;
  created_time: Date | string;
}

export interface IPosts {
  page?: number;
  posts?: Array<IPost>;
}

export interface IPostsSearch {
  partOfPost?: string;
  partOfUser?: string;
}

export enum ESortType {
  newestToOldest,
  oldestToNewest,
}
