import {SET_USER_LOCATIONS} from '../actions/locations';
import {GET_CURRENT_CONDITIONS, GET_POLLEN_COUNT} from '../actions/breezeometer';

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    zipLat: null,
    zipLong: null,
    homeConditions: {},
    homePollen: {},
    locations: []
};

export default function locations (state = initialState, action) {
    switch(action.type) {
        case SET_USER_LOCATIONS:
            const userName = action.payload.user_name;
            const userZip = action.payload.zip_code;
            const userLat = action.payload.home_latitude;
            const userLong = action.payload.home_longitude;
            const userLocations = action.payload.locations;
            return {...state, userName: userName, userZip: userZip, zipLat: userLat, zipLong: userLong, locations: userLocations }

        case GET_CURRENT_CONDITIONS:
            const result = action.payload !== null ? action.payload : {};
            return {...state, homeConditions: result}
    
        case GET_POLLEN_COUNT:
            const pollen = action.payload !== null ? action.payload : {};
            return {...state, homePollen: pollen}
            
        default:
            return state;

    }
}

