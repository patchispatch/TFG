import React from 'react'

function TopItem(props) {
    return (
        <li className="top-item">
            <button className="icon-button" onClick={props.onClick} aria-label={props.label}>
                {props.icon}
            </button>
        </li>
    )
}

export default TopItem