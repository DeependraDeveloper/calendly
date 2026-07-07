import { DateTime, Interval } from "luxon";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface TimeWindow {
    start: DateTime;
    end: DateTime;
}

// ==========================================
// CORE SCHEDULING ALGORITHMS
// ==========================================

/**
 * Combines date, time string, and timezone into a single absolute Luxon DateTime object.
 */
export function parseTimeOnDate(date: DateTime, time: string, timezone: string): DateTime {
    const [hour, minute] = time.split(":").map(Number);

    return date.setZone(timezone).set({
        hour,
        minute,
        second: 0,
        millisecond: 0,
    });
}

/**
 * Splits massive available windows into concrete bookable time-slots.
 */
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

        // Loop forward through the availability window
        while (cursor.plus({ minutes: totalMinutes }) <= window.end) {
            const slotStart = cursor.plus({ minutes: bufferBeforeMinutes });
            const slotEnd = slotStart.plus({ minutes: durationMinutes });

            slots.push({ start: slotStart, end: slotEnd });

            // Jump forward by duration
            cursor = cursor.plus({ minutes: durationMinutes });
        }
    }

    return slots;
}

// ==========================================
// EXECUTABLE RUNNER (YOUR TEST CASE)
// ==========================================
function runTest() {
    console.log("==================================================");
    console.log("🎯 SCENARIO: JULY 5, 2026 | 1:1 MEETING (9 AM - 13 PM)");
    console.log("==================================================\n");

    // Inputs defined by you
    const targetDate = DateTime.fromISO("2026-07-05"); // 2026-07-05
    const tz = "UTC"; 
    const durationMinutes = 30; // 30 mins time frames
    const bufferBefore = 0;
    const bufferAfter = 0;

    // 1. Create the absolute 9:00 AM to 1:00 PM window
    const baseWindows: TimeWindow[] = [
        {
            start: parseTimeOnDate(targetDate, "09:00", tz),
            end: parseTimeOnDate(targetDate, "13:00", tz)
        }
    ];

    console.log(`Host Availability: ${baseWindows[0].start.toFormat("HH:mm")} to ${baseWindows[0].end.toFormat("HH:mm")}`);
    console.log(`Meeting Duration: ${durationMinutes} minutes\n`);

    // 2. Generate the slots using your algorithm
    const slots = splitIntoSlots(baseWindows, durationMinutes, bufferBefore, bufferAfter);

    // 3. Print out the results
    console.log(`Generated [${slots.length}] Absolute Slots:`);
    slots.forEach((slot, index) => {
        console.log(`  Slot ${index + 1}: ${slot.start.toFormat("HH:mm")} - ${slot.end.toFormat("HH:mm")}`);
    });

    console.log("\n==================================================");
}

// Execute the test automatically when the file is run
runTest();

