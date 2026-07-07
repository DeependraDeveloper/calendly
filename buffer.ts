import { DateTime } from "luxon";

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

            // Jump forward by duration minutes
            cursor = cursor.plus({ minutes: durationMinutes });
        }
    }
    return slots;
}

// ==========================================
// EXECUTABLE RUNNER (CASE 4: WITH BUFFERS)
// ==========================================
function runBufferTest() {
    console.log("==================================================");
    console.log("🎯 SCENARIO: JULY 12, 2026 | 30-MIN SLOTS + 10-MIN BUFFERS");
    console.log("==================================================\n");

    const targetDate = DateTime.fromISO("2026-07-12"); 
    const tz = "UTC";
    
    const durationMinutes = 30;
    const bufferBefore = 10;
    const bufferAfter = 10;

    // Create 9:00 AM to 1:00 PM availability window
    const baseWindows: TimeWindow[] = [
        {
            start: parseTimeOnDate(targetDate, "09:00", tz),
            end: parseTimeOnDate(targetDate, "13:00", tz)
        }
    ];

    console.log(`Host Availability Window: ${baseWindows[0].start.toFormat("HH:mm")} to ${baseWindows[0].end.toFormat("HH:mm")}`);
    console.log(`Setup: ${durationMinutes}m Duration | ${bufferBefore}m Before Buffer | ${bufferAfter}m After Buffer\n`);

    // Generate slots
    const slots = splitIntoSlots(baseWindows, durationMinutes, bufferBefore, bufferAfter);

    console.log(`Generated [${slots.length}] Buffered Slots:`);
    slots.forEach((slot, index) => {
        console.log(`  Slot ${index + 1}: ${slot.start.toFormat("HH:mm")} - ${slot.end.toFormat("HH:mm")}`);
    });

    console.log("\n==================================================");
}

runBufferTest();