import { proxyActivities } from "@temporalio/workflow";

import type * as acitivities from "../activities/index.js";

const { createGoogleCalendarEventActivity } = proxyActivities<typeof acitivities>({
    retry : {maximumAttempts :3},
    startToCloseTimeout : "10 minutes"
});

export async function createGoogleCalendarEventWorkflow(bookingId: number) {
    await createGoogleCalendarEventActivity(bookingId);
}
