import {handleResponse} from "../heplers/handlerResponse";

/**
 * запрос на ручку создания организаций
 * @param org
 * @returns {Promise<Response>}
 */
function createOrg(org){
    const requestParams = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(org)
    }
    return fetch(`/org`, requestParams).then(handleResponse);
}

/**
 * запрос на ручку создания поста
 * @param data
 * @returns {Promise<Response>}
 */
function createPost(data){
    const requestParams = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: data.title,
            date_start: data.eventDate,
            delta_time:  data.deltaTime,
            short_desc: data.eventDescription,
            help_desc: data.eventHelpDescription,
            org_name: data.orgName,
            org_private_name: data.privateOrgName
        })
    }
    return fetch(`/post`, requestParams).then(handleResponse);
}

/**
 * запрос на ручку создания позиции
 * @param data
 * @returns {Promise<Response>}
 */
function createPosition(data){
    const requestParams = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            org_name: data.orgName,
            user_login: data.userLogin,
            status: data.status
        })
    }
    return fetch(`/add-user`, requestParams).then(handleResponse);
}

export const orgModel = {
    createOrg,
    createPost,
    createPosition
}
