import * as React from 'react';
import { useMemo, useState } from 'react';
import Calendar, { DateCallback } from 'react-calendar'
import { ObjectiveEntryService } from 'src/services/objective-entry-service';
import { EntryHistoryDialog } from './EntryHistoryDialog';

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
  return (
    <div className={className}>
      <Calendar 
        onClickDay={showHistory}
        maxDate={new Date()}
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