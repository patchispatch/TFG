import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useMemo, useState } from 'react';
import Calendar from 'react-calendar'
import { EntryHistoryDialog } from './EntryHistoryDialog';


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
  // State
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [historyOpen, setHistoryOpen] = useState(false);

  //Functions

  function showHistory(day: Date): void {
    setSelectedDay(day);
    setHistoryOpen(true);
  }

  // Render
  const classes = useStyles();
  return (
    <div className={className}>
      <Calendar 
        onClickDay={showHistory}
        maxDate={new Date()}
        tileClassName={({date, view}) => date.getDate() === 3 ? classes.hasEntries : null}
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