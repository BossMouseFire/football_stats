import {ILeagueCard, IRequestLeagues, LeaguesAction, LeaguesActionTypes} from "../../types/pageLeagues/types";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchLeagues = () => {
    return async (dispatch: Dispatch<LeaguesAction>) => {
        try {
            const data = {
                headers: {
                    "X-Auth-Token": "6991e1a69b0344a6915649c53b9f6f5b"
                }
            }
            dispatch({type: LeaguesActionTypes.FETCH_LEAGUES})
            const response = await axios.get<IRequestLeagues>("https://api.football-data.org/v2/competitions?plan=TIER_ONE", data)
            dispatch({
                type: LeaguesActionTypes.FETCH_LEAGUES_SUCCESS,
                payload: response.data.competitions
                })
        }
        catch (error) {
            dispatch({type: LeaguesActionTypes.FETCH_LEAGUES_ERROR, payload: error})
        }
    }
}

export const filteringLeagues = (value: string, leagues: ILeagueCard[]) => {
    return (dispatch: Dispatch<LeaguesAction>) => {
        const filterLeagues: ILeagueCard[]  = leagues.filter(league => {
            if((league.name.toLowerCase()).indexOf(value.toLowerCase(), 0) !== -1){
                return league;
            }
            return false
        });
        dispatch({
            type: LeaguesActionTypes.FILTER_LEAGUES,
            payload: {
                filteredLeagues: filterLeagues
            }
        })
    }
}