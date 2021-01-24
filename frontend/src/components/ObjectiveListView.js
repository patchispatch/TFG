import React from 'react'
import ObjectiveTable from './ObjectiveTable'

function ObjectiveListView({objectives}) {

    return (
        <ObjectiveTable objectives={objectives}/>
    )
}

export default ObjectiveListView