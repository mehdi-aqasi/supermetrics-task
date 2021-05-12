import { IPostCaller, IPosts } from "./IPost";

export const getSPost = async (
  sl_token: IPostCaller["sl_token"],
  page: IPostCaller["page"]
): Promise<IPosts | null> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}${process.env.REACT_APP_POST_GET}?sl_token=${sl_token}&page=${page}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    if (!result || !result.data || !result.data.posts) {
      console.log("There is no valid result or posts in result");
      return null;
    } else {
      let data : IPosts = result.data;
      return data;
    }
  } catch (error) {
    return null;
  }
};
