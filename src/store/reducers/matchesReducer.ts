import {
    MatchesAction,
    MatchesActionTypes,
    MatchesState,
} from "../../types/pageLeague/types";

const initialState:MatchesState = {
    matches: [],
    filterMatches: [],
    activePage: 0,
    loading: false,
    error: null
}

export const matchesReducer = (state = initialState, action:MatchesAction):MatchesState => {
    switch (action.type){
        case MatchesActionTypes.FETCH_MATCHES:
            return {matches: [], filterMatches: [], activePage: 0, loading: true, error: null}
        case MatchesActionTypes.FETCH_MATCHES_SUCCESS:
            return {matches: action.payload, filterMatches: action.payload, activePage: 0, loading: false, error: null}
        case MatchesActionTypes.FETCH_MATCHES_ERROR:
            return {matches: [], filterMatches: [], activePage: 0, loading: false, error: action.payload}
        case MatchesActionTypes.CHANGE_MATCHES_ACTIVE_PAGE:
            return {matches: state.matches, filterMatches: state.filterMatches, activePage: action.payload, loading: state.loading, error:state.error}
        default:
            return state
    }
}
