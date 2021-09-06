import {StandingsAction, StandingsActionTypes, StandingsState,} from "../../types/pageLeague/types";

const initialState:StandingsState = {
    standings: [],
    loadingStandings: false,
    errorStandings: null
}

export const standingsReducer = (state = initialState, action:StandingsAction):StandingsState => {
    switch (action.type){
        case StandingsActionTypes.FETCH_STANDINGS:
            return {standings: [], loadingStandings: true, errorStandings: null}
        case StandingsActionTypes.FETCH_STANDINGS_SUCCESS:
            return {standings: action.payload, loadingStandings: false, errorStandings: null}
        case StandingsActionTypes.FETCH_STANDINGS_ERROR:
            return {standings: [], loadingStandings: false, errorStandings: action.payload}
        default:
            return state
    }
}
