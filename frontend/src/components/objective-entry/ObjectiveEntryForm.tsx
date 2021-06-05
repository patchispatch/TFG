import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form'
import {ObjectiveService} from 'src/services/objective-service';
import {CategoryService} from 'src/services/category-service';
import { Category } from 'src/models/category';
import { createStyles, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import { ObjectiveEntry } from 'src/models/objective-entry';
import { ObjectiveEntryService } from 'src/services/objective-entry-service';


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
export function ObjectiveForm({objectiveId, entry, postSubmit}: ObjectiveEntryFormProps) {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);
  const objectiveEntryService = useMemo(() => new ObjectiveEntryService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  // State
  let [categoryList, setCategoryList] = useState<Category[]>([]);


  // Form control
  const initialFormState: FormValues = {
    progress: 1,
    date: new Date()
  }
  const {handleSubmit, control} = useForm<FormValues>({defaultValues: initialFormState});


  // On init
  useEffect(() => {
    // Populate category list
    categoryService.list().subscribe(response => setCategoryList(response));
  }, [categoryService])

  // On submit
  function onSubmit(data: FormValues) {
    // If an objective is provided, edit
    if (entry) {
      entry.progress = data.progress;
      entry.date = data.date;

      objectiveEntryService.update(entry).subscribe(response => {
        if (postSubmit) {
          postSubmit(response);
        }
      });
    }
    else {
      const new_entry = new ObjectiveEntry(objectiveId, data.date, data.progress);
      objectiveEntryService.post(new_entry).subscribe(response => {
        if (postSubmit) {
          postSubmit(response);
        }
      });
    }
  }


  // Render
  const classes = useStyles();
  return (
    <form id="objectiveForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="date"
        control={control}
        rules={{required: 'Name required'}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            label="Name"
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
        rules={{required: 'Goal required', min: 1}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            label="Goal"
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
  )
}