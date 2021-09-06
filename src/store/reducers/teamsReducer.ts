import {
    TeamsAction,
    TeamsActionTypes,
    TeamsState
} from "../../types/pageLeague/types";

const initialState:TeamsState = {
    teams: [],
    loadingTeams: false,
    errorTeams: null
}

export const teamsReducer = (state = initialState, action:TeamsAction):TeamsState => {
    switch (action.type){
        case TeamsActionTypes.FETCH_TEAMS:
            return {teams: [], loadingTeams: true, errorTeams: null}
        case TeamsActionTypes.FETCH_TEAMS_SUCCESS:
            return {teams: action.payload, loadingTeams: false, errorTeams: null}
        case TeamsActionTypes.FETCH_TEAMS_ERROR:
            return {teams: [], loadingTeams: false, errorTeams: action.payload}
        default:
            return state
    }
}
