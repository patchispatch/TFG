import React, { useEffect, useMemo, useState } from "react";
import { AppBar, createStyles, Fab, FormControl, InputLabel, makeStyles, Select, Toolbar, Typography, MenuItem } from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { ActivityService } from "src/services/activity-service";
import { Activity } from "src/models/activity";
import { FormDialog } from "../utils/FormDialog";
import { ActivityForm } from "./ActivityForm";
import { Add } from "@material-ui/icons";
import { ActivityTable } from "./ActivityTable";


// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: '1em 0 1em 0',
      minWidth: 120,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      '& .MuiTypography-root': {
        margin: '0 0 1rem 0'
      }
    },
    fab: {
      position: 'fixed',
      right: '2em',
      bottom: '2em',
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    section: {
      marginBottom: '3em',
    },
    calendar: {
      marginTop: '1.5em',
    },
  }),
);


// Component
export function ActivityView() {
  // Services
  const activityService = useMemo(() => new ActivityService(), []);

  // State
  const [activityLoaded, setActivityLoaded] = useState<boolean>(false);
  const [activityList, setActivityList] = useState<Activity[]>([]);

  // Handle dialog state
  let [dialogState, setDialogState] = useState(false);

  function handleOpen(): void {
    setDialogState(true);
  }

  function handleClose(): void {
    setDialogState(false);
    refreshList();
  }

  // Refresh objective list
  function refreshList(): void {
    setActivityLoaded(false);
    activityService.list().subscribe(response => {
      setActivityList(response);
      setActivityLoaded(true);
    });
  }

  // On init
  useEffect(() => {
    refreshList();
  }, [])

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
        <div className={classes.section}>
          <Typography variant='h4'>
            Activities
          </Typography>

          <ActivityTable 
            activities={activityList} 
            loaded={activityLoaded}
            refresh={refreshList}
          />
        </div>

        <div className={classes.fab}>
          <Fab variant="extended" onClick={handleOpen} color="primary" aria-label="create">
            <Add className={classes.extendedIcon} />
            New activity
          </Fab>
        </div>

        {/* Dialogs */}
        <FormDialog 
            title="New objective"
            formId="objectiveForm"
            isOpen={dialogState}
            onClose={handleClose}
        >
          <ActivityForm postSubmit={handleClose} />
        </FormDialog>
      </div>
    </>
  )
}