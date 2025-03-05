const _daysToMilliseconds = (days: number) => {
  return days * 24 * 60 * 60 * 1000;
};

const _formatDate = (date: Date): string => {
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();

  return `${month}${day}${year}`;
};

/**
 * Returns a date as a string with format (MMDDYYYY).
 * @param {number} days - Number of days from now
 * @returns {string} - A date as a string with format (MMDDYYYY)
 */
export const daysFromNow = (days: number): string => {
  if (days < 0) throw new Error('Parameter "days" must be a positive number');

  return _formatDate(
    new Date(new Date().getTime() + _daysToMilliseconds(Math.floor(days)))
  );
};
