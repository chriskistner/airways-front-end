import axios from "axios";
const url = process.env.REACT_APP_API_URL;

export const SEND_EMAIL_MESSAGE = 'SEND_EMAIL_MESSAGE';
export const SET_USER_ALERTS = 'SET_USER_ALERTS';

export const getUserAlerts = (userId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${url}/user/${userId}/alerts`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: SET_USER_ALERTS,
                payload: response.data.result[0]
            })
        }catch(err) {
            console.log(err)
        }
    }
};

export const createUserAlert = (userId, name, type, frequency, polyline, latitude, longitude) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axios(`${url}/user/${userId}/routes`,{
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                data: {
                    name: name,
                    type: type,
                    frequency: frequency,
                    polyline: polyline,
                    latitude:latitude,
                    longitude: longitude
                }
            });
            dispatch(getUserAlerts(userId))
        }catch(err) {
            console.log(err)
        }
    }
};

export const sendTestEmail = (userId, name, email, message) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axios(`${url}/user/${userId}/alerts`,{
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                data: {
                    name: name,
                    email: email,
                    message: message,
                }
            });
        }catch(err) {
            console.log(err)
        }
    }
};

