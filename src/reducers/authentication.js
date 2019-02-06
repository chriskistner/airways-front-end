import {SET_AUTHENTICATION, SET_USER_NAME} from '../actions/authentication'

const initialState = {
    userId: null,
    pending: true,
    userName: ''
};

export default function auth (state = initialState, action) {
  switch(action.type) {
      case SET_AUTHENTICATION:
        const id = action.payload !== null ? action.payload.id : null
          return {...state, userId: id, pending: false}
        
        case SET_USER_NAME:
            const userName = action.payload.user_name
            return {...state, userName: userName}
      default:
          return state
  }
};