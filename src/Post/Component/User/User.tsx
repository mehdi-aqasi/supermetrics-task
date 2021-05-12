import React from "react";
import { IUser } from "../../Logic/IPost";
import { UserPost } from "../../Logic/Post";
import "./User.css"


interface IUserProps extends IUser {}
interface IUserState extends IUser {}

class User extends React.Component<IUserProps, IUserState> {
  componentDidMount() {
    let user = UserPost().getUsersPostInfo(this.props.from_id, []);
    this.setState({
      from_id: this.props.from_id,
      from_name: user.from_name,
      number_of_posts: user.number_of_posts,
    });
  }

  render() {
    return (
      <>
        <div className="user">
          <p className="user-name">{this.props?.from_name} <span className="user-post-counter"> {this.props?.number_of_posts}</span></p>
        </div>
      </>
    );
  }
}

export default User;
