import React, {useEffect, useRef} from 'react';
import './pageLeagues.scss'
import LeagueCardList from "./leagueCardList";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {fetchLeagues, filteringLeagues} from "../../store/actionCreators/leagues";
import Preloader from "../otherComponents/preloader";
import Error from "../otherComponents/error";
const PageLeagues:React.FC = () => {
    const {loading, leagues, filterLeagues, error} = useTypeSelector(state => state.leagues)
    const dispatch = useDispatch()
    const refInputLeague = useRef(null);
    useEffect(() => {
        dispatch(fetchLeagues())
    }, [])

    const handleInputLeague = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filteringLeagues(e.target.value, leagues))
    }
    return(
        <div className={"pageLeagues"}>
            <div className={"aboutSite"} >
                <p>
                    FootSTAT – агрегатор футбольной статистики
                </p>
                <p>
                    Актуальная информация о чемпионатах, командах и игроках.
                </p>
            </div>
            <div className={"blockChangeLeagues"} style={{marginBottom: "5%"}}>
                <div className={"blockMainLeagues"}>
                    <img src={"/images/leaguesLogo/LaLiga.svg"} alt={"ла-лига"}/>
                    <img src={"/images/leaguesLogo/ligue1.svg"} alt={"лига 1"}/>
                    <img src={"/images/leaguesLogo/premier-league.svg"} alt={"премьер лига"}/>
                    <img src={"/images/leaguesLogo/seriaA.svg"} alt={"серия А"}/>
                </div>
                <div className={"blockLeagues"}>
                    <div className={"titleBlock"}>
                        Выберите соревнование для просмотра статистики
                    </div>
                    <div className={"filterLeagues"}>
                        <input placeholder={"Введите название соревнования"}
                               ref={refInputLeague}
                               onChange={handleInputLeague}
                              />
                    </div>
                    {
                        filterLeagues.length !== 0 ?
                            loading ? <Preloader/> : error ? <Error/> : <LeagueCardList leagues={filterLeagues}/>
                            :
                            <div className={"emptyListLeagues"}>
                                По запросу ничего не найдено
                            </div>
                    }

                </div>
            </div>
            <div className={"endBar"}/>
        </div>
    )
};

export default PageLeagues;