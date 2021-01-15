import React from 'react'
import ListView from './ListView'
import ObjectiveListView from './ObjectiveListView'


function View(props) {
    function renderView() {
        switch(props.type) {
            case 'list':
                return <ListView activities={props.activities} deleteFn={props.deleteActivity}/>
            case 'objectiveList':
                return <ObjectiveListView objectives={props.objectives}/>
            default:
                throw new Error("This view does not exist")
        }
    }

    return (
        <div className="view">
            {/* Current view */}
            {renderView()}
        </div>
    )
}

export default View