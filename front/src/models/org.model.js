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

function getOrgById(id){
    const requestParams = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/org/${id}`, requestParams).then(handleResponse);
}

function getOrgs(){
    const requestParams = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/orgs`, requestParams).then(handleResponse);
}

function deleteOrgById(id){
    const requestParams = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(`/org/${id}`, requestParams);
}


export const orgModel = {
    createOrg,
    createPosition,
    getOrgById,
    getOrgs,
    deleteOrgById
}
