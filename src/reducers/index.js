import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import  { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer //Make sure that you use form key here and not anything else
});

export default rootReducer;
