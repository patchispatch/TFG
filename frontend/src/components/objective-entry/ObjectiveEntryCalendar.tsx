import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar'
import { EntryHistoryDialog } from './EntryHistoryDialog';
import { ObjectiveEntryService } from 'src/services/objective-entry-service';
import { ObjectiveEntryDaysList } from 'src/models/objective-entry';
import { FindValueOperator } from 'rxjs/internal/operators/find';


// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hasEntries: {
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  }),
);


// Props
interface CalendarProps {
  className?: string
}

export function ObjectiveEntryCalendar({className}: CalendarProps) {
  // Services
  const objectiveEntryService = useMemo(() => new ObjectiveEntryService(), []);

  // State
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [entryDayList, setEntryDayList] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [historyOpen, setHistoryOpen] = useState(false);

  //Functions
  function showHistory(day: Date): void {
    setSelectedDay(day);
    setHistoryOpen(true);
  }

  function onMonthChange(activeStartDate: Date) {
    
    const newMonth = activeStartDate.getMonth() + 1;
    if (currentMonth !== newMonth) 
      setCurrentMonth(newMonth);
  }

  // On month change
  useEffect(() => {
    objectiveEntryService.days({month: currentMonth}).subscribe(response => setEntryDayList(response.days))
  }, [currentMonth])

  // Render
  const classes = useStyles();
  return (
    <div className={className}>
      <Calendar 
        onClickDay={showHistory}
        maxDate={new Date()}
        tileClassName={({date}) => entryDayList.includes(date.getDate()) ? classes.hasEntries : null}
        onActiveStartDateChange={({activeStartDate, view}) => view === 'month' && onMonthChange(activeStartDate)}
        onViewChange={({activeStartDate, view}) => view === 'month' && onMonthChange(activeStartDate)}
      />

      {/* Dialogs */}
      <EntryHistoryDialog
        date={selectedDay}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />
    </div>
  )
}