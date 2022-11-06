import React, {useEffect} from 'react';
import Post from "../components/UI/post/post";
import {Header} from "../components/UI/header/header";
import {useDispatch, useSelector} from "react-redux";
import {postsAction} from "../redux/actions/post.actions";
import appClasses from "../styles/app.module.css"
import {Link} from "react-router-dom";
import {ROUTES} from "../components/router";
import {reviewActions} from "../redux/actions/review.action";
import Review from "../components/UI/review/review";

const Home = () => {

    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts);
    const reviews = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(postsAction.getAll());
        dispatch(reviewActions.getAll())
    }, [])

    return (
        <>
            <Header/>
            <div style={{margin: "150px 0", display: "flex", width: "100%"}}>
                <div className={appClasses.flexRow}>

                    <div className={appClasses.flexColumn}>

                        {posts.length === 0 &&
                            <p className={appClasses.text}>постов пока нет</p>}

                        {!!posts.length &&
                            <p className={appClasses.text}>возможно, вам подойдут эти заявки</p>
                            && posts.map(post =>
                                (<Post
                                    key={post.id}
                                    title={post.name}
                                    postId={post.id}
                                    description={post.short_desc}/>)
                            )}
                        <Link className={appClasses.linkColor} to={ROUTES.createPost}>создать заявку</Link>


                    </div>

                    <div className={appClasses.verticalLine}/>

                    <div className={appClasses.flexColumn}>
                        {(!reviews || reviews.length === 0) &&
                            <p className={appClasses.text}>на ваши заявки пока не откликнулись</p>}
                        {!!reviews.length &&
                            <p className={appClasses.text}>возможно, вам подойдут эти заявки</p>
                            && reviews.map(review =>
                                (<Review
                                    key={review.id}
                                    reviewId={review.id}
                                    postTitle={review.post_name}
                                    orgName={review.org_name}
                                    status={review.time_option}/>)
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Home;
