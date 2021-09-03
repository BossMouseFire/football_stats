import {
    MatchesAction,
    MatchesActionTypes,
    MatchesState,
} from "../../types/pageLeague/types";

const initialState:MatchesState = {
    matches: [],
    loading: false,
    error: null
}

export const matchesReducer = (state = initialState, action:MatchesAction):MatchesState => {
    switch (action.type){
        case MatchesActionTypes.FETCH_MATCHES:
            return {matches: [], loading: true, error: null}
        case MatchesActionTypes.FETCH_MATCHES_SUCCESS:
            return {matches: action.payload, loading: false, error: null}
        case MatchesActionTypes.FETCH_MATCHES_ERROR:
            return {matches: [], loading: false, error: action.payload}
        default:
            return state
    }
}
