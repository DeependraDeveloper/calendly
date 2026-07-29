import { sendBookingConfirmationEmail } from "../../mailer/booking.mailer.js";
import { isProjectCalendarConfigured,createCalendarEvent } from "../../services/google-calendar.service.js";
import {  regenerateHostSlots as runSlotGeneration } from "../../services/slot.service.js";
import { RegenerateHostSlotsInput } from "../../utilities/interface.js";
import { updateBookingCalendarDetails } from "../../repositories/booking.repository.js";


// creating a activity which actually the service function is called and passed to workflow
export async function regenerateHostSlotsActivity(input: RegenerateHostSlotsInput) {
    await runSlotGeneration(input); // here 
}

export async function sendBookingConfirmationEmailActivity(bookingId: number) {
    await sendBookingConfirmationEmail(bookingId);
}


export async function createGoogleCalendarEventActivity(bookingId: number) {
    if (!isProjectCalendarConfigured()) {
        console.warn("[temporal] Google Calendar not configured, skipping event creation");
        return;
    }

    const result = await createCalendarEvent(bookingId);

    await updateBookingCalendarDetails(bookingId, {
        meetingLink: result.meetingLink,
        calendarEventId: result.calendarEventId,
    });
}