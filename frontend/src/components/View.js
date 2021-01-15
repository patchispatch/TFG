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

    return (
        <div className="view">
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