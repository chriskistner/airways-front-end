import axios from "axios";
const url = process.env.REACT_APP_API_URL;

export const SET_USER_ROUTES = 'SET_USER_ROUTES';

export const getUserRoutes = (userId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${url}/user/${userId}/routes`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: SET_USER_ROUTES,
                payload: response.data.result[0]
            })
        }catch(err) {
            console.log(err)
        }
    }
};