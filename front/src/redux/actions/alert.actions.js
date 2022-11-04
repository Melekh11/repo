import {alertConstants} from "../constants/alert.constants";

/**
 * событие успеха для alert'а
 * @param alertType
 * @param message
 * @returns {{alertType, type: string, message}}
 */
function success(alertType, message) {
    return {type: alertConstants.SUCCESS, message, alertType};
}

/**
 * событие ошибки для alert'а
 * @param alertType
 * @param message
 * @returns {{alertType, type: string, message}}
 */
function error(alertType, message) {
    return {type: alertConstants.ERROR, message, alertType};
}

/**
 * событие очистки alert'а
 * @returns {{type: string}}
 */
function clear() {
    return {type: alertConstants.CLEAR};
}

export const alertActions = {
    success,
    error,
    clear
}
