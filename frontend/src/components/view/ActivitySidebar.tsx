import { List, ListItem, makeStyles, createStyles, Typography, Theme, ListItemText, 
  ListItemSecondaryAction, IconButton, Menu, MenuItem } from "@material-ui/core";
import { bindMenu, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { SyntheticEvent, useMemo, useState } from "react";
import snackbar from 'src/SnackbarUtils';
import { ConfirmDialog } from "../utils/ConfirmDialog";
import { FormDialog } from "../utils/FormDialog";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Activity } from "src/models/activity";
import { ActivityService } from "src/services/activity-service";
import { Subscription } from "rxjs";
import { ActivityEditForm } from "../activity/ActivityEditForm";


// Styles
const useStyles = makeStyles((theme: Theme) => 
createStyles({
  root: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '100%',
  },
  activityList: {
    overflowY: 'auto',
  },
  listItemSecondaryAction: {
    visibility: 'hidden'
  },
  listItem: {
    '&:hover $listItemSecondaryAction': {
      visibility: "inherit"
    }
  },
  listButton: {
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  listLeftIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: '1em'
  }
})
);

// Props
interface ActivitySidebarProps {
  activityList: Activity[],
  refreshList: () => Subscription
}

export function ActivitySidebar({activityList, refreshList}: ActivitySidebarProps) {
  // Services
  const activityService = useMemo(() => new ActivityService(), []);

  // State
  const activityMenu = usePopupState({ variant: 'popover', popupId: 'activityMenu' });
  const [activityActiveMenu, setActivityActiveMenu] = useState<Activity | undefined>(undefined);
  const [editDialogState, setEditDialogState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);

  // Extend onClick menu event
  function onMenuClick(act: Activity, event: SyntheticEvent): void {
    setActivityActiveMenu(act);
    bindTrigger(activityMenu).onClick(event);
  }

  function onMenuEdit(): void {
    setEditDialogState(true);
    activityMenu.setOpen(false);
  }

  function onMenuDelete(): void {
    setDeleteDialogState(true);
    activityMenu.setOpen(false);
  }

  function handleEdit(_response?: Activity, updated = false): void {
    setEditDialogState(false);

    if (updated) {
      refreshList();
    }
  }

  /**
   * Deletes a category
   */
  function deleteActivity(activityId: number): void {
    activityService.delete(activityId).subscribe(() => {
      setDeleteDialogState(false);
      refreshList();

      snackbar.success('Activity instance deleted successfully');
    });
  }

  // Render
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h6'>
          Activities
      </Typography>

      <div className={classes.activityList}>
        <List component="nav" aria-label="Category menu">
          {activityList.map(activity => (
            <ListItem 
              key={activity.id} 
              classes={{
                container: classes.listItem
              }}
            >
              <ListItemText primary={activity.name} />

              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                <IconButton
                  aria-label="Activity menu"
                  {...bindTrigger(activityMenu)}
                  onClick={(event) => onMenuClick(activity, event)}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>

      {activityActiveMenu &&
        <Menu {...bindMenu(activityMenu)}>
          <MenuItem onClick={onMenuEdit}>Edit</MenuItem>
          <MenuItem onClick={onMenuDelete}>Delete</MenuItem>
        </Menu>
      }

      {/* DIALOGS */}
      {activityActiveMenu && <>
        <ConfirmDialog
          title="Delete activity"
          message={`Are you sure you want to delete activity ${activityActiveMenu.name}?`}
          isOpen={deleteDialogState}
          onConfirm={() => deleteActivity(activityActiveMenu!.id!)}
          onClose={() => setDeleteDialogState(false)}
        />

        <FormDialog 
          title="Edit category"
          formId="activityEditForm"
          isOpen={editDialogState}
          onClose={() => setEditDialogState(false)}
        >
          <ActivityEditForm activity={activityActiveMenu} postSubmit={handleEdit} />
        </FormDialog>
      </>}
    </div>
  );
}