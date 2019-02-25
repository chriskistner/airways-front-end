import {SET_USER_LOCATIONS} from '../actions/locations';
import {GET_CURRENT_CONDITIONS, GET_POLLEN_COUNT, GET_LOADING_CONDITIONS, GET_LOADING_POLLEN} from '../actions/breezeometer';

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    zipLat: null,
    zipLong: null,
    loadConditions: {},
    loadPollen: {},
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

        case GET_LOADING_CONDITIONS:
            const loadAir= action.payload !== null ? action.payload : {};
            return {...state, loadConditions: loadAir}

        case GET_LOADING_POLLEN:
            const loadPollen = action.payload !== null ? action.payload : {};
            return {...state, loadPollen: loadPollen}
            
        default:
            return state;

    }
}

