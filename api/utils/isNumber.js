export default function isNumber(text) {
  const parsedNumber = parseInt(text);
  if(isNaN(parsedNumber))
    return false;
  return true;
}