import React from 'react'

function Topbar(props) {
    return (
        <div className="topBar">
            {props.view === "objectiveList" && <button onClick={() => props.switchTo("list")}>Activity list</button>}
            {props.view === "list" && <button onClick={() => props.switchTo("objectiveList")}>Objective list</button>}
        </div>
    )
}

export default Topbar