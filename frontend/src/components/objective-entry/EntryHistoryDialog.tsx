import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, makeStyles, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { Category } from 'src/models/category';
import {ObjectiveEntryHistory} from './ObjectiveEntryHistory';

// Style
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      '& .MuiDivider-root': {
        width: '100%'
      }
    },
    headerFooter: { 
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

// Props
interface HistoryDialogProps {
  date: Date,
  isOpen: boolean,
  onClose: () => void,
  category?: Category
}

// TODO: Change into a generic dialog component
export function EntryHistoryDialog({
  date,
  isOpen,
  onClose,
  category
}: HistoryDialogProps) {
  
  // Render
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog 
        fullWidth
        maxWidth="sm" 
        open={isOpen} 
        onClose={onClose} 
        aria-labelledby="create-objective-title"
      >
        <DialogTitle className={classes.headerFooter} id="create-objective-title">
          Entries on {date.toLocaleDateString()}

          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <ObjectiveEntryHistory date={date} category={category ? category : undefined} />
        </DialogContent>

        <Divider />
      </Dialog>
    </div>
  )
}