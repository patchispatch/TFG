import React, {Fragment, useState} from 'react'
import Sidebar from './components/Sidebar'
import View from './components/View'

function App() {
    // API URL
    const api = "http://localhost:8000"

    // State
    const [view, setView] = useState('list')
    const [activities, setActivities] = useState([])
    const [objectives, setObjectives] = useState([])
    const [activityFormVisible, switchActivityFormVisible] = useModal()
    const [objectiveFormVisible, switchObjectiveFormVisible] = useModal()

    // ACTIVITIES
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
                view={props.type} 
                switchView={props.switchView}
                activityForm={switchActivityFormVisible}
                objectiveForm={switchObjectiveFormVisible}
            />

            {/* Current view */}
            <View type={view} switchView={switchView}/>
        </Fragment>
    )
}
 
export default App
