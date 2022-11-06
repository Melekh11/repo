import {orgConstants} from "../constants/org.constants";

function orgReducer(state = {}, action){
    switch (action.type){
        case orgConstants.SET_CURRENT_ORG:
            return {currentOrg: action.org}
        case orgConstants.CLEAR_ORG:
            return {}
        default:
            return state
    }
}

export {orgReducer}
