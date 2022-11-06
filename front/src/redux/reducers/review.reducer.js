import {reviewConstants} from "../constants/review.constants";

function reviewReducer(state={}, action){
    switch (action.type){
        case reviewConstants.UPDATE_REVIEW:
            return action.reviews
        case reviewConstants.SET_REVIEW:
            return {currentReview: action.review}
        case reviewConstants.CLEAR_REVIEWS:
            return {}
        default:
            return state
    }
}

export {reviewReducer}
