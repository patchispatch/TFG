import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form'
import {CategoryService} from 'src/services/category-service';
import { Category } from 'src/models/category';
import { Objective } from 'src/models/objective';
import { CircularProgress, createStyles, LinearProgress, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import { ActivityService } from 'src/services/activity-service';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';


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
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '14em',
      minWidth: '14em',
    }
  })
);


// Props
interface ActivityFormProps {
  postSubmit?: (response?: Objective, updated?: boolean) => any
}


// Form values
interface FormValues {
  name: string,
  description: string,
  categoryId?: number,
  startHour: Date,
  endHour: Date,
  // TODO: THINK ABOUT HOW THE FORM SHOULD BE
}


/**
 * Objective form component
 * Generic component that includes objective form inputs, logic and validation
 */
export function ActivityForm({postSubmit}: ActivityFormProps) {
  // Services
  const activityService = useMemo(() => new ActivityService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  // State
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);


  // Form control
  const {handleSubmit, control, reset} = useForm({
    // TODO: default values
  });


  // On init
  useEffect(() => {
    // Populate category list
    categoryService.list().subscribe(response => setCategoryList(response));
  }, [categoryService, reset])


  // On submit
  function onSubmit(data: FormValues) {
    // TODO: submit
  }


  // Render
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form id="activityForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </MuiPickersUtilsProvider>
    </div>
  )
}