const _daysToMilliseconds = (days: number) => {
  return days * 24 * 60 * 60 * 1000;
};

const _formatMMDDYYYY = (date: Date): string => {
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();

  return `${month}${day}${year}`;
};

const _formatYYYY_MM_DD = (date: Date): string => {
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Returns a date as a string with format (MMDDYYYY).
 * @param {number} days - Number of days from now
 * @returns {string} - A date as a string with format (MMDDYYYY)
 */
export const daysFromNow = (days: number): string => {
  if (days < 0) throw new Error('Parameter "days" must be a positive number');

  return _formatMMDDYYYY(
    new Date(new Date().getTime() + _daysToMilliseconds(Math.floor(days)))
  );
};

/**
 * Returns a date as a string with format (YYYY-MM-DD).
 * @param {number} days - Number of days from now, or use a negative integer for the past
 * @returns {string} - A date as a string with format (YYYY-MM-DD)
 */
export const dateAsYYYY_MM_DD = (days: number): string => {
  return _formatYYYY_MM_DD(
    new Date(new Date().getTime() + _daysToMilliseconds(Math.floor(days)))
  );
};
