import axios from "axios";
const googleUrl = process.env.GOOGLE_GEOCODE_URL;
const key = process.env.GOOGLE_API_KEY

export const GET_GEOCODE = "GET_GEOCODE";

export const getGeoCode = (zip) => {
    return async (dispatch) => {
        try {
            const response = axios.get(`${googleUrl}${zip}&key=${key}`)
            console.log(key)
            dispatch({
                type: GET_GEOCODE,
                payload: response.data.results
            })
        }catch(err) {
            console.log(err)
        }
    }
}