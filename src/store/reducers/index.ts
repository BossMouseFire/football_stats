import {combineReducers} from "redux";
import {leaguesReducer} from "./leaguesReducer";
import {matchesReducer} from "./matchesReducer"
import {teamsReducer} from "./teamsReducer";
import {leagueReducer} from "./leagueReducer";
import {standingsReducer} from "./standingsReducer";

export const rootReducer = combineReducers({
    leagues: leaguesReducer,
    league: leagueReducer,
    matches: matchesReducer,
    teams: teamsReducer,
    standings: standingsReducer
})

export type RootState = ReturnType<typeof rootReducer>