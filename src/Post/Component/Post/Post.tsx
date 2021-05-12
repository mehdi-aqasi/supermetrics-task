import React from "react";
import {IPost} from "../../Logic/IPost"
import dateFormat from "dateformat"
import "./Post.css"

interface IPostProps extends IPost{}
// interface IPostState extends IPost{}

class Post extends React.Component<IPostProps, {}> {
  render() {
    return <>
        <div>
            <p className="postHeader">
            {dateFormat(this.props.created_time, "mmmm dS, yyyy, h:MM:ss TT")}</p>
            <p className="postBody">{this.props.message}</p>
        </div>
    </>;
  }
}

export default Post;
