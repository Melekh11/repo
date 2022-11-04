import React from 'react';
import {createBrowserRouter, Link} from "react-router-dom";
import SignUp from "../views/sign-up";
import SignIn from "../views/sign-in";
import ChangeProfile from "../views/change-profile";
import CreateOrg from "../views/create-org";
import CreatePost from "../views/create-post";

const ROUTES = {
    register: "/register",
    login: "/login",
    profileSettings: "settings",
    home: "/",
    createOrg: "/create",
    createPost: "/post"
}

/**
 * роутер
 */
const router = createBrowserRouter([
    {
        path: ROUTES.login,
        element: <SignIn/>,
    },
    {
        path: ROUTES.register,
        element: <SignUp/>
    },
    {
        path: ROUTES.profileSettings,
        element: <ChangeProfile/>
    },
    {
        path: ROUTES.home,
        element:
            <div>
                <Link to={ROUTES.profileSettings}>профиль</Link>
                <hr/>
                <Link to={ROUTES.createOrg}>создать организацию</Link>
                <hr/>
                <Link to={ROUTES.createPost}>создать пост</Link>
                <hr/>
                <Link to={ROUTES.login}>логин</Link>
            </div>
    },
    {
        path: ROUTES.createOrg,
        element: <CreateOrg/>
    },
    {
        path: ROUTES.createPost,
        element: <CreatePost/>
    }
]);


export {router, ROUTES};
