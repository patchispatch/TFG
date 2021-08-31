import { Divider, List, ListItem, makeStyles, createStyles, Typography, Theme, ListItemText, 
  ListItemSecondaryAction, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { bindMenu, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { SyntheticEvent, useContext, useMemo, useState } from "react";
import { AppContext } from "src/contexts/AppContext";
import { Category } from "src/models/category";
import { CategoryService } from "src/services/category-service";
import { ObjectiveSuggestions } from "../objective/ObjectiveSuggestions";
import snackbar from 'src/SnackbarUtils';
import { CategoryForm } from "../category/CategoryForm";
import { ConfirmDialog } from "../utils/ConfirmDialog";
import { FormDialog } from "../utils/FormDialog";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';


// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
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

// Props
interface ObjectiveSidebarProps {
  refresh: () => void,
  handleCategoryChange: (category: Category) => void,
  handleOpen: () => void,
  selectedCategory?: Category,
}


export function ActivitySidebar({
  refresh, 
  selectedCategory,
  handleCategoryChange,
  handleOpen
}: ObjectiveSidebarProps) {
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
   * Deletes a category
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
    <div>
      <ObjectiveSuggestions />

      <Divider />

      <Typography variant='h6'>
          Categories
      </Typography>
      <div className={classes.categoryMenu}>
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

      {/* New category button */}
      <ListItem className={classes.listButton} button onClick={handleOpen}>
        <span className={classes.listLeftIcon}><AddIcon /></span>
        New category
      </ListItem>

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
  );
}