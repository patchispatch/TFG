import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListView from './ListView'
import ObjectiveListView from './ObjectiveListView'
import Modal from './Modal'
import NewActivityForm from './NewActivityForm'
import Topbar from './Topbar'
import NewObjectiveForm from './NewObjectiveForm'
import useModal from '../hooks/useModal'


function View(props) {
    // API URL (probably moving this)
    const api = "http://localhost:8000"

    // STATE
    const [activities, setActivities] = useState([])
    const [objectives, setObjectives] = useState([])
    const [activityFormVisible, switchActivityFormVisible] = useModal()
    const [objectiveFormVisible, switchObjectiveFormVisible] = useModal()

    // ACTIVITIES (I don't know where to put this but now it works as intended so here we are)
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
            .then(fetchActivities())
            .catch(err => console.log(err))
    }


    // OBJECTIVES (same as activities)
    function fetchObjectives() {
        axios.get(`${api}/objectives/`)
            .then(res => setObjectives(res.data))
            .catch(err => console.log(err))
    }

    function newObjective(values) {
        axios.post(`${api}/objectives/`, values)
            .then(fetchObjectives())
            .catch(err => console.log(err))
    }

    function switchView() {
        switch(props.type) {
            case 'list':
                return <ListView activities={activities} deleteFn={deleteActivity}/>
            case 'objectiveList':
                return <ObjectiveListView objectives={objectives}/>
            default:
                throw new Error("This view does not exist")
        }
    }

    // Fetch data when the component mounts
    useEffect(() => {
        fetchActivities()
        fetchObjectives()
    }, [])

    return (
        <div className="view">
            {/* Top bar */}
            <Topbar 
                view={props.type} 
                switchView={props.switchView}
                activityForm={switchActivityFormVisible}
                objectiveForm={switchObjectiveFormVisible}
            />

            {/* New activity form */}
            <Modal isVisible={activityFormVisible} hideModal={switchActivityFormVisible}>
                <NewActivityForm onSubmit={newActivity}/>
            </Modal>

            {/* New objective form */}
            <Modal isVisible={objectiveFormVisible} hideModal={switchObjectiveFormVisible}>
                <NewObjectiveForm onSubmit={newObjective} onCancel={switchObjectiveFormVisible}/>
            </Modal>

            {/* Current view */}
            {switchView()}
        </div>
    )
}

export default View