import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import auth from './reducers/authentication';

//combineReducers
const reducers = combineReducers({auth})

export default createStore(reducers, applyMiddleware(thunk, logger))