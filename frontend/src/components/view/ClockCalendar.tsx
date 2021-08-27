import { makeStyles, createStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    clock: {
      fontSize: '4.75em',
      fontWeight: 'bold',
    },
    date: {
      fontSize: '1.5em',
    }
  })
);


export function ClockCalendar() {
  // State
  const [date, setDate] = useState<Date>(new Date());

  // Date display options
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }

  // Update the clock each second
  useEffect(() => {
    const tick = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // When component is unmounted, clear the interval
    return () => clearInterval(tick);
  }, [])

  // Render
  const classes = useStyles();
  return (
    <div>
      <div className={classes.clock}>
        {date.toLocaleTimeString()}
      </div>

      <div className={classes.date}>
        {date.toLocaleDateString(undefined, dateOptions)}
      </div>
    </div>
  );
}