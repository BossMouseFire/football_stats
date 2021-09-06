import React from 'react'
import ball from "./soccer-ball.svg";
import "./otherComponents.scss"

const Navbar:React.FC = () => {
    return(
        <div className={"navbar"}>
            <img src={ball}/>
            <span><a href={"/"}>FootSTAT</a></span>
        </div>
    )
}

export default Navbar