import React from 'react'
import {IMatch} from "../../types/pageTeam/types";
import "./pageTeam.scss"
interface IMatchProps {
    match: IMatch
}

const MatchTeam:React.FC<IMatchProps> = ({match}) => {
    return (
        <div className={"match"} key={match.id}>
                            <span>
                                {`${match.utcDate.split("T")[0].split("-")[2]}:${
                                    match.utcDate.split("T")[0].split("-")[1]}:${
                                    match.utcDate.split("T")[0].split("-")[0]}`}
                            </span>
            <span className={match.score.fullTime.homeTeam > match.score.fullTime.awayTeam ? "winnerTeam" : ""}><a href={`/team?id=${match.homeTeam.id}`}>{match.homeTeam.name}</a></span>
            <span>{match.status === "FINISHED" ? match.score.fullTime.homeTeam : "-"}</span>
            <span>:</span>
            <span>{match.status === "FINISHED" ? match.score.fullTime.awayTeam : "-"}</span>
            <span className={match.score.fullTime.homeTeam < match.score.fullTime.awayTeam ? "winnerTeam" : ""}><a href={`/team?id=${match.awayTeam.id}`}>{match.awayTeam.name}</a></span>
        </div>
    )
}

export default MatchTeam