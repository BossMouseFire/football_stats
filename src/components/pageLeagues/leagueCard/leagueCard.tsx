import React from 'react'
import './leagueCard.scss'
import {ILeagueCard} from "../../../types/pageLeagues/types";
import {useHistory} from "react-router-dom";

interface LeagueCardProps{
    league: ILeagueCard
}

export const LeagueCard:React.FC<LeagueCardProps> =
    ({
       league
     }) => {
    const history = useHistory();
    return(
        <div className={'leagueCard'}>
            <div className={"titleLeague"}>
                <div>
                    <img src={league.area.ensignUrl
                        ? league.area.ensignUrl
                        : league.emblemUrl ? league.emblemUrl :
                            "/images/leaguesLogo/premier-league.svg"} alt={league.name}/>
                </div>
                <div>
                    {league.name}
                </div>
            </div>
            <div className={"dateLeague"}>
                <div>
                    {league.currentSeason.startDate.split("-")[0]}
                    /
                    {league.currentSeason.endDate.split("-")[0]}
                </div>
                <div>
                    {league.currentSeason.startDate.replaceAll("-", ".")}
                    -
                    {league.currentSeason.endDate.replaceAll("-", ".")}
                </div>
            </div>
            <div className={"descriptionLeague"}>
                <div className={"stageCompetition"}>
                    <div>
                        Стадия сезона
                    </div>
                    <div>
                        {league.currentSeason.currentMatchday}-й тур чемпионата
                    </div>
                </div>

                    <div className={"aboutCompetition"} onClick={() => history.push(`/league?id=${league.id}`)}>
                            Узнать подробнее
                    </div>
            </div>
        </div>
    )
}
