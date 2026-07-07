import { DateTime } from "luxon";

/*
 *
 * Given the time and date we will return absolute DateTime object in Host's timezone
 *
 * Input:
 * time = "09:30"
 * date = "2026-01-01"
 * timezone = "UTC"
 *
 * Output:
 * DateTime = "2026-01-01T09:30:00.000Z"
 *
 * const inputDate = DateTime.fromISO("2026-01-01");
 * const inputTime = "09:30";
 * const inputTimeZone = "UTC";
 * Output: 2026-01-01T09:30:00.000Z
 */

export function parseTimeOnDate(
  date: DateTime,
  time: String,
  timeZone: string,
) {
  const [hour, minute] = time.split(":").map(Number);

  return date.setZone(timeZone).set({
    hour,
    minute,
    second: 0,
    millisecond: 0,
  });
}
