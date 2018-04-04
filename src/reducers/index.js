import { combineReducers } from 'redux';
import app from './appReducer';
import container from './containerReducer';

const rootReducer = combineReducers({
  app,
  container
})

export default rootReducer