import React from 'react';
import classes from "./header.module.css"
import {Link} from "react-router-dom";
import {ROUTES} from "../../router";
// import {store} from "../../../redux/store";
import {useSelector} from "react-redux";

/**
 * компонент шапки сайта
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {

    const isLogged = useSelector(state => state.authentication.logged);
    const user = useSelector(state => state.authentication.user);
    let isModer = false;
    if (isLogged && user && user.positions) {
        isModer = user.positions.filter((position) => position.status === "moder").length > 0;
    }

    return (
        <>
            <header className={classes.header}>

                <div style={{height: "100%", display: "flex"}}>

                    {isLogged && <Link className={classes.link} to={ROUTES.profileSettings}>профиль</Link>}
                    {isLogged && <Link className={classes.link} to={ROUTES.createOrg}>создать организацию</Link>}
                    {isLogged && <Link className={classes.link} to={ROUTES.findOrg}>найти организацию</Link>}
                    {isModer && <Link className={classes.link} to={ROUTES.createPost}>создать пост</Link>}
                    {isModer && <Link className={classes.link} to={ROUTES.addUser}>добавить пользователя</Link>}
                    {isLogged && <Link className={classes.link} to={ROUTES.login}>выйти</Link>}

                </div>

                <div>
                    <span><Link to={ROUTES.home}>Our Lyceum</Link></span>
                </div>
            </header>
        </>
    );
};

export {Header};
