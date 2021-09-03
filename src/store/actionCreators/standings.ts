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
                    "X-Auth-Token": "6991e1a69b0344a6915649c53b9f6f5b"
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
