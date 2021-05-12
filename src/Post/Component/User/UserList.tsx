import React from "react";
import User from "./User";
import { IUsers } from "../../Logic/IPost";

interface IUserProps extends IUsers {}

class UserList extends React.Component<IUserProps, {}> {
  render() {
    return (
      <>
        {this.props.users &&
          this.props.users.map((user) => (
            <User
              key={user.from_id}
              from_id={user.from_id}
              from_name={user.from_name}
              number_of_posts={user.number_of_posts}
            />
          ))}
      </>
    );
  }
}

export default UserList;
