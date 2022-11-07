import {validatorActions} from "./validator.actions";
import {store} from "../store";
import {alertActions} from "./alert.actions";
import {alertConstants} from "../constants/alert.constants";
import {orgModel} from "../../models/org.model";
import {ROUTES} from "../../components/router";
import {userConstants} from "../constants/user.constants";
import {postModel} from "../../models/post.model";
import {orgConstants} from "../constants/org.constants";
import {userModel} from "../../models/user.model";


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
                        console.log(resp.user);
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
        localStorage.setItem('user', JSON.stringify(user));
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
            postModel.createPost({...data, login: state.authentication.user.login})
                .then(() => navigate(ROUTES.home))
                .catch(error => {
                    dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, error));
                })
        } else {
            dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, "не все поля валидны"));
        }
    }
}

function getOrgById(id){
    return dispatch => {
        orgModel.getOrgById(id)
            .then(org => {
                dispatch(setCurrentOrg(org));
            })
    }

    function setCurrentOrg(org){
        return {type: orgConstants.SET_CURRENT_ORG, org: org}
    }
}

function getOrgByName(name, checker, navigate){
    return dispatch  => {
        dispatch(validatorActions.checkFields(name, checker));
        const state = store.getState();
        if (!state.validator.isError) {
            orgModel.getOrgs()
                .then(orgs  => {
                    let wasFound = false;
                    orgs.forEach(org => {
                        console.log(org.name, name);
                        if (org.name === name.orgName){
                            wasFound = true;
                            dispatch(setCurrentOrg(org));
                            navigate(`${ROUTES.org}/${org.id}`);
                        }
                    })
                    if (!wasFound){
                        dispatch(alertActions.error(alertConstants.UPDATE_PROFILE,
                            `организации с именем ${name.orgName} не существует`));
                    }
                })
        } else {
            dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, "не все поля валидны"));
        }
    }

    function setCurrentOrg(org){
        return {type: orgConstants.SET_CURRENT_ORG, org: org}
    }
}

function deleteOrgById(id){
    return dispatch => {
        orgModel.deleteOrgById(id);
        userModel.getUser(store.getState().authentication.user.id)
            .then(user => {
                dispatch(updateUser(user));
            })
    }

    function updateUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
        return {type: userConstants.LOGIN_SUCCESS, user: user, positions: user.positions}
    }
}

function setCurrentReviewedOrg(id){
    return dispatch => {
        orgModel.getOrgById(id)
            .then(org => {
                dispatch(setCurrentOrg(org));
            })
    }

    function setCurrentOrg(org){
        return {type: orgConstants.SET_CURRENT_REVIEWED_ORG, org: org}
    }
}

function cleanCurrentReviewedOrg(){
    return dispatch => {
        dispatch({
            type: orgConstants.CLEAR_CURRENT_REVIEWED_ORG
        })
    }
}

export const orgActions = {
    createOrg,
    createPost,
    getOrgById,
    getOrgByName,
    deleteOrgById,
    setCurrentReviewedOrg,
    cleanCurrentReviewedOrg
}
