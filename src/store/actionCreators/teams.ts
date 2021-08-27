import {Dispatch} from "redux";
import {TeamsAction, TeamsActionTypes} from "../../types/pageLeague/types";
import axios from "axios";


export const fetchTeams = (id: number) => {
    return async (dispatch: Dispatch<TeamsAction>) => {
        try {
            dispatch({
                type: TeamsActionTypes.FETCH_TEAMS
            })
            const response = await axios.get(`https://api.football-data.org/v2/competitions/${id}/teams`)
            dispatch({
                type: TeamsActionTypes.FETCH_TEAMS_SUCCESS,
                payload: response.data.teams
            })
        }
        catch (error){
            dispatch({
                type: TeamsActionTypes.FETCH_TEAMS_ERROR,
                payload: error
            })
        }
    }
}
