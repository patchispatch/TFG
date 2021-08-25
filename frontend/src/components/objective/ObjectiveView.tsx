import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AppBar, createStyles, Fab, FormControl, InputLabel, makeStyles, Select, Toolbar, Typography, MenuItem } from "@material-ui/core";
import { ObjectiveTable } from "./ObjectiveTable";
import { Theme } from "@material-ui/core";
import { ObjectiveForm } from "./ObjectiveForm";
import { FormDialog } from "../utils/FormDialog";
import { ObjectiveEntryCalendar } from "../objective-entry/ObjectiveEntryCalendar";
import { ObjectiveListParams, ObjectiveService } from "src/services/objective-service";
import { Objective } from "src/models/objective";
import { ObjectiveFilter } from "src/models/shared";
import { Add } from "@material-ui/icons";
import { Category } from "src/models/category";


// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterControl: {
      marginBottom: '1em',
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

// Props
interface ObjectiveViewProps {
  category?: Category
}


// Component
export function ObjectiveView({category}: ObjectiveViewProps) {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);

  // State
  const [objLoaded, setObjLoaded] = useState<boolean>(false);
  const [objectiveList, setObjectiveList] = useState<Objective[]>([]);
  const [filter, setFilter] = useState<string>('');

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
    const listFilters: ObjectiveListParams = {filter: filter};
    if (category)
      listFilters.category = category;

    objectiveService.list(listFilters).subscribe(response => {
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
            {category ? `Objectives in category [${category.name}]`: "Objectives"}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <div className={classes.section}>
          <FormControl className={classes.filterControl}>
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select 
              labelId="filter-label"
              id="filter"
              value={filter}
              onChange={handleFilter}
            >
              {Object.values(ObjectiveFilter).map(filt => (
                <MenuItem key={filt} value={filt}>{filt !== ObjectiveFilter.NONE ? filt : 'None'}</MenuItem>
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

          <ObjectiveEntryCalendar className={classes.calendar} category={category ? category : undefined}/>
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