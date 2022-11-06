import {postConstants} from "../constants/post.constants";
import {store} from "../store";
import {postModel} from "../../models/post.model";

function getAll() {
    return dispatch => {
        postModel.getAllPosts()
            .then(posts => {
                const userPositions = store.getState().authentication.user.positions;
                let isAll = true;
                let filterPosts;
                if (userPositions && userPositions.length > 0){
                    isAll = false;
                    filterPosts = posts.filter(post => {
                        let isSame = false;
                        userPositions.forEach(userPosition => {
                            if (userPosition.org_id === post.id_org){
                                isSame = true;
                            }
                        });
                        return !isSame;
                    })
                }
                if (isAll) {
                    dispatch(updatePosts(posts));
                } else {
                    dispatch(updatePosts(filterPosts));
                }
            })
    }

    function updatePosts(posts) {
        return {type: postConstants.UPDATE_POST, posts: posts}
    }
}

function getPostById(id){
    return dispatch => {
        postModel.getPostById(id)
            .then(post => {
                dispatch(updateCurrentPost(post))
            })
    }

    function updateCurrentPost(post){
        return {type: postConstants.SET_POST, post: post}
    }
}

function deletePost(id){
    postModel.deletePost(id);
}

export const postsAction = {
    getAll,
    getPostById,
    deletePost
}
