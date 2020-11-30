import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListView from './ListView'

function View(props) {
    // State
    const [activities, setActivities] = useState([])

    // Fetch activities
    useEffect(() => {
        axios.get("http://localhost:8000/api/activities")
        .then(res => setActivities(res.data))
        .catch(err => console.log(err))
    }, [])

    function switchView() {
        switch(props.type) {
            case 'list':
                return <ListView activities={activities}/>
            case 'timeline':
                throw "Not implemented yet"
                break
            case 'day':
                throw "Not implemented yet"
                break
            default:
                throw Error("This view does not exist")
        }
    }

    return (
        <div className="view">
            {switchView()}
        </div>
    )
}

export default View