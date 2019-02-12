import axios from "axios";
const url = process.env.REACT_APP_API_URL;

export const SET_USER_LOCATIONS = "SET_USER_LOCATIONS";

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
}