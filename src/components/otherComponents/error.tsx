import React from 'react'
import "./otherComponents.scss"
const Error:React.FC = () => {
    return (
        <div className={"error"}>
            <div>Ошибка</div>
            <div>Превышен лимит запросов. Подождите минуту и перезагрузите страницу.</div>
        </div>
    )
}

export default Error