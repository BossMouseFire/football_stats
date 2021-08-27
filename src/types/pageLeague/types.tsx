export interface ILeague {
    id: number,
    name: string,
    currentSeason: {
        id: number
        startDate: string,
        endDate: string,
        currentMatchday: number
    }
}

export interface IMatch {
    id: number,
    status: string,
    score: {
        winner: string,
        fullTime: {
            homeTeam: number,
            awayTeam: number
        },
        penalties: {
            homeTeam: number | null,
            awayTeam: number | null
        }
    },
    homeTeam: {
        id: number,
        name: string
    },
    awayTeam: {
        "id": number,
        "name": string
    }
}

export interface ITeam {
    id: number,
    shortName: string,
    crestUrl: string,
}

export interface LeagueState {
    basicInfo: ILeague | null,
    loading: boolean,
    error: null | string,
}

export interface TeamsState {
    teams: ITeam[],
    loading: boolean,
    error: null | string,
}

export enum LeagueActionTypes {
    FETCH_LEAGUE = "FETCH_LEAGUE",
    FETCH_LEAGUE_SUCCESS = "FETCH_LEAGUE_SUCCESS",
    FETCH_LEAGUE_ERROR = "FETCH_LEAGUE_ERROR"
}

export enum TeamsActionTypes {
    FETCH_TEAMS = "FETCH_TEAMS",
    FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS",
    FETCH_TEAMS_ERROR = "FETCH_TEAMS_ERROR"
}

export enum MatchesActionTypes {
    FETCH_MATCHES = "FETCH_MATCHES",
    FETCH_MATCHES_SUCCESS = "FETCH_MATCHES",
    FETCH_MATCHES_ERROR = "FETCH_MATCHES"
}

interface FetchLeagueAction {
    type: LeagueActionTypes.FETCH_LEAGUE
}

interface FetchLeagueActionSuccess {
    type: LeagueActionTypes.FETCH_LEAGUE_SUCCESS,
    payload: ILeague
}

interface FetchLeagueActionError {
    type: LeagueActionTypes.FETCH_LEAGUE_ERROR,
    payload: string
}

interface FetchTeamsAction {
    type: TeamsActionTypes.FETCH_TEAMS
}

interface FetchTeamsActionSuccess {
    type: TeamsActionTypes.FETCH_TEAMS_SUCCESS,
    payload: ITeam[]
}

interface FetchTeamsActionError {
    type: TeamsActionTypes.FETCH_TEAMS_ERROR,
    payload: string
}

interface FetchMatchesAction {
    type: MatchesActionTypes.FETCH_MATCHES
}

interface FetchMatchesActionSuccess {
    type: MatchesActionTypes.FETCH_MATCHES_SUCCESS,
    payload: IMatch[]
}

interface FetchMatchesActionError {
    type: MatchesActionTypes.FETCH_MATCHES_ERROR,
    payload: string
}

export type LeagueAction = FetchLeagueAction | FetchLeagueActionSuccess | FetchLeagueActionError
export type MatchesAction = FetchMatchesAction | FetchMatchesActionSuccess | FetchMatchesActionError
export type TeamsAction = FetchTeamsAction | FetchTeamsActionSuccess | FetchTeamsActionError
