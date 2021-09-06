export interface IArea{
    id: number,
    name: string,
    ensignUrl: string | null
}

export interface ILeagueCard{
    id: number,
    name: string,
    area: IArea,
    emblemUrl: string | null,
    currentSeason: {
        startDate: string,
        endDate: string,
        currentMatchday: number
    }

}

export interface LeaguesState {
    leagues: ILeagueCard[],
    filterLeagues: ILeagueCard[],
    loading: boolean,
    error: null | string
}
export enum LeaguesActionTypes {
    FETCH_LEAGUES = "FETCH_LEAGUES",
    FETCH_LEAGUES_SUCCESS = "FETCH_LEAGUES_SUCCESS",
    FETCH_LEAGUES_ERROR = "FETCH_LEAGUES_ERROR",
    FILTER_LEAGUES = "FILTER_LEAGUES"
}
interface FetchLeaguesAction {
    type: LeaguesActionTypes.FETCH_LEAGUES
}

interface FetchLeaguesActionSuccess {
    type: LeaguesActionTypes.FETCH_LEAGUES_SUCCESS;
    payload: ILeagueCard[]
}

interface FetchLeaguesActionError {
    type: LeaguesActionTypes.FETCH_LEAGUES_ERROR;
    payload: string
}

interface FilterLeagues {
    type: LeaguesActionTypes.FILTER_LEAGUES;
    payload: {
        filteredLeagues: ILeagueCard[]
    }
}

export type LeaguesAction = FetchLeaguesActionError |  FetchLeaguesAction | FetchLeaguesActionSuccess | FilterLeagues

export interface IRequestLeagues{
    competitions: ILeagueCard[]
}

