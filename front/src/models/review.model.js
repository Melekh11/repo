import {handleResponse} from "../heplers/handlerResponse";

function getAllReviews(){
    const requestParams = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`/reviews`, requestParams).then(handleResponse);
}


/**
 * запрос на ручку создания ревью
 * @param data
 * @returns {Promise<Response>}
 */
function createReview(data){
    const requestParams = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            help_desc: data.helpDescription,
            time_option: data.timeOption,
            contacts: data.contacts,
            make_better_desc: data.makeBetterDesc,
            id_post: data.idPost
        })
    }
    return fetch(`/review`, requestParams).then(handleResponse);
}

function getReviewById(id){
    const requestParams = {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }
    return fetch(`/review/${id}`, requestParams).then(handleResponse);
}

function deleteReview(id){
    const requestParams = {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
    }
    fetch(`/review/${id}`, requestParams)
}

export const reviewModel = {
    getAllReviews,
    createReview,
    getReviewById,
    deleteReview
}
