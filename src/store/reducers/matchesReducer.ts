import {
    MatchesAction,
    MatchesActionTypes,
    MatchesState,
} from "../../types/pageLeague/types";

const initialState:MatchesState = {
    matches: [],
    activePage: 0,
    loadingMatches: false,
    errorMatches: null
}

export const matchesReducer = (state = initialState, action:MatchesAction):MatchesState => {
    switch (action.type){
        case MatchesActionTypes.FETCH_MATCHES:
            return {matches: [], activePage: 0, loadingMatches: true, errorMatches: null}
        case MatchesActionTypes.FETCH_MATCHES_SUCCESS:
            return {matches: action.payload, activePage: 0, loadingMatches: false, errorMatches: null}
        case MatchesActionTypes.FETCH_MATCHES_ERROR:
            return {matches: [], activePage: 0, loadingMatches: false, errorMatches: action.payload}
        case MatchesActionTypes.CHANGE_MATCHES_ACTIVE_PAGE:
            return {matches: state.matches, activePage: action.payload, loadingMatches: state.loadingMatches, errorMatches:state.errorMatches}
        case MatchesActionTypes.FETCH_MATCHES_SEASON:
            return {matches: action.payload, activePage: 0, loadingMatches: false, errorMatches: null}
        case MatchesActionTypes.FETCH_MATCHES_DATE:
            return {matches: action.payload, activePage: 0, loadingMatches: false, errorMatches: null}
        default:
            return state
    }
}
