import {Dispatch} from "redux";
import {IRequestStandings, StandingsAction, StandingsActionTypes} from "../../types/pageLeague/types";
import axios from "axios";


export const fetchStandings = (id: number) => {
    return async (dispatch: Dispatch<StandingsAction>) => {
        try {
            dispatch({
                type: StandingsActionTypes.FETCH_STANDINGS
            })
            const data = {
                headers: {
                    "X-Auth-Token": "d12e597043234fd1ad211e2c9d6f731d"
                }
            }
            const response = await axios.get<IRequestStandings>(`https://api.football-data.org/v2/competitions/${id}/standings`, data)
            dispatch({
                type: StandingsActionTypes.FETCH_STANDINGS_SUCCESS,
                payload: response.data.standings[0].table
            })
        }
        catch (error){
            dispatch({
                type: StandingsActionTypes.FETCH_STANDINGS_ERROR,
                payload: error
            })
        }
    }
}
