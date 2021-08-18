import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form'
import {ObjectiveService} from 'src/services/objective-service';
import {CategoryService} from 'src/services/category-service';
import { Category, CategoryColor, ColorDataMap } from 'src/models/category';
import { Objective } from 'src/models/objective';
import { CircularProgress, createStyles, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
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
interface CategoryFormProps {
  categoryId?: number,
  postSubmit?: (response?: Category, updated?: boolean) => any
}


// Form values
interface FormValues {
  name: string,
  color: CategoryColor
}


/**
 * Objective form component
 * Generic component that includes objective form inputs, logic and validation
 */
export function CategoryForm({categoryId, postSubmit}: CategoryFormProps) {
  // Services
  const categoryService = useMemo(() => new CategoryService(), []);

  // State
  const [category, setCategory] = useState<Category>();
  const [loaded, setLoaded] = useState<boolean>(true);


  // Form control
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      name: "",
      color: CategoryColor.DEFAULT
    }
  });


  // On init
  useEffect(() => {
    // If a category ID is provided, retrieve it
    if (categoryId) {
      setLoaded(false);
      categoryService.get(categoryId).subscribe(response => {
        setCategory(response);
        reset({
          name: response.name,
          color: response?.color ? response?.color : CategoryColor.DEFAULT
        });

        setLoaded(true);
      });
    }
  }, [categoryService, categoryId, categoryService, reset])


  // On submit
  function onSubmit(data: FormValues) {
    // If a category is provided, edit
    if (category) {
      category.name = data.name;
      category.color = ColorDataMap[data.color].storageName;

      categoryService.update(category).subscribe(response => {
        if (postSubmit) 
          postSubmit(response, true);

        snackbar.success('Category updated successfully');
      });
    }
    else {
      const new_category = new Category(data.name, data.color);

      categoryService.post(new_category).subscribe(response => {
        if (postSubmit) 
          postSubmit(response, true);

        snackbar.success('Category created successfully');
      });
    }
  }


  // Render
  const classes = useStyles();
  return (
    <div className={classes.content}>
    {loaded ?
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
          name="color"
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
    :
    <CircularProgress />
  }
  </div>
  )
}