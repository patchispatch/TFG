import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppBar, createStyles, Fab, makeStyles, Toolbar, Typography} from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { ActivityService } from "src/services/activity-service";
import { Activity } from "src/models/activity";
import { FormDialog } from "../utils/FormDialog";
import { ActivityForm } from "./ActivityCreateForm";
import { Add } from "@material-ui/icons";
import { ActivityTable } from "./ActivityTable";
import { forkJoin } from "rxjs";
import { ActivityInstanceService } from "src/services/activity-instance-service";
import { ActivityInstance } from "src/models/activity-instance";


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
  const instanceService = useMemo(() => new ActivityInstanceService(), []);

  // State
  const [activityLoaded, setActivityLoaded] = useState<boolean>(false);
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const [instanceList, setInstanceList] = useState<ActivityInstance[]>([]);

  // Handle dialog state
  let [dialogState, setDialogState] = useState(false);

  function handleOpen(): void {
    setDialogState(true);
  }

  function handleClose(): void {
    setDialogState(false);
    refreshList();
  }

  // Refresh activity and instance list
  const refreshList = useCallback(() => {
    setActivityLoaded(false);
    forkJoin({
      activities: activityService.list(),
      instances: instanceService.list()
    }).subscribe(({activities, instances}) => {
      setActivityList(activities);
      setInstanceList(instances);
      setActivityLoaded(true);
    });
  },[activityService, instanceService]);

  // On init
  useEffect(() => {
    refreshList();
  }, [refreshList])

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
            instances={instanceList}
            loaded={activityLoaded}
            refresh={refreshList}
          />
        </div>

        <div className={classes.fab}>
          <Fab variant="extended" onClick={handleOpen} color="secondary" aria-label="create">
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