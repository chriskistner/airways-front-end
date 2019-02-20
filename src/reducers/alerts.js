import {SET_USER_ALERTS} from '../actions/alerts';

const initialState = {
    userId: null,
    pending: true,
    userName: '',
    alerts: {}
};

export default function alerts (state = initialState, action) {
    switch(action.type) {
        case SET_USER_ALERTS:
            const userName = action.payload.user_name;
            const userAlerts = action.payload.alerts;
            return {...state, userName: userName, alerts: userAlerts }

        default:
            return state;
    }
}