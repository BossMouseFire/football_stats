import React from 'react'
import {ILeagueCard} from "../../types/pageLeagues/types";
import {LeagueCard} from "./leagueCard/leagueCard";
import './pageLeagues.scss'
interface LeagueCardListProps{
    leagues: ILeagueCard[]
}
const LeagueCardList:React.FC<LeagueCardListProps> = ({leagues}) => {
    return(
        <div className={"leagues"}>
            {leagues.map(league => {
                return <LeagueCard key={league.id} league={league}/>
            })}
        </div>
    )
}
export default LeagueCardList;