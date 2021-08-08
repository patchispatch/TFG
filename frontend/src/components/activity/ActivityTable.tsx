import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Activity } from "src/models/activity";
import { theme } from "src/theme";


// Styles
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
  loaded?: boolean;
  refresh?: () => void;
}

// Component
export function ActivityTable({activities}: ActivityTableProps) {

  // Render
  const classes = useStyles();
  return (
    <div className={classes.activityGrid}>
      <Grid container spacing={2} direction='row' wrap='nowrap'>
        <Grid container item spacing={1} direction='column' justify='flex-start'>
          <Paper className={classes.dayHeader}>MONDAY</Paper>
          <div className={classes.activityContainer}>
            <Paper className={classes.exampleActivity}>Activity title</Paper>
          </div>

          <div className={classes.activityContainer}>
            <Paper className={classes.exampleActivity}>Activity title</Paper>
          </div>
        </Grid>

        <Grid container item spacing={1} direction='column'>
          <Paper className={classes.dayHeader}>TUESDAY</Paper>
          <div className={classes.activityContainer}>
          <Paper className={classes.exampleActivity}>Activity title</Paper>
          </div>
        </Grid>

        <Grid container item spacing={1} direction='column'>
          <Paper className={classes.dayHeader}>TUESDAY</Paper>
          <div className={classes.activityContainer}>
          <Paper className={classes.exampleActivity}>Activity title</Paper>
          </div>
        </Grid>

        <Grid container item spacing={1} direction='column'>
          <Paper className={classes.dayHeader}>TUESDAY</Paper>
          <div className={classes.activityContainer}>
          <Paper className={classes.exampleActivity}>Activity title</Paper>
          </div>
        </Grid>

        <Grid container item spacing={1} direction='column'>
          <Paper className={classes.dayHeader}>TUESDAY</Paper>
          <div className={classes.activityContainer}>
          <Paper className={classes.exampleActivity}>Activity title</Paper>
          </div>
        </Grid>

        <Grid container item spacing={1} direction='column'>
          <Paper className={classes.dayHeader}>TUESDAY</Paper>
          <div className={classes.activityContainer}>
          <Paper className={classes.exampleActivity}>Activity title</Paper>
          </div>
        </Grid>

        <Grid container item spacing={1} direction='column'>
          <Paper className={classes.dayHeader}>TUESDAY</Paper>
          <div className={classes.activityContainer}>
          <Paper className={classes.exampleActivity}>Activity title</Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}