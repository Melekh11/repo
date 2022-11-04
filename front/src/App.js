import {RouterProvider} from "react-router-dom";
import {router} from "./components/router";
import "./styles/app.css"
import {Provider} from 'react-redux'
import {store} from "./redux/store";

// компонент приложения
function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}

export {App}
