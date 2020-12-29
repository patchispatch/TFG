import React, {Fragment, useState} from 'react'
import Sidebar from './components/Sidebar'
import View from './components/View'
import Topbar from './components/Topbar'

function App() {
    // State
    const [view, setView] = useState('list')

    // Switch views
    function switchTo(newView) {
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
            <Topbar view={view} switchTo={switchTo}/>

            {/* Current view */}
            <View type={view}/>
        </Fragment>
    )
}
 
export default App
