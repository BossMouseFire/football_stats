import React from 'react'
import ball from "./soccer-ball.svg";
import "./otherComponents.scss"
import {useHistory} from 'react-router-dom'
const Navbar:React.FC = () => {
    const history = useHistory()
    return(
        <div className={"navbar"}>
            <img src={ball}/>
            <span onClick={() => history.push("/")}>
                <a href={"/"}>
                FootSTAT</a>
            </span>
        </div>
    )
}

export default Navbar