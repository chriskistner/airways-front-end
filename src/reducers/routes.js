import {SET_USER_ROUTES} from '../actions/routes';
import {GET_CURRENT_CONDITIONS, GET_POLLEN_COUNT} from '../actions/breezeometer';

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    zipLat: null,
    zipLong: null,
    routes: [],
    homeConditions: {},
    homePollen: {},
    
};

export default function routes (state = initialState, action) {
    switch(action.type) {
        case SET_USER_ROUTES:
            const userName = action.payload.user_name;
            const userZip = action.payload.zip_code;
            const userLat = action.payload.home_latitude;
            const userLong = action.payload.home_longitude;
            const userRoutes = action.payload.routes;
            return {...state, userName: userName, userZip: userZip, zipLat: userLat, zipLong: userLong, routes: userRoutes }

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