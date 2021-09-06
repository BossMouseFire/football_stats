import React, {useEffect, useRef, useState} from "react";
import './pageLeague.scss'
import ball from '../otherComponents/soccer-ball.svg'
import {useDispatch} from "react-redux";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {
    changeMatchesActivePage,
    fetchMatches,
    fetchMatchesOfDate,
    fetchMatchesOfSeason
} from "../../store/actionCreators/matchesLeague";
import {fetchTeams} from "../../store/actionCreators/teams";
import {fetchLeague} from "../../store/actionCreators/league";
import {fetchStandings} from "../../store/actionCreators/standings";
import TableStandings from "./tableStandings";
import Navbar from "../otherComponents/navBar";
import Preloader from "../otherComponents/preloader";
import Error from "../otherComponents/error";
const PageLeague:React.FC = () => {

    const dispatch = useDispatch()

    const {basicInfo} = useTypeSelector(state => state.league)
    const {matches, activePage, loadingMatches, errorMatches} = useTypeSelector(state => state.matches)
    const {teams, errorTeams, loadingTeams} = useTypeSelector(state => state.teams)
    const {standings, loadingStandings, errorStandings} = useTypeSelector(state => state.standings)
    const [isStandings, setStandings] = useState<boolean>(true)

    const matchesOnePage = 30;
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(matchesOnePage);
    const [pages, setPages] = useState<number[]>([]);

    const [dataFrom, setDataFrom] = useState<string>("")
    const [dataTo, setDataTo] = useState<string>("")

    const refButtonTeamList = useRef() as React.MutableRefObject<HTMLButtonElement>;
    const refButtonTeamTable = useRef() as React.MutableRefObject<HTMLButtonElement>;
    const [flag, setFlag] = useState<number>(1)
    const [seasonState, setSeasonState] = useState<number>(2021)

    useEffect(() => {
        initialPages();
    }, [matches])

    const initialPages = () => {
        const pageCount = Math.ceil(matches.length / matchesOnePage);
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
        const startDateLeague = localStorage.getItem("startDateLeague")
        const endDateLeague = localStorage.getItem("endDateLeague")
        if (startDateLeague && endDateLeague && startDateLeague !== "undefined" && endDateLeague !== "undefined"){
            dispatch(fetchMatchesOfDate(id, startDateLeague, endDateLeague))
        }
        else{
            dispatch(fetchMatches(id))
        }

        dispatch(fetchLeague(id))
        dispatch(fetchTeams(id))
        dispatch(fetchStandings(id))

    }, [dispatch])

    useEffect(() => {
        if (flag){
            if (matches[0]?.season.startDate !== undefined && matches[0]?.season.endDate !== undefined){
                setDataFrom(`${matches[0]?.season.startDate}`)
                setDataTo(`${matches[0]?.season.endDate}`)
                // @ts-ignore
                setSeasonState(matches[0]?.season.startDate.split("-")[0])
                localStorage.setItem("startDateLeague", matches[0]?.season.startDate)
                localStorage.setItem("endDateLeague", matches[0]?.season.endDate)
            }
        }
    }, [matches])

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

    const changeSeasonMatches = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const param:string | null = getParams("id");
        let id: number = Number(param)
        const season = Number(e.target.value)
        setFlag(1)
        setSeasonState(season)
        dispatch(fetchMatchesOfSeason(id, season))
    }

    const changeDateMatches = (e: React.ChangeEvent<HTMLInputElement>, flagDate: boolean) => {
        const date = e.target.value
        const param:string | null = getParams("id");
        let id: number = Number(param)
        setFlag(0)
        if(flagDate){
            setDataFrom(date)
            localStorage.setItem("startDateLeague", date)
            dispatch(fetchMatchesOfDate(id, date, dataTo))
        }else{
            setDataTo(date)
            localStorage.setItem("endDateLeague", date)
            dispatch(fetchMatchesOfDate(id, dataFrom, date))
        }
    }

    return(
        <div className={"league"}>
            <Navbar/>
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
                                loadingStandings ? <Preloader/> : errorStandings ? <Error/> :
                                <TableStandings standings={standings}/>
                                :
                                loadingTeams ? <Preloader/> : errorTeams ? <Error/> :
                                <div className={"allTeams"}>
                                    {teams.map(team =>
                                        <div className={"team"} key={team.id}>
                                            <img src={team.crestUrl}/>
                                            <span>
                                                <a href={`/team?id=${team.id}`}>{team.name}</a>
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
                            <input
                                type="date"
                                name="calendar"
                                className={"calendar"}
                                value={dataFrom}
                                max={`${matches[0]?.season.endDate}`}
                                min={`${matches[0]?.season.startDate}`}
                                onChange={(e) => changeDateMatches(e, true)}/>
                            <span>До</span>
                            <input
                                type="date"
                                name="calendar"
                                className={"calendar"}
                                value={dataTo}
                                max={`${matches[0]?.season.endDate}`}
                                min={`${matches[0]?.season.startDate}`}
                                onChange={(e) => changeDateMatches(e, false)}/>
                            <div className={"select"}>
                                <select onChange={(e) => changeSeasonMatches(e)} value={seasonState}>
                                    <option value={2021}>2021/2022</option>
                                    <option value={2020}>2020/2021</option>
                                    <option value={2019}>2019/2020</option>
                                    <option value={2018}>2018/2019</option>
                                </select>
                            </div>
                        </div>
                        {loadingMatches ?
                            <Preloader/> :
                            errorMatches ?
                                <Error/> :
                            <div className={"matchesLeagueList"}>
                                {matches.slice(start, end).map(match =>

                                    <div className={"match"} key={match.id}>
                                    <span>
                                        {`${match.utcDate.split("T")[0].split("-")[2]}:${match.utcDate.split("T")[0].split("-")[1]}:${match.utcDate.split("T")[0].split("-")[0]}`}
                                    </span>
                                        <span className={match.score.fullTime.homeTeam > match.score.fullTime.awayTeam ? "winnerTeam" : ""}><a href={`/team?id=${match.homeTeam.id}`}>{match.homeTeam.name}</a></span>
                                        <span>{match.status === "FINISHED" ? match.score.fullTime.homeTeam : "-"}</span>
                                        <span>:</span>
                                        <span>{match.status === "FINISHED" ? match.score.fullTime.awayTeam : "-"}</span>
                                        <span className={match.score.fullTime.homeTeam < match.score.fullTime.awayTeam ? "winnerTeam" : ""}><a href={`/team?id=${match.awayTeam.id}`}>{match.awayTeam.name}</a></span>
                                    </div>

                                )}
                            </div>
                        }
                        <div className="pagination">
                            {pages.map(page =>
                                <a className={activePage === page - 1 ? "active" : ""} onClick={() => changePage( (page - 1) * matchesOnePage, page * matchesOnePage, page - 1)}>{page}</a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLeague;