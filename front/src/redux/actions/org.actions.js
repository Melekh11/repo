import {validatorActions} from "./validator.actions";
import {store} from "../store";
import {alertActions} from "./alert.actions";
import {alertConstants} from "../constants/alert.constants";
import {orgModel} from "../../models/org.model";
import {ROUTES} from "../../components/router";
import {userConstants} from "../constants/user.constants";


/** создание организации
 принимает данные организации (org)
 функции проверки полей (checkers)
 функцию, направляющую на другие страницы (navigate)
 */
function createOrg(org, checkers, navigate) {
    return dispatch => {
        dispatch(validatorActions.checkFields(org, checkers));
        const state = store.getState()
        if (!state.validator.isError) {
            orgModel.createOrg({name: org.title, contacts: org.description})
                .then(() => {
                    orgModel.createPosition({
                        userLogin: state.authentication.user.login,
                        status: "moder",
                        orgName: org.title
                    }).then((resp) => {
                        dispatch(updateUser(resp.user))
                    })
                    navigate(ROUTES.home);
                })
                .catch(error => {
                    dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, error));
                })
        } else {
            dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, "не все поля валидны"));
        }
    }

    // событие изменения данных пользователя
    function updateUser(user) {
        return {type: userConstants.LOGIN_SUCCESS, user: user, positions: user.positions}
    }
}

/**
 * событие создания поста
 * @param data
 * @param checkers
 * @param navigate
 * @returns {(function(*): void)|*}
 */
function createPost(data, checkers, navigate) {
    return dispatch => {
        dispatch(validatorActions.checkFields(data, checkers));
        const state = store.getState();
        if (!state.validator.isError) {
            console.log(state.authentication.user);
            orgModel.createPost({...data, login: state.authentication.user.login})
                .then(() => navigate(ROUTES.home))
                .catch(error => {
                    dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, error));
                })
        } else {
            dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, "не все поля валидны"));
        }
    }
}


export const orgActions = {
    createOrg,
    createPost
}
