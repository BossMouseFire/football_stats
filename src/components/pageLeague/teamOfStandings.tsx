import React from 'react'
import {TeamTable} from "../../types/pageLeague/types";
import {useHistory} from "react-router-dom";
import {fetchTeam} from "../../store/actionCreators/team";
import {useDispatch} from "react-redux";
interface StandingsTeam{
    team: TeamTable
}


const TeamOfStandings:React.FC<StandingsTeam> = ({team}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const changeTeam = () => {
        history.push(`/team?id=${team.team.id}`)
        history.go(0)
    }
    return (
        <tr key={team.team.id}>
            <td className={"position"}>{team.position}</td>
            <td>
                <div>
                    <img src={team.team.crestUrl}/>
                    <span onClick={() => changeTeam()}>
                        {team.team.name}
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