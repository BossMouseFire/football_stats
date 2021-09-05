import {
    ITeam,
    TeamAction,
    TeamActionTypes,
    TeamState
} from "../../types/pageTeam/types";

const initialState:TeamState = {
    team: {} as ITeam,
    loading: false,
    error: null
}

export const teamReducer = (state = initialState, action:TeamAction):TeamState => {
    switch (action.type){
        case TeamActionTypes.FETCH_TEAM:
            return {team: {} as ITeam, loading: true, error: null}
        case TeamActionTypes.FETCH_TEAM_SUCCESS:
            return {team: action.payload, loading: false, error: null}
        case TeamActionTypes.FETCH_TEAM_ERROR:
            return {team: {} as ITeam, loading: false, error: action.payload}
        default:
            return state
    }
}
