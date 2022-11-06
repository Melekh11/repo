import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import SignUp from "../views/sign-up";
import SignIn from "../views/sign-in";
import ChangeProfile from "../views/change-profile";
import CreateOrg from "../views/create-org";
import CreatePost from "../views/create-post";
import PrivateRoute from "./private-route";
import ModerRoute from "./moder-route";
import Home from "../views/home";
import CreateReview from "../views/create-review";
import Review from "../views/review";
import Post from "../views/post";
import AddUser from "../views/add-user";
import Org from "../views/org";
import FindOrg from "../views/find-org";

const ROUTES = {
    register: "/register",
    login: "/login",
    profileSettings: "/settings",
    home: "/",
    createOrg: "/create",
    createPost: "/post",
    post: "/post",
    review: "/review",
    reviewCreate: "/review-create",
    addUser: "/add-user",
    org: "/organisation",
    findOrg: "/find-organisation"
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
        element: <PrivateRoute child={<ChangeProfile/>}/>
    },
    {
        path: ROUTES.home,
        element: <PrivateRoute child={<Home/>}/>
    },
    {
        path: ROUTES.createOrg,
        element: <PrivateRoute child={<CreateOrg/>}/>
    },
    {
        path: ROUTES.createPost,
        element: <ModerRoute child={<CreatePost/>}/>
    },
    {
        path: `${ROUTES.review}/:id`,
        element: <ModerRoute child={<Review/>}/>
    },
    {
        path: `${ROUTES.reviewCreate}/:id`,
        element: <ModerRoute child={<CreateReview/>}/>
    },
    {
        path: `${ROUTES.post}/:id`,
        element: <PrivateRoute child={<Post/>}/>
    },
    {
        path: `${ROUTES.org}/:id`,
        element: <PrivateRoute child={<Org/>}/>
    },
    {
        path: ROUTES.addUser,
        element: <ModerRoute child={<AddUser/>}/>
    },
    {
        path: ROUTES.findOrg,
        element: <FindOrg/>
    }
]);


export {router, ROUTES};
