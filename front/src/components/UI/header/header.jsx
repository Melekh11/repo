import React from 'react';
import classes from "./header.module.css"
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../router";

/**
 * компонент шапки сайта
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
    const navigate = useNavigate()

    return (
        <>
            {/*{isLogged && <Sidebar/>}*/}
            <header className={classes.header}>
                <div onClick={() => {
                    navigate(ROUTES.home);
                }} className={classes.round}/>

                <span>Our Lyceum</span>
            </header>
        </>
    );
};

export {Header};
