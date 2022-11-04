import {validatorConstants} from "../constants/validator.constants";

const initialState = {
    name: "",
    surname: "",
    login: "",
    email: "",
    password: "",
    submitPassword: "",
    message: "",
    isPasswordValidationType: false
}

// в зависимости от типа события меняет state redux'а
function validator(state = initialState, action) {
    switch (action.type) {
        case validatorConstants.CLEAR:
            return {isPasswordValidationType: false}
        case validatorConstants.SET_IS_ERROR:
            return {...state, isError: action.error}
        case validatorConstants.PASSWORD_VALIDATION:
            return {...state, isPasswordValidationType: action.value}
        default:
            return {...state, [action.type]: action.error}
    }
}

export {validator as validatorReducer}
