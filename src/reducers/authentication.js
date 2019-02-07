import {SET_AUTHENTICATION, SET_LOGIN_ERROR, SET_USER_DATA} from '../actions/authentication'

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    userZip: null,
    errors: false
};

export default function auth (state = initialState, action) {
  switch(action.type) {
      case SET_AUTHENTICATION:
        const id = action.payload !== null ? action.payload.id : null;
        return {...state, userId: id, pending: false}

      case SET_LOGIN_ERROR:
        const errorState = action.payload;
        return {...state, errors: errorState}
        
      case SET_USER_DATA:
        const userName = action.payload.user_name
        const userZip = action.payload.zip_code
        return {...state, userName: userName, userZip: userZip }
      default:
          return state
  }
};