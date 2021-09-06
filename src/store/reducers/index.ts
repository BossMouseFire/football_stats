import {combineReducers} from "redux";
import {leaguesReducer} from "./leaguesReducer";
import {matchesReducer} from "./matchesReducer"
import {teamsReducer} from "./teamsReducer";
import {leagueReducer} from "./leagueReducer";
import {standingsReducer} from "./standingsReducer";
import {teamReducer} from "./teamReducer";
import {matchesTeamReducer} from "./matchesTeamReducer";

export const rootReducer = combineReducers({
    leagues: leaguesReducer,
    league: leagueReducer,
    matches: matchesReducer,
    teams: teamsReducer,
    standings: standingsReducer,
    team: teamReducer,
    matchesTeam: matchesTeamReducer
})

export type RootState = ReturnType<typeof rootReducer>