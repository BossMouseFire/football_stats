import {combineReducers} from "redux";
import {leaguesReducer} from "./leaguesReducer";

export const rootReducer = combineReducers({
    leagues: leaguesReducer
})

export type RootState = ReturnType<typeof rootReducer>