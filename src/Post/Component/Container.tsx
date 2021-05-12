import React from "react";
import { IPosts, IPostsSearch, IPost, IUsers, IUser } from "../Logic/IPost";
import { UserPost } from "../Logic/Post";
import { createAuthentication } from "../../Security/Logic/Auth/Auth";
import PostPanel from "./Post/PostPanel";
import UserPanel from "./User/UserPanel";
import "./Container.css";

interface IContainerProps extends IPosts {}
interface IContainerState extends IPosts, IPostsSearch, IUsers {}

class Container extends React.Component<IContainerProps, IContainerState> {
  constructor(props: IContainerProps) {
    super(props);
    this.state = { posts: [] };
  }

  async componentDidMount() {
    let authenticationInfo = await createAuthentication().authUser();
    if (authenticationInfo) {
      let _post = await UserPost().getAllPosts(authenticationInfo, parseInt(process.env.REACT_APP_POST_PAGES!));
      let _users = await UserPost().getUsers();

      if (_post)
        this.setState({
          page: _post.page,
          posts: _post.posts,
          partOfPost: "",
          partOfUser: "",
          users: _users,
        });
    }
  }

  changeState(newPost: Array<IPost>) {
    this.setState({
      ...this.state,
      posts: newPost,
    });
  }

  async changeStateProps(newPost: Array<IPost>, partOfPost: string) {
    let _post = await UserPost().getUsersPostSearch(
      this.state.partOfUser,
      partOfPost
    );
    let _users = await UserPost().getUsers(_post);

    // this.setState({ ...this.state, partOfPost: value, posts: _post });

    this.setState({
      ...this.state,
      posts: _post,
      users: _users,
      partOfPost: partOfPost,
    });
    // }
  }

  async changeStateUsers(newUsers: Array<IUser>, partOfName: string) {
    let _post = await UserPost().getUsersPostSearch(
      partOfName,
      this.state.partOfPost
    );

    this.setState({
      ...this.state,
      posts: _post,
      users: newUsers,
      partOfUser: partOfName,
    });
  }

  render() {
    return (
      <>
        {this.state.posts && (
          <>
            <div className="container-left">
              <UserPanel
                users={this.state.users}
                posts={this.state.posts}
                onChangeStateUsers={(newUsers, partOfUser) =>
                  this.changeStateUsers(newUsers, partOfUser)
                }
                onChangeStatePost={(newPost, partOfPost) =>
                  this.changeStateProps(newPost, partOfPost)
                }
              />
            </div>
            <div className="container-right">
              <PostPanel
                posts={this.state.posts}
                onChangeState={(newPost) => this.changeState(newPost)}
                onChangeStatePost={(newPost, partOfPost) =>
                  this.changeStateProps(newPost, partOfPost)
                }
                users={this.state.users}
              ></PostPanel>
            </div>

            {/* // onChangeState={(newPost) => this.changeState(newPost)} */}
          </>
        )}
        {!this.state.posts && <div>Loading</div>}
      </>
    );
  }
}

export default Container;
