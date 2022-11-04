import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {rootReducer} from "./reducers/rootReducer";

/**
 * создаём redux store
 */
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
)

export {store}
