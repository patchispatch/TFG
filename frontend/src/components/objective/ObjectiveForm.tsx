import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form'
import {ObjectiveService} from 'src/services/objective-service';
import {CategoryService} from 'src/services/category-service';
import { Category } from 'src/models/category';
import { Objective } from 'src/models/objective';
import { createStyles, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import classes from '*.module.css';

// Style
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
interface ObjectiveFormProps {
  objective?: Objective,
  postSubmit?: (response?: Objective) => any
}

// Form values
interface FormValues {
  name: string,
  goal: number,
  categoryId?: number | undefined
}

export function ObjectiveForm({objective, postSubmit}: ObjectiveFormProps) {
  const classes = useStyles();

  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  // Form
  const {handleSubmit, control} = useForm<FormValues>();

  // State
  let [categoryList, setCategoryList] = useState<Category[]>([]);

  // On init
  useEffect(() => {
    // Populate category list
    categoryService.list().subscribe(response => setCategoryList(response));
  }, [categoryService])

  // On submit
  function onSubmit(data: FormValues) {
    console.log(data);

    // If an objective is provided, edit
    if (objective) {
      objective.name = data.name;
      objective.goal = data.goal;
      data.categoryId && (objective.categoryId = data.categoryId);

      objectiveService.update(objective).subscribe(response => {
        if (postSubmit) {
          postSubmit(response);
        }
      });
    }
    else {
      const new_objective = new Objective(data.name, data.goal);
      data.categoryId && (new_objective.categoryId = data.categoryId);

      objectiveService.post(new_objective).subscribe(response => {
        if (postSubmit) {
          postSubmit(response);
        }
      });
    }
  }

  // Render
  return (
    <form id="objectiveForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
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
        name="goal"
        control={control}
        defaultValue={1}
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

      <Controller
        name="categoryId"
        control={control}
        defaultValue={undefined}
        render={({field: {onChange, value}}) => (
          <TextField
            select
            label="Category"
            value={value}
            onChange={onChange}
            inputProps={{displayEmpty: true}}
          >
            <MenuItem value={undefined}>
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
  )
}