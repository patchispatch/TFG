import {
  makeStyles, 
  Theme, 
  createStyles, 
  Dialog, 
  DialogTitle, 
  IconButton, 
  Divider, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

// Styles
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
interface ConfirmDialogProps {
  title: string,
  message: string,
  isOpen: boolean,
  onConfirm: (...args: any[]) => any,
  onClose: () => void,
  confirmButtonText?: string,
  cancelButtonText?: string
}

export function ConfirmDialog({
    title,
    message,
    isOpen,
    onConfirm,
    onClose,
    confirmButtonText,
    cancelButtonText,
  }: ConfirmDialogProps) {

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
          <Typography>
            {message}
          </Typography>
        </DialogContent>

        <Divider />

        <DialogActions className={classes.headerFooter}>
          <Button variant="contained" disableElevation onClick={onClose}>
            {cancelButtonText ? cancelButtonText : "Cancel"}
          </Button>
          <Button variant="contained" disableElevation color="primary" onClick={onConfirm}>
          {confirmButtonText ? confirmButtonText : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}