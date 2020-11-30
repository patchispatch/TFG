import React from 'react'
import Activity from './Activity'

function ListView(props) {
    return (
        <div className="list-view">
            {props.activities.map((act) => {
                return (
                <Activity 
                    key={act.id}
                    title={act.title}
                    description={act.description}
                    date={act.date}
                    time={act.time}
                />)
            })}
        </div>
    )
}

export default ListView