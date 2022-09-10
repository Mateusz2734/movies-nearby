import dayjs, { Dayjs } from "dayjs";

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

export function todayAndXNextDays(x: number): string[] {
  const dates: string[] = [];
  for (let i: number = 0; i <= x; i++) {
    dates.push(xthDay(i));
  }
  return dates;
}

export function calculateDates(): string[] {
  const today: Dayjs = dayjs(new Date());

  switch (today.day()) {
    case 0:
      return todayAndXNextDays(4);
    case 1:
      return todayAndXNextDays(3);
    case 2:
      return todayAndXNextDays(2);
    case 3:
      return todayAndXNextDays(8);
    case 4:
      return todayAndXNextDays(7);
    case 5:
      return todayAndXNextDays(6);
    case 6:
      return todayAndXNextDays(5);
    default:
      // will not ever run
      return [""];
  }
}
