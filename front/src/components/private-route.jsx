import {store} from "../redux/store";
import { Navigate } from 'react-router-dom';
import {ROUTES} from "./router";

const PrivateRoute = ({child}) => {

    const isLogged = store.getState().authentication.logged;

    return isLogged ? child : <Navigate to={ROUTES.login} replace />;
};

export default PrivateRoute;
