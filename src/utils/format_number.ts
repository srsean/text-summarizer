/**
 * Formats a number with commas as thousands separators.
 *
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number with commas.
 */
export function formatWithCommas(number: number): string {
  if (isNaN(number)) {
    throw new Error("Input must be a valid number.");
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
