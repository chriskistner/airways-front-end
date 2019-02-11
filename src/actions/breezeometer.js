import axios from "axios";

const breezeApi = process.env.REACT_APP_BREEZE_O_METER_API_KEY;
const conditionsUrl = process.env.REACT_APP_BREEZE_O_METER_CURRENT_CONDITIONS_URL;
const pollenUrl = process.env.REACT_APP_BREEZE_O_METER_POLLEN_URL;

export const GET_CURRENT_CONDITIONS = "GET_CURRENT_CONDITIONS";
export const GET_POLLEN_COUNT = "GET_POLLEN_COUNT";

export const getCurrentConditions = (lat, long) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${conditionsUrl}lat=${lat}&lon=${long}&key=${breezeApi}&features=breezometer_aqi,local_aqi,pollutants_concentrations,pollutants_aqi_information`,{})
            dispatch({
                type: GET_CURRENT_CONDITIONS,
                payload: response.data.data
            })
        }catch(err) {
            console.log(err)
        }
    }
};

export const getPollenCount = (lat, long) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${pollenUrl}lat=${lat}&lon=${long}&days=1&key=${breezeApi}`,{})
            dispatch({
                type: GET_POLLEN_COUNT,
                payload: response.data.data
            })
        }catch(err) {
            console.log(err)
        }
    }
}