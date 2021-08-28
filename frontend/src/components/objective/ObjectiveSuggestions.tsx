import { CircularProgress, createStyles, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { Objective } from 'src/models/objective';
import { ObjectiveService } from 'src/services/objective-service';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { FormDialog } from '../utils/FormDialog';
import { ObjectiveEntryForm } from '../objective-entry/ObjectiveEntryForm';

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }),
);

export function ObjectiveSuggestions() {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);

  // State
  const [suggestionList, setSuggestionList] = useState<Objective[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [updateDialogState, setUpdateDialogState] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  // On init
  useEffect(() => {
    setLoaded(false);
    objectiveService.suggestions().subscribe(response => {
      setSuggestionList(response);
      setLoaded(true);
    });
  }, [objectiveService])


  // On objective update
  function onUpdateObjective(objectiveId: number) {
    setSelectedId(objectiveId);
    setUpdateDialogState(true);
  }

  function handleUpdate(): void {
    setUpdateDialogState(false);
  }
  
  // Render
  const classes = useStyles();
  return (
    <div>
      <Typography variant='h6'>
          Suggestions
      </Typography>

      {loaded ? 
      <>
        <List>
          {suggestionList.map(suggestion => (
            <ListItem key={suggestion.id}>
              <ListItemText>
                {suggestion.name}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={() => onUpdateObjective(suggestion.id!)}>
                  <AddBoxIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </>
      : 
      <div className={classes.loading}>
        <CircularProgress />
      </div>
      }

      {/* Dialogs */}
      <FormDialog 
        title="Add progress"
        formId="objectiveEntryForm"
        isOpen={updateDialogState}
        onClose={() => setUpdateDialogState(false)}
      >
        <ObjectiveEntryForm objectiveId={selectedId!} postSubmit={handleUpdate}/>
      </FormDialog>
    </div>
  )
}