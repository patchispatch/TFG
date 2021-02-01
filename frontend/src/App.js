import React, {Fragment, useState, useEffect} from 'react'
import api from './api'

import Sidebar from './components/Sidebar'
import View from './components/View'
import Modal from './components/Modal'
import NewActivityForm from './components/NewActivityForm'
import Topbar from './components/Topbar'
import NewObjectiveForm from './components/NewObjectiveForm'

import useModal from './hooks/useModal'


function App(props) {
    // STATE
    const [view, setView] = useState(props.view || 'list')
    const [activities, setActivities] = useState([])
    const [objectives, setObjectives] = useState([])
    const [activityFormVisible, switchActivityFormVisible] = useModal()
    const [objectiveFormVisible, switchObjectiveFormVisible] = useModal()

    // ACTIVITIES
    // Fetch activities
    async function fetchActivities() {
        try {
            const res = await api.get(`activities`)
            setActivities(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    // New activity
    async function newActivity(values) {
        try {
            await api.post(`activities/`, values)
            fetchActivities()
        }
        catch(err) {
            console.log(err)
        }
    }

    // Modify activity
    // TO DO

    // Delete activity
    async function deleteActivity(id) {
        try {
            await api.delete(`activities/${id}`)
            fetchActivities()
        }
        catch(err) {
            console.log(err)
        }
    }

    // OBJECTIVES (same as activities)
    async function fetchObjectives() {
        try {
            const res = await api.get(`objectives`)
            setObjectives(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    async function newObjective(values) {
        try {
            await api.post(`objectives/`, values)
            fetchObjectives()
        }
        catch(err) {
            console.log(err)
        }
    }

    async function deleteObjective(id) {
        try {
            await api.delete(`objectives/${id}`)
            fetchObjectives()
        }
        catch(err) {
            console.log(err)
        }
    }

    // Fetch data when the component mounts
    useEffect(() => {
        fetchActivities()
        fetchObjectives()
    }, [])

    // Switch views
    function switchView(newView) {
        if(newView === "list") 
            setView("list")
        else if (newView === "objectiveList")
            setView("objectiveList")
        else
            throw new Error(`The view ${newView} does not exist`)
    }

    return (
        <Fragment>
            {/* Sidebar */}
            <Sidebar/>

            {/* Top bar */}
            <Topbar 
                view={view} 
                switchView={switchView}
                activityForm={switchActivityFormVisible}
                objectiveForm={switchObjectiveFormVisible}
            />

            {/* Current view */}
            <View 
                type={view} 
                switchView={switchView}
                activities={activities}
                objectives={objectives}
                deleteActivity={deleteActivity}
                deleteObjective={deleteObjective}
            />

            {/* New activity form */}
            <Modal isVisible={activityFormVisible} hideModal={switchActivityFormVisible}>
                <NewActivityForm onSubmit={newActivity}/>
            </Modal>

            {/* New objective form */}
            <Modal isVisible={objectiveFormVisible} hideModal={switchObjectiveFormVisible}>
                <NewObjectiveForm onSubmit={newObjective} onCancel={switchObjectiveFormVisible}/>
            </Modal>
        </Fragment>
    )
}
 
export default App
