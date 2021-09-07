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
    utcDate: string,
    season: {
        id: number,
        startDate: string,
        endDate: string,
    },
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
    error: null | any,
}

export interface TeamsState {
    teams: ITeam[],
    loadingTeams: boolean,
    errorTeams: null | any,
}

export interface MatchesState {
    matches: IMatch[],
    activePage: number,
    loadingMatches: boolean,
    errorMatches: null | any
}

export interface TeamTable {
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
    goalDifference: number,
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
    loadingStandings: boolean,
    errorStandings: null | any
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
    FETCH_MATCHES_ERROR = "FETCH_MATCHES_ERROR",
    FETCH_MATCHES_SEASON = "FETCH_MATCHES_SEASON_SUCCESS",
    FETCH_MATCHES_DATE = "FETCH_MATCHES_SEASON_DATE",
    CHANGE_MATCHES_ACTIVE_PAGE = "CHANGE_MATCHES_ACTIVE_PAGE"
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
    payload: any
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
    payload: any
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
    payload: any
}

interface FetchMatchesAction {
    type: MatchesActionTypes.FETCH_MATCHES
}

interface FetchMatchesActionSuccess {
    type: MatchesActionTypes.FETCH_MATCHES_SUCCESS,
    payload: IMatch[]
}

interface FetchMatchesActionSeason {
    type: MatchesActionTypes.FETCH_MATCHES_SEASON,
    payload: IMatch[]
}

interface FetchMatchesActionDate {
    type: MatchesActionTypes.FETCH_MATCHES_DATE,
    payload: IMatch[]
}

interface FetchMatchesActionError {
    type: MatchesActionTypes.FETCH_MATCHES_ERROR,
    payload: any
}

interface ChangeMatchesActivePage {
    type: MatchesActionTypes.CHANGE_MATCHES_ACTIVE_PAGE,
    payload: number
}


export type LeagueAction = FetchLeagueAction | FetchLeagueActionSuccess | FetchLeagueActionError
export type MatchesAction = FetchMatchesAction | FetchMatchesActionSuccess | FetchMatchesActionError
    | ChangeMatchesActivePage | FetchMatchesActionSeason | FetchMatchesActionDate
export type TeamsAction = FetchTeamsAction | FetchTeamsActionSuccess | FetchTeamsActionError
export type StandingsAction = FetchStandingsAction | FetchStandingsActionSuccess | FetchStandingsActionError
