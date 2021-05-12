import React, { ChangeEvent } from "react";
import {
  IPosts,
  IPostsSearch,
  ESortType,
  IPost,
  IUsers,
} from "../../Logic/IPost";
import { UserPost } from "../../Logic/Post";
import PostSearch from "./PostSearch";
import PostList from "./PostList";
import SortPost from "./SortPost";
import "./PostPanel.css";

interface IPostPanelProps extends IPosts, IUsers {
  onChangeState: (posts: Array<IPost>) => void;
  onChangeStatePost: (posts: Array<IPost>, partOfPost: string) => void;
}
interface IPostPanelState extends IPosts, IPostsSearch {}

class PostPanel extends React.Component<IPostPanelProps, IPostPanelState> {
  constructor(props: IPostPanelProps) {
    super(props);
    this.state = { posts: props.posts };
    this.onChangePostSearch = this.onChangePostSearch.bind(this);
    this.onSortAsc = this.onSortAsc.bind(this);
    this.onSortDesc = this.onSortDesc.bind(this);
  }

  componentDidMount() {
    this.setState({
      page: this.props.page,
      posts: this.props.posts,
      partOfPost: "",
    });
  }

  async onChangePostSearch({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) {
    // let state = { ...this.props };
    // if (state.posts) {
    //   let _post = await UserPost().getUsersPostSearch("", value);
    // this.setState({ ...this.state, partOfPost: value, posts: _post });
    this.setState({ ...this.state, partOfPost: value });
    this.props.onChangeStatePost([], value);
    // }
  }

  async onSortAsc() {
    let state = { ...this.props };

    if (state.posts) {
      let _post = await UserPost().sortPosts(
        state.posts,
        ESortType.newestToOldest
      );
      this.setState({ ...this.props, posts: _post });
      this.props.onChangeState(_post);
    }
  }

  async onSortDesc() {
    let state = { ...this.props };

    if (state.posts) {
      let _post = await UserPost().sortPosts(
        state.posts,
        ESortType.oldestToNewest
      );
      this.setState({ ...this.props, posts: _post });
      this.props.onChangeState(_post);
    }
  }

  render() {
    return (
      <>
        <div className="post-panel">
          <div className="post-panel-header">
            <SortPost
              onSortAscChange={this.onSortAsc}
              onSortDescChange={this.onSortDesc}
            />
            <PostSearch
              onChange={this.onChangePostSearch}
              postText={this.state.partOfPost}
            />
          </div>
          <div className="post-panel-body">
            <PostList posts={this.props.posts} />
          </div>
        </div>
      </>
    );
  }
}

export default PostPanel;
