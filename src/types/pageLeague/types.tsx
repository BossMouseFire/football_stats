export interface ILeague {
    id: number,
    name: string,
    currentSeason?: ISeason
}

interface ISeason {
    id: number
    startDate: string,
    endDate: string,
    currentMatchday: number
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
    name: string,
    crestUrl: string,
}

export interface LeagueState {
    basicInfo: ILeague,
    loading: boolean,
    error: null | string,
}

export interface TeamsState {
    teams: ITeam[],
    loading: boolean,
    error: null | string,
}

export interface MatchesState {
    matches: IMatch[],
    loading: boolean,
    error: null | string
}

interface TeamTable {
    position: number,
    team: {
        id: number,
        name: string,
        crestUrl: string
    },
    playedGames: number,
    won: number,
    draw: number,
    lost: number,
    points: number,
}

export interface IRequestStandings {
    standings: [
        {
            table: TeamTable[]
        }
    ]
}

export interface StandingsState {
    standings: TeamTable[],
    loading: boolean,
    error: null | string
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
    FETCH_MATCHES_SUCCESS = "FETCH_MATCHES_SUCCESS",
    FETCH_MATCHES_ERROR = "FETCH_MATCHES_ERROR"
}

export enum StandingsActionTypes {
    FETCH_STANDINGS = "FETCH_STANDINGS",
    FETCH_STANDINGS_SUCCESS = "FETCH_STANDINGS_SUCCESS",
    FETCH_STANDINGS_ERROR = "FETCH_STANDINGS_ERROR"
}

interface FetchStandingsAction {
    type: StandingsActionTypes.FETCH_STANDINGS
}

interface FetchStandingsActionSuccess {
    type: StandingsActionTypes.FETCH_STANDINGS_SUCCESS,
    payload: TeamTable[]
}

interface FetchStandingsActionError {
    type: StandingsActionTypes.FETCH_STANDINGS_ERROR,
    payload: string
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
export type StandingsAction = FetchStandingsAction | FetchStandingsActionSuccess | FetchStandingsActionError
