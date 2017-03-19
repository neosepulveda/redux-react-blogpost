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
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}


function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Title cannot be empty";
  }
  if (!values.categories) {
    errors.categories = "Categories cannot be empty";
  }
  if (!values.content) {
    errors.content = "Content cannot be empty";
  }

  return errors;
}


//connect: 1st argument is mapStateToProps, 2nd argument is mapDispatchToProps
//reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);

// { createPost is the shorthand that I have not used in the bloglist smart component but I explained it there. It is a shorthand to not use mapDispatchToProps }
