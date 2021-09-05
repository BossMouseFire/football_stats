import React from 'react'
import {TeamTable} from "../../types/pageLeague/types";
import TeamOfStandings from "./teamOfStandings";


interface StandingsListProps{
    standings: TeamTable[]
}

const TableStandings:React.FC<StandingsListProps> = ({standings}) => {
    return (
        <div className="tableStandings">
            <table>
                <tr>
                    <th>#</th>
                    <th>Команда</th>
                    <th>С</th>
                    <th>В</th>
                    <th>Н</th>
                    <th>П</th>
                    <th>РГ</th>
                    <th>Очки</th>
                </tr>
                {standings.map(team =>
                    <TeamOfStandings team={team}/>
                )}
            </table>
        </div>
    )
}

export default TableStandings