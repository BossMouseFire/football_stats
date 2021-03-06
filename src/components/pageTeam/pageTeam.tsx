import React, {useEffect, useRef, useState} from 'react'
import './pageTeam.scss'
import ball from "../otherComponents/soccer-ball.svg";
import {useDispatch} from "react-redux";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {fetchTeam} from "../../store/actionCreators/team";
import {
    changeMatchesTeamActivePage,
    fetchMatchesTeam,
    fetchMatchesTeamOfDate
} from "../../store/actionCreators/matchesTeam";
import MatchesTeamList from "./matchesTeamList";
import Preloader from "../otherComponents/preloader";
import Error from "../otherComponents/error";
import Navbar from "../otherComponents/navBar";
const PageTeam:React.FC = () => {
    const dispatch = useDispatch()
    const {team} = useTypeSelector(state => state.team)
    const {matches, activePage, loading, error} = useTypeSelector(state => state.matchesTeam)
    const refButtonTeamListHome = useRef() as React.MutableRefObject<HTMLButtonElement>;
    const refButtonTeamListAway = useRef() as React.MutableRefObject<HTMLButtonElement>;
    const [dateFrom, setDateFrom] = useState<string>("")
    const [dateTo, setDateTo] = useState<string>("")
    const [flag, setFlag] = useState<boolean>(true)
    const [venue, setVenue] = useState<string>("")
    const matchesOnePage = 10;
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(matchesOnePage);
    const [pages, setPages] = useState<number[]>([]);

    useEffect(() => {
        const param:string | null = getParams("id");
        let id: number = Number(param)
        dispatch(fetchTeam(id))

        const startDateTeam = localStorage.getItem("startDateTeam")
        const endDateTeam = localStorage.getItem("endDateTeam")

        console.log(matches[0]?.season.endDate)

        if (startDateTeam && endDateTeam && startDateTeam !== "undefined" && endDateTeam !== "undefined"){
            dispatch(fetchMatchesTeamOfDate(id, "HOME", startDateTeam, endDateTeam))
        } else{
            dispatch(fetchMatchesTeam(id, "HOME"))
        }
    }, [])

    useEffect(() => {
        if (flag){
            const startDateTeam = localStorage.getItem("startDateTeam")
            const endDateTeam = localStorage.getItem("endDateTeam")
            if (startDateTeam && endDateTeam && startDateTeam !== "undefined" && endDateTeam !== "undefined"){
                setDateFrom(startDateTeam)
                setDateTo(endDateTeam)
            } else{
                localStorage.setItem("startDateTeam", `${matches[0]?.season.startDate}`)
                localStorage.setItem("endDateTeam", `${matches[0]?.season.endDate}`)
                setDateFrom(`${matches[0]?.season.startDate}`)
                setDateTo(`${matches[0]?.season.endDate}`)
            }
        }
    }, [matches])

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
        dispatch(changeMatchesTeamActivePage(active));
        setStart(start);
        setEnd(end);
    }

    const getParams = (key:string) : string | null => {
        const params:string = window.location.hash.split("?")[1];
        const arrayParams: Array<string> = params.split("&");
        for (let param in arrayParams){
            const map: Array<string> = arrayParams[param].split("=");
            if(map[0] === key) return map[1];
        }
        return null;
    }

    const changeVenueMatches = (venue: string) => {
        const param:string | null = getParams("id");
        let id: number = Number(param)
        changeMatchesList()
        setVenue(venue)
        dispatch(fetchMatchesTeamOfDate(id, venue, dateFrom, dateTo))
    }

    const changeMatchesList = () => {
        refButtonTeamListHome.current.classList.toggle("activeButton")
        refButtonTeamListAway.current.classList.toggle("activeButton")
    }
    const changeDateMatchesTeam = (e: React.ChangeEvent<HTMLInputElement>, flagDate: boolean) => {
        const date = e.target.value
        const param:string | null = getParams("id");
        let id: number = Number(param)
        setFlag(false)
        if(flagDate){
            setDateFrom(date)
            localStorage.setItem("startDateTeam", date)
            dispatch(fetchMatchesTeamOfDate(id, venue, date, dateTo))
        }else{
            setDateTo(date)
            localStorage.setItem("endDateTeam", date)
            dispatch(fetchMatchesTeamOfDate(id, venue, dateFrom, date))
        }
    }

    return(
        <div className={"pageTeam"}>
            <Navbar/>
            <div className={"mainPart"}>
                <div className={"descriptionTeam"}>
                    <img src={team.crestUrl}/>
                    <span>{team.shortName}</span>
                </div>
                <div className={"buttonsChangeMatches"}>
                    <button className={"activeButton"}
                            onClick={() => changeVenueMatches("HOME")}
                            ref={refButtonTeamListHome}>???????????????? ??????????</button>
                    <button
                        onClick={() => changeVenueMatches("AWAY")}
                        ref={refButtonTeamListAway}>???????????????? ??????????</button>
                </div>
                <div className={"matchesTeamBlock"}>
                    <div className={"filterOfMatches"}>
                        <span>C</span>
                        <input
                            type="date"
                            name="calendar"
                            className={"calendar"}
                            value={dateFrom}
                            max={`2022-05-31`}
                            min={`2020-08-05`}
                            onChange={(e) => changeDateMatchesTeam(e, true)}/>
                        <span>????</span>
                        <input
                            type="date"
                            name="calendar"
                            className={"calendar"}
                            value={dateTo}
                            max={`2022-05-31`}
                            min={`2020-08-05`}
                            onChange={(e) => changeDateMatchesTeam(e, false)}/>
                    </div>
                    {loading ? <Preloader/> : error ? <Error/> : <MatchesTeamList matches={matches} start={start} end={end}/>}
                    <div className="pagination">
                        {pages.map(page =>
                            <a className={activePage === page - 1 ? "active" : ""} onClick={() => changePage( (page - 1) * matchesOnePage, page * matchesOnePage, page - 1)}>{page}</a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PageTeam