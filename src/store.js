import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import auth from './reducers/authentication';
import locations from './reducers/locations';


//combineReducers
const reducers = combineReducers({auth, locations})

export default createStore(reducers, applyMiddleware(thunk, logger))