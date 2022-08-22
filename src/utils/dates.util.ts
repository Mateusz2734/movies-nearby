export function howManyDaysFromToday(day: string | Date): number {
  const todayDate = new Date();
  const givenDate = new Date(day);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Difference between two dates
  const diffInTime = givenDate.getTime() - todayDate.getTime();
  // Number of days between two dates
  const differenceInDays = Math.round(diffInTime / oneDay);

  return differenceInDays;
}