import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as React from 'react'
import { useMemo, useState } from 'react'
import { Objective } from 'src/models/objective';
import { ObjectiveService } from 'src/services/objective-service'
import { ObjectiveForm } from './ObjectiveForm';

// Style

// Props

// Component
export function CreateObjective() {
  // State
  const [open, setOpen] = useState(false);

  // Handle dialog state
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // Render
  return (
    <div>
      <Button variant="contained" disableElevation color="primary" onClick={handleClickOpen}>
        New objective
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="create-objective-title">
        <DialogTitle id="create-objective-title">New objective</DialogTitle>
        <DialogContent>
          <ObjectiveForm postSubmit={handleClose}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" form="objectiveForm">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}