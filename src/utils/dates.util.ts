export function howManyDaysFromToday(day: string | Date): number {
  // Works good in GMT+2 timezone
  const todayDate: Date = new Date(new Date().setHours(2, 0, 0, 0));
  const givenDate: Date = new Date(day);
  // One day in milliseconds
  const ONE_DAY: number = 1000 * 60 * 60 * 24;
  // Difference between two dates
  const diffInTime: number = givenDate.getTime() - todayDate.getTime();
  // Number of days between two dates
  let differenceInDays: number = Math.round(diffInTime / ONE_DAY);
  return differenceInDays;
}