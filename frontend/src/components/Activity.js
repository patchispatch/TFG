import React from 'react'

function Activity(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <h4>{props.date} - {props.time}</h4>
            <p>{props.description}</p>
        </div>
    )
}

export default Activity
