import { proxyActivities } from "@temporalio/workflow";
// import all the type of the activity functions as global {}
import type * as activities from "../activities/index.js";
import { RegenerateHostSlotsInput } from "../../utilities/interface.js";

// Create the proxy activites type safety from activities 
const { regenerateHostSlotsActivity } = proxyActivities<typeof activities>({
    retry: { maximumAttempts: 3},
    startToCloseTimeout: '10 minutes',
})


// work flow to trigger the proxy acitivity
export async function regenerateHostSlotsWorkflow(input: RegenerateHostSlotsInput) {
    await regenerateHostSlotsActivity(input);
}

/*

             Client
               │
               ▼
     Start Workflow
               │
               ▼
    regenerateHostSlotsWorkflow
               │
               ▼
 proxyActivities() function
               │
               ▼
        Temporal Server
               │
               ▼
           Task Queue
               │
               ▼
      Temporal Worker
               │
               ▼
 regenerateHostSlotsActivity()
               │
               ▼
       Database/API Calls
               │
               ▼
          Success/Failure
               │
               ▼
      Workflow completes

A Workflow cannot call normal JavaScript/TypeScript functions directly because workflows must be deterministic.
The workflow only knows "I want this activity to run."
Instead, you create a proxy for your activities.
Once the worker starts running the activity, it must finish within 10 minutes

*/