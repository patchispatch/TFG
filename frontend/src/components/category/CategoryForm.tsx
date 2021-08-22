import * as React from 'react';
import {useMemo, useState, useEffect, useContext} from 'react';
import { useForm, Controller } from 'react-hook-form'
import {ObjectiveService} from 'src/services/objective-service';
import {CategoryService} from 'src/services/category-service';
import { Category } from 'src/models/category';
import { Objective } from 'src/models/objective';
import { CircularProgress, createStyles, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import snackbar from 'src/SnackbarUtils';
import { toTitleCase } from 'src/utils';
import { Color } from 'src/theme';
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
  color: Color
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
  const {reloadContext} = useContext(AppContext);


  // Form control
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      name: "",
      color: Color.DEFAULT
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
          color: response.color
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
      category.color = data.color;

      categoryService.update(category).subscribe(response => {
        if (postSubmit) 
          postSubmit(response, true);

        reloadContext();
        snackbar.success('Category updated successfully');
      });
    }
    else {
      const new_category = new Category(data.name, data.color);

      categoryService.post(new_category).subscribe(response => {
        if (postSubmit) 
          postSubmit(response, true);

        reloadContext();
        snackbar.success('Category created successfully');
      });
    }
  }


  // Render
  const classes = useStyles();
  return (
    <div className={classes.content}>
    {loaded ?
      <form id="categoryForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
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
          rules={{required: 'Color required'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              select
              label="Color"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              inputProps={{displayEmpty: true}}
              InputLabelProps={{shrink: true}}
            > 
              {Object.values(Color).map((option) => (
                <MenuItem key={option} value={option}>
                  {toTitleCase(option)}
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