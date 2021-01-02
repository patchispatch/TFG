import React from 'react'

function Topbar(props) {
    return (
        <div className="topBar">
            {props.view === "objectiveList" && 
                <button onClick={() => props.switchView("list")}>Activity list</button>
            }

            {props.view === "list" && 
                <button onClick={() => props.switchView("objectiveList")}>Objective list</button>
            }
            {props.children}
        </div>
    )
}

export default Topbar