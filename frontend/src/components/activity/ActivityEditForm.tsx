import * as React from 'react';
import {useMemo} from 'react';
import { useForm, Controller } from 'react-hook-form'
import { createStyles, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import { ActivityService } from 'src/services/activity-service';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Activity } from 'src/models/activity';
import snackbar from 'src/SnackbarUtils';
import { useContext } from 'react';
import { AppContext } from 'src/contexts/AppContext';


// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      minWidth: 120,
      position: 'relative',

      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
      }
    }
  })
);


// Props
interface ActivityFormProps {
  activity: Activity,
  postSubmit?: (response?: Activity, updated?: boolean) => any
}


// Form values
interface ActivityFormValues {
  name: string,
  description: string,
  category: number
}


/**
 * Objective form component
 * Generic component that includes objective form inputs, logic and validation
 */
export function ActivityEditForm({activity, postSubmit}: ActivityFormProps) {
  // Services
  const activityService = useMemo(() => new ActivityService(), []);

  // State
  const {categoryList} = useContext(AppContext);


  // Form control
  const {handleSubmit, control} = useForm({
    defaultValues: {
      name: activity.name,
      description: activity.description ? activity.description : '',
      category: activity.category ? activity.category : -1
    }
  });

  // On submit
  function onSubmit(data: ActivityFormValues) {
    const newAct = new Activity(data.name, data.description, data.category, activity.id);
    activityService.update(newAct).subscribe(response => {
      if (postSubmit)
        postSubmit(response, true);

      snackbar.success("Activity updated successfully");
    })
  }


  // Render
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form id="activityEditForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{required: 'Name required'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              label="Activity name"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({field: {onChange, value}}) => (
            <TextField
              multiline
              label="Activity description"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({field: {onChange, value}}) => (
            <TextField
              select
              label="Activity category"
              value={value}
              onChange={onChange}
              inputProps={{displayEmpty: true}}
              InputLabelProps={{shrink: true}}
            >
              <MenuItem key={-1} value={-1}>
                <em>None</em>
              </MenuItem>
              
              {categoryList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </form>
    </MuiPickersUtilsProvider>
  )
}