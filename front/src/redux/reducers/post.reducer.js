import {postConstants} from "../constants/post.constants";

function postReducer(state={allPosts: [], privatePosts: []}, action){
    switch (action.type){
        case postConstants.UPDATE_POST:
            return {...state, allPosts: action.posts}
        case postConstants.SET_PRIVATE_POSTS:
            console.log("posts", action.posts);
            return {...state, privatePosts: action.posts}
        case postConstants.SET_POST:
            return {...state, currentPost: action.post}
        case postConstants.CLEAR_POSTS:
            return {allPosts: [], privatePosts: []}
        default:
            return state
    }
}

export {postReducer}
