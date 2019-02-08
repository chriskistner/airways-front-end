import axios from "axios";

const breezeApi = process.env.REACT_APP_BREEZE_O_METER_API_KEY;
const conditionsUrl = process.env.REACT_APP_BREEZE_O_METER_CURRENT_CONDITIONS_URL;

export const GET_CURRENT_CONDITIONS = "GET_CURRENT_CONDITIONS";

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
}