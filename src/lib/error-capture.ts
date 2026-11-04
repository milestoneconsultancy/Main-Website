let lastCapturedError: Error | undefined;

export function captureError(error: Error) {
  lastCapturedError = error;
}

export function consumeLastCapturedError(): Error | undefined {
  const error = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
