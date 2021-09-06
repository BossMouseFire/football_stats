import {MatchesTeamAction, MatchesTeamActionTypes, MatchesTeamState} from "../../types/pageTeam/types";

const initialState:MatchesTeamState = {
    matches: [],
    activePage: 0,
    loading: false,
    error: null
}
export const matchesTeamReducer = (state = initialState, action:MatchesTeamAction):MatchesTeamState => {
    switch (action.type){
        case MatchesTeamActionTypes.FETCH_MATCHES_TEAM:
            return {matches: [], activePage: 0, loading: true, error: null}
        case MatchesTeamActionTypes.FETCH_MATCHES_TEAM_SUCCESS:
            return {matches: action.payload, activePage: 0, loading: false, error: null}
        case MatchesTeamActionTypes.FETCH_MATCHES_TEAM_ERROR:
            return {matches: [], activePage: 0, loading: false, error: action.payload}
        case MatchesTeamActionTypes.CHANGE_MATCHES_TEAM_ACTIVE_PAGE:
            return {matches: state.matches, activePage: action.payload, loading: state.loading, error:state.error}
        default:
            return state
    }
}