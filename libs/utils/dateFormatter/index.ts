import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const dateFormatterOptions = {
  addSuffix: true,
  includeSeconds: true
}
function dateFormatter(date?: Date) {
    
  return !!date && formatDistanceToNow(date)
}

export { dateFormatter }
