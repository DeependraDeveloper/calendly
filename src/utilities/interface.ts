
import { DateTime } from "luxon";

export interface TimeWindow {
  start: DateTime;
  end: DateTime;
}



export interface RegenerateHostSlotsInput {
    hostId: number;
    from?: string; // YYYY-MM-DD
    to?: string; // YYYY-MM-DD
}

export interface ListHostBookingsFilters {
    status? : string,
    from?: Date,
    to? :Date
}

export interface CreateBookingData {
    slotId : string,
    inviteeEmail : string,
    inviteeName : string,
    inviteeNotes? : string,
    hostId : number
    eventTypeId : number
}