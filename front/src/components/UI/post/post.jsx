import React from 'react';
import classes from "./post.module.css"
import formClasses from "../form/form.module.css"
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../router";

const Post = ({title, description, postId}) => {

    const navigate = useNavigate();

    return (
        <div className={classes.post}>
            <h3 className={classes.post_title}>{title}</h3>
            <p className={classes.post_description}>{description}</p>
            <button
                className={formClasses.prime}
                onClick={() => {
                    navigate(`${ROUTES.post}/${postId}`)
                }}
            >
                подробнее
            </button>
        </div>
    );
};

export default Post;
