import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListView from './ListView'
import Modal from './Modal'
import NewActivityForm from './NewActivityForm'
import useModal from '../hooks/useModal'

function View(props) {
    // API URL (probably moving this)
    const api = "http://localhost:8000"

    // State
    const [activities, setActivities] = useState([])
    const [activityFormVisible, switchActivityFormVisible] = useModal()

    // Fetch activities
    function fetchActivities() {
        axios.get(`${api}/activities/`)
        .then(res => setActivities(res.data))
        .catch(err => console.log(err))
    }

    // New activity
    function newActivity(values) {
        axios.post(`${api}/activities/`, values)
            .then(fetchActivities())
            .catch(err => console.log(err))
    }

    // Modify activity
    // TO DO

    // Delete activity
    function deleteActivity(id) {
        axios.delete(`${api}/activities/${id}`)
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

    // Fetch activities when the component mounts
    useEffect(() => {
        fetchActivities()
    }, [])

    return (
        <div className="view">
            {/* New activity form */}
            <button name="newActivity" onClick={switchActivityFormVisible}>New activity</button>
            <Modal isVisible={activityFormVisible} hideModal={switchActivityFormVisible}>
                <NewActivityForm onSubmit={newActivity}/>
            </Modal>

            {/* Current view */}
            {switchView()}
        </div>
    )
}

export default View