import { Button } from '@material-ui/core';
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { FormDialog } from '../utils/FormDialog';
import { ObjectiveForm } from 'src/components/objective/ObjectiveForm';
import { ObjectiveService } from 'src/services/objective-service';
import { Objective } from 'src/models/objective';


// Props
interface EditObjectiveProps {
  objectiveId: number
}

// Component
export function EditObjective({objectiveId}: EditObjectiveProps) {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService, []);

  // State
  const [objective, setObjective] = useState<Objective>();
  const [open, setOpen] = useState(false);


  // On init
  useEffect(() => {
    objectiveService.get(objectiveId).subscribe(response => setObjective(response));
  }, [objectiveService])


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
      <Button variant="outlined" disableElevation color="secondary" onClick={handleOpen}>
        Edit objective
      </Button>

      <FormDialog 
        title="Edit objective"
        formId="objectiveForm"
        isOpen={open}
        onClose={handleClose}
      >
        <ObjectiveForm objective={objective} postSubmit={handleClose}/>
      </FormDialog>
    </>
  )
}