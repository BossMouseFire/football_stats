import {LeagueState, ILeague, LeagueAction, LeagueActionTypes} from "../../types/pageLeague/types";

const initialState:LeagueState = {
    basicInfo: {} as ILeague,
    loading: false,
    error: null
}

export const leagueReducer = (state = initialState, action:LeagueAction):LeagueState => {
    switch (action.type){
        case LeagueActionTypes.FETCH_LEAGUE:
            return {basicInfo: {} as ILeague, loading: true, error:  null}
        case LeagueActionTypes.FETCH_LEAGUE_SUCCESS:
            return {basicInfo: action.payload, loading: false, error: null}
        case LeagueActionTypes.FETCH_LEAGUE_ERROR:
            return {basicInfo: {} as ILeague, loading: false, error: action.payload}
        default:
            return state
    }
}
