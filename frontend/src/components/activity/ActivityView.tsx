import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppBar, CircularProgress, createStyles, Fab, makeStyles, Toolbar, Typography} from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { Activity } from "src/models/activity";
import { FormDialog } from "../utils/FormDialog";
import { ActivityForm } from "./ActivityCreateForm";
import { Add } from "@material-ui/icons";
import { ActivityTable } from "./ActivityTable";
import { ActivityInstanceService } from "src/services/activity-instance-service";
import { ActivityInstance } from "src/models/activity-instance";
import { Subscription } from "rxjs";

// Props
interface ActivityViewProps {
  activityList: Activity[],
  refreshActivityList: () => Subscription,
}

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
export function ActivityView({activityList, refreshActivityList}: ActivityViewProps) {
  // Services
  const instanceService = useMemo(() => new ActivityInstanceService(), []);

  // State
  const [activityLoaded, setActivityLoaded] = useState<boolean>(false);
  const [instanceList, setInstanceList] = useState<ActivityInstance[]>([]);

  // Handle dialog state
  let [dialogState, setDialogState] = useState(false);

  function handleOpen(): void {
    setDialogState(true);
  }

  function handleClose(): void {
    setDialogState(false);
    refreshActivityList();
    refreshList();
  }

  // Refresh activity and instance list
  const refreshList = useCallback(() => {
    setActivityLoaded(false);
    instanceService.list().subscribe(instances => {
      setInstanceList(instances);
      setActivityLoaded(true);
    });
  }, [instanceService]);

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
            Activities
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <div className={classes.section}>
          <Typography variant='h4'>
            Activities
          </Typography>

          {activityLoaded
          ? 
            <ActivityTable 
              activities={activityList}
              instances={instanceList}
              refresh={refreshActivityList}
            />
          :
            <CircularProgress />
          }
        </div>

        <div className={classes.fab}>
          <Fab variant="extended" onClick={handleOpen} color="secondary" aria-label="create">
            <Add className={classes.extendedIcon} />
            New activity
          </Fab>
        </div>

        {/* Dialogs */}
        <FormDialog 
            title="New activity"
            formId="activityCreateForm"
            isOpen={dialogState}
            onClose={handleClose}
        >
          <ActivityForm postSubmit={handleClose} />
        </FormDialog>
      </div>
    </>
  )
}