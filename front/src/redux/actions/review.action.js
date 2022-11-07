import {validatorActions} from "./validator.actions";
import {store} from "../store";
import {alertActions} from "./alert.actions";
import {alertConstants} from "../constants/alert.constants";
import {reviewModel} from "../../models/review.model";
import {reviewConstants} from "../constants/review.constants";
import {ROUTES} from "../../components/router";

function createReview(data, checkers, navigate){
    return dispatch => {
        dispatch(validatorActions.checkFields(data, checkers));
        const state = store.getState();
        if (!state.validator.isError) {
            reviewModel.createReview(data);
            navigate(ROUTES.home);
        } else {
            dispatch(alertActions.error(alertConstants.UPDATE_PROFILE, "не все поля валидны"));
        }
    }
}

function getAll(){
    return dispatch => {
        reviewModel.getAllReviews()
            .then(reviews => {
                const userPositions = store.getState().authentication.user.positions;
                let isAll = true;
                let filterReviews;
                if (userPositions && userPositions.length > 0){
                    isAll = false;
                    filterReviews = reviews.filter(review => {
                        let ans = false;
                        userPositions.forEach(userPosition => {
                            console.log(userPosition.org_id, review.id_org)
                            if (userPosition.org_id === review.org_id){
                                ans = true;
                            }
                        });
                        return ans;
                    })
                }
                if (isAll) {
                    dispatch(updateReviews(reviews));
                } else {
                    dispatch(updateReviews(filterReviews));
                }
            })
    }

    function updateReviews(reviews){
        return {type: reviewConstants.UPDATE_REVIEW, reviews: reviews}
    }
}

function getReviewById(id){
    return dispatch => {
        reviewModel.getReviewById(id)
            .then(review => {
                dispatch(setReview(review));
            })
    }

    function setReview(review){
        return {type: reviewConstants.SET_REVIEW, review: review}
    }
}

function deleteReview(id){
    reviewModel.deleteReview(id);
}

export const reviewActions = {
    createReview,
    getAll,
    getReviewById,
    deleteReview
}
