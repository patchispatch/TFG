import React, {Fragment, useState} from 'react'
import Sidebar from './components/Sidebar'
import View from './components/View'

function App() {
    // State
    const [view, setView] = useState('list')

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

            {/* Current view */}
            <View type={view} switchView={switchView}/>
        </Fragment>
    )
}
 
export default App
