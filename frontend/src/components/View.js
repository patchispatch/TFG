import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListView from './ListView'

function View(props) {
    // State
    const [activities, setActivities] = useState([])

    // Fetch activities
    function fetchActivities() {
        axios.get("http://localhost:8000/activities/")
        .then(res => setActivities(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchActivities()
    }, [])

    // Modify activity
    // TO DO

    // Delete activity
    function deleteActivity(id) {
        axios.delete(`http://localhost:8000/activities/${id}`)
            .then(fetchActivities)
            .catch(err => console.log(err))
    }


    function switchView() {
        switch(props.type) {
            case 'list':
                return <ListView activities={activities} deleteFn={deleteActivity}/>
            case 'timeline':
                throw new Error("Not implemented yet")
            case 'day':
                throw new Error("Not implemented yet")
            default:
                throw new Error("This view does not exist")
        }
    }

    return (
        <div className="view">
            {switchView()}
        </div>
    )
}

export default View