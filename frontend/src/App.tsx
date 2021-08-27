import * as React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import { CircularProgress, createStyles, CssBaseline, Drawer, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
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
import { Sidebar } from './components/view/Sidebar';
import { useCallback } from 'react';

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
  /**
   * Selected application view
   */
  const [view, setView] = useState<AppView>(AppView.OBJECTIVES);

  /**
   * Loading status of the application context
   */
  const [loaded, setLoaded] = useState(false);

  /**
   * Selected category, if any
   */
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  // Category form things
  // TODO: move drawer to separate component
  let [dialogState, setDialogState] = useState(false);

  // Initialize app context
  // TODO: settings

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
  }, [categoryService]);

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const appContext: AppContextTypes = {categoryList, setCategoryList, reloadContext};

  /**
   * Load context on app render
   */
  useEffect(() => {
    reloadContext();
  }, [reloadContext])


  function handleOpen(): void {
    setDialogState(true);
  }

  function handleClose(): void {
    setDialogState(false);
  }

  /**
   * Handle view change
   */
  function handleViewChange(view: AppView): void {
    setSelectedCategory(undefined);
    setView(view);
  }

  /**
   * Handle category filter change (for objective view)
   */
  function handleCategoryChange(category: Category) {
    setSelectedCategory(category);
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
                <Sidebar 
                  view={view}
                  switchView={handleViewChange} 
                  handleOpen={handleOpen}
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategoryChange}
                  refresh={reloadContext}
                />
              </Drawer>

              <main className={classes.mainView}>
                {view === AppView.OBJECTIVES 
                ? <ObjectiveView category={selectedCategory} /> 
                : <ActivityView />
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
