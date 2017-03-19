import React, { Component } from 'react';

class PostsIndex extends Component {
  componentWillMount() {
    console.log("This would be agood time to fetch the blog posts");
  }

  render() {
    return(
      <div>List of blog posts!</div>
    );
  }
}

export default PostsIndex;
