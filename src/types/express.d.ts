declare global {
  // Tells TypeScript that you are adding something to the global scope, rather than making it local to this specific file.
  namespace Express {
    // TypeScript finds the existing Express namespace.
    interface Request {
      // TypeScript finds the Request interface.
      userId: number; // safely injects property into it without breaking the original types.
    }
  }
}

export {}; // forces the file to be treated as a module rather than a script.

