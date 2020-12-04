import React, {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import View from './components/View'
import Modal from './components/Modal'
import ActivityForm from './components/ActivityForm'
import useModal from './hooks/useModal'

function App() {
    // State
    const [view, setView] = useState('list')
    const [activityFormVisible, activityFormToggle] = useModal()

    return (
        <div>
            <Sidebar>
                {/* New activity form */}
                <button onClick={activityFormToggle}>New activity</button>
                <Modal isVisible={activityFormVisible} hideModal={activityFormToggle}>
                    <ActivityForm />
                </Modal>
            </Sidebar>

            {/* Current view */}
            <View type={view}/>
        </div>
    )
}

export default App;
