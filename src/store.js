import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import auth from './reducers/authentication';
import locations from './reducers/locations';
import routes from './reducers/routes';


//combineReducers
const reducers = combineReducers({auth, locations, routes})

export default createStore(reducers, applyMiddleware(thunk, logger))