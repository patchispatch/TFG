import { Button } from '@material-ui/core';
import * as React from 'react'
import { useState } from 'react'
import { FormDialog } from '../utils/FormDialog';
import { ObjectiveEntryForm } from './ObjectiveEntryForm';


// Props
interface CreateObjectiveEntryProps {
  objectiveId: number
}

// Component
export function CreateObjectiveEntry({objectiveId}: CreateObjectiveEntryProps) {
  // State
  const [open, setOpen] = useState(false);

  // Handle dialog state
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // Render
  return (
    <>
      <Button variant="contained" disableElevation color="secondary" onClick={handleOpen}>
        Update objective
      </Button>

      <FormDialog 
        title="Update objective"
        formId="objectiveEntryForm"
        isOpen={open}
        onClose={handleClose}
      >
        <ObjectiveEntryForm objectiveId={objectiveId} postSubmit={handleClose}/>
      </FormDialog>
    </>
  )
}