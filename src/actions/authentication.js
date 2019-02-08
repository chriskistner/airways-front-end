
import axios from "axios";
import {getGeoCode} from './google';
const url = process.env.REACT_APP_API_URL;

export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR"

export const setAuthentication = (claim) => ({
  type: SET_AUTHENTICATION,
  payload: claim
});

export const toggleError = (claim) => ({
  type: SET_LOGIN_ERROR,
  payload: claim
})

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

export const createUser = (userName, email, password, zipCode, fn) => {
  return async (dispatch) => {
    try {
      await axios.post(`${url}/user`, {
          userName: userName,
          password: password,
          email: email,
          zipCode: zipCode
        }
      );
      dispatch(login(email, password, fn))
    }catch(err) {
      console.error(err);
      dispatch(setAuthentication(null))
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
      dispatch(setAuthentication(null))
      dispatch(toggleError(true))
    }
  }
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try{
      const token = localStorage.getItem('token');
      const response = await axios(`${url}/user/${userId}`, {
        method: "get",
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
      dispatch(getGeoCode(response.data.result.zip_code))
    }catch(err) {
      console.log(err)
    }
  }
};