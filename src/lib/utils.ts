export default function parse8CharDate(dateString: string): Date | null {
  const year = Number(dateString.substring(0, 4));
  const month = Number(dateString.substring(4, 6)) - 1; // Month is 0-indexed in JS Date
  const day = Number(dateString.substring(6, 8));

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  return new Date(year, month, day);
}
