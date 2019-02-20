import {SET_USER_ROUTES} from '../actions/routes';
import {GET_CURRENT_CONDITIONS, GET_POLLEN_COUNT, GET_LOADING_CONDITIONS, GET_LOADING_POLLEN} from '../actions/breezeometer';

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    zipLat: null,
    zipLong: null,
    routes: [],
    loadConditions: {},
    loadPollen: {},
    homeConditions: {},
    homePollen: {},
};

export default function routes (state = initialState, action) {
    switch(action.type) {
        case SET_USER_ROUTES:
            const userName = action.payload.user_name;
            const userLat = action.payload.home_latitude;
            const userLong = action.payload.home_longitude;
            const userRoutes = action.payload.routes;
            return {...state, userName: userName, zipLat: userLat, zipLong: userLong, routes: userRoutes }

        case GET_CURRENT_CONDITIONS:
            const air = action.payload !== null ? action.payload : {};
            return {...state, homeConditions: air}
    
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