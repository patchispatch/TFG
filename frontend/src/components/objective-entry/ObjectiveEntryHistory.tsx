import * as React from 'react';
import { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { ObjectiveEntryService } from 'src/services/objective-entry-service';

// Style

// Props
interface EntryHistoryProps {
  date: Date
}

export function ObjectiveEntryHistory({date}: EntryHistoryProps) {
  // Services
  const objectiveService = useMemo(() => new ObjectiveEntryService(), []);

  // State
  const [entryList, setEntryList] = useState([]);

  // Effects
  useEffect(() => {
    objectiveService.list({date: date}).subscribe(response => {
      console.log(response);
    })
  }, []);
  

  // Render
  return (
    <div>
      {date.toLocaleString()}
    </div>
  )
}