import {Dispatch} from "redux";
import {MatchesAction, MatchesActionTypes} from "../../types/pageLeague/types";
import axios from "axios";


export const fetchMatches = (id: number) => {
    return async (dispatch: Dispatch<MatchesAction>) => {
        try {
            dispatch({
                type: MatchesActionTypes.FETCH_MATCHES
            })
            const data = {
                headers: {
                    "X-Auth-Token": "6991e1a69b0344a6915649c53b9f6f5b"
                }
            }
            const response = await axios.get(`https://api.football-data.org/v2/competitions/${id}/matches`, data)
            dispatch({
                type: MatchesActionTypes.FETCH_MATCHES_SUCCESS,
                payload: response.data.matches
            })
        }
        catch (error){
            dispatch({
                type: MatchesActionTypes.FETCH_MATCHES_ERROR,
                payload: error
            })
        }
    }
}
