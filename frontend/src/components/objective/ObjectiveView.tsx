import React, { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppBar, createStyles, Fab, FormControl, InputLabel, makeStyles, Select, Toolbar, Typography, MenuItem, ThemeProvider } from "@material-ui/core";
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
import { useCallback } from "react";
import { ColorDataMap } from "src/theme";
import { AppContext } from "src/contexts/AppContext";
import { Subscription } from "rxjs";
import { toTitleCase } from "src/utils";


// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterControl: {
      marginBottom: '1em',
      minWidth: 160,
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
  const context = useContext(AppContext);

  // Prevent unmounted update
  const mounted = useRef(false);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [entryDayList, setEntryDayList] = useState<number[]>([]);

  // Handle dialog state
  let [dialogState, setDialogState] = useState(false);

  function handleOpen(): void {
    setDialogState(true);
  }

  function handleClose(): void {
    setDialogState(false);
    refreshList();
  }

  // Calendar
  function onMonthChange(activeStartDate: Date) {
    const newMonth = activeStartDate.getMonth() + 1;
    if (currentMonth !== newMonth) 
      setCurrentMonth(newMonth);
  }

  // Refresh objective list
  const refreshList = useCallback(() => {
    if (mounted.current) {
      setObjLoaded(false);
      const listFilters: ObjectiveListParams = {filter: filter};
      if (category)
        listFilters.category = category;
  
      const objList = objectiveService.list(listFilters).subscribe(response => {
        setObjectiveList(response);
        setObjLoaded(true);
      });

      return objList;
    }

    return new Subscription();
  }, [category, filter, objectiveService]);

  // Filter
  function handleFilter(event: ChangeEvent<{value: unknown}>) {
    const filter = event.target.value as string;
      setFilter(filter);
  }

  // On init, filter and category change
  useEffect(() => {
    mounted.current = true;
    let refresh = new Subscription();
    if (mounted.current){
      refresh = refreshList();
    }

    return (() => {
      if (mounted){
        refresh.unsubscribe();
        mounted.current = false;
      }
    });
  }, [refreshList])

  // Render
  const classes = useStyles();
  return (
    <>
    <ThemeProvider theme={category ? ColorDataMap[category.color].theme : context.currentTheme}>
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
            <InputLabel id="filter-label">Filter objectives</InputLabel>
            <Select 
              labelId="filter-label"
              label="filter-label"
              id="filter"
              value={filter}
              onChange={handleFilter}
            >
              {Object.values(ObjectiveFilter).map(filt => (
                <MenuItem key={filt} value={filt}>{filt !== ObjectiveFilter.NONE ? toTitleCase(filt) : 'None'}</MenuItem>
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

          <ObjectiveEntryCalendar
            currentMonth={currentMonth}
            entryDayList={entryDayList}
            setEntryDayList={setEntryDayList}
            onMonthChange={onMonthChange}
            className={classes.calendar} 
            category={category ? category : undefined}
          />
        </div>

        <div className={classes.fab}>
          <Fab variant="extended" onClick={handleOpen} color="secondary" aria-label="create">
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
      </ThemeProvider>
    </>
  )
}