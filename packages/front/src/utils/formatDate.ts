import moment from 'moment';

/**
 * Formats a given Date object using Moment.js.
 *
 * @param date - The Date object to format.
 * @param formatString - The format string for the desired output (e.g., 'DD MMM YYYY').
 * @param locale - (Optional) Locale string for locale-specific formatting (e.g., 'nl' for Dutch).
 * @returns A string representing the formatted date.
 */

export function formatDate(date: Date, formatString: string, locale?: string): string {
  const momentDate = moment(date);
  
  if (locale) {
    console.log(locale);
    momentDate.locale(locale);
  }

  return momentDate.format(formatString);
}
