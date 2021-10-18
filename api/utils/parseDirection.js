export default function parseDirection(direction) {
  switch(direction) {
    case 'top':
      return '⬆';
    case 'right':
      return '➡'
    case 'left':
      return '⬅';
    case 'bottom':
      return '⬇';
  }
}