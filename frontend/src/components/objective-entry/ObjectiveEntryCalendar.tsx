import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar'
import { EntryHistoryDialog } from './EntryHistoryDialog';
import { ObjectiveEntryDaysParameters, ObjectiveEntryService } from 'src/services/objective-entry-service';
import { Category } from 'src/models/category';


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
  currentMonth: number,
  onMonthChange: (month: Date) => void,
  entryDayList: number[],
  setEntryDayList: (days: number[]) => void,
  className?: string,
  category?: Category,
}

export function ObjectiveEntryCalendar({
  currentMonth, 
  onMonthChange,
  entryDayList,
  setEntryDayList, 
  className, 
  category
}: CalendarProps) {
  // Services
  const objectiveEntryService = useMemo(() => new ObjectiveEntryService(), []);

  // State
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [historyOpen, setHistoryOpen] = useState(false);

  //Functions
  function showHistory(day: Date): void {
    setSelectedDay(day);
    setHistoryOpen(true);
  }

  // On month and category change
  useEffect(() => {
    const daysFilters: ObjectiveEntryDaysParameters = {month: currentMonth}; 
    if (category)
      daysFilters.category = category;

    objectiveEntryService.days(daysFilters).subscribe(response => setEntryDayList(response.days))
  }, [currentMonth, category])

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
        category={category ? category : undefined}
      />
    </div>
  )
}