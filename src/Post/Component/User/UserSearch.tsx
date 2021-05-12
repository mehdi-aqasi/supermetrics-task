import React, { ChangeEvent } from "react";
import "./UserSearch.css";

interface IPostProps {
  userText?: string;
  onChange: ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => void;
}

class UserSearch extends React.Component<IPostProps, {}> {
  render() {
    return (
      <>
        <div>
          <input
            className="user-search"
            placeholder="Search users ..."
            value={this.props.userText || ""}
            onChange={this.props.onChange}
          ></input>
        </div>
      </>
    );
  }
}

export default UserSearch;
