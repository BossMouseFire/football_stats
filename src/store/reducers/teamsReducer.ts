import {
    TeamsAction,
    TeamsActionTypes,
    TeamsState
} from "../../types/pageLeague/types";

const initialState:TeamsState = {
    teams: [],
    loading: false,
    error: null
}

export const teamsReducer = (state = initialState, action:TeamsAction):TeamsState => {
    switch (action.type){
        case TeamsActionTypes.FETCH_TEAMS:
            return {teams: [], loading: true, error: null}
        case TeamsActionTypes.FETCH_TEAMS_SUCCESS:
            return {teams: action.payload, loading: false, error: null}
        case TeamsActionTypes.FETCH_TEAMS_ERROR:
            return {teams: [], loading: false, error: action.payload}
        default:
            return state
    }
}
