import {Dispatch} from "redux";
import {MatchesTeamAction, MatchesTeamActionTypes} from "../../types/pageTeam/types";
import axios from "axios";

export const fetchMatchesTeam = (id: number, venue: string) => {
    return async (dispatch: Dispatch<MatchesTeamAction>) => {
        try {
            dispatch({
                type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM
            })
            const data = {
                headers: {
                    "X-Auth-Token": "d12e597043234fd1ad211e2c9d6f731d"
                }
            }
            const response = await axios.get(`https://api.football-data.org/v2/teams/${id}/matches?venue=${venue}`, data)
            dispatch({
                type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM_SUCCESS,
                payload: response.data.matches
            })
        }
        catch (error){
            dispatch({
                type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM_ERROR,
                payload: error
            })
        }
    }
}

export const fetchMatchesTeamOfDate = (id: number, venue: string, dateFrom: string, dateTo: string) => {
    return async (dispatch: Dispatch<MatchesTeamAction>) => {
        try {
            dispatch({
                type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM
            })
            const data = {
                headers: {
                    "X-Auth-Token": "d12e597043234fd1ad211e2c9d6f731d"
                }
            }
            const response = await axios.get(
                `https://api.football-data.org/v2/teams/${id}/matches?venue=${venue}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
                data)
            dispatch({
                type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM_SUCCESS,
                payload: response.data.matches
            })
        }
        catch (error){
            dispatch({
                type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM_ERROR,
                payload: error
            })
        }
    }
}

export const changeMatchesTeamActivePage = (page: number) => {
    return (dispatch: Dispatch<MatchesTeamAction>) => {
        dispatch({
            type: MatchesTeamActionTypes.CHANGE_MATCHES_TEAM_ACTIVE_PAGE,
            payload: page
        })
    }
}