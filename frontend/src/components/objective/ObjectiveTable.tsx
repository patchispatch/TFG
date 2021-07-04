import { IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { Objective } from "src/models/objective";
import { ObjectiveService } from "src/services/objective-service";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { FormDialog } from "../utils/FormDialog";
import { ObjectiveForm } from "./ObjectiveForm";
import { ConfirmDialog } from "../utils/ConfirmDialog";
import { ObjectiveEntryForm } from "../objective-entry/ObjectiveEntryForm";
import { ObjectiveEntry } from "src/models/objective-entry";


// Styles
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// Component
export function ObjectiveTable() {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);

  // State
  const [objectiveList, setObjectiveList] = React.useState<Objective[]>([]);

  // Handle dialog state
  const [selectedId, setSelectedId] = useState<number>();
  const [updateDialogState, setUpdateDialogState] = useState(false);
  const [editDialogState, setEditDialogState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);

  // Refresh table data
  function refreshTable(): void {
    objectiveService.list().subscribe(response => setObjectiveList(response));
  }


  // On init
  useEffect(() => {
    refreshTable();
  }, [objectiveService])


  // On objective update
  function onUpdateObjective(objectiveId: number) {
    setUpdateDialogState(true);
    setSelectedId(objectiveId);
  }

  function handleUpdate(): void {
    setUpdateDialogState(false);
    refreshTable();
  }


  // On objective edit
  function onEditObjective(objectiveId: number) {
    setEditDialogState(true);
    setSelectedId(objectiveId);
  }

  function handleEdit(response?: Objective, updated = false): void {
    setEditDialogState(false);

    if (updated) {
      refreshTable();
    }
  }


  // On objective delete
  function onDeleteObjective(objectiveId: number) {
    setDeleteDialogState(true);
    setSelectedId(objectiveId);
  }

  function deleteObjective(objectiveId: number): void {
    objectiveService.delete(objectiveId).subscribe(() => {
      setDeleteDialogState(false);
      refreshTable();
    });
  }


  // Render
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Progress</TableCell>
              <TableCell align="right">Current streak</TableCell>
              <TableCell align="right">Best streak</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objectiveList.map((objective) => (
              <TableRow key={objective.id}>
                <TableCell component="th" scope="row">
                  {objective.name}
                </TableCell>
                <TableCell align="right">{objective.categoryId}</TableCell>
                <TableCell align="right">{objective.progress}/{objective.goal}</TableCell>
                <TableCell align="right">{objective.currentStreak}</TableCell>
                <TableCell align="right">{objective.bestStreak}</TableCell>

                <TableCell align="right" padding="checkbox">
                  <IconButton onClick={() => onUpdateObjective(objective.id!)} aria-label="update">
                    <UpdateIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right" padding="checkbox">
                  <IconButton onClick={() => onEditObjective(objective.id!)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right" padding="checkbox">
                  <IconButton onClick={() => onDeleteObjective(objective.id!)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

      {/* Dialogs */}
      <FormDialog 
        title="Update objective"
        formId="objectiveEntryForm"
        isOpen={updateDialogState}
        onClose={() => setUpdateDialogState(false)}
      >
        <ObjectiveEntryForm objectiveId={selectedId!} postSubmit={handleUpdate}/>
      </FormDialog>

      <FormDialog 
        title="Edit objective"
        formId="objectiveForm"
        isOpen={editDialogState}
        onClose={() => setEditDialogState(false)}
      >
        <ObjectiveForm objectiveId={selectedId} postSubmit={handleEdit} />
      </FormDialog>

      <ConfirmDialog
        title="Delete objective"
        message={`Are you sure you want to delete Objective ${selectedId}?`}
        isOpen={deleteDialogState}
        onConfirm={() => deleteObjective(selectedId!)}
        onClose={() => setDeleteDialogState(false)}
      />
    </>
  );
}