import React from 'react'

function Activity(props) {
    return (
        <div className="activity">
            <h1>{props.title}</h1>
            <h4>{props.date} - {props.time}</h4>
            <p>{props.description}</p>
            <button onClick={() => props.deleteFn(props.id)}>Delete</button>
        </div>
    )
}

export default Activity
