import { Card, CardContent, Chip, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { useContext } from 'react';
import { useCallback, useEffect } from 'react';
import { useMemo, useState } from 'react';
import { AppContext } from 'src/contexts/AppContext';
import { Category } from 'src/models/category';
import { Objective } from 'src/models/objective';
import { ObjectiveEntry } from 'src/models/objective-entry';
import { convertToMap, ModelMap } from 'src/models/shared';
import { CategoryService } from 'src/services/category-service';
import { ObjectiveEntryParameters, ObjectiveEntryService } from 'src/services/objective-entry-service';
import { ObjectiveService } from 'src/services/objective-service';
import { CategoryChip } from '../category/CategoryChip';

// Style
const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
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
  }
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
  const {categoryList} = useContext(AppContext);

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
  }, [date, objectiveService, objectiveEntryService]);

  // On init
  useEffect(() => {
    // Create category map
    setCategoryMap(convertToMap(categoryList));

    // Load entry info
    loadEntryInfo();
  }, [loadEntryInfo]);

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

  // Render
  const classes = useStyles();

  return (
    <>
      {loaded ?
        <div className={classes.entryList}>
          {entryList.length > 0 ? entryList.map(entry => (
            <Card key={entry.id} className={classes.entry}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.title}>
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
        </div>
      : <>{/* TODO: add loading indicator */}</>
      }
    </>
  )
}