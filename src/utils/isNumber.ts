export const isNumber = (text: string): boolean => {
  return !isNaN(parseInt(text))
}