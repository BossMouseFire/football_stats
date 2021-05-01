import React from 'react';
import './pageLeagues.scss'
const PageLeagues:React.FC = () => {
    return(
        <div className={"pageLeagues"}>
            <div className={"aboutSite"} >
                <p>
                    FootStats – агрегатор футбольной статистики
                </p>
                <p>
                    Актуальная информация о чемпионатах, командах и игроках.
                </p>
            </div>
            <div className={"blockChangeLeagues"}>
                <div className={"blockMainLeagues"}>
                    <img src={"/images/leaguesLogo/LaLiga.svg"} alt={"ла-лига"}/>
                    <img src={"/images/leaguesLogo/ligue1.svg"} alt={"лига 1"}/>
                    <img src={"/images/leaguesLogo/premier-league.svg"} alt={"премьер лига"}/>
                    <img src={"/images/leaguesLogo/seriaA.svg"} alt={"серия А"}/>
                </div>
                <div className={"blockLeagues"}>
                    <div className={"titleBlock"}>
                        Выберите соревнование для просмотра статистика
                    </div>
                    <div className={"filterLeagues"}>
                        <input placeholder={"Введите название соревнования"}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PageLeagues;