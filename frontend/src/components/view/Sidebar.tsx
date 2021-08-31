import { Button, createStyles, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Menu, MenuItem, Theme, Typography } from "@material-ui/core"
import { useState, MouseEvent } from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import { Category } from "src/models/category";
import { FormDialog } from "../utils/FormDialog";
import { ClockCalendar } from "./ClockCalendar";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { AppView } from "src/models/shared";
import { SettingsForm } from "../settings/SettingsForm";
import { ObjectiveSidebar } from "./ObjectiveSidebar";

// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100vh',
      '& .MuiDivider-root': {
        margin: '2em 0',
        overflow: 'hidden',
        position: 'relative',
      }
    },
    clockContainer: {
      marginBottom: '2em',
    },
    categoryMenu: {
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    settingsButton: {
      marginTop: 'auto',
      '& .MuiButton-root': {
        display: 'flex',
        marginTop: '2em',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
      }
    },
    listItemSecondaryAction: {
      visibility: 'hidden'
    },
    listItem: {
      '&:hover $listItemSecondaryAction': {
        visibility: "inherit"
      }
    },
    listButton: {
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    listLeftIcon: {
      display: 'flex',
      justifyContent: 'center',
      marginRight: '1em'
    },
    toggleButtonGroup: {
      '& .MuiToggleButton-root': {
        padding: '0.5em 1em',
      }
    }
  })
);

/**
 * Props
 */
interface SidebarProps {
  view: AppView,
  switchView: (view: AppView) => void,
  handleOpen: () => void,
  handleCategoryChange: (category: Category) => void,
  selectedCategory?: Category,
  refresh: () => void
}


export function Sidebar({
  view,
  switchView, 
  handleOpen, 
  selectedCategory, 
  handleCategoryChange, 
  refresh=() => {}
}: SidebarProps) {

  // State

  const [settingsDialogState, setSettingsDialogState] = useState(false);

  /**
   * Handles view change event
   */
  function handleViewChange(event: MouseEvent<HTMLElement>, newView: AppView): void {
    switchView(newView);
  }

  // Render
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.clockContainer}>
        <ClockCalendar />
      </div>

      <div>
        <ToggleButtonGroup
          className={classes.toggleButtonGroup}
          value={view}
          exclusive
          onChange={handleViewChange}
        >
          <ToggleButton value={AppView.OBJECTIVES}>
            Objectives
          </ToggleButton>
          <ToggleButton value={AppView.ACTIVITIES}>
            Activities
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Divider />

      {view === AppView.OBJECTIVES
      ?
        <ObjectiveSidebar 
          selectedCategory={selectedCategory}
          refresh={refresh}
          handleCategoryChange={handleCategoryChange}
          handleOpen={handleOpen}
        />
      :
        <></>
      }


      <div className={classes.settingsButton} >
        <Button onClick={() => setSettingsDialogState(true)}>
          <span>Settings</span>
          <SettingsIcon />
        </Button>
      </div>

      <FormDialog 
        title="New objective"
        formId="settingsForm"
        isOpen={settingsDialogState}
        onClose={() => setSettingsDialogState(false)}
      >
        <SettingsForm />
      </FormDialog>
    </div>
  )
}