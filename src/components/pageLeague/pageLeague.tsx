import React, {useEffect} from "react";
import './pageLeague.scss'
import ball from './soccer-ball.svg'
import {useDispatch} from "react-redux";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {fetchMatches} from "../../store/actionCreators/matches";
import {fetchTeams} from "../../store/actionCreators/teams";
import {fetchLeague} from "../../store/actionCreators/league";
import {fetchStandings} from "../../store/actionCreators/standings";
const PageLeague:React.FC = () => {

    const dispatch = useDispatch()

    const {basicInfo} = useTypeSelector(state => state.league)
    const {matches} = useTypeSelector(state => state.matches)
    const {teams} = useTypeSelector(state => state.teams)
    const {standings} = useTypeSelector(state => state.standings)

    useEffect(() => {
        const param:string | null = getParams("id");
        let id: number = Number(param)
        dispatch(fetchLeague(id))
        // dispatch(fetchMatches(id))
        dispatch(fetchTeams(id))
        dispatch(fetchStandings(id))
    }, [dispatch])

    useEffect(() => {
        console.log(standings)
    }, [standings])
    const getParams = (key:string) : string | null => {
        const params:string = window.location.search.substring(1);
        const arrayParams: Array<string> = params.split("&");
        for (let param in arrayParams){
            const map: Array<string> = arrayParams[param].split("=");
            if(map[0] === key) return map[1];
        }
        return null;
    }

    return(
        <div className={"league"}>
            <div className={"navbar"}>
                <img src={ball}/>
                <span>FootSTAT</span>
            </div>
            <div className={"mainPart"}>
                <div className={"descriptionLeague"}>
                    <div className={"leagueName"}>
                        <span>{basicInfo.name}</span>
                        <div className={"select"}>
                            <select>
                                <option>2020/2021</option>
                                <option>2019/2020</option>
                                <option>2018/2019</option>
                                <option>2017/2018</option>
                            </select>
                        </div>
                    </div>
                    <div className={"basicInfo"}>
                        <div>
                            <span>Даты проведения:</span>
                            <span>{basicInfo?.currentSeason?.startDate} - {basicInfo?.currentSeason?.endDate}</span>
                        </div>
                        <div>
                            <span>Количество команд:</span>
                            <span>{teams.length}</span>
                        </div>
                        <div>
                            <span>Стадия сезона:</span>
                            <span>{basicInfo?.currentSeason?.currentMatchday}-й тур чемпионата</span>
                        </div>
                    </div>
                </div>
                <div className={"actionsLeague"}>
                    <div className={"teamsList"}>
                        <div className={"buttonsActionTeam"}>
                            <button>Турнирная таблица</button>
                            <button>Список команд</button>
                        </div>
                        <div className={"teams"}>
                            {teams.map(team =>
                                <div className={"team"} key={team.id}>
                                    <img src={team.crestUrl}/>
                                    <span>
                                        <a href={"/"}>{team.name}</a>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLeague;