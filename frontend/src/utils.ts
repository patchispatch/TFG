export function toISOLocal(d: Date) {
  var z = (n: number) => ('0' + n).slice(-2);
  var zz = (n: number) => ('00' + n).slice(-3);
  var off = d.getTimezoneOffset();
  var sign = off < 0? '+' : '-';
  off = Math.abs(off);

  return d.getFullYear() + '-'
         + z(d.getMonth()+1) + '-' +
         z(d.getDate()) + 'T' +
         z(d.getHours()) + ':'  + 
         z(d.getMinutes()) + ':' +
         z(d.getSeconds()) + '.' +
         zz(d.getMilliseconds()) +
         sign + z(off/60|0) + ':' + z(off%60); 
}

export function toTitleCase(original: string): string {
  return original
    .split('')
    .map((letter, index) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`
      }
      return letter
    })
    .join('')
    .trim()
    .replace(/[_\s]+/g, '-')
    .split('-')
    .map(word => {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    .join(' ');
}

export function fromHHmmToDate(time: string): Date {
  let tempTime = time.split(":");
  let dt = new Date();
  dt.setHours(parseInt(tempTime[0]));
  dt.setMinutes(parseInt(tempTime[1]));
  return dt;
}

/**
 * Returns an array with days index starting at selected index
 * @param day Day of start
 */
export function weekFromStart(day: number): number[] {
  const daysList = []
  for (let i = day; daysList.length < 7; i = (i + 1) % 7) {
    daysList.push(i);
  }

  return daysList;
}