import { Card, CardContent, CardHeader, CircularProgress, IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import * as React from 'react';
import { SyntheticEvent, useContext } from 'react';
import { useCallback, useEffect } from 'react';
import { useMemo, useState } from 'react';
import { AppContext } from 'src/contexts/AppContext';
import { Category } from 'src/models/category';
import { Objective } from 'src/models/objective';
import { ObjectiveEntry } from 'src/models/objective-entry';
import { convertToMap, ModelMap } from 'src/models/shared';
import { ObjectiveEntryParameters, ObjectiveEntryService } from 'src/services/objective-entry-service';
import { ObjectiveService } from 'src/services/objective-service';
import { CategoryChip } from '../category/CategoryChip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import { ConfirmDialog } from '../utils/ConfirmDialog';
import snackbar from 'src/SnackbarUtils';
import { FormDialog } from '../utils/FormDialog';
import { ObjectiveEntryForm } from './ObjectiveEntryForm';

// Style
const useStyles = makeStyles({
  entryList: {
    maxHeight: '50vh',
    padding: '0.5em',
  },
  entry: {
    marginBottom: '1em',
  },
  cardContent: {
    position: 'relative'
  },
  emptyMessage: {
    fontStyle: 'italic'
  },
  chip: {
    position: 'absolute',
    bottom: '1em',
    right: '1em'
  },
  cardMenuIcon: {
    scale: 0.75,
    position: 'absolute',
    right: '0.01em',
    top: '0.01em'
  },
});

// Props
interface EntryHistoryProps {
  date: Date,
  category?: Category
}

export function ObjectiveEntryHistory({date, category}: EntryHistoryProps) {
  // Services
  const objectiveEntryService = useMemo(() => new ObjectiveEntryService(), []);
  const objectiveService = useMemo(() => new ObjectiveService(), []);

  // State
  const [entryList, setEntryList] = useState<ObjectiveEntry[]>([]);
  const [objectiveMap, setObjectiveMap] = useState<ModelMap<Objective>>({});
  const [categoryMap, setCategoryMap] = useState<ModelMap<Category>>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<ObjectiveEntry | undefined>(undefined);
  const [editDialogState, setEditDialogState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);
  const {categoryList} = useContext(AppContext);
  const entryMenu = usePopupState({ variant: 'popover', popupId: 'entryMenu' });

  /**
   * Load entries and related objectives on the selected date
   */
  const loadEntryInfo = useCallback(() => {
    // Load entry list
    setLoaded(false);

    const historyFilters: ObjectiveEntryParameters = {date: date};
    if (category)
      historyFilters.category = category;

    objectiveEntryService.list(historyFilters).subscribe(entries => {
      setEntryList(entries);

      // Load objectives to show data
      const objectivesToBring: number[] = [];
      for (const entry of entries) {
        objectivesToBring.push(entry.objective_id);
      }

      objectiveService.list({idlist: objectivesToBring}).subscribe(objectives => {
        setObjectiveMap(convertToMap(objectives));
        setLoaded(true);
      })
    });
  }, [date, objectiveService, objectiveEntryService, category]);

  // On init
  useEffect(() => {
    // Create category map
    setCategoryMap(convertToMap(categoryList));

    // Load entry info
    loadEntryInfo();
  }, [loadEntryInfo, categoryList]);

  // On day change
  useEffect(() => {
    loadEntryInfo();
  }, [date, loadEntryInfo]);

  /**
   * Returns the category of an objective entry
   * @param entry Objective entry
   */
  function categoryOfEntry(entry: ObjectiveEntry): Category | undefined {
    const objective = objectiveMap[entry.objective_id];
    return objective.categoryId ? categoryMap[objective.categoryId] : undefined;
  }

  // Extend onClick menu event
  function onMenuClick(entry: ObjectiveEntry, event: SyntheticEvent): void {
    setSelectedEntry(entry);
    bindTrigger(entryMenu).onClick(event);
  }

  function onMenuEdit(): void {
    setEditDialogState(true);
    entryMenu.setOpen(false);
  }

  function handleEdit(response?: ObjectiveEntry, updated = false): void {
    setEditDialogState(false);

    if (updated) {
      loadEntryInfo();
    }
  }

  function onMenuDelete(): void {
    setDeleteDialogState(true);
    entryMenu.setOpen(false);
  }

  /**
   * Deletes an activity instance
   */
  function deleteInstance(entryId: number): void {
    objectiveEntryService.delete(entryId).subscribe(() => {
      setDeleteDialogState(false);
      loadEntryInfo();

      snackbar.success('Activity instance deleted successfully');
    });
  }

  // Render
  const classes = useStyles();

  return (
    <>
      {loaded ?
        <div className={classes.entryList}>
          {entryList.length > 0 ? entryList.map(entry => (
            <Card key={entry.id} className={classes.entry}>
              <CardContent className={classes.cardContent}>
                <IconButton
                    className={classes.cardMenuIcon}
                    aria-label="activity menu"
                    {...bindTrigger(entryMenu)}
                    onClick={(event) => onMenuClick(entry, event)}
                  >
                    <MoreVertIcon />
                </IconButton>

                <Typography variant="h6">
                  {objectiveMap[entry.objective_id].name}
                </Typography>
                
                <Typography variant='body2'>
                  Hour: {entry.date.toLocaleTimeString()} | Progress: {entry.progress}
                </Typography>

                {categoryOfEntry(entry) && 
                  <CategoryChip
                    category={categoryOfEntry(entry)!}
                    classes={{root: classes.chip}}
                    size="small"
                  />
                }
              </CardContent>
            </Card>
            ))
            : <p className={classes.emptyMessage}>There are no entries this day.</p>
          }

          {selectedEntry &&
            <Menu {...bindMenu(entryMenu)}>
              <MenuItem onClick={onMenuEdit}>Edit</MenuItem>
              <MenuItem onClick={onMenuDelete}>Delete</MenuItem>
            </Menu>
          }

          {/* DIALOGS */}
          {selectedEntry && <>
            <ConfirmDialog
              title="Delete activity instance"
              message={`Are you sure you want to delete \
              ${objectiveMap[selectedEntry!.objective_id].name} - ${selectedEntry!.date.toLocaleDateString()} \
              - ${selectedEntry!.date.toTimeString()}?`}
              isOpen={deleteDialogState}
              onConfirm={() => deleteInstance(selectedEntry!.id!)}
              onClose={() => setDeleteDialogState(false)}
            />

            <FormDialog 
              title="Edit activity instance"
              formId="objectiveEntryForm"
              isOpen={editDialogState}
              onClose={() => setEditDialogState(false)}
            >
              <ObjectiveEntryForm 
                objectiveId={selectedEntry.objective_id} 
                entry={selectedEntry} 
                postSubmit={handleEdit} 
              />
            </FormDialog>
          </>}
        </div>
      : 
        <>
          <CircularProgress />
        </>
      }
    </>
  )
}