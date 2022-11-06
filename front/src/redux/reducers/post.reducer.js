import {postConstants} from "../constants/post.constants";

function postReducer(state={}, action){
    switch (action.type){
        case postConstants.UPDATE_POST:
            return action.posts
        case postConstants.SET_POST:
            return {currentPost: action.post}
        case postConstants.CLEAR_POSTS:
            return {}
        default:
            return state
    }
}

export {postReducer}
