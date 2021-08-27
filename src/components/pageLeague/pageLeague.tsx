import React, {useEffect} from "react";
import './pageLeague.scss'
import ball from './soccer-ball.svg'
const PageLeague:React.FC = () => {
    useEffect(() => {
        const param:string | null = getParams("id");
        
        console.log(param);
    }, [])

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
                    
                </div>
                <div className={"actionsLeague"}>

                </div>
            </div>
        </div>
    )
}

export default PageLeague;