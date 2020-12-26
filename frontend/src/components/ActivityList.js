import React, {Fragment} from 'react'
import ActivityCard from './ActivityCard'

function ActivityList(props) {
    return (
    <Fragment>
        {props.activities && props.activities.map((act) => {
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
    </Fragment>
    )
}

export default ActivityList