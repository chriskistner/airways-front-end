import axios from "axios";
const googleUrl = process.env.REACT_APP_GOOGLE_GEOCODE_URL
const key = process.env.REACT_APP_GOOGLE_API_KEY

export const GET_GEOCODE = "GET_GEOCODE";

export const getGeoCode = (zip) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${googleUrl}${zip}&key=${key}`,{})
            dispatch({
                type: GET_GEOCODE,
                payload: response.data.results[0]
            })
        }catch(err) {
            console.log(err)
        }
    }
}