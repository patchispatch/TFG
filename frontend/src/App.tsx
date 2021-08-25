import * as React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import { Button, CircularProgress, createStyles, CssBaseline, Drawer, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
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
import { AppContext, AppContextTypes } from './contexts/AppContext';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { CategoryService } from './services/category-service';
import { Category } from './models/category';
import { delay } from 'rxjs/operators';
import { Sidebar } from './components/view/Sidebar';

// Styles
const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',

    },
    globalLoading: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }),
);


function App() {
  const classes = useStyles();

  // Services
  const categoryService = useMemo(() => new CategoryService(), []);

  // State
  const [view, setView] = useState<AppView>(AppView.OBJECTIVES);
  const [loaded, setLoaded] = useState(false);

  // Switch view
  function switchView(): void {
    view === AppView.OBJECTIVES ? setView(AppView.ACTIVITIES) : setView(AppView.OBJECTIVES);
  }

  // Category form things
  // TODO: move drawer to separate component
  let [dialogState, setDialogState] = useState(false);

  // Initialize app context
  // TODO: settings

  function reloadContext() {
    setLoaded(false);
    categoryService.list().subscribe(response => {
      setCategoryList(response);
      setLoaded(true);
    });
  }

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const appContext: AppContextTypes = {categoryList, setCategoryList, reloadContext};

  useEffect(() => {
    reloadContext();
  }, [])


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
        <AppContext.Provider value={appContext}>

          <div className={classes.root}>
            <CssBaseline />

            {loaded ?
            <>
              <Drawer
                variant="permanent"
                className={classes.drawer}
                classes={{paper: classes.drawerPaper}}
                anchor="left"
              >
                <Sidebar switchView={switchView} handleOpen={handleOpen}/>
              </Drawer>

              <main className={classes.mainView}>
                {view === AppView.OBJECTIVES ? <ObjectiveView category={categoryList[0]} /> : <ActivityView />}
              </main>

              {/* Dialogs */}
              <FormDialog 
                  title="New category"
                  formId="categoryForm"
                  isOpen={dialogState}
                  onClose={handleClose}
              >
                <CategoryForm postSubmit={handleClose} />
              </FormDialog>
            </>
            :
            <div className={classes.globalLoading}>
              <CircularProgress />
            </div>
            }
          </div>

        </AppContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
