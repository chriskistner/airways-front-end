import axios from "axios";
import {getCurrentConditions} from './breezeometer'
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
            dispatch(getCurrentConditions(response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng))
        }catch(err) {
            console.log(err)
        }
    }
}