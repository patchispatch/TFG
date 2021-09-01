import * as React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import { CircularProgress, createStyles, CssBaseline, Drawer, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
import { ColorDataMap, defaultTheme } from 'src/theme';
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
import { Sidebar } from './components/view/Sidebar';
import { useCallback } from 'react';
import { SettingsService } from './services/settings-service';
import { Activity } from './models/activity';
import { ActivityService } from './services/activity-service';


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
  const activityService = useMemo(() => new ActivityService(), []);
  const settingsService = useMemo(() => new SettingsService(), []);

  // State

  /**
   * Activity list
   */
   const [activityList, setActivityList] = useState<Activity[]>([]);

  /**
   * Loading status of the application context
   */
  const [loaded, setLoaded] = useState(false);

  /**
   * Loading status of activity list
   */
  const [activityListLoaded, setActivityListLoaded] = useState(false);

  /**
   * Selected category, if any
   */
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  // Category form dialog
  let [dialogState, setDialogState] = useState(false);

  /**
   * Refresh the activity list
   */
  const refreshActivityList = useCallback(() => {
    setActivityListLoaded(false);
    return activityService.list().subscribe(response => {
      setActivityList(response);
      setActivityListLoaded(true);
    });
  }, [activityService]);

  /**
   * Refreshes the application context content
   */
  const reloadContext = useCallback(() => {
    setLoaded(false);
    categoryService.list().subscribe(response => {
      setSelectedCategory(undefined);
      setCategoryList(response);
      setLoaded(true);
    });

    settingsService.get().subscribe(response => {
      setTheme(ColorDataMap[response.theme].theme);
      setResetDay(response.resetDay);
      setDefaultView(response.defaultView);
      setView(response.defaultView);
    })
  }, [categoryService, settingsService]);

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resetDay, setResetDay] = useState<number>(0);
  const [defaultView, setDefaultView] = useState<AppView>(AppView.OBJECTIVES);
  const appContext: AppContextTypes = {
    categoryList: categoryList, 
    setCategoryList: setCategoryList, 
    reloadContext: reloadContext,
    currentTheme: theme,
    resetDay: resetDay,
    defaultView: defaultView
  };

  /**
   * Selected application view
   */
  const [view, setView] = useState<AppView>(defaultView);

  /**
   * Load context and data on app render
   */
  useEffect(() => {
    reloadContext();
    refreshActivityList();
  }, [reloadContext, refreshActivityList])


  function handleOpen(): void {
    setDialogState(true);
  }

  function handleClose(): void {
    setDialogState(false);
  }

  /**
   * Handle view change
   */
  function handleViewChange(view: AppView | null): void {
    setSelectedCategory(undefined);
    if (view !== null)
      setView(view);
  }

  /**
   * Handle category filter change (for objective view)
   */
  function handleCategoryChange(category: Category) {
    setSelectedCategory(category);
  }

  return (
    <ThemeProvider theme={theme}>
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
                <Sidebar 
                  view={view}
                  switchView={handleViewChange} 
                  handleOpen={handleOpen}
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategoryChange}
                  refresh={reloadContext}
                  activityList={activityList}
                  refreshActivityList={refreshActivityList}
                />
              </Drawer>

              <main className={classes.mainView}>
                {view === AppView.OBJECTIVES 
                ? <ObjectiveView category={selectedCategory} /> 
                : <ActivityView 
                    activityList={activityList}
                    refreshActivityList={refreshActivityList}
                    activityListLoaded={activityListLoaded}
                  />
                }
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
