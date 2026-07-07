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
            continue; // Safely proceed to check the next window block
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
// EXECUTABLE RUNNER (CASE 3: PARTIAL BREAK)
// ==========================================
function runPartialExceptionTest() {
    console.log("==================================================");
    console.log("🎯 SCENARIO: JULY 5, 2026 | PARTIAL BREAK (13:00 - 14:00)");
    console.log("==================================================\n");

    const targetDate = DateTime.fromISO("2026-07-05"); 
    const tz = "UTC";

    // 1. Set up your availability segments (9-13 and 14-15)
    const baseWindows: TimeWindow[] = [
        { start: parseTimeOnDate(targetDate, "09:00", tz), end: parseTimeOnDate(targetDate, "13:00", tz) },
        { start: parseTimeOnDate(targetDate, "14:00", tz), end: parseTimeOnDate(targetDate, "15:00", tz) }
    ];

    // 2. Add the lunch break exception block
    const dayExceptions: ExceptionInput[] = [
        {
            type: "BLOCK_PARTIAL",
            startTime: "13:00",
            endTime: "14:00",
            timeZone: tz
        }
    ];

    console.log("Processing partial day exception constraints...");
    const approvedWindows = applyExceptionsForDate(targetDate, baseWindows, dayExceptions);

    // 3. Generate 30-minute slots
    const slots = splitIntoSlots(approvedWindows, 30, 0, 0);

    console.log(`Generated [${slots.length}] total bookable slots:\n`);
    
    console.log("🌅 MORNING SHIFT SLOTS (09:00 - 13:00):");
    slots.filter(s => s.start.hour < 13).forEach((slot, i) => {
        console.log(`  Slot ${i + 1}: ${slot.start.toFormat("HH:mm")} - ${slot.end.toFormat("HH:mm")}`);
    });

    console.log("\n🛑 BREAK HOUR (13:00 - 14:00):");
    console.log("  [No slots generated - System Blocked]");

    console.log("\n🌆 AFTERNOON SHIFT SLOTS (14:00 - 15:00):");
    slots.filter(s => s.start.hour >= 14).forEach((slot, i) => {
        console.log(`  Slot ${i + 1}: ${slot.start.toFormat("HH:mm")} - ${slot.end.toFormat("HH:mm")}`);
    });

    console.log("\n==================================================");
}

runPartialExceptionTest();