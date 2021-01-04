import React, {Fragment} from 'react'
import TopItem from './TopItem'

function Topbar(props) {
    return (
        <div className="topbar">
            <ul className="topbar-nav">
                {props.view === "objectiveList" && 
                <Fragment>
                    <TopItem 
                        label="New objective" 
                        onClick={props.objectiveForm}
                        icon="➕"
                    />

                    <TopItem 
                        onClick={() => props.switchView("list")}
                        label="Activity list"
                        icon="📅"
                    />
                </Fragment>
                }

                {props.view === "list" &&
                <Fragment>
                    <TopItem 
                        label="New Activity" 
                        onClick={props.activityForm}
                        icon="➕"
                    />

                    <TopItem 
                        onClick={() => props.switchView("objectiveList")}
                        label="Objective list"
                        icon="☑️"
                    />
                </Fragment>
                }
            </ul>
        </div>
    )
}

export default Topbar