import {SET_AUTHENTICATION, SET_LOGIN_ERROR, SET_CREATE_USER_ERROR, SET_USER_DATA} from '../actions/authentication'
import {GET_GEOCODE} from '../actions/google';
import {GET_CURRENT_CONDITIONS, GET_POLLEN_COUNT} from '../actions/breezeometer'

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipLat: null,
    zipLong: null,
    errors: false,
    createErrors: false,
    homeConditions: {},
    homePollen: {}
};

export default function auth (state = initialState, action) {
  switch(action.type) {
      case SET_AUTHENTICATION:
        const id = action.payload !== null ? action.payload.id : null;
        return {...state, userId: id, pending: false, address: '', ciy: '', state: '', zipLat: null, zipLong: null}

      case SET_LOGIN_ERROR:
        const errorState = action.payload;
        return {...state, errors: errorState}
      
      case SET_CREATE_USER_ERROR:
        const createError = action.payload;
        return {...state, createErrors: createError}
        
      case SET_USER_DATA:
        const userName = action.payload.user_name;
        const userEmail = action.payload.email;
        const userAddress = action.payload.address;
        const userCity = action.payload.city;
        const userState = action.payload.state;
        const userLat = action.payload.home_latitude;
        const userLong = action.payload.home_longitude;
        return {...state, userName: userName, email: userEmail, address: userAddress, city: userCity, state: userState, zipLat: userLat, zipLong: userLong }

      case GET_GEOCODE:
        const lat = action.payload.geometry.location.lat;
        const long = action.payload.geometry.location.lng;
        return {...state, zipLat: lat, zipLong: long}

      case GET_CURRENT_CONDITIONS:
        const result = action.payload !== null ? action.payload : {};
        return {...state, homeConditions: result}

      case GET_POLLEN_COUNT:
        const pollen = action.payload !== null ? action.payload : {};
        return {...state, homePollen: pollen}
      default:
          return state
  }
};