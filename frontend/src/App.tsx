import * as React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import { createStyles, CssBaseline, Drawer, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
import {theme} from 'src/theme';
import { ObjectiveView } from './components/objective/ObjectiveView';
import { SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';
import { SnackbarUtilsConfigurator } from './SnackbarUtils';

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
    },
    clockContainer: {
      margin: '2em',
      background: '#eee',
      height: '12em',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }),
);


function App() {
  const classes = useStyles();

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
          </Drawer>
          <main className={classes.mainView}>
            <ObjectiveView />
          </main>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
