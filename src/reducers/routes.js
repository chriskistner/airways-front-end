import {SET_USER_ROUTES} from '../actions/routes';

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    zipLat: null,
    zipLong: null,
    routes: {}
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

        default:
            return state;
    }
}