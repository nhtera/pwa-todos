import { ADD_TODO  } from '../actions';
import { combineReducers } from 'redux';

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos
});

export default rootReducer;