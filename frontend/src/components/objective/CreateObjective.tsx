import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, makeStyles, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react'
import { useState } from 'react'
import { ObjectiveForm } from './ObjectiveForm';

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

// Component
export function CreateObjective() {
  // State
  const [open, setOpen] = useState(false);

  // Handle dialog state
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // Render
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="contained" disableElevation color="primary" onClick={handleClickOpen}>
        New objective
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="create-objective-title">
        <DialogTitle className={classes.headerFooter} id="create-objective-title">
          New objective

          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <ObjectiveForm postSubmit={handleClose}/>
        </DialogContent>

        <Divider />

        <DialogActions className={classes.headerFooter}>
          <Button variant="contained" disableElevation onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" disableElevation color="primary" type="submit" form="objectiveForm">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}