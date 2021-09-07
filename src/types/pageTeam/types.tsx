
export interface ITeam {
    id: number,
    shortName: string,
    crestUrl: string
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

export enum TeamActionTypes {
    FETCH_TEAM = "FETCH_TEAM",
    FETCH_TEAM_SUCCESS = "FETCH_TEAM_SUCCESS",
    FETCH_TEAM_ERROR = "FETCH_TEAM_ERROR"
}

export enum MatchesTeamActionTypes {
    FETCH_MATCHES_TEAM = "FETCH_MATCHES_TEAM",
    FETCH_MATCHES_TEAM_SUCCESS = "FETCH_MATCHES_TEAM_SUCCESS",
    FETCH_MATCHES_TEAM_ERROR = "FETCH_MATCHES_TEAM_ERROR",
    FETCH_MATCHES_TEAM_SEASON = "FETCH_MATCHES_SEASON_TEAM_SUCCESS",
    FETCH_MATCHES_TEAM_DATE = "FETCH_MATCHES_SEASON_TEAM_DATE",
    CHANGE_MATCHES_TEAM_ACTIVE_PAGE = "CHANGE_MATCHES_TEAM_ACTIVE_PAGE"
}

interface FetchMatchesTeamAction {
    type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM
}

interface FetchMatchesTeamActionSuccess {
    type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM_SUCCESS,
    payload: IMatch[]
}

interface FetchMatchesTeamActionSeason {
    type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM_SEASON,
    payload: IMatch[]
}

interface FetchMatchesTeamActionDate {
    type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM_DATE,
    payload: IMatch[]
}

interface FetchMatchesTeamActionError {
    type: MatchesTeamActionTypes.FETCH_MATCHES_TEAM_ERROR,
    payload: any
}

interface ChangeMatchesTeamActivePage {
    type: MatchesTeamActionTypes.CHANGE_MATCHES_TEAM_ACTIVE_PAGE,
    payload: number
}


export interface TeamState {
    team: ITeam,
    loading: boolean,
    error: null | any,
}

export interface MatchesTeamState {
    matches: IMatch[],
    activePage: number,
    loading: boolean,
    error: null | any
}


interface FetchTeamAction {
    type: TeamActionTypes.FETCH_TEAM
}

interface FetchTeamActionSuccess {
    type: TeamActionTypes.FETCH_TEAM_SUCCESS,
    payload: ITeam
}

interface FetchTeamActionError {
    type: TeamActionTypes.FETCH_TEAM_ERROR,
    payload: any
}

export type TeamAction = FetchTeamAction | FetchTeamActionSuccess | FetchTeamActionError
export type MatchesTeamAction = FetchMatchesTeamAction | FetchMatchesTeamActionSuccess | FetchMatchesTeamActionError |
    FetchMatchesTeamActionDate | FetchMatchesTeamActionSeason | ChangeMatchesTeamActivePage