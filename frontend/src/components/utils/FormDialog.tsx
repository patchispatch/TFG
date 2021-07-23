import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react'

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
    }
  })
);

// Props
interface FormDialogProps {
  title: string,
  children: React.ReactNode,
  formId: string,
  isOpen: boolean,
  onClose: () => void,
  loading?: boolean,
  submitButtonText?: string,
  cancelButtonText?: string
}

// Component
export function FormDialog({
  title, 
  children, 
  formId,
  isOpen,
  onClose,
  loading,
  submitButtonText, 
  cancelButtonText,
}: FormDialogProps) {

  // Render
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="create-objective-title">
        <DialogTitle className={classes.headerFooter} id="create-objective-title">
          {title}

          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent>
          {children}
        </DialogContent>

        <Divider />

        <DialogActions className={classes.headerFooter}>
          <Button variant="contained" disableElevation onClick={onClose}>
            {cancelButtonText ? cancelButtonText : "Cancel"}
          </Button>
          <Button variant="contained" disableElevation color="primary" type="submit" form={formId}>
          {submitButtonText ? submitButtonText : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {loading &&
        <div>
          <LinearProgress />
        </div>
      }
    </div>
  )
}