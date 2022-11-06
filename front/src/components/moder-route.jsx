import {store} from "../redux/store";
import {Navigate} from "react-router-dom";
import {ROUTES} from "./router";

const ModerRoute = ({child}) => {

    const state = store.getState()
    const user = state.authentication.user;
    const isLogged = state.authentication.logged;

    if (!isLogged || !user) {
        return <Navigate to={ROUTES.login} replace />
    }

    const isModer = state.authentication.user.positions.filter(
        (position) => position.status === "moder").length > 0;
    if (!isModer) {
        return <Navigate to={ROUTES.createOrg} replace />
    }

    return child;
};

export default ModerRoute;
