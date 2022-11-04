import { alertConstants } from '../constants/alert.constants';

/**
 * в зависимости от типа события меняет state redux'а
 * @param state
 * @param action
 * @returns {{isError: boolean, message, type: *}|{}}
 */
function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                isError: false,
                message: action.message,
                type: action.alertType
            };
        case alertConstants.ERROR:
            return {
                isError: true,
                message: action.message,
                type: action.alertType
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}

export {alert as alertReducer}
