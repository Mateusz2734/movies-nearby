import dayjs from "dayjs";

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

export function xthDay(x: number): string {
  let tomorrow: Date = new Date();
  return dayjs(tomorrow.setDate(tomorrow.getDate() + x)).format("YYYY-MM-DD");
}

export function todayAndFiveNextDays(): string[] {
  const date: string = dayjs(new Date()).format("YYYY-MM-DD");
  return [xthDay(0), xthDay(1), xthDay(2), xthDay(3), xthDay(4), xthDay(5)];
}

export function todayAndXNextDays(x: number): string[] {
  const date: string = dayjs(new Date()).format("YYYY-MM-DD");
  const dates: string[] = [];
  for (let i: number = 0; i <= x; i++) {
    dates.push(xthDay(i));
  }
  return dates;
}
