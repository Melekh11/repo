import {userModel} from "../../models/user.model";
import {alertActions} from "./alert.actions";
import {userConstants} from "../constants/user.constants";
import {store} from "../store";
import {validatorActions} from "./validator.actions";
import {ROUTES} from "../../components/router";
import {alertConstants} from "../constants/alert.constants";
// import {orgActions} from "./org.actions";
// import {postsAction} from "./posts.actions";
// import {orgModel} from "../../models/org.model";


/**
 * событие логина
 * @param user
 * @param checkers
 * @param navigate
 * @returns {(function(*): void)|*}
 */
function login(user, checkers, navigate) {
    return dispatch => {
        dispatch(validatorActions.checkFields(user, checkers));
        if (!store.getState().validator.isError) {
            dispatch(request())
            userModel.login(user)
                .then(user => {
                    dispatch(success(user));
                    navigate(ROUTES.home);
                })
                .catch(error => {
                    dispatch(failure());
                    dispatch(alertActions.error(alertConstants.LOGIN, error));
                })
        } else {
            dispatch(alertActions.error(alertConstants.LOGIN, "не все поля валидны"));
        }
    }

    function request() {
        return {type: userConstants.LOGIN_REQUEST}
    }

    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user: user, positions: user.positions}
    }

    function failure() {
        return {type: userConstants.LOGIN_FAILURE}
    }

}

/**
 * функция регистрации
 * @param user
 * @param checkers
 * @param navigate
 * @returns {(function(*): void)|*}
 */
function register(user, checkers, navigate) {
    return dispatch => {

        dispatch(validatorActions.checkFields(user, checkers));
        if (!store.getState().validator.isError) {
            dispatch(request());
            userModel.register(user)
                .then(() => {
                    dispatch(success());
                    navigate(ROUTES.login);
                    dispatch(alertActions.success(alertConstants.REGISTER, "вы успешно зарегистрированы!"));
                })
                .catch(() => {
                    dispatch(failure());
                    dispatch(alertActions.error(alertConstants.REGISTER, "такой пользователь уже существует"));
                })
        } else {
            dispatch(alertActions.error(alertConstants.VALIDATION, "не все поля валидны"));
        }
    }

    function request() {
        return {type: userConstants.REGISTER_REQUEST}
    }

    function success(message) {
        return {type: userConstants.REGISTER_SUCCESS, message: message}
    }

    function failure() {
        return {type: userConstants.REGISTER_FAILURE}
    }
}

/**
 * функция обновления профиля
 * @param user
 * @param checkers
 * @param navigate
 * @returns {(function(*): void)|*}
 */
function changeProfile(user, checkers, navigate) {
    return dispatch => {
        dispatch(validatorActions.checkFields(user, checkers));
        if (!store.getState().validator.isError) {
            userModel.changeProfile({user, id: store.getState().authentication.user.id})
                .then(newUser => {
                    dispatch(success(newUser));
                    navigate(ROUTES.home);
                })
                .catch(error => {
                    dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, error));
                })
        } else {
            dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, "не все поля валидны"));
        }
    }

    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user: user, positions: user.positions}
    }

}

/**
 * функция смены пароля
 * @param user
 * @param checkers
 * @param navigate
 * @returns {(function(*): void)|*}
 */
function changePassword(user, checkers, navigate) {
    return dispatch => {
        dispatch(validatorActions.checkFields(user, checkers));
        if (!store.getState().validator.isError) {
            userModel.changeProfile({user, id: store.getState().authentication.user.id})
                .then(() => {
                    navigate(ROUTES.home);
                })
                .catch(error => {
                    dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, error));
                })
        } else {
            dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, "не все поля валидны"));
        }
    }
}

/**
 * функция logout'а
 * @returns {{type: string}}
 */
function logout() {
    userModel.logout();

    return {
        type: userConstants.LOGOUT
    }
}

function addUser(data, checkers, navigate){
    return dispatch => {
        dispatch(validatorActions.checkFields(data, checkers));
        if (!store.getState().validator.isError) {
            userModel.addUser(data)
                .then(() => navigate(ROUTES.home))
                .catch(error => {
                     console.log("error")
                    dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, error));
                })
        } else {
            dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, "не все поля валидны"));
        }
    }
}

export const userActions = {
    register,
    login,
    logout,
    changeProfile,
    changePassword,
    addUser
}
