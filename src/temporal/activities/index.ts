import { sendBookingConfirmationEmail } from "../../mailer/booking.mailer.js";
import {  regenerateHostSlots as runSlotGeneration } from "../../services/slot.service.js";
import { RegenerateHostSlotsInput } from "../../utilities/interface.js";


// creating a activity which actually the service function is called and passed to workflow
export async function regenerateHostSlotsActivity(input: RegenerateHostSlotsInput) {
    await runSlotGeneration(input); // here 
}

export async function sendBookingConfirmationEmailActivity(bookingId: number) {
    await sendBookingConfirmationEmail(bookingId);
}