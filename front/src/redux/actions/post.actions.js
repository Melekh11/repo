import {postConstants} from "../constants/post.constants";
import {store} from "../store";
import {postModel} from "../../models/post.model";

function getAll() {
    return dispatch => {
        postModel.getAllPosts()
            .then(posts => {
                    const userPositions = store.getState().authentication.user.positions;
                    let filterPosts;
                    let privatePosts;
                    if (userPositions && userPositions.length > 0) {
                        let isSame = false;

                        filterPosts = posts.filter(post => {
                            if (post.id_org_priv > 0) {
                                return false;
                            }
                            userPositions.forEach(userPosition => {
                                if (userPosition.org_id === post.id_org) {
                                    isSame = true;
                                }
                            });
                            return !isSame;
                        })

                        privatePosts = posts.filter(post => {
                            let ans = false;
                            if (post.id_org_priv !== 0) {
                                userPositions.forEach(userPosition => {
                                    if (userPosition.org_id === post.id_org_priv) {
                                        ans = true;
                                    }
                                })
                            }

                            return ans;
                        });

                        dispatch(setPrivatePosts(privatePosts));
                        dispatch(updatePosts(filterPosts));
                    } else {
                        dispatch(updatePosts(posts));
                    }
                }
            )

        function updatePosts(posts) {
            return {type: postConstants.UPDATE_POST, posts: posts}
        }

        function setPrivatePosts(posts) {
            return {type: postConstants.SET_PRIVATE_POSTS, posts: posts}
        }
    }
}

function getPostById(id) {
    return dispatch => {
        postModel.getPostById(id)
            .then(post => {
                dispatch(updateCurrentPost(post))
            })
    }

    function updateCurrentPost(post) {
        return {type: postConstants.SET_POST, post: post}
    }
}

function deletePost(id) {
    postModel.deletePost(id);
}

export const postsAction = {
    getAll,
    getPostById,
    deletePost
}
