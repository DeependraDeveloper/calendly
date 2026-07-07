import { DateTime, Interval } from "luxon";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface TimeWindow {
    start: DateTime;
    end: DateTime;
}

export interface ExceptionInput {
    type: "BLOCK_FULL_DAY" | "BLOCK_PARTIAL" | "ADD_AVAILABLE_WINDOW";
    startTime: string | null;
    endTime: string | null;
    timeZone: string;
}

// ==========================================
// CORE SCHEDULING ALGORITHMS
// ==========================================

export function parseTimeOnDate(date: DateTime, time: string, timezone: string): DateTime {
    const [hour, minute] = time.split(":").map(Number);
    return date.setZone(timezone).set({ hour, minute, second: 0, millisecond: 0 });
}

export function mergeWindows(windows: TimeWindow[]): TimeWindow[] {
    if (windows.length === 0) return [];
    const sorted = [...windows].sort((a, b) => a.start.toMillis() - b.start.toMillis());
    const mergedResult: TimeWindow[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i];
        const last = mergedResult[mergedResult.length - 1];

        if (current.start <= last.end) {
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
    bufferAfterMinutes: number
): TimeWindow[] {
    const slots: TimeWindow[] = [];
    const totalMinutes = durationMinutes + bufferBeforeMinutes + bufferAfterMinutes;

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

export function subtractWindows(windows: TimeWindow[], block: TimeWindow): TimeWindow[] {
    const result: TimeWindow[] = [];
    for (const window of windows) {
        const interval = Interval.fromDateTimes(window.start, window.end);
        const blockInterval = Interval.fromDateTimes(block.start, block.end);

        if (!interval.overlaps(blockInterval)) {
            result.push(window);
            continue;
        }
        if (block.start > window.start) {
            result.push({ start: window.start, end: block.start });
        }
        if (block.end < window.end) {
            result.push({ start: block.end, end: window.end });
        }
    }
    return result.filter(w => w.end >= w.start);
}

export function applyExceptionsForDate(
    date: DateTime,
    baseWindows: TimeWindow[],
    exceptions: ExceptionInput[]
): TimeWindow[] {
    let windows = [...baseWindows];

    for (const ex of exceptions) {
        if (ex.type === "BLOCK_FULL_DAY") {
            return [];
        }
        if (ex.type === "BLOCK_PARTIAL" && ex.startTime && ex.endTime) {
            const block = {
                start: parseTimeOnDate(date, ex.startTime, ex.timeZone),
                end: parseTimeOnDate(date, ex.endTime, ex.timeZone),
            };
            windows = subtractWindows(windows, block);
        }
    }
    return mergeWindows(windows);
}

// ==========================================
// EXECUTABLE RUNNER (CASE 5: BUFFERS + BREAK)
// ==========================================
function runBufferedBreakTest() {
    console.log("==================================================");
    console.log("🎯 SCENARIO: JULY 12, 2026 | BUFFERS + 30-MIN BREAK");
    console.log("==================================================\n");

    const targetDate = DateTime.fromISO("2026-07-12"); 
    const tz = "UTC";
    
    const durationMinutes = 30;
    const bufferBefore = 10;
    const bufferAfter = 10;

    // 1. Define base timeframe (9 AM - 1 PM)
    const baseWindows: TimeWindow[] = [
        { start: parseTimeOnDate(targetDate, "09:00", tz), end: parseTimeOnDate(targetDate, "13:00", tz) }
    ];

    // 2. Add the 30-minute block break exception (11:00 AM - 11:30 AM)
    const dayExceptions: ExceptionInput[] = [
        {
            type: "BLOCK_PARTIAL",
            startTime: "11:00",
            endTime: "11:30",
            timeZone: tz
        }
    ];

    console.log("Slicing timeline around break constraints...");
    const approvedWindows = applyExceptionsForDate(targetDate, baseWindows, dayExceptions);

    // 3. Generate slots from the split timelines
    const slots = splitIntoSlots(approvedWindows, durationMinutes, bufferBefore, bufferAfter);

    console.log(`Generated [${slots.length}] total bookable slots:\n`);

    console.log("🌅 MORNING SEGMENT (09:00 - 11:00):");
    slots.filter(s => s.end <= parseTimeOnDate(targetDate, "11:00", tz)).forEach((slot, i) => {
        console.log(`  Slot ${i + 1}: ${slot.start.toFormat("HH:mm")} - ${slot.end.toFormat("HH:mm")}`);
    });

    console.log("\n☕ BREAK EXCEPTION BLOCK (11:00 - 11:30):");
    console.log("  [System Blocked]");

    console.log("\n🌆 AFTERNOON SEGMENT (11:30 - 13:00):");
    slots.filter(s => s.start >= parseTimeOnDate(targetDate, "11:30", tz)).forEach((slot, i) => {
        console.log(`  Slot ${i + 1}: ${slot.start.toFormat("HH:mm")} - ${slot.end.toFormat("HH:mm")}`);
    });

    console.log("\n==================================================");
}

runBufferedBreakTest();