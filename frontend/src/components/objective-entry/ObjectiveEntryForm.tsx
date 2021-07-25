import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form'
import {ObjectiveService} from 'src/services/objective-service';
import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ObjectiveEntry } from 'src/models/objective-entry';
import { ObjectiveEntryService } from 'src/services/objective-entry-service';
import DateFnsUtils from '@date-io/date-fns';
import snackbar from 'src/SnackbarUtils';


// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      minWidth: 120,
      width: 'fit-content',

      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
      }
    }
  })
);


// Props
interface ObjectiveEntryFormProps {
  objectiveId: number
  entry?: ObjectiveEntry,
  postSubmit?: (response?: ObjectiveEntry) => any
}


// Form values
interface FormValues {
  progress: number,
  date: Date
}


/**
 * Objective form component
 * Generic component that includes objective form inputs, logic and validation
 */
export function ObjectiveEntryForm({objectiveId, entry, postSubmit}: ObjectiveEntryFormProps) {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);
  const objectiveEntryService = useMemo(() => new ObjectiveEntryService(), []);

  // Form control
  const initialFormState: FormValues = {
    progress: entry ? entry.progress : 1,
    date: entry ? entry.date : new Date()
  }
  const {handleSubmit, control} = useForm<FormValues>({defaultValues: initialFormState});

  // On submit
  function onSubmit(data: FormValues) {
    // If an objective is provided, edit
    if (entry) {
      entry.progress = data.progress;
      entry.date = data.date;

      objectiveEntryService.update(entry).subscribe(response => {
        if (postSubmit)
          postSubmit(response);

        snackbar.success("Objective entry updated successfully");
      });
    }
    else {
      const new_entry = new ObjectiveEntry(objectiveId, data.date, data.progress);
      objectiveService.addEntry(objectiveId, new_entry).subscribe(response => {
        if (postSubmit)
          postSubmit(response);

        snackbar.success("Objective entry created successfully");
      });
    }
  }


  // Render
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form id="objectiveEntryForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="date"
          control={control}
          rules={{required: 'Name required'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <KeyboardDateTimePicker
              label="Date"
              variant="inline"
              ampm={false}
              disableFuture
              format="dd/MM/yyyy HH:mm"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />

        <Controller
          name="progress"
          control={control}
          rules={{required: 'Progress required', min: 1}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              label="Progress"
              type="number"
              value={value}
              onChange={onChange}
              inputProps={{min: 1}}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
      </form>
    </MuiPickersUtilsProvider>
  )
}