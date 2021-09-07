import React from 'react'
import {IMatch} from "../../types/pageTeam/types";
import MatchTeam from "./matchTeam";
import "./pageTeam.scss"

interface IMatchesTeamList {
    matches: IMatch[],
    start: number,
    end: number,
}
const MatchesTeamList:React.FC<IMatchesTeamList> = ({matches, start, end}) => {
    return (
        <div className={"matchesTeamList"}>
            {matches.slice(start, end).map(match =>
                <MatchTeam match={match}/>
            )}

        </div>
    )
}

export default MatchesTeamList