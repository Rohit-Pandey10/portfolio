const axios = require('axios');

const DEFAULT_TIMEOUT_MS = 4000;

function timeoutError(label, timeoutMs) {
  const error = new Error(`${label} timed out after ${timeoutMs}ms`);
  error.code = 'ETIMEDOUT';
  return error;
}

/**
 * Axios request wrapper with both an AbortController deadline and Axios's
 * native timeout. An optional parent signal lets the aggregator cancel a
 * platform's entire request group when its own deadline expires.
 */
async function requestWithTimeout(config, options = {}) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const label = options.label ?? 'External request';
  const controller = new AbortController();
  const forwardAbort = () => controller.abort();
  const parentSignal = options.signal;

  if (parentSignal) {
    if (parentSignal.aborted) controller.abort();
    else parentSignal.addEventListener('abort', forwardAbort, { once: true });
  }

  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await axios({
      ...config,
      signal: controller.signal,
      timeout: timeoutMs,
    });
  } catch (error) {
    if (controller.signal.aborted) throw timeoutError(label, timeoutMs);
    throw error;
  } finally {
    clearTimeout(timeoutId);
    parentSignal?.removeEventListener('abort', forwardAbort);
  }
}

/** Bound a platform's complete fan-out, including any nested requests. */
function withAbortTimeout(task, options = {}) {
  const timeoutMs = options.timeoutMs ?? 4500;
  const label = options.label ?? 'Platform aggregation';
  const controller = new AbortController();
  let timeoutId;

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      controller.abort();
      reject(timeoutError(label, timeoutMs));
    }, timeoutMs);
  });

  const taskPromise = Promise.resolve().then(() => task(controller.signal));
  return Promise.race([taskPromise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

module.exports = { requestWithTimeout, withAbortTimeout, DEFAULT_TIMEOUT_MS };

