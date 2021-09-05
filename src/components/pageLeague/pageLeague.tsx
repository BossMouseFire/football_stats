import React, {useEffect, useRef, useState} from "react";
import './pageLeague.scss'
import ball from './soccer-ball.svg'
import {useDispatch} from "react-redux";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {changeMatchesActivePage, fetchMatches} from "../../store/actionCreators/matches";
import {fetchTeams} from "../../store/actionCreators/teams";
import {fetchLeague} from "../../store/actionCreators/league";
import {fetchStandings} from "../../store/actionCreators/standings";
import TableStandings from "./tableStandings";
const PageLeague:React.FC = () => {

    const dispatch = useDispatch()

    const {basicInfo} = useTypeSelector(state => state.league)
    const {matches, filterMatches, activePage} = useTypeSelector(state => state.matches)
    const {teams} = useTypeSelector(state => state.teams)
    const {standings} = useTypeSelector(state => state.standings)
    const [isStandings, setStandings] = useState<boolean>(true)

    const matchesOnePage = 30;
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(matchesOnePage);
    const [pages, setPages] = useState<number[]>([]);


    const refButtonTeamList = useRef() as React.MutableRefObject<HTMLButtonElement>;
    const refButtonTeamTable = useRef() as React.MutableRefObject<HTMLButtonElement>;

    useEffect(() => {
        initialPages();
    }, [filterMatches])
    const initialPages = () => {
        const pageCount = Math.ceil(filterMatches.length / matchesOnePage);
        let array: number[] = [];
        for(let i = 1; i <= pageCount; i++){
            array.push(i)
        }
        setPages(array);
        changePage(0, matchesOnePage, 0)
    }

    const changePage = (start: number, end: number, active:number) => {
        dispatch(changeMatchesActivePage(active));
        setStart(start);
        setEnd(end);
    }


    useEffect(() => {
        const param:string | null = getParams("id");
        let id: number = Number(param)
        dispatch(fetchLeague(id))
        dispatch(fetchMatches(id))
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

    const changeTeamTable = (state: boolean) => {
        refButtonTeamTable.current.classList.toggle("activeButton")
        refButtonTeamList.current.classList.toggle("activeButton")
        setStandings(state)
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
                    </div>
                    <div className={"basicInfo"}>
                        <div>
                            <span>Даты проведения:</span>
                            <span>{basicInfo?.currentSeason?.startDate.replaceAll("-", ".")} - {basicInfo?.currentSeason?.endDate.replaceAll("-", ".")}</span>
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
                    <div className={"teamsListBlock"}>
                        <div className={"buttonsActionTeam"}>
                            <button className={"activeButton"} onClick={() => changeTeamTable(true)} ref={refButtonTeamTable}>Турнирная таблица</button>
                            <button onClick={() => changeTeamTable(false)} ref={refButtonTeamList}>Список команд</button>
                        </div>
                        {
                            isStandings ?
                                <TableStandings standings={standings}/>
                                :
                                <div className={"allTeams"}>
                                    {teams.map(team =>
                                        <div className={"team"} key={team.id}>
                                            <img src={team.crestUrl}/>
                                            <span>
                                                <a href={"/"}>{team.name}</a>
                                            </span>
                                        </div>
                                    )}
                                </div>
                        }
                    </div>
                    <div className={"matchesLeagueBlock"}>
                        <div className={"titleBlock"}>Матчи турнира</div>
                        <div className={"filterOfMatches"}>
                            <span>C</span>
                            <input type="date" name="calendar" className={"calendar"} value={"2021-09-02"}  max="2022-06-30" min="2018-06-30"/>
                            <span>До</span>
                            <input type="date" name="calendar" className={"calendar"} value={"2022-06-30"}  max="2022-06-30" min="2018-06-30"/>
                            <div className={"select"}>
                                <select>
                                    <option value={2020}>2020/2021</option>
                                    <option value={2019}>2019/2020</option>
                                    <option value={2018}>2018/2019</option>
                                    <option value={2017}>2017/2018</option>
                                </select>
                            </div>
                        </div>
                        <div className={"matchesLeagueList"}>
                            {filterMatches.slice(start, end).map(match =>

                                <div className={"match"} key={match.id}>
                                    <span>
                                        {`${match.utcDate.split("T")[0].split("-")[2]}:${match.utcDate.split("T")[0].split("-")[1]}:${match.utcDate.split("T")[0].split("-")[0]}`}
                                    </span>
                                    <span><a href={"/"}>{match.homeTeam.name}</a></span>
                                    <span>{match.status === "FINISHED" ? match.score.fullTime.homeTeam : "-"}</span>
                                    <span>:</span>
                                    <span>{match.status === "FINISHED" ? match.score.fullTime.awayTeam : "-"}</span>
                                    <span><a href={"/"}>{match.awayTeam.name}</a></span>
                                </div>

                            )}
                        </div>
                        <div className="pagination">
                            {pages.map(page =>
                                <a className={activePage === page - 1 ? "active" : ""} onClick={() => changePage( (page - 1) * matchesOnePage, page * matchesOnePage, page - 1)}>{page}</a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"endBar"}/>
        </div>
    )
}

export default PageLeague;