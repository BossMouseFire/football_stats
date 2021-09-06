import {Dispatch} from "redux";
import {TeamAction, TeamActionTypes} from "../../types/pageTeam/types";
import axios from "axios";


export const fetchTeam = (id: number) => {
    return async (dispatch: Dispatch<TeamAction>) => {
        try {
            dispatch({
                type: TeamActionTypes.FETCH_TEAM
            })
            const data = {
                headers: {
                    "X-Auth-Token": process.env.REACT_APP_SECRET_KEY
                }
            }
            const response = await axios.get(`https://api.football-data.org/v2/teams/${id}`, data)
            dispatch({
                type: TeamActionTypes.FETCH_TEAM_SUCCESS,
                payload: response.data
            })
        }
        catch (error){
            dispatch({
                type: TeamActionTypes.FETCH_TEAM_ERROR,
                payload: error
            })
        }
    }
}
