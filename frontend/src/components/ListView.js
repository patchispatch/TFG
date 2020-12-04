import React from 'react'
import ActivityCard from './ActivityCard'

function ListView(props) {
    return (
        <div className="list-view">
            {props.activities.map((act) => {
                return (
                <ActivityCard 
                    key={act.id}
                    id={act.id}
                    title={act.title}
                    description={act.description}
                    date={act.date}
                    time={act.time}
                    deleteFn={props.deleteFn}
                />)
            })}
        </div>
    )
}

export default ListView