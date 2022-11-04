import {combineReducers} from "@reduxjs/toolkit";
import {validatorReducer} from "./validator.reducer";
import {alertReducer} from "./alert.reducer";
import {registrationReducer} from "./registration.reducer";
import {authenticationReducer} from "./authentication.reducer";

/**
 * соединяем все reducer'ы в root reducer
 */
export const rootReducer = combineReducers({
    validator: validatorReducer,
    alert: alertReducer,
    registration: registrationReducer,
    authentication: authenticationReducer
})
