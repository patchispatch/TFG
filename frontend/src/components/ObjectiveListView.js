import React from 'react'
import ObjectiveTable from './ObjectiveTable'

function ObjectiveListView({objectives, editObjective, deleteObjective}) {
    return (
        <ObjectiveTable objectives={objectives} editObjective={editObjective} deleteObjective={deleteObjective}/>
    )
}

export default ObjectiveListView