import * as React from 'react';
import {useMemo} from 'react';
import { useForm, Controller } from 'react-hook-form'
import { createStyles, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { ActivityInstanceService } from 'src/services/activity-instance-service';
import { ActivityInstance } from 'src/models/activity-instance';
import { DaysOfWeek } from 'src/models/shared';
import snackbar from 'src/SnackbarUtils';


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
    },
    activityForm: {
      display: 'flex',
      flexDirection: 'column',

      '& .MuiDivider-root': {
        margin: '1em 0',
      }

    },
    timeFields: {
      display: 'inline-flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: '1em',

      '& .MuiTextField-root': {
        width: '10em',
      }
    }
  })
);


// Props
interface InstanceEditFormProps {
  instance: ActivityInstance,
  postSubmit?: (response?: ActivityInstance, updated?: boolean) => any
}


// Form values
interface InstanceFormValues {
  day: number,
  startHour: Date,
  endHour: Date,
}


/**
 * Objective form component
 * Generic component that includes objective form inputs, logic and validation
 */
export function ActivityInstanceEditForm({instance, postSubmit}: InstanceEditFormProps) {
  // Services
  const instanceService = useMemo(() => new ActivityInstanceService(), []);

  // Form control
  const {handleSubmit, control} = useForm({
    defaultValues: {
      day: instance.day,
      startHour: new Date(`01/01/1970 ${instance.startHour}`),
      endHour: new Date(`01/01/1970 ${instance.endHour}`)
    }
  });

  // On submit
  function onSubmit(data: InstanceFormValues) {
    instance.startHour = data.startHour.toLocaleTimeString();
    instance.endHour = data.endHour.toLocaleTimeString();
    instance.day = data.day;

    instanceService.update(instance).subscribe(response => {
      if (postSubmit)
        postSubmit(response, true);

      snackbar.success("Activity instance updated successfully");
    });
  }


  // Render
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form id="activityInstanceEditForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="day"
          control={control}
          rules={{required: 'Day required'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              select
              label="Day of week"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              inputProps={{displayEmpty: true}}
              InputLabelProps={{shrink: true}}
            > 
            {Object.entries(DaysOfWeek).map(([key, name]) => (
              <MenuItem key={key} value={key}>
                {name}
              </MenuItem>
            ))}
            </TextField>
          )}
        />

        <div className={classes.timeFields}> 
          <Controller
            name="startHour"
            control={control}
            rules={{required: 'Start hour required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <KeyboardTimePicker
                label="Start hour"
                variant="inline"
                ampm={false}
                format="HH:mm"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />

          <Controller
            name="endHour"
            control={control}
            rules={{required: 'End hour required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <KeyboardTimePicker
                label="End hour"
                variant="inline"
                ampm={false}
                format="HH:mm"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </div>
      </form>
    </MuiPickersUtilsProvider>
  )
}