import { DateTime, Interval } from "luxon";
import { TimeWindow } from "../utilities/interface.js";
import { parseTimeOnDate } from "../utilities/helper.js";


/*
 * Combine the overlapping intervals into a single interval | merge interval
 * [ {09:00, 12:00} , { 11:00, 14:00 } ] => [ {09:00, 14:00} ]
 * [ {09:00, 12:00} , { 14:00, 17:00 } ] => [ {09:00, 12:00} , { 14:00, 17:00 } ]
 
   function mergerIntervals ( intervals ) {
     if(intervals.length <= 1) return intervals;
     intervals.sort((a,b)=>a[0]-b[0]);

     const merged = [intervals[0]];

     for(let i=1;i<intervals;i++){
       let current = intervals[i];
       let lastMerged = merges[merged.length-1];
       current[0] <= lastMerged[1] ? lastMerged[1] = Math.max(lastMerged[1],current[1]) : merged.push(current)
     }

     return merged;
   }

   
*  Base date anchor (Using July 7, 2026 as today)
const baseDate = DateTime.fromISO("2026-07-07", { zone: "utc" });

* The Input Array (Simulating overlapping host availability)
const perfectInput: TimeWindow[] = [
  {
    // Slot A: 09:00 AM to 12:00 PM
    start: baseDate.set({ hour: 9, minute: 0, second: 0, millisecond: 0 }),
    end: baseDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
  },
  {
    // Slot B: 11:00 AM to 02:00 PM (Overlaps with Slot A)
    start: baseDate.set({ hour: 11, minute: 0, second: 0, millisecond: 0 }),
    end: baseDate.set({ hour: 14, minute: 0, second: 0, millisecond: 0 })
  },
  {
    // Slot C: 04:00 PM to 06:00 PM (Standalone Clean Gap)
    start: baseDate.set({ hour: 16, minute: 0, second: 0, millisecond: 0 }),
    end: baseDate.set({ hour: 18, minute: 0, second: 0, millisecond: 0 })
  }
];

* Ouput
 [
  {
    start: DateTime { ts: 2026-07-07T09:00:00.000Z, zone: UTC, locale: en-IN },
    end: DateTime { ts: 2026-07-07T14:00:00.000Z, zone: UTC, locale: en-IN }
  },
  {
    start: DateTime { ts: 2026-07-07T16:00:00.000Z, zone: UTC, locale: en-IN },
    end: DateTime { ts: 2026-07-07T18:00:00.000Z, zone: UTC, locale: en-IN }
  }
]

*/

export function mergeWindows(windows: TimeWindow[]): TimeWindow[] {
  if (windows.length === 0) return [];

  // creates a shallow copy of your array so we don't accidentally mutate or mess up your original data source.
  const sorted = [...windows].sort(
    (a, b) => a.start.toMillis() - b.start.toMillis(),
  );

  const mergedResult: TimeWindow[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];

    const last = mergedResult[mergedResult.length - 1];

    if (current.start <= last.end) {
      // if the current interval overlaps with the last interval, merge them
      last.end = current.end > last.end ? current.end : last.end;
    } else {
      mergedResult.push(current);
    }
  }

  return mergedResult;
}

export function splitIntoSlots(
  windows: TimeWindow[],
  durationMinutes: number,
  bufferBeforeMinutes: number,
  bufferAfterMinutes: number,
) {
  const slots: TimeWindow[] = [];

  const totalMinutes =
    durationMinutes + bufferBeforeMinutes + bufferAfterMinutes;

  for (const window of windows) {
    let cursor = window.start;

    while (cursor.plus({ minutes: totalMinutes }) <= window.end) {
      const slotStart = cursor.plus({ minutes: bufferBeforeMinutes });
      const slotEnd = slotStart.plus({ minutes: durationMinutes });

      slots.push({ start: slotStart, end: slotEnd });

      cursor = cursor.plus({ minutes: durationMinutes });
    }
  }

  return slots;
}

export function subtractWindows(
  windows: TimeWindow[],
  block: TimeWindow,
): TimeWindow[] {
  const result: TimeWindow[] = [];

  for (const window of windows) {
    const interval = Interval.fromDateTimes(window.start, window.end);
    const blockInterval = Interval.fromDateTimes(block.start, block.end);

    if (!interval.overlaps(blockInterval)) {
      result.push(window);
      continue;
    }

    if (block.start > window.start) {
      result.push({
        start: window.start,
        end: block.start,
      });
    }

    if (block.end < window.end) {
      result.push({ start: block.end, end: window.end });
    }
  }

  // drop zero length intervals
  return result.filter((w) => w.end >= w.start);
}

export function overlapsBooked(
  slot: TimeWindow,
  booked: TimeWindow[],
  bufferBeforeMinutes: number,
  bufferAfterMinutes: number,
): boolean {
  const paddedStart = slot.start.minus({ minutes: bufferBeforeMinutes });
  const paddedEnd = slot.end.plus({ minutes: bufferAfterMinutes });

  return booked.some((b) => {
    const interval = Interval.fromDateTimes(paddedStart, paddedEnd);
    const bookedInterval = Interval.fromDateTimes(b.start, b.end);
    return interval.overlaps(bookedInterval);
  });
}

export function applyExceptionsForDate(
  date: DateTime,
  baseWindows: TimeWindow[],
  exceptions: Array<{
    type: string;
    startTime: string | null;
    endTime: string | null;
    timeZone: string;
  }>,
): TimeWindow[] {
  let windows = [...baseWindows];

  for (const ex of exceptions) {
    if (ex.type === "BLOCK_FULL_DAY") {
      return []; // no slots for this date
    }

    if (ex.type === "BLOCK_PARTIAL" && ex.startTime && ex.endTime) {
      const block = {
        start: parseTimeOnDate(date, ex.startTime, ex.timeZone),
        end: parseTimeOnDate(date, ex.endTime, ex.timeZone),
      };
      windows = subtractWindows(windows, block);
    }

    if (ex.type === "ADD_AVAILABLE_WINDOW" && ex.startTime && ex.endTime) {
      windows.push({
        start: parseTimeOnDate(date, ex.startTime, ex.timeZone),
        end: parseTimeOnDate(date, ex.endTime, ex.timeZone),
      });
    }
  }

  return mergeWindows(windows);
}

export function windowsForWeekdayRule(
  date: DateTime,
  weekday: number,
  startTime: string,
  endTime: string,
  timeZone: string,
): TimeWindow[] {
  const localDate = date.setZone(timeZone).startOf("day");
  const luxonWeekday = weekday === 0 ? 7 : weekday;

  if (localDate.weekday !== luxonWeekday) return [];

  const start = parseTimeOnDate(localDate, startTime, timeZone);
  const end = parseTimeOnDate(localDate, endTime, timeZone);

  if (!start.isValid || !end.isValid || start >= end) return [];

  return [{ start, end }];
}
