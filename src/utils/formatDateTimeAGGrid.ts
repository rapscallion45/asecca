/**
 * Returns formatted date time string from passed date time AG Grid param
 *
 * Example:
 * YYYY-MM-DDTHH:mm:ss.sssZ => Thu Jan 26 2012 20:51:50 GMT+0000
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.7
 * @memberof Utils
 *
 * @param {any} params - AG Grid param object for passed column value
 * @returns {string} - converted date string in Thu Jan 26 2012 20:51:50 GMT+0000 format
 */
const formatDateTimeAGGrid = (params: any) => {
  /**
   * Shorthand day name strings
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @constant
   */
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /**
   * Shorthand month name strings
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @constant
   */
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  /**
   * Shorthand date string from passed AG Grid params object
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @constant
   */
  const dateStr = new Date(params.value);

  /**
   * Leading zero padding helper
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.7
   *
   * @method
   * @param {number} n - value to check for required leading zero
   */
  const pad = (n: number) => (n < 10 ? `0${n}` : n);

  /* return date in expected format */
  return `${dayNames[dateStr.getDay()]}, ${
    monthNames[dateStr.getMonth()]
  } ${dateStr.getDate()}, ${dateStr.getFullYear()} AT ${pad(
    dateStr.getHours()
  )}:${pad(dateStr.getMinutes())}`;
};

export default formatDateTimeAGGrid;
