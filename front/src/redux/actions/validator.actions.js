import {validatorConstants} from "../constants/validator.constants";
import {store} from "../store";
import {alertActions} from "./alert.actions";

/**
 * функция проверки одного поля
 * @param value
 * @param checker
 * @param name
 * @returns {(function(*): void)|*}
 */
function checkField(value, checker, name) {
    return dispatch => {
        const checkerResp = checker(value);
        if (checkerResp.isError) {
            dispatch(setError(checkerResp.errorText, name));
            dispatch(setIsError(true));
        } else {
            dispatch(setError("", name));
        }
    }
}

/**
 * функция, реализующая добавление общего статуса ошибки
 * @param value
 * @returns {{type: string, error}}
 */
function setIsError(value) {
  return {
    type: validatorConstants.SET_IS_ERROR,
    error: value,
  };
}

/**
 * функция, запускающая событие ошибки для reducer'а
 * @param value
 * @param name
 * @returns {{type, error}}
 */
function setError(value, name) {
  return {
    type: name,
    error: value,
  };
}

/**
 * добавить проверку паролей
 * @returns {{type: string, value: boolean}}
 */
function applyPasswordValidation() {
  return {
    type: validatorConstants.PASSWORD_VALIDATION,
    value: true,
  };
}

/**
 * убрать проверку паролей
 * @returns {{type: string, value: boolean}}
 */
function disablePasswordValidation() {
  return {
    type: validatorConstants.PASSWORD_VALIDATION,
    value: false,
  };
}

/**
 * убрать валидацию на каком-то поле
 * @param name
 * @returns {{type, error: string}}
 */
function disableValidation(name) {
  return {
    type: name,
    error: '',
  };
}

/**
 * функция проверки всех полей
 * @param values
 * @param checkers
 * @returns {(function(*): void)|*}
 */
function checkFields(values, checkers) {
  return (dispatch) => {
    dispatch(setIsError(false));
    for (const key in checkers) {
            dispatch(checkField(values[key], checkers[key], key));
        }

        const isPasswordValidationType = store.getState().validator.isPasswordValidationType;

        if (isPasswordValidationType && values.password !== values.confirmPassword) {
            dispatch(setError("пароли не должны отличаться", "password"));
            dispatch(setIsError(true));
        }
    }
}

/**
 * функция очистки всего валидатора
 * @returns {(function(*): void)|*}
 */
function cleanValidator() {
    return dispatch => {
        dispatch({type: validatorConstants.CLEAR});
        dispatch(alertActions.clear());
    }
}

export const validatorActions = {
    checkField,
    checkFields,
    cleanValidator,
    disableValidation,
    applyPasswordValidation,
    disablePasswordValidation
}
