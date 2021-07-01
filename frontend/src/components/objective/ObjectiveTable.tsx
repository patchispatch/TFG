import { IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { Objective } from "src/models/objective";
import { ObjectiveService } from "src/services/objective-service";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormDialog } from "../utils/FormDialog";
import { ObjectiveForm } from "./ObjectiveForm";


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
  // TODO: think about doing it differently
  const [dialogState, setDialogState] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();


  function handleSubmit(response?: Objective, updated = false): void {
    setDialogState(false);

    if (updated) {
      objectiveService.list().subscribe(response => setObjectiveList(response));
    }
  }

  // On init
  useEffect(() => {
    objectiveService.list().subscribe(response => setObjectiveList(response));
  }, [objectiveService])

  // On object selection
  function editObjective(objectiveId: number) {
    setDialogState(true);
    setSelectedId(objectiveId);
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
                  <IconButton onClick={() => editObjective(objective.id!)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right" padding="checkbox">
                  <IconButton aria-label="delete">
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
        title="Edit objective"
        formId="objectiveForm"
        isOpen={dialogState}
        onClose={() => setDialogState(false)}
      >
        <ObjectiveForm objectiveId={selectedId} postSubmit={handleSubmit} />
      </FormDialog>
    </>
  );
}