import { Button } from '@material-ui/core';
import * as React from 'react'
import { useState } from 'react'
import { FormDialog } from '../utils/FormDialog';
import { ObjectiveForm } from './ObjectiveForm';


// Component
export function CreateObjective() {
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
      <Button variant="contained" disableElevation color="primary" onClick={handleOpen}>
        New objective
      </Button>

      <FormDialog 
        title="New objective" 
        formId="objectiveForm"
        isOpen={open}
        onClose={handleClose}
      >
        <ObjectiveForm postSubmit={handleClose}/>
      </FormDialog>
    </>
  )
}