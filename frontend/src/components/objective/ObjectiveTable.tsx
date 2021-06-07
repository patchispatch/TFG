import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { useMemo } from "react";
import { Objective } from "src/models/objective";
import { ObjectiveService } from "src/services/objective-service";


// Styles
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// Component
export default function ObjectiveTable() {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService, []);

  // State
  let [objectiveList, setObjectiveList] = React.useState<Objective[]>([]);

  // On init
  React.useEffect(() => {
    objectiveService.list().subscribe(response => setObjectiveList(response));
  })

  // Render
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Current streak&nbsp;(g)</TableCell>
            <TableCell align="right">Best streak&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objectiveList.map((objective) => (
            <TableRow key={objective.id}>
              <TableCell component="th" scope="row">
                {objective.name}
              </TableCell>
              <TableCell align="right">{objective.categoryId}</TableCell>
              <TableCell align="right">{objective.currentStreak}</TableCell>
              <TableCell align="right">{objective.bestStreak}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}