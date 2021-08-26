import { Button, createStyles, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Menu, MenuItem, Theme, Typography } from "@material-ui/core"
import { SyntheticEvent, useContext, useMemo, useState } from "react";
import { AppContext } from "src/contexts/AppContext";
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import SettingsIcon from '@material-ui/icons/Settings';
import { Category } from "src/models/category";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ConfirmDialog } from "../utils/ConfirmDialog";
import { FormDialog } from "../utils/FormDialog";
import snackbar from 'src/SnackbarUtils';
import { CategoryService } from "src/services/category-service";
import { CategoryForm } from "../category/CategoryForm";

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
    },
    listItemSecondaryAction: {
      visibility: 'hidden'
    },
    listItem: {
      '&:hover $listItemSecondaryAction': {
        visibility: "inherit"
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
  refresh: () => void
}


export function Sidebar({
  switchView, 
  handleOpen, 
  selectedCategory, 
  handleCategoryChange, 
  refresh=() => {}
}: SidebarProps) {
  // Services
  const categoryService = useMemo(() => new CategoryService(), []);

  // State
  const context = useContext(AppContext);
  const categoryMenu = usePopupState({ variant: 'popover', popupId: 'activityMenu' });
  const [categoryActiveMenu, setCategoryActiveMenu] = useState<Category | undefined>(undefined);
  const [editDialogState, setEditDialogState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);


  // Extend onClick menu event
  function onMenuClick(cat: Category, event: SyntheticEvent): void {
    setCategoryActiveMenu(cat);
    bindTrigger(categoryMenu).onClick(event);
  }

  function onMenuEdit(): void {
    setEditDialogState(true);
    categoryMenu.setOpen(false);
  }

  function onMenuDelete(): void {
    setDeleteDialogState(true);
    categoryMenu.setOpen(false);
  }

  function handleEdit(response?: Category, updated = false): void {
    setEditDialogState(false);

    if (updated) {
      refresh();
    }
  }

  /**
   * Deletes an activity instance
   */
  function deleteCategory(categoryId: number): void {
    categoryService.delete(categoryId).subscribe(() => {
      setDeleteDialogState(false);
      refresh();

      snackbar.success('Activity instance deleted successfully');
    });
  }


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
              onClick={() => handleCategoryChange(category)}
              classes={{
                container: classes.listItem
              }}
            >
              <ListItemText primary={category.name} />

              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                <IconButton
                  aria-label="Category menu"
                  {...bindTrigger(categoryMenu)}
                  onClick={(event) => onMenuClick(category, event)}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
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

      {categoryActiveMenu &&
        <Menu {...bindMenu(categoryMenu)}>
          <MenuItem onClick={onMenuEdit}>Edit</MenuItem>
          <MenuItem onClick={onMenuDelete}>Delete</MenuItem>
        </Menu>
      }

      {/* DIALOGS */}
      {categoryActiveMenu && <>
        <ConfirmDialog
          title="Delete activity instance"
          message={`Are you sure you want to delete category ${categoryActiveMenu.name}?`}
          isOpen={deleteDialogState}
          onConfirm={() => deleteCategory(categoryActiveMenu!.id!)}
          onClose={() => setDeleteDialogState(false)}
        />

        <FormDialog 
          title="Edit category"
          formId="categoryForm"
          isOpen={editDialogState}
          onClose={() => setEditDialogState(false)}
        >
          <CategoryForm categoryId={categoryActiveMenu.id} postSubmit={handleEdit} />
        </FormDialog>
      </>}
    </div>
  )
}