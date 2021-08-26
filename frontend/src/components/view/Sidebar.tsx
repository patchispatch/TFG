import { Button, createStyles, Divider, List, ListItem, ListItemText, makeStyles, Theme, Typography } from "@material-ui/core"
import { useContext } from "react";
import { AppContext } from "src/contexts/AppContext";
import SettingsIcon from '@material-ui/icons/Settings';
import { Category } from "src/models/category";

// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      '& .MuiDivider-root': {
        margin: '2em 0',
        overflow: 'hidden',
        position: 'relative',
      }
    },
    clockContainer: {
      marginBottom: '2em',
      background: '#eee',
      height: '12em',
    },
    buttons: {
      display: 'block',
    },
    categoryMenu: {
      marginTop: '2em',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    settingsButton: {
      display: 'flex',
      position: 'sticky',
      button: 0,
      alignSelf: 'flex-end',

      '& .MuiButton-root': {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
      }
    }
  })
);

/**
 * Props
 */
interface SidebarProps {
  switchView: () => void,
  handleOpen: () => void,
  handleCategoryChange: (category: Category) => void,
  selectedCategory?: Category,
}


export function Sidebar({switchView, handleOpen, selectedCategory, handleCategoryChange}: any) {
  // State
  const context = useContext(AppContext);

  // Render
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.clockContainer}>
      </div>

      <div className={classes.buttons}>
        <Button variant="contained" color="secondary" onClick={switchView}>Switch view</Button>

        <Button variant="contained" color="primary" onClick={handleOpen}>New category</Button>
      </div>

      <Divider />

      <div className={classes.categoryMenu}>
        <Typography variant='h6'>
          Categories
        </Typography>

        <List component="nav" aria-label="Category menu">
          {context.categoryList.map(category => (
            <ListItem 
              key={category.id} 
              selected={category === selectedCategory} 
              button 
              onClick={() => handleCategoryChange(category)}>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </div>

      <div className={classes.settingsButton} >
        <Button>
          <span>Settings</span>
          <SettingsIcon />
        </Button>
      </div>
    </div>
)
}