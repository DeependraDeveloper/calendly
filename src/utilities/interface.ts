
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