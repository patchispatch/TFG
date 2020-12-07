import React from 'react'
import ActivityList from './ActivityList'

function ListView(props) {
    return (
        <div className="list-view">
            <ActivityList activities={props.activities} deleteFn={props.deleteFn}/>
        </div>
    )
}

export default ListView