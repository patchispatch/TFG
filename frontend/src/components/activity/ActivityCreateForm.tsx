import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form'
import { CircularProgress, createStyles, Divider, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import { ActivityService } from 'src/services/activity-service';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { Activity } from 'src/models/activity';
import { ActivityInstanceService } from 'src/services/activity-instance-service';
import { ActivityInstance } from 'src/models/activity-instance';
import { DaysOfWeek } from 'src/models/shared';
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
interface ActivityFormProps {
  postSubmit?: (response?: ActivityInstance, updated?: boolean) => any
}


// Form values
interface InstanceFormValues {
  activity: number,
  day: number,
  startHour: Date,
  endHour: Date,
  activityName?: string,
  activityDescription?: string,
  activityCategory?: number
}


/**
 * Objective form component
 * Generic component that includes objective form inputs, logic and validation
 */
export function ActivityForm({postSubmit}: ActivityFormProps) {
  // Services
  const activityService = useMemo(() => new ActivityService(), []);
  const instanceService = useMemo(() => new ActivityInstanceService(), []);

  // State
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);
  const {categoryList} = useContext(AppContext);


  // Form control
  const {handleSubmit, control, watch, reset} = useForm({
    defaultValues: {
      activity: -1,
      day: new Date().getDay() - 1 % 7,
      startHour: new Date(),
      endHour: new Date().setHours(new Date().getHours() + 1),
      activityName: '',
      activityDescription: '',
      activityCategory: -1
    }
  });
  const selectedActivity = watch('activity');


  // On init
  useEffect(() => {
    // Load data
    setLoaded(false);
    activityService.list().subscribe(activities => {
      setActivityList(activities);
      setLoaded(true);
    });
  }, [activityService, reset])


  // On submit
  function onSubmit(data: InstanceFormValues) {
    // If new activity is selected, create, then create instance
    if (selectedActivity === -1) {
      const newActivity = new Activity(data.activityName!);
      newActivity.description = data.activityDescription ? data.activityDescription : undefined;
      newActivity.category = (data.activityCategory !== -1) ? data.activityCategory : undefined;

      activityService.post(newActivity).subscribe(response => {
        const newInstance = new ActivityInstance(data.day, new Date(data.startHour).toLocaleTimeString(), 
          new Date(data.endHour).toLocaleTimeString(), response.id!);
        
          instanceService.post(newInstance).subscribe(response => {
            if (postSubmit)
              postSubmit(response);
      
            snackbar.success("Activity and instance created successfully");
          });
      })
    }
    // Else, submit instance
    else {
      const newInstance = new ActivityInstance(data.day, new Date(data.startHour).toLocaleTimeString(), 
        new Date(data.endHour).toLocaleTimeString(), data.activity);

      instanceService.post(newInstance).subscribe(response => {
        if (postSubmit)
          postSubmit(response);

        snackbar.success("Activity instance created successfully");
      });
    }
  }


  // Render
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {loaded ?
        <form id="activityCreateForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="activity"
            control={control}
            rules={{required: 'Activity required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextField
                select
                label="Activity"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                inputProps={{displayEmpty: true}}
                InputLabelProps={{shrink: true}}
              >
                <MenuItem key={-1} value={-1}>
                  <em>New</em>
                </MenuItem>
                
                {activityList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {selectedActivity === -1 && 
          <div className={classes.activityForm}>
            <Controller
              name="activityName"
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
              name="activityDescription"
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
              name="activityCategory"
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

            <Divider orientation='horizontal' />
          </div>}


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
      :
      <CircularProgress />
    }
    </MuiPickersUtilsProvider>
  )
}