import {Dispatch} from "redux";
import {TeamsAction, TeamsActionTypes} from "../../types/pageLeague/types";
import axios from "axios";


export const fetchTeams = (id: number) => {
    return async (dispatch: Dispatch<TeamsAction>) => {
        try {
            dispatch({
                type: TeamsActionTypes.FETCH_TEAMS
            })
            const data = {
                headers: {
                    "X-Auth-Token": "6991e1a69b0344a6915649c53b9f6f5b"
                }
            }
            const response = await axios.get(`https://api.football-data.org/v2/competitions/${id}/teams`, data)
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
