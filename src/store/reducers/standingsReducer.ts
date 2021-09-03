import {StandingsAction, StandingsActionTypes, StandingsState,} from "../../types/pageLeague/types";

const initialState:StandingsState = {
    standings: [],
    loading: false,
    error: null
}

export const standingsReducer = (state = initialState, action:StandingsAction):StandingsState => {
    switch (action.type){
        case StandingsActionTypes.FETCH_STANDINGS:
            return {standings: [], loading: true, error: null}
        case StandingsActionTypes.FETCH_STANDINGS_SUCCESS:
            return {standings: action.payload, loading: false, error: null}
        case StandingsActionTypes.FETCH_STANDINGS_ERROR:
            return {standings: [], loading: false, error: action.payload}
        default:
            return state
    }
}
