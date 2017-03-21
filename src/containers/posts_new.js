import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { createPost } from '../actions/index';

const FIELDS = {
  title: {
    type: "input",
    label: "Title for post"
  },
  categories: {
    type: "input",
    label: "Enter some categories for this post"
  },
  content: {
    type: "textarea",
    label: "Enter some content for this post"
  }
};

class PostsNew extends Component {
  //Try to avoid working with contextTypes. It should be only used when working with react-router
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        //blog post has been created, navigate the user to the index
        //we navigate by calling this.context.router.push with
        //the new path to navigate to.
        this.context.router.push('/');
      });
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div key={fieldHelper.name} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    //ES6 fancy syntax equivalent to const handleSubmit = this.props.handleSubmit
    //{...title} is a shorthand that descronstructs the object title so all the properties are available to the input. It is the same as doing onChange={title.onChange}, ... but with all the properties

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post</h3>

        {_.map(FIELDS, this.renderField.bind(this))}

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}


function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}


//connect: 1st argument is mapStateToProps, 2nd argument is mapDispatchToProps
//reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, { createPost })(PostsNew);

// { createPost is the shorthand that I have not used in the bloglist smart component but I explained it there. It is a shorthand to not use mapDispatchToProps }
