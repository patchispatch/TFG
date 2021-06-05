import * as React from 'react';
import './App.css';
import { AppBar, createStyles, CssBaseline, Drawer, makeStyles, Theme, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import {theme} from 'src/theme';
import { CreateObjective } from './components/objective/CreateObjective';

// Style
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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);


function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{paper: classes.drawerPaper}}
          anchor="left"
        >
          Drawer
        </Drawer>
        <main className={classes.mainView}>
          <AppBar elevation={0} position="sticky">
            <Toolbar>
              <Typography variant="h6">
                Home
              </Typography>
            </Toolbar>
          </AppBar>

          <div className={classes.content}>
            <Typography variant="h6">MAIN VIEW</Typography>
            <CreateObjective />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
