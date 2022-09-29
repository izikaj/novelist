import { format, parseJSON } from 'date-fns'
import { isDate } from 'underscore'

function Date({ value, formatAs = 'dd/MM/yyyy' }) {
  if (!value) return;
  if (!isDate(value)) value = parseJSON(value)

  return format(value, formatAs);
}

export default Date;
