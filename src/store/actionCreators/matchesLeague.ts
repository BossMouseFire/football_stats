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
                    "X-Auth-Token": "d12e597043234fd1ad211e2c9d6f731d"
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

export const fetchMatchesOfSeason = (id: number, season: number) => {
    return async (dispatch: Dispatch<MatchesAction>) => {
        try {
            dispatch({
                type: MatchesActionTypes.FETCH_MATCHES
            })
            const data = {
                headers: {
                    "X-Auth-Token": "d12e597043234fd1ad211e2c9d6f731d"
                }
            }
            const response = await axios.get(`https://api.football-data.org/v2/competitions/${id}/matches?season=${season}`, data)
            dispatch({
                type: MatchesActionTypes.FETCH_MATCHES_SEASON,
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

export const fetchMatchesOfDate = (id: number, dataFrom: string, dataTo: string) => {
    return async (dispatch: Dispatch<MatchesAction>) => {
        try {
            dispatch({
                type: MatchesActionTypes.FETCH_MATCHES
            })
            const data = {
                headers: {
                    "X-Auth-Token": "d12e597043234fd1ad211e2c9d6f731d"
                }
            }
            const response = await axios.get(`https://api.football-data.org/v2/competitions/${id}/matches?dateFrom=${dataFrom}&dateTo=${dataTo}`, data)
            dispatch({
                type: MatchesActionTypes.FETCH_MATCHES_DATE,
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

export const changeMatchesActivePage = (page: number) => {
    return (dispatch: Dispatch<MatchesAction>) => {
        dispatch({
            type: MatchesActionTypes.CHANGE_MATCHES_ACTIVE_PAGE,
            payload: page
        })
    }
}