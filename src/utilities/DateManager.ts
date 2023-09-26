import { formatDistance, millisecondsToMinutes, formatDuration, format as dateFormatter, intlFormat } from "date-fns";
import { es, enUS, hr, bg, fr } from "date-fns/locale";

export type LocaleDateFormat = string;

type FormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";
};

/**
 * Get locale for date-fns library based on the locale passed
 * @date 3/21/2023 - 4:17:40 PM
 *
 * @param {LocaleDateFormat} locale
 * @returns {Locale}
 */

function getLocale(locale: LocaleDateFormat = "en"): Locale {
  switch (locale) {
    case "es":
      return es;
    case "hr":
      return hr;
    case "bg":
      return bg;
    case "fr":
      return fr;
    default:
      return enUS;
  }
}

/**
 * DateManager class to handle date operations
 * @date 3/21/2023 - 4:39:50 PM
 *
 * @export
 * @class DateManager
 * @typedef {DateManager}
 */

export default class DateManager {
  /**
   * Get the date object from the date passed
   * @date 3/21/2023 - 4:40:32 PM
   *
   * @static
   * @param {Date | string | number} date
   * @returns {Date}
   */

  static getDate(date: Date | string | number): Date {
    return date instanceof Date ? date : new Date(date);
  }

  /**
   * Get the date in the format passed as parameter
   * @date 3/21/2023 - 4:42:27 PM
   *
   * @static
   * @param {Date} date
   * @param {LocaleDateFormat} [locale=LocaleDateFormat["en"]]
   * @returns {string}
   */

  static fromNow(date: Date, locale: LocaleDateFormat = "en"): string {
    return formatDistance(this.getDate(date), new Date(), {
      addSuffix: true,
      locale: getLocale(locale),
    });
  }

  /**
   * Get the minutes from the milliseconds passed as parameter
   * @date 3/21/2023 - 4:43:57 PM
   *
   * @static
   * @param {number} milliseconds
   * @returns {number}
   */

  static millisecondsToMinutes(milliseconds: number): number {
    return millisecondsToMinutes(milliseconds);
  }

  /**
   * Get human readable date in the format passed as parameter
   * @date 3/21/2023 - 4:44:29 PM
   *
   * @static
   * @param {number} milliseconds
   * @param {LocaleDateFormat} [locale=LocaleDateFormat["en"]]
   * @returns {string}
   */

  static humanize(milliseconds: number, locale: string = "en"): string {
    return formatDuration(
      {
        minutes: this.millisecondsToMinutes(milliseconds),
      },
      {
        locale: getLocale(locale),
      }
    );
  }

  /**
   * Get the date in the format passed as parameter
   * @date 3/21/2023 - 4:45:23 PM
   *
   * @static
   * @param {string | number | Date} date
   * @param {string} format
   * @param {LocaleDateFormat} [locale=LocaleDateFormat["en"]]
   * @returns {string}
   */

  static format(date: string | number | Date, format: string, locale: string = "en"): string {
    return dateFormatter(this.getDate(date), format, {
      locale: getLocale(locale),
    });
  }

  /**
   * Get the date in the format passed as parameter
   * TODO: the description and method name should be improved.
   * @date 3/21/2023 - 4:47:42 PM
   *
   * @static
   * @param {Date} date
   * @param {LocaleDateFormat} [locale=LocaleDateFormat["en"]]
   * @param {FormatOptions} [options={
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      }]
   * @returns {string}
   */

  static intlFormat(
    date: string | number | Date,
    locale: string = "en",
    options: FormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    }
  ): string {
    return intlFormat(this.getDate(date), options, {
      locale: getLocale(locale).code,
    });
  }

  /**
   * Get the timezone in the format passed as parameter
   * @date 3/21/2023 - 4:51:50 PM
   *
   * @static
   * @param {LocaleDateFormat} [locale=LocaleDateFormat["en"]]
   * @returns {string}
   */

  static getTimezone(locale = "en"): string {
    return intlFormat(
      new Date(),
      {
        timeZoneName: "short",
      },
      {
        locale: getLocale(locale).code,
      }
    );
  }
}
