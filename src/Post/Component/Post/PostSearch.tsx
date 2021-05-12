import React, { ChangeEvent } from "react";
import "./PostSearch.css";

interface IPostProps {
  postText?: string;
  onChange: ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => void;
}

class PostSearch extends React.Component<IPostProps, {}> {
  render() {
    return (
      <>
        <span className="search-body">
          <input
            className="post-search"
            placeholder="Search post ..."
            value={this.props.postText || ""}
            onChange={this.props.onChange}
          ></input>
        </span>
      </>
    );
  }
}

export default PostSearch;
