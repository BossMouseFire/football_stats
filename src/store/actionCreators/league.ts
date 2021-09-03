import {Dispatch} from "redux";
import {LeagueActionTypes} from "../../types/pageLeague/types";
import axios from "axios";
import {LeagueAction, ILeague} from "../../types/pageLeague/types";


export const fetchLeague = (id: number) => {
    return async (dispatch: Dispatch<LeagueAction>) => {
        try {
            const data = {
                headers: {
                    "X-Auth-Token": "6991e1a69b0344a6915649c53b9f6f5b"
                }
            }
            dispatch({type: LeagueActionTypes.FETCH_LEAGUE})
            const response = await axios.get<ILeague>(`https://api.football-data.org/v2/competitions/${id}`, data)
            dispatch({
                type: LeagueActionTypes.FETCH_LEAGUE_SUCCESS,
                payload: response.data
            })
        }
        catch (error) {
            dispatch({type: LeagueActionTypes.FETCH_LEAGUE_ERROR, payload: error})
        }
    }
}