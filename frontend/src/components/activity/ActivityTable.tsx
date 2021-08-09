import { Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Activity } from "src/models/activity";
import { ActivityInstance } from "src/models/activity-instance";
import { convertToMap, DaysOfWeek, ModelMap } from "src/models/shared";


// Styles
const useStyles = makeStyles({
  activityGrid: {
    height: '100%',
  },
  dayHeader: {
    display: 'flex',
    height: '3em',
    marginBottom: '1em',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContainer: {
    padding: '0',
  },
  exampleActivity: {
    marginBottom: '0.5em',
    height: '6em',
    padding: '0.5em',
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
  // State
  const [activityMap, setActivityMap] = useState<ModelMap<Activity>>({})

  // On activities change
  useEffect(() => {
    setActivityMap(convertToMap(activities));
  }, [activities]);

  // Render
  const classes = useStyles();
  return (
    <div className={classes.activityGrid}>
      <Grid container spacing={2} direction='row' wrap='nowrap'>


        {[...Array(7).keys()].map((day: number) => (<Fragment key={day}>
          <Grid container item spacing={1} direction='column' justify='flex-start'>
            <div className={classes.dayHeader}>{DaysOfWeek[day]}</div>

            <Divider orientation="horizontal" flexItem />

            {instances.filter((ins: ActivityInstance) => (ins.day === day)).map(ins => (
              <div key={ins.id} className={classes.activityContainer}>
                <Paper className={classes.exampleActivity}>
                  <Typography variant="h6">{activityMap[ins.activity].name}</Typography>
                  <Typography variant="overline">{ins.startHour.toTimeString()} - {ins.endHour.toTimeString()}</Typography>
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