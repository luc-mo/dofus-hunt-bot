export const parseDirection = (direction: string): string => {
  switch(direction) {
    case 'top':
      return '⬆'
    case 'right':
      return '➡'
    case 'left':
      return '⬅'
    case 'bottom':
      return '⬇'
    default:
      return ''
  }
}