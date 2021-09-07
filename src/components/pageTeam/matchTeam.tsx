import React from 'react'
import {IMatch} from "../../types/pageTeam/types";
import "./pageTeam.scss"
import {useHistory} from "react-router-dom"
interface IMatchProps {
    match: IMatch,
}

const MatchTeam:React.FC<IMatchProps> = ({match}) => {
    const history = useHistory()
    const changeTeam = (id: number) => {
        history.push(`/team?id=${id}`)
        window.location.reload();
    }
    return (
        <div className={"match"} key={match.id}>
                            <span>
                                {`${match.utcDate.split("T")[0].split("-")[2]}:${
                                    match.utcDate.split("T")[0].split("-")[1]}:${
                                    match.utcDate.split("T")[0].split("-")[0]}`}
                            </span>
            <span className={match.score.fullTime.homeTeam > match.score.fullTime.awayTeam ? "winnerTeam" : ""} onClick={() => changeTeam(match.homeTeam.id)}>
                {match.homeTeam.name}
            </span>
            <span>{match.status === "FINISHED" ? match.score.fullTime.homeTeam : "-"}</span>
            <span>:</span>
            <span>{match.status === "FINISHED" ? match.score.fullTime.awayTeam : "-"}</span>
            <span className={match.score.fullTime.homeTeam < match.score.fullTime.awayTeam ? "winnerTeam" : ""} onClick={() => changeTeam(match.awayTeam.id)}>
                {match.awayTeam.name}
            </span>
        </div>
    )
}

export default MatchTeam