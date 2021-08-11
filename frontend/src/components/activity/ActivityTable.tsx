import { Chip, Divider, Grid, IconButton, makeStyles, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Activity } from "src/models/activity";
import { ActivityInstance } from "src/models/activity-instance";
import { Category } from "src/models/category";
import { convertToMap, DaysOfWeek, ModelMap } from "src/models/shared";
import { CategoryService } from "src/services/category-service";
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import MoreVertIcon from '@material-ui/icons/MoreVert';


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
export function ActivityTable({activities, instances}: ActivityTableProps) {
  // Services
  const categoryService = useMemo(() => new CategoryService(), []);

  // State
  const [activityMap, setActivityMap] = useState<ModelMap<Activity>>({})
  const [categoryMap, setCategoryMap] = useState<ModelMap<Category>>({});
  const activityMenu = usePopupState({ variant: 'popover', popupId: 'activityMenu' });

  // On init
  useEffect(() => {
    // Load category list
    categoryService.list().subscribe(categories =>  {
      setCategoryMap(convertToMap(categories));
    });
  }, [categoryService])

  // On activities change
  useEffect(() => {
    setActivityMap(convertToMap(activities));
  }, [activities]);

  /**
   * Returns the category of an activity
   * @param activity Activity
   */
     function categoryOfActivity(activity: Activity): Category | undefined {
      return activity.category ? categoryMap[activity.category] : undefined;
    }

  // Render
  const classes = useStyles();
  return (
    <div className={classes.activityGrid}>
      <Grid container spacing={2} direction='row' wrap='nowrap'>

        <Divider orientation="vertical" flexItem />

        {[...Array(7).keys()].map((day: number) => (<Fragment key={day}>
          <Grid container item spacing={1} direction='column' justify='flex-start'>

            {day === new Date().getDay() 
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

            {instances.filter((ins: ActivityInstance) => (ins.day === day)).map(ins => (
              <div key={ins.id} className={classes.activityContainer}>
                <IconButton className={classes.cardMenuIcon} {...bindTrigger(activityMenu)} aria-label="activity menu">
                  <MoreVertIcon />
                </IconButton>

                <Menu {...bindMenu(activityMenu)}>
                  <MenuItem onClick={activityMenu.close}>Edit</MenuItem>
                  <MenuItem onClick={activityMenu.close}>Delete</MenuItem>
                </Menu>

                <Paper className={classes.activityCard}>
                  <Typography variant="body1" className={classes.cardText}>{activityMap[ins.activity].name}</Typography>
                  <Typography variant="caption" className={classes.cardText}>{ins.startHour} - {ins.endHour}</Typography>
                  {categoryOfActivity(activityMap[ins.activity]) && 
                    <Chip
                      classes={{root: classes.chip}}
                      label={categoryOfActivity(activityMap[ins.activity])!.name}
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
    </div>
  );
}