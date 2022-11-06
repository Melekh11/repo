import React, {useEffect} from 'react';
import {Header} from "../components/UI/header/header";
import appClasses from "../styles/app.module.css"
import fromClasses from "../components/UI/form/form.module.css"
import {useDispatch, useSelector} from "react-redux";
import {postsAction} from "../redux/actions/post.actions";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../components/router";

const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const windowLocationArray = window.location.href.split("/")
    const idPost = windowLocationArray[windowLocationArray.length - 1];

    const currentPost = useSelector(state => state.posts.currentPost);

    useEffect(() => {
        dispatch(postsAction.getPostById(idPost));
    }, [])

    function handleClick(){
        navigate(`${ROUTES.reviewCreate}/${idPost}`);
    }

    return (
        <>
            <Header/>

            <div style={{margin: "100px", width: "95%"}}>
                <h1 className={appClasses.leftTitle}>
                    заявка на мероприятие
                    <span style={{fontSize: "60px"}}> {currentPost && currentPost.name} </span>
                    от организации
                    {currentPost && <Link to={`${ROUTES.org}/${currentPost.id_org}`}> {currentPost.org_name}</Link>}
                </h1>

                <div className={appClasses.flexRow}>
                    <div className={appClasses.flexColumn}>
                        <div className={appClasses.section}>
                            <span className={appClasses.titleSmall}>описание:</span>
                            <p className={appClasses.text}>{currentPost && currentPost.short_desc}</p>
                        </div>

                        <div className={appClasses.section}>
                            <span className={appClasses.titleSmall}>заявка была опубликована:</span>
                            <p className={appClasses.text}>{currentPost && currentPost.date_publish}</p>
                        </div>
                    </div>

                    <div className={appClasses.flexColumn}>

                        <div className={appClasses.section}>
                            <span className={appClasses.titleSmall}>приблизительная дата проведения:</span>
                            <p className={appClasses.text}>{currentPost && currentPost.date_start}</p>
                        </div>

                        <div className={appClasses.section}>
                            <span  className={appClasses.titleSmall}>описание нужной помощи:</span>
                            <p className={appClasses.text}>{currentPost && currentPost.help_desc}</p>
                        </div>

                    </div>

                    <div className={appClasses.flexColumn}>

                        {currentPost && currentPost.org_priv_name &&
                            <p className={appClasses.text}>
                                этот пост отправлен только для организации {currentPost.org_priv_name}
                            </p>}

                        <button
                            className={fromClasses.prime}
                            onClick={handleClick}
                        >отозваться</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
