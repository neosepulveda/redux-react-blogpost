import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';

import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return(
        <li className="list-group-item" key={post.id}>
          <span className="pull-xs-right">{post.categories}</span>
          <strong>{post.title}</strong>
        </li>
      );
    });
  }

  render() {
    return(
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
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

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, mapDispatchToProps) (PostsIndex);
