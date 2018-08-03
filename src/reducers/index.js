import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import todo_reducers from './todo_reducers';

const rootReducer = combineReducers({
  form: formReducer,
  todos: todo_reducers
});

export default rootReducer;
