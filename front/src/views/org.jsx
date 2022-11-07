import React, {useEffect} from 'react';
import {Header} from "../components/UI/header/header";
import appClasses from "../styles/app.module.css";
import formClasses from "../components/UI/form/form.module.css"
import {useDispatch, useSelector} from "react-redux";
import {orgActions} from "../redux/actions/org.actions";
import Post from "../components/UI/post/post";
import {ROUTES} from "../components/router";
import {useNavigate} from "react-router-dom";

const Org = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const windowLocationArray = window.location.href.split("/")
    const idOrg = windowLocationArray[windowLocationArray.length - 1];

    const currentOrg = useSelector(state => state.orgs.currentOrg);

    const user = useSelector(state => state.authentication.user);

    let status = "visitor";

    function deleteOrg(){
        dispatch(orgActions.deleteOrgById(currentOrg.id));
        navigate(ROUTES.home);
    }

    function handlePrivate(){
        dispatch(orgActions.setCurrentReviewedOrg(currentOrg.id));
        navigate(ROUTES.createPost)
    }

    if (currentOrg) {
        user.positions.forEach(position => {
            if (position.org_id === currentOrg.id && position.status === "moder") {
                status = "moder";
            } else if (position.org_id === currentOrg.id && position.status === "user"){
                status = "user"
            }
        })
    }

    useEffect(() => {
        dispatch(orgActions.getOrgById(idOrg));
    }, [])


    return (
        <>
            <Header/>
            <div style={{margin: "100px", width: "95%", display: "flex", flexDirection: "column"}}>
                <h1 className={appClasses.leftTitle}>
                    организация
                    <span style={{fontSize: "60px"}}> {currentOrg && currentOrg.name}</span>
                </h1>

                <div className={appClasses.flexRow}>
                    <div>
                        <span className={appClasses.titleSmall}>описание:</span>
                        <p className={appClasses.text}>{currentOrg && currentOrg.contacts}</p>
                        {status === "moder" && <button
                            className={formClasses.alert + " " + formClasses.prime }
                            style={{margin: "60px 0"}}
                            onClick={() => deleteOrg()}
                        >
                            удалить организацию
                        </button>}
                    </div>

                    <div style={{margin: "30px", width: "300px"}} className={appClasses.flexColumn}>
                        {currentOrg && !!currentOrg.posts.length &&
                            <span className={appClasses.titleSmall}>заявки организации:</span>}
                        {currentOrg && !!currentOrg.posts.length &&
                            currentOrg.posts.map(post =>
                                (<Post
                                    key={post.id}
                                    postId={post.id}
                                    description={post.desc}
                                    title={post.name}/>)
                            )}
                        {(!currentOrg || !currentOrg.posts.length) &&
                            <p className={appClasses.text}>пока постов от организации нет</p>
                        }
                        { status === "visitor" &&
                            <button
                                className={ formClasses.prime }
                                onClick={handlePrivate}
                            >
                                создать приватный пост
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Org;
