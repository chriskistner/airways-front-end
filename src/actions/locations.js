import axios from "axios";
import getGeoCode from './google';
const url = process.env.REACT_APP_API_URL;

export const SET_USER_LOCATIONS = "SET_USER_LOCATIONS";
export const CREATE_USER_LOCATION = "CREATE_USER_LOCATION";

export const getUserLocations = (userId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${url}/user/${userId}/locations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
            })
            dispatch({
                type: SET_USER_LOCATIONS,
                payload: response.data.result[0]
              })
        }catch(err) {
            console.log(err)
        }
    }
};

export const createUserLocation = (userId, name, address, city, state) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axios(`${url}/user/${userId}/locations`,{
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                data: {
                    name: name,
                    address: address,
                    city: city,
                    state: state
                }
            });
            dispatch(getUserLocations(userId))
        }catch(err) {
            console.log(err)
        }
    }
};