
import axios from "axios";
import {getCurrentConditions, getPollenCount} from './breezeometer'
const url = process.env.REACT_APP_API_URL;


export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
export const SET_CREATE_USER_ERROR = "SET_CREATE_USER_ERROR";

export const setAuthentication = (claim) => ({
  type: SET_AUTHENTICATION,
  payload: claim
});

export const toggleError = (claim) => ({
  type: SET_LOGIN_ERROR,
  payload: claim
});

export const toggleCreateError = (claim) => ({
  type: SET_CREATE_USER_ERROR,
  payload: claim
});

export const verifyUser = (fn) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const user = await axios.get(`${url}/auth/verify`,{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(setAuthentication(user.data))
      if(fn) fn()
    }catch(err) {
      console.error(err)
      dispatch(setAuthentication(null))
    }
  }
};

export const createUser = (userName, email, password, address, city, state, fn) => {
  return async (dispatch) => {
    try {
      await axios.post(`${url}/user`, {
          userName: userName,
          password: password,
          email: email,
          address: address,
          city: city,
          state: state
        }
      );
      dispatch(login(email, password, fn))
    }catch(err) {
      console.error(err);
      dispatch(setAuthentication(null));
      dispatch(toggleCreateError(true))
    }
  }
};

export const login = (email, password, fn) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${url}/auth/login`, {email: email, password: password});
      localStorage.setItem('token', response.data.token);
      dispatch(verifyUser(fn));
    }catch(err) {
      console.error(err)
      dispatch(setAuthentication(null));
      dispatch(toggleError(true));
    }
  }
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try{
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch({
        type: SET_USER_DATA,
        payload: response.data.result
      })
      dispatch(getCurrentConditions(response.data.result.home_latitude, response.data.result.home_longitude));
      dispatch(getPollenCount(response.data.result.home_latitude, response.data.result.home_longitude));
    }catch(err) {
      console.log(err)
    }
  }
};