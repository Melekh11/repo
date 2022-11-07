import React, {useEffect} from 'react';
import {Header} from "../components/UI/header/header";
import appClasses from "../styles/app.module.css";
import {useNavigate} from "react-router-dom";
// import {ROUTES} from "../components/router";
import fromClasses from "../components/UI/form/form.module.css";
import {useDispatch, useSelector} from "react-redux";
// import {postsAction} from "../redux/actions/post.actions";
import {reviewActions} from "../redux/actions/review.action";
import {postsAction} from "../redux/actions/post.actions";
import {ROUTES} from "../components/router";

const Review = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const windowLocationArray = window.location.href.split("/")
    const idReview = windowLocationArray[windowLocationArray.length - 1];

    const currentReview = useSelector(state => state.reviews.currentReview);

    useEffect(() => {
        dispatch(reviewActions.getReviewById(idReview));
    }, [])

    function handleClick(){
        if (currentReview) {
            reviewActions.deleteReview(currentReview.id);
            postsAction.deletePost(currentReview.id_post);
            navigate(ROUTES.home);
        }
    }

    return (
        <>
            <Header/>

            <div style={{margin: "100px", width: "95%"}}>
                <h1 className={appClasses.leftTitle}>
                    на запрос организации
                    <span style={{fontSize: "60px"}}> {currentReview && currentReview.org_name} </span>
                    с названием <span style={{fontSize: "60px"}}> {currentReview && currentReview.post_name} </span>
                    откликнулись
                    {/*<Link to={ROUTES.allPosts}> {currentReview && currentReview.org_name}</Link>*/}
                </h1>

                <div className={appClasses.flexRow}>
                    <div className={appClasses.flexColumn}>
                        <div className={appClasses.section}>
                            <span className={appClasses.titleSmall}>описание помощи:</span>
                            <p className={appClasses.text}>{currentReview && currentReview.help_desc}</p>
                        </div>

                        <div className={appClasses.section}>
                            <span className={appClasses.titleSmall}>контакты:</span>
                            <p className={appClasses.text}>{currentReview && currentReview.contacts}</p>
                        </div>
                    </div>

                    <div className={appClasses.flexColumn}>

                        <div className={appClasses.section}>
                            <span className={appClasses.titleSmall}>статус даты проведения:</span>
                            <p className={appClasses.text}>{currentReview && currentReview.time_option}</p>
                        </div>

                        <div className={appClasses.section}>
                            {currentReview && currentReview.make_better_desc &&
                                <span className={appClasses.titleSmall}>предложения по улучшению:</span>
                            }
                            {currentReview && currentReview.make_better_desc &&
                                <p className={appClasses.text}>{currentReview.make_better_desc}</p>
                            }
                            {(!currentReview || !currentReview.make_better_desc) &&
                                <span className={appClasses.titleSmall}>предложений по улучшению нет</span>
                            }

                        </div>

                    </div>

                    <div className={appClasses.flexColumn}>

                        <button
                            className={fromClasses.prime}
                            onClick={handleClick}
                        >удалить пост {currentReview && currentReview.post_name}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Review;
