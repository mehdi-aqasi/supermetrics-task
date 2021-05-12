import React from "react";
import Post from "./Post";
import { IPosts } from "../../Logic/IPost";

interface IPostProps extends IPosts {}

class PostList extends React.Component<IPostProps, {}> {
  render() {
    return (
      <>
        {this.props.posts &&
          this.props.posts.map((post) => (
            <Post
              key={post.id}
              message={post.message}
              created_time={post.created_time}
            />
          ))}
      </>
    );
  }
}

export default PostList;
