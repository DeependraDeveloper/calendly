
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

/**
 * Carves out an exception block from availability windows
 */
export function subtractWindows(windows: TimeWindow[], block: TimeWindow): TimeWindow[] {
    const result: TimeWindow[] = [];
    for (const window of windows) {
        const interval = Interval.fromDateTimes(window.start, window.end);
        const blockInterval = Interval.fromDateTimes(block.start, block.end);

        if (!interval.overlaps(blockInterval)) {
            result.push(window);
            continue; // Move to the next window safely
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

/**
 * Processes exceptions like full days off before slot generation occurs
 */
export function applyExceptionsForDate(
    date: DateTime,
    baseWindows: TimeWindow[],
    exceptions: ExceptionInput[]
): TimeWindow[] {
    let windows = [...baseWindows];

    for (const ex of exceptions) {
        if (ex.type === "BLOCK_FULL_DAY") {
            return []; // 🛑 STOP HERE: Full day off means zero available windows!
        }

        if (ex.type === "BLOCK_PARTIAL" && ex.startTime && ex.endTime) {
            const block = {
                start: parseTimeOnDate(date, ex.startTime, ex.timeZone),
                end: parseTimeOnDate(date, ex.endTime, ex.timeZone),
            };
            windows = subtractWindows(windows, block);
        }
    }
    return windows;
}

// ==========================================
// EXECUTABLE RUNNER (CASE 2: FULL DAY OFF)
// ==========================================
function runExceptionTest() {
    console.log("==================================================");
    console.log("🎯 SCENARIO: JULY 20, 2026 | FULL DAY OFF EXCEPTION");
    console.log("==================================================\n");

    const targetDate = DateTime.fromISO("2026-07-20"); // July 20, 2026
    const tz = "UTC";

    // 1. Your typical default availability (e.g., you usually work 9 AM - 1 PM on Mondays)
    const typicalMondayWindows: TimeWindow[] = [
        {
            start: parseTimeOnDate(targetDate, "09:00", tz),
            end: parseTimeOnDate(targetDate, "13:00", tz)
        }
    ];

    // 2. Define your exception database entry for this date
    const dayExceptions: ExceptionInput[] = [
        {
            type: "BLOCK_FULL_DAY", // Setting the exception type to full day off
            startTime: null,
            endTime: null,
            timeZone: tz
        }
    ];

    console.log("Applying database exceptions...");
    
    // 3. Filter your availability windows through the exception processor
    const approvedWindows = applyExceptionsForDate(targetDate, typicalMondayWindows, dayExceptions);
    
    console.log(`Approved Availability Windows Left: ${approvedWindows.length}\n`);

    // 4. Try to generate slots from the remaining windows
    const slots = splitIntoSlots(approvedWindows, 30, 0, 0);

    console.log(`Generated [${slots.length}] Absolute Slots.`);
    if (slots.length === 0) {
        console.log("✅ Success: The system successfully blocked the whole day!");
    }

    console.log("\n==================================================");
}

runExceptionTest();