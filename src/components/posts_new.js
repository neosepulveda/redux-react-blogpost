import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { createPost } from '../actions/index';

class PostsNew extends Component {
  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    //ES6 fancy syntax equivalent to const handleSubmit = this.props.handleSubmit
    //{...title} is a shorthand that descronstructs the object title so all the properties are available to the input. It is the same as doing onChange={title.onChange}, ... but with all the properties

    return(
      <form onSubmit={handleSubmit(this.props.createPost)}>
        <h3>Create a new post</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
        </div>

        <div className="form-group">
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea className="form-control" {...content} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

//connect: 1st argument is mapStateToProps, 2nd argument is mapDispatchToProps
//reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'categories', 'content']
}, null, { createPost })(PostsNew);

// { createPost is the shorthand that I have not used in the bloglist smart component but I explained it there. It is a shorthand to not use mapDispatchToProps }
