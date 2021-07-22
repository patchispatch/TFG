import React, { useState } from "react";
import { AppBar, Button, createStyles, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { ObjectiveTable } from "./ObjectiveTable";
import { Theme } from "@material-ui/core";
import { ObjectiveForm } from "./ObjectiveForm";
import { FormDialog } from "../utils/FormDialog";
import { ObjectiveEntryCalendar } from "../objective-entry/ObjectiveEntryCalendar";


// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    testButtons: {
      width: 500,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    historySection: {
      marginTop: '3em',
    },
    calendar: {
      marginTop: '1.5em',
    }
  }),
);


// Component
export function ObjectiveView() {

  // State
  

  // Handle dialog state
  let [dialogState, setDialogState] = useState(false);

  function handleOpen(): void {
    setDialogState(true);
  }

  function handleClose(): void {
    setDialogState(false);
  }

  // Render
  const classes = useStyles();
  return (
    <>
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <Typography variant="h6">
            Home
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <Typography variant="h6">Test buttons</Typography>

        <div className={classes.testButtons}>
          <Button onClick={handleOpen} variant="contained" color="primary">New objective</Button>
        </div>

        <ObjectiveTable />

        <div className={classes.historySection}>
          <Typography variant='h4'>
            Entry history
          </Typography>

          <ObjectiveEntryCalendar className={classes.calendar} />
        </div>
        

        {/* Dialogs */}
        <FormDialog 
            title="New objective"
            formId="objectiveForm"
            isOpen={dialogState}
            onClose={handleClose}
        >
          <ObjectiveForm postSubmit={handleClose} />
        </FormDialog>
      </div>
    </>
  )
}