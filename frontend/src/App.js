import React, {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import View from './components/View'
import Modal from './components/Modal'
import useModal from './hooks/useModal'

function App() {
    // State
    const [view, setView] = useState('list')
    const {isVisible, toggleModal} = useModal()

    return (
        <div>
            <Sidebar>
                <button onClick={toggleModal}>Show modal</button>
                <Modal isVisible={isVisible} hideModal={toggleModal} />
            </Sidebar>
            <View type={view}/>
            

        </div>
    )
}

export default App;
