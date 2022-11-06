import {combineReducers} from "@reduxjs/toolkit";
import {validatorReducer} from "./validator.reducer";
import {alertReducer} from "./alert.reducer";
import {registrationReducer} from "./registration.reducer";
import {authenticationReducer} from "./authentication.reducer";
import {postReducer} from "./post.reducer";
import {reviewReducer} from "./review.reducer";
import {orgReducer} from "./org.reducer";

/**
 * соединяем все reducer'ы в root reducer
 */
export const rootReducer = combineReducers({
    validator: validatorReducer,
    alert: alertReducer,
    registration: registrationReducer,
    authentication: authenticationReducer,
    posts: postReducer,
    reviews: reviewReducer,
    orgs: orgReducer
})
