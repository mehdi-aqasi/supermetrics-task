import { getSPost } from "./SPost";
import {
  IPost,
  IPosts,
  IPostCaller,
  IUserPost,
  ESortType,
  IUser,
} from "./IPost";

let _posts: IPosts = {
  page: 0,
  posts: [],
};

let _users: Array<IUser>;

export const UserPost = (): IUserPost => {
  return {
    getAllPosts,
    sortPosts,
    getUsersPostSearch,
    getUsersPostInfo,
    getUsersIDs,
    getUsers,
    getUsersSearch,
    getNumberOfUsersPost
  };
};

const getAllPosts = async (
  sl_token: IPostCaller["sl_token"],
  page: IPostCaller["page"]
): Promise<IPosts | null> => {
  let result: IPosts | null = await getSPost(sl_token, page);
  if (result) {
    _posts = result;
    _users = getUsers();
    return _posts;
  } else {
    return null;
  }
};

const oldestToNewest = (a: IPost, b: IPost): number => {
  let date_a = new Date(a.created_time).getTime();
  let date_b = new Date(b.created_time).getTime();

  return date_a - date_b;
};

const newestToOldest = (a: IPost, b: IPost): number => {
  let date_a = new Date(a.created_time).getTime();
  let date_b = new Date(b.created_time).getTime();

  return date_b - date_a;
};

const sortPosts = (
  posts: Array<IPost>,
  sortType: ESortType
): Array<IPost> | [] => {
  let result: Array<IPost> | undefined = [];
  if (sortType === ESortType.newestToOldest) {
    result = posts?.sort(newestToOldest);
  } else if (sortType === ESortType.oldestToNewest) {
    result = posts?.sort(oldestToNewest);
  }
  if (result) return result;
  return [];
};

const getUsersPostSearch = (
  partOfName?: string,
  partOfPost?: string
): Array<IPost> | [] => {
  let result: Array<IPost> | undefined = [];
  if (partOfName && partOfPost) {
    result = _posts.posts?.filter(
      (p: IPost) =>
        p.from_name &&
        p.message &&
        p.from_name.toLowerCase().includes(partOfName.toLowerCase()) &&
        p.message.toLowerCase().includes(partOfPost.toLowerCase())
    );
  } else if (partOfName && !partOfPost) {
    result = _posts.posts?.filter(
      (p: IPost) =>
        p.from_name &&
        p.from_name.toLowerCase().includes(partOfName.toLowerCase())
    );
  } else if (!partOfName && partOfPost) {
    result = _posts.posts?.filter(
      (p: IPost) =>
        p.message && p.message.toLowerCase().includes(partOfPost.toLowerCase())
    );
  } else {
    result = _posts.posts;
  }

  if (result) return result;
  return [];
};

const getUsersSearch = (partOfName?: string): Array<IUser> | [] => {
  let result: Array<IUser> | undefined = [];
  if (partOfName) {
    result = _users?.filter((user) =>
      user.from_name?.toLowerCase()?.includes(partOfName.toLowerCase())
    );
  } else {
    result = _users;
  }

  if (result) return result;
  return [];
};

const getUsersPostInfo = (
  user: IUser["from_id"],
  posts: Array<IPost>
): IUser => {
  let _user: IUser = {};
  _user.number_of_posts = _posts.posts?.filter(
    (p: IPost) => p.from_id === user
  ).length;
  _user.from_name = _posts.posts?.find(
    (p: IPost) => p.from_id === user
  )?.from_name;
  return _user;
};

const getUsersIDs = (post?: Array<IPost>): Array<string> | [] => {
  let result: Array<string> = [];
  let postsList: Array<IPost>;
  if (!post) postsList = [ ..._posts.posts! ];
  else postsList = [...post]  ;

  result =
    postsList.map((post) => post.from_id!)
      .filter((value, index, self) => self.indexOf(value) === index) || [];

  return result;
};

const getUsers = (post?: Array<IPost>): Array<IUser> | [] => {
  let Users: Array<IUser> = [];
  let user: IUser = {};
  let IDs = getUsersIDs(post);

  let __post = post ? [...post] : [..._posts.posts!];

  IDs.forEach((id) => {
    user = {
      from_id: id,
      from_name: __post?.find((p: IPost) => p.from_id === id)?.from_name,
      number_of_posts: __post?.filter((p: IPost) => p.from_id === id)
        .length,
    };

    Users.push(user);
  });

  return Users;
};

const getNumberOfUsersPost = (
  user: IUser["from_id"],
  posts: Array<IPost>
): number => {
  let result = 0;
  result = posts.filter((p: IPost) => p.from_id === user).length;
  return result;
};