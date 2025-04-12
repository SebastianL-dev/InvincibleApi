/**
 * Formats a given time duration into a human-readable string.
 * If the time is greater than or equal to 1000 milliseconds, it is converted to seconds.
 *
 * @function
 * @param {number} time - The time duration in milliseconds to format.
 * @returns {string} A formatted string representing the time duration in seconds or milliseconds.
 */
export default function startUpTimeFormat(time: number): string {
  const formattedTime =
    time >= 1000 ? `${(time / 1000).toFixed(2)} s` : `${time.toFixed(2)} ms`;

  return formattedTime;
}
