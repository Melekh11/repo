import { userConstants } from "../constants/user.constants";

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { logged: true, user } : {logged: false};

/**
 * в зависимости от типа события меняет state redux'а
 * @param state
 * @param action
 * @returns {{logged: boolean, user: (*&{positions: *})}|{logging: boolean, user: any}|{logged: boolean, user: any}|{}}
 */
function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                logging: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            console.log(action.positions);
            return {
                logged: true,
                user: {...action.user, positions: action.positions}
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}

export {authenticationReducer}
