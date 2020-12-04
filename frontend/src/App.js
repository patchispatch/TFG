import React, {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import View from './components/View'
import Modal from './components/Modal'
import ActivityForm from './components/ActivityForm'
import useModal from './hooks/useModal'

function App() {
    // State
    const [view, setView] = useState('list')
    const {isVisible, toggleModal} = useModal()

    return (
        <div>
            <Sidebar>
                <button onClick={toggleModal}>New activity</button>
                <Modal isVisible={isVisible} hideModal={toggleModal}>
                    <ActivityForm />
                </Modal>
            </Sidebar>
            <View type={view}/>
            

        </div>
    )
}

export default App;
