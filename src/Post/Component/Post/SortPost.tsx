import React from "react";
import "./SortPost.css"

interface IPostProps {
  onSortAscChange: () => void;
  onSortDescChange: () => void;
}

class SortPost extends React.Component<IPostProps, {}> {
  render() {
    return (
      <>
        <span className="sort-body">
          <button onClick={this.props.onSortAscChange} className="button-sort sort-up"></button>
          <button onClick={this.props.onSortDescChange} className="button-sort sort-down"></button>
        </span>
      </>
    );
  }
}

export default SortPost;
