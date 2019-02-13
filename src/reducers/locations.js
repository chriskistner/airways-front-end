import {SET_USER_LOCATIONS, CREATE_USER_LOCATION} from '../actions/locations';

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    zipLat: null,
    zipLong: null,
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

        default:
            return state;

    }
}

