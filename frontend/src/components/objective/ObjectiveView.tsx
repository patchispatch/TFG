import React from "react";
import { AppBar, createStyles, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { CreateObjectiveEntry } from "../objective-entry/CreateObjectiveEntry";
import { CreateObjective } from "./CreateObjective";
import { EditObjective } from "./EditObjective";
import ObjectiveTable from "./ObjectiveTable";
import { Theme } from "@material-ui/core";


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
    }
  }),
);


// Component
export function ObjectiveView() {

  // 

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
          <CreateObjective />
          <CreateObjectiveEntry objectiveId={1} />
          <EditObjective objectiveId={1} />
        </div>

        <ObjectiveTable />
      </div>
    </>
  )
}