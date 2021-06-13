import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form'
import {ObjectiveService} from 'src/services/objective-service';
import {CategoryService} from 'src/services/category-service';
import { Category } from 'src/models/category';
import { Objective } from 'src/models/objective';
import { createStyles, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';


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
interface ObjectiveFormProps {
  objectiveId?: number,
  postSubmit?: (response?: Objective) => any
}


// Form values
interface FormValues {
  name: string,
  goal: number,
  categoryId?: number,
}


/**
 * Objective form component
 * Generic component that includes objective form inputs, logic and validation
 */
export function ObjectiveForm({objectiveId, postSubmit}: ObjectiveFormProps) {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  // State
  let [categoryList, setCategoryList] = useState<Category[]>([]);
  let [objective, setObjective] = useState<Objective>();


  // Form control
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      name: "",
      goal: 1,
      categoryId: -1
    }
  });


  // On init
  useEffect(() => {
    // Populate category list
    categoryService.list().subscribe(response => setCategoryList(response));

    // If an objective ID is provided, retrieve it
    if (objectiveId) {
      objectiveService.get(objectiveId).subscribe(response => {
        setObjective(response);
        reset({
          name: response?.name,
          goal: response?.goal,
          categoryId: response?.categoryId ? response?.categoryId : -1
        });
      });
    }
      
  }, [categoryService, objectiveId, objectiveService])


  // On submit
  function onSubmit(data: FormValues) {
    // If an objective is provided, edit
    if (objective) {
      objective.name = data.name;
      objective.goal = data.goal;
      data.categoryId !== -1 && (objective.categoryId = data.categoryId);

      objectiveService.update(objective).subscribe(response => {
        if (postSubmit) {
          postSubmit(response);
        }
      });
    }
    else {
      const new_objective = new Objective(data.name, data.goal);
      data.categoryId !== -1 && (new_objective.categoryId = data.categoryId);

      objectiveService.post(new_objective).subscribe(response => {
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
        name="name"
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
        name="goal"
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

      <Controller
        name="categoryId"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextField
            select
            label="Category"
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
  )
}