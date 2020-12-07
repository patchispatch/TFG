import React, {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import View from './components/View'

function App() {
    // State
    const [view, setView] = useState('list')

    return (
        <div>
            {/* Sidebar */}
            <Sidebar />

            {/* Current view */}
            <View type={view}/>
        </div>
    )
}

export default App;
