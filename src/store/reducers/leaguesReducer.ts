import {LeaguesAction, LeaguesActionTypes, LeaguesState} from "../../types/pageLeagues/types";

const initialState: LeaguesState = {
    leagues: [],
    filterLeagues: [],
    loading: false,
    error: null,
}

export const leaguesReducer = (state = initialState, action:LeaguesAction): LeaguesState => {
    switch (action.type) {
        case LeaguesActionTypes.FETCH_LEAGUES:
            return {loading: true, leagues: [], filterLeagues: [], error: null}
        case LeaguesActionTypes.FETCH_LEAGUES_SUCCESS:
            return {loading: false, leagues: action.payload, filterLeagues: action.payload, error: null}
        case LeaguesActionTypes.FETCH_LEAGUES_ERROR:
            return {loading: false, leagues: [], filterLeagues: [], error: action.payload}
        case LeaguesActionTypes.FILTER_LEAGUES:
            return {loading: false, leagues: state.leagues, filterLeagues: action.payload.filteredLeagues, error: null}
        default:
            return state
    }
}