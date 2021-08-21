import * as React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import { Button, createStyles, CssBaseline, Drawer, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
import { defaultTheme } from 'src/theme';
import { ObjectiveView } from './components/objective/ObjectiveView';
import { SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';
import { SnackbarUtilsConfigurator } from './SnackbarUtils';
import { AppView } from './models/shared';
import { useState } from 'react';
import { ActivityView } from './components/activity/ActivityView';
import { CategoryForm } from './components/category/CategoryForm';
import { FormDialog } from './components/utils/FormDialog';

// Styles
const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    mainView: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: '2em'
    },
    clockContainer: {
      marginBottom: '2em',
      background: '#eee',
      height: '12em',
    },
    buttons: {
      display: 'block',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }),
);


function App() {
  const classes = useStyles();

  // State
  const [view, setView] = useState<AppView>(AppView.OBJECTIVES);

  // Switch view
  function switchView(): void {
    view === AppView.OBJECTIVES ? setView(AppView.ACTIVITIES) : setView(AppView.OBJECTIVES);
  }

  // Category things
  let [dialogState, setDialogState] = useState(false);

  function handleOpen(): void {
    setDialogState(true);
  }

  function handleClose(): void {
    setDialogState(false);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider 
        /* 
        // @ts-ignore */
        TransitionComponent={Grow}
        maxSnack={1}
        hideIconVariant={false}
      >
        <SnackbarUtilsConfigurator />
        <div className={classes.root}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{paper: classes.drawerPaper}}
            anchor="left"
          >
            <div className={classes.clockContainer}>
            </div>

            <div className={classes.buttons}>
              <Button variant="contained" color="secondary" onClick={switchView}>Switch view</Button>

              <Button variant="contained" color="primary" onClick={handleOpen}>New category</Button>
            </div>
            
          </Drawer>

          <main className={classes.mainView}>
            {view === AppView.OBJECTIVES ? <ObjectiveView /> : <ActivityView />}
          </main>


          {/* Dialogs */}
          <FormDialog 
              title="New objective"
              formId="objectiveForm"
              isOpen={dialogState}
              onClose={handleClose}
          >
            <CategoryForm postSubmit={handleClose} />
          </FormDialog>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
