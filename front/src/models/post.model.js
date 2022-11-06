import {handleResponse} from "../heplers/handlerResponse";

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
            org_private_name: data.isPrivate ? data.privateOrgName : ""
        })
    }
    return fetch(`/post`, requestParams).then(handleResponse);
}

function getAllPosts(){
    const requestParams = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`/posts`, requestParams).then(handleResponse);
}

function getPostById(id) {
    const requestParams = {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    };
    return fetch(`/post/${id}`, requestParams).then(handleResponse);
}

function deletePost(id){
    const requestParams = {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
    };
    fetch(`/post/${id}`, requestParams)
}

export const postModel = {
    createPost,
    getAllPosts,
    getPostById,
    deletePost
}
