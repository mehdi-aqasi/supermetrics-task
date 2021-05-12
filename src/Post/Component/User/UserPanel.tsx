import React, { ChangeEvent } from "react";
import {
  IPosts,
  IPostsSearch,
  IUsers,
  IPost,
  IUser,
} from "../../Logic/IPost";
import { UserPost } from "../../Logic/Post";
import UserList from "./UserList";
import UserSearch from "./UserSearch";
import "./UserPanel.css"

interface IUserPanelProps extends IPosts, IUsers {
  onChangeStatePost: (posts: Array<IPost>,partOfPost:string) => void;
  onChangeStateUsers: (posts: Array<IUser>,partOfUser:string) => void;
}
interface IUserPanelState extends IPosts, IPostsSearch {}

class UserPanel extends React.Component<IUserPanelProps, IUserPanelState> {
  constructor(props: IUserPanelProps) {
    super(props);
    this.state = { posts: props.posts };
    this.onChangeUserSearch = this.onChangeUserSearch.bind(this);
  }

  async componentDidMount() {
    // let users = await UserPost().getUsersIDs(this.props);
    // if (users)
    this.setState({
      page: this.props.page,
      posts: this.props.posts,
      partOfUser: "",
    });
  }

  async onChangeUserSearch({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, partOfUser: value});
    let _users = await UserPost().getUsersSearch(value);
    // this.setState({ ...this.state, partOfUser: value, posts: _post });
    this.props.onChangeStateUsers(_users,value);

    
  }

  render() {
    return (
      <div className="user-panel">
        <UserSearch
          onChange={this.onChangeUserSearch}
          userText={this.state.partOfUser}
        />
        {this.props.users && <UserList users={this.props.users} />}
      </div>
    );
  }
}

export default UserPanel;
