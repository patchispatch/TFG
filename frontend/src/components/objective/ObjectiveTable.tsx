import { IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { Objective } from "src/models/objective";
import { ObjectiveService } from "src/services/objective-service";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { FormDialog } from "../utils/FormDialog";
import { ObjectiveForm } from "./ObjectiveForm";
import { ConfirmDialog } from "../utils/ConfirmDialog";
import { ObjectiveEntryForm } from "../objective-entry/ObjectiveEntryForm";
import { Category } from "src/models/category";
import { convertToMap, ModelMap } from "src/models/shared";
import { CategoryService } from "src/services/category-service";


// Styles
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// Props
interface ObjectiveTableProps {
  objectives: Objective[];
  loaded?: boolean;
  refresh?: () => void;
}

// Component
export function ObjectiveTable({objectives, loaded=true, refresh=() => {}}: ObjectiveTableProps) {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  // State
  const [categoryMap, setCategoryMap] = useState<ModelMap<Category>>({});
  const [catLoaded, setCatLoaded] = useState<boolean>(false);
  

  // Handle dialog state
  const [selectedId, setSelectedId] = useState<number>();
  const [updateDialogState, setUpdateDialogState] = useState(false);
  const [editDialogState, setEditDialogState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);



  // On init
  useEffect(() => {
    setCatLoaded(false);
    categoryService.list().subscribe(categories => {
      setCategoryMap(convertToMap(categories));
      setCatLoaded(true);
    });

    refresh();
  }, [categoryService, refresh])


  // On objective update
  function onUpdateObjective(objectiveId: number) {
    setSelectedId(objectiveId);
    setUpdateDialogState(true);
  }

  function handleUpdate(): void {
    setUpdateDialogState(false);
    refresh();
  }


  // On objective edit
  function onEditObjective(objectiveId: number) {
    setEditDialogState(true);
    setSelectedId(objectiveId);
  }

  function handleEdit(response?: Objective, updated = false): void {
    setEditDialogState(false);

    if (updated) {
      refresh();
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
      refresh();
    });
  }


  // On objective pause/resume
  function onPauseResume(objectiveId: number) {
    objectiveService.pauseResume(objectiveId).subscribe(() => {
      refresh();
    })
  }

  /**
   * Check if everything is loaded
   */
  function isLoaded() {
    return catLoaded && loaded;
  }


  // Render
  // If an objective is paused, show resume button. Else, show pause button
  function pauseResumeButton(obj: Objective) {
    let label = obj.paused ? "resume" : "pause";
    let icon = obj.paused ? <PlayArrowIcon /> : <PauseIcon />;

    return (
      <IconButton aria-label={label} onClick={() => onPauseResume(obj.id!)}>
        {icon}
      </IconButton>
    )
  }


  const classes = useStyles();
  return (
    <>
    {isLoaded() ?
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="right">Progress</TableCell>
              <TableCell align="right">Current streak</TableCell>
              <TableCell align="right">Best streak</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objectives.map((objective) => (
              <TableRow key={objective.id}>
                <TableCell component="th" scope="row">
                  {objective.name}
                </TableCell>
                <TableCell align="left">{objective.categoryId ? categoryMap[objective.categoryId].name : '-'}</TableCell>
                <TableCell align="right">{objective.progress}/{objective.goal}</TableCell>
                <TableCell align="right">{objective.currentStreak}</TableCell>
                <TableCell align="right">{objective.bestStreak}</TableCell>

                <TableCell align="right" padding="checkbox">
                  <IconButton onClick={() => onUpdateObjective(objective.id!)} aria-label="update">
                    <AddBoxIcon />
                  </IconButton>
                </TableCell>

                <TableCell align="right" padding="checkbox">
                  {pauseResumeButton(objective)}
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
      : <>{/* TODO: set loading indicator */}</>
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