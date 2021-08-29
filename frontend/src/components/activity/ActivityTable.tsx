import { Chip, Divider, Grid, IconButton, makeStyles, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Activity } from "src/models/activity";
import { ActivityInstance } from "src/models/activity-instance";
import { Category } from "src/models/category";
import { convertToMap, DaysOfWeek, ModelMap } from "src/models/shared";
import { CategoryService } from "src/services/category-service";
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SyntheticEvent } from "react";
import { ActivityInstanceService } from "src/services/activity-instance-service";
import { ConfirmDialog } from "../utils/ConfirmDialog";
import { FormDialog } from "../utils/FormDialog";
import { ActivityInstanceEditForm } from "./ActivityInstanceEditForm";
import snackbar from 'src/SnackbarUtils';
import { CategoryChip } from "../category/CategoryChip";
import { fromHHmmToDate } from "src/utils";


// Styles
const useStyles = makeStyles({
  activityGrid: {
    height: '100%',
  },
  dayHeader: {
    height: '32px',
    display: 'flex',
    marginBottom: '2em',
    justifyContent: 'center',
    alignSelf: 'center',

    '& span': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  activityContainer: {
    position: 'relative',
    padding: '0',
  },
  activityCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '0 0.25em 0.5em 0.25em',
    minHeight: '6em',
    padding: '1em',
  },
  cardText: {
    margin: '0 !important'
  },
  cardMenuIcon: {
    scale: 0.75,
    position: 'absolute',
    right: '0.01em',
    top: '0.01em'
  },
  chip: {
    marginTop: '1.5em',
  }
});


// Props
interface ActivityTableProps {
  activities: Activity[];
  instances: ActivityInstance[];
  loaded?: boolean;
  refresh?: () => void;
}


// Component
export function ActivityTable({activities, instances, refresh=() => {}}: ActivityTableProps) {
  // Services
  const categoryService = useMemo(() => new CategoryService(), []);
  const instanceService = useMemo(() => new ActivityInstanceService(), []);

  // State
  const [activityMap, setActivityMap] = useState<ModelMap<Activity>>({});
  const [categoryMap, setCategoryMap] = useState<ModelMap<Category>>({});
  const [selectedInstance, setSelectedInstance] = useState<ActivityInstance | undefined>(undefined);
  const [editDialogState, setEditDialogState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);
  const activityMenu = usePopupState({ variant: 'popover', popupId: 'activityMenu' });


  // On init
  useEffect(() => {
    // Load category list
    categoryService.list().subscribe(categories =>  {
      setCategoryMap(convertToMap(categories));
    });
  }, [categoryService])

  // On activities prop change
  useEffect(() => {
    setActivityMap(convertToMap(activities));
  }, [activities]);

  /**
   * Deletes an activity instance
   */
  function deleteInstance(instanceId: number): void {
    instanceService.delete(instanceId).subscribe(() => {
      setDeleteDialogState(false);
      refresh();

      snackbar.success('Activity instance deleted successfully');
    });
  }

  /**
   * Returns the category of an activity
   * @param activity Activity
   */
  function categoryOfActivity(activity: Activity): Category | undefined {
    return activity.category ? categoryMap[activity.category] : undefined;
  }

  // Extend onClick menu event
  function onMenuClick(ins: ActivityInstance, event: SyntheticEvent): void {
    setSelectedInstance(ins);
    bindTrigger(activityMenu).onClick(event);
  }

  function onMenuEdit(): void {
    setEditDialogState(true);
    activityMenu.setOpen(false);
  }

  function handleEdit(response?: ActivityInstance, updated = false): void {
    setEditDialogState(false);

    if (updated) {
      refresh();
    }
  }

  function onMenuDelete(): void {
    setDeleteDialogState(true);
    activityMenu.setOpen(false);
  }


  // Render
  const classes = useStyles();
  return (
    <div className={classes.activityGrid}>
      <Grid container spacing={2} direction='row' wrap='nowrap'>

        <Divider orientation="vertical" flexItem />

        {[...Array(7).keys()].map((day: number) => (<Fragment key={day}>
          <Grid container item spacing={1} direction='column' justifyContent='flex-start'>

            {day === (new Date().getDay() + 6) % 7
            ?
              <Chip 
                classes={{root: classes.dayHeader}}
                label={DaysOfWeek[day]}
                color="secondary"
              />
            :
              <div className={classes.dayHeader}>
                <span>{DaysOfWeek[day]}</span>
              </div>
            }

            {instances.sort((a, b) => +fromHHmmToDate(a.startHour) - +fromHHmmToDate(b.startHour))
                      .filter((ins: ActivityInstance) => (ins.day === day)).map(ins => (
              <div key={ins.id} className={classes.activityContainer}>
                <IconButton
                  className={classes.cardMenuIcon}
                  aria-label="activity menu"
                  {...bindTrigger(activityMenu)}
                  onClick={(event) => onMenuClick(ins, event)}
                >
                  <MoreVertIcon />
                </IconButton>

                <Paper className={classes.activityCard}>
                  <Typography variant="body1" className={classes.cardText}>{activityMap[ins.activity].name}</Typography>
                  <Typography variant="caption" className={classes.cardText}>{ins.startHour} - {ins.endHour}</Typography>
                  {categoryOfActivity(activityMap[ins.activity]) && 
                    <CategoryChip
                      classes={{root: classes.chip}}
                      category={categoryOfActivity(activityMap[ins.activity])!}
                      size="small"
                    />
                  }
                </Paper>
              </div>
            ))}
          </Grid>

          <Divider orientation="vertical" flexItem />
        </Fragment>))}
      </Grid>

      {selectedInstance &&
        <Menu {...bindMenu(activityMenu)}>
          <MenuItem onClick={onMenuEdit}>Edit</MenuItem>
          <MenuItem onClick={onMenuDelete}>Delete</MenuItem>
        </Menu>
      }

      {/* DIALOGS */}
      {selectedInstance && <>
        <ConfirmDialog
          title="Delete activity instance"
          message={`Are you sure you want to delete \
          ${activityMap[selectedInstance!.activity].name}: ${selectedInstance!.startHour} - ${selectedInstance!.endHour}?`}
          isOpen={deleteDialogState}
          onConfirm={() => deleteInstance(selectedInstance!.id!)}
          onClose={() => setDeleteDialogState(false)}
        />

        <FormDialog 
          title="Edit activity instance"
          formId="activityInstanceEditForm"
          isOpen={editDialogState}
          onClose={() => setEditDialogState(false)}
        >
          <ActivityInstanceEditForm instance={selectedInstance} postSubmit={handleEdit} />
        </FormDialog>
      </>}
    </div>
  );
}