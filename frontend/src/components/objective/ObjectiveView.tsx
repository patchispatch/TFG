import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AppBar, Button, createStyles, Fab, FormControl, InputLabel, makeStyles, Select, Toolbar, Typography, MenuItem } from "@material-ui/core";
import { ObjectiveTable } from "./ObjectiveTable";
import { Theme } from "@material-ui/core";
import { ObjectiveForm } from "./ObjectiveForm";
import { FormDialog } from "../utils/FormDialog";
import { ObjectiveEntryCalendar } from "../objective-entry/ObjectiveEntryCalendar";
import { ObjectiveService } from "src/services/objective-service";
import { Objective } from "src/models/objective";
import { ObjectiveFilter } from "src/models/shared";
import { Add } from "@material-ui/icons";


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
      position: 'absolute',
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
export function ObjectiveView() {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);

  // State
  const [objLoaded, setObjLoaded] = useState<boolean>(false);
  const [objectiveList, setObjectiveList] = useState<Objective[]>([]);
  const [filter, setFilter] = useState<string>(ObjectiveFilter.NONE);

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
    setObjLoaded(false);
    objectiveService.list({filter: filter}).subscribe(response => {
      setObjectiveList(response);
      setObjLoaded(true);
    });
  }

  // Filter
  function handleFilter(event: ChangeEvent<{value: unknown}>) {
    const filter = event.target.value as string;
      setFilter(filter);
  }

  // On init and filter change
  useEffect(() => {
    refreshList();
  }, [filter])

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
            Objectives
          </Typography>

          <FormControl className={classes.formControl}>
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select 
              labelId="filter-label"
              id="filter"
              value={filter}
              onChange={handleFilter}
            >
              {Object.values(ObjectiveFilter).map(filt => (
                <MenuItem key={filt} value={filt}>{filt}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <ObjectiveTable 
            objectives={objectiveList} 
            loaded={objLoaded}
            refresh={refreshList}
          />
        </div>

        <div className={classes.section}>
          <Typography variant='h4'>
            Entry history
          </Typography>

          <ObjectiveEntryCalendar className={classes.calendar} />
        </div>

        <div className={classes.fab}>
          <Fab variant="extended" onClick={handleOpen} color="primary" aria-label="create">
            <Add className={classes.extendedIcon} />
            New objective
          </Fab>
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