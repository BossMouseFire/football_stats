import React from 'react'
import {TeamTable} from "../../types/pageLeague/types";

interface StandingsTeam{
    team: TeamTable
}


const TeamOfStandings:React.FC<StandingsTeam> = ({team}) => {
    return (
        <tr key={team.team.id}>
            <td className={"position"}>{team.position}</td>
            <td>
                <div>
                    <img src={team.team.crestUrl}/>
                    <span>
                        <a href={`/team?id=${team.team.id}`}>{team.team.name}</a>
                    </span>
                </div>
            </td>
            <td>{team.playedGames}</td>
            <td>{team.won}</td>
            <td>{team.draw}</td>
            <td>{team.lost}</td>
            <td>{team.goalDifference}</td>
            <td>{team.points}</td>
        </tr>
    )
}

export default TeamOfStandings