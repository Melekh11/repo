import React from 'react';
import classes from "../post/post.module.css"
import formClasses from "../form/form.module.css"
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../router";

const Review = ({postTitle, orgName, status, reviewId}) => {

    const navigate = useNavigate();

    return (
        <div className={classes.post}>
            <p className={classes.post_description}>
                на вашу заявку {postTitle} отозвался проект {orgName} статус: {status}
            </p>
            <button
                className={formClasses.prime}
                onClick={() => {
                    navigate(`${ROUTES.review}/${reviewId}`)
                }}
            >
                подробнее
            </button>
        </div>
    );
};

export default Review;
