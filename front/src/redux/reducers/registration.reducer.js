import {userConstants} from "../constants/user.constants";

/**
 * в зависимости от типа события меняет state redux'а
 * @param state
 * @param action
 * @returns {{}|{logging: boolean}}
 */
function registrationReducer(state={}, action){
    switch (action.type){
        case userConstants.REGISTER_FAILURE:
            return {}
        case userConstants.REGISTER_SUCCESS:
            return {}
        case userConstants.REGISTER_REQUEST:
            return {logging: true}
        default:
            return state
    }
}

export {registrationReducer}
