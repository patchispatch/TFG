import { makeStyles, Theme, createStyles, TextField, MenuItem, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AppContext } from 'src/contexts/AppContext';
import { Settings } from 'src/models/settings';
import { DaysOfWeek, AppView } from 'src/models/shared';
import { SettingsService } from 'src/services/settings-service';
import { Color } from 'src/theme';
import { toTitleCase } from 'src/utils';

// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
      minWidth: 300,
      position: 'relative',
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '16em',
      minWidth: '14em',
    },
  })
);

// Form values
interface SettingsFormValues {
  resetDay: number,
  theme: Color,
  defaultView: AppView
}


export function SettingsForm() {
  // Services
  const settingsService = useMemo(() => new SettingsService(), []);

  // State
  const [loaded, setLoaded] = useState<boolean>(true);
  const context = useContext(AppContext);

  // Form control
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      resetDay: 0,
      theme: 'default',
      defaultView: AppView.OBJECTIVES
    }
  });

  // Load settings on init
  useEffect(() => {
    setLoaded(false);
    settingsService.get().subscribe(response => {
      reset({
        resetDay: response.resetDay,
        theme: response.theme,
        defaultView: response.defaultView
      });
      setLoaded(true);
    });
  }, [settingsService, reset])

  /**
   * Update settings
   */
  function onSubmit(data: SettingsFormValues): void {
    const settings = new Settings(data.resetDay, data.theme, data.defaultView);
    setLoaded(false);
    settingsService.update(settings).subscribe(response => {
      setLoaded(true);
      context.reloadContext();
    });
  }
  
  // Render
  const classes = useStyles();
  return (
    <div className={classes.content}>
    {loaded ?
      <form id="settingsForm" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="resetDay"
          control={control}
          rules={{required: 'Reset day required'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              select
              label="First day of week"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              inputProps={{displayEmpty: true}}
              InputLabelProps={{shrink: true}}
            > 
              {Object.entries(DaysOfWeek).map(([day, dayName]) => (
                <MenuItem key={parseInt(day)} value={parseInt(day)}>
                  {toTitleCase(dayName)}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="theme"
          control={control}
          rules={{required: 'Theme required'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              select
              label="Theme"
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

        <Controller
          name="defaultView"
          control={control}
          rules={{required: 'Default view required'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              select
              label="Default view"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              inputProps={{displayEmpty: true}}
              InputLabelProps={{shrink: true}}
            > 
              {Object.values(AppView).map((option) => (
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