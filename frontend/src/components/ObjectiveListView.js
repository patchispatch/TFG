import React from 'react'
import ObjectiveTable from './ObjectiveTable'

function ObjectiveListView({objectives, deleteObjective}) {

    return (
        <ObjectiveTable objectives={objectives} deleteObjective={deleteObjective}/>
    )
}

export default ObjectiveListView