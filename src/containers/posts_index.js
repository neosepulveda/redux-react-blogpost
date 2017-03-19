import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return(
      <div>List of blog posts!</div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}
//We could not use the mapDispatchToProps method and directly do
//export default connect(null, { fetchPosts: fetchPosts })(PostsIndex)
//which a short hand of the mapDispatchToProps boilerplate
//Also because { fetchPosts: fetchPosts }, the key and the method have the same name we could do { fetchPosts } ES6 fancy sintax

export default connect(null, mapDispatchToProps) (PostsIndex);
