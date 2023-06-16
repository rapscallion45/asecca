/**
 * Returns Yes/No string for passed boolean AG Grid param
 *
 * Example:
 * YYYY-MM-DDTHH:mm:ss.sssZ => Thu Jan 26 2012 20:51:50 GMT+0000
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.7
 * @memberof Utils
 *
 * @param {any} params - AG Grid param object for passed column value
 * @returns {string} - Yes/No string for passed boolean value
 */
const formatBooleanAGGrid = (params: any) => (params.value ? 'Yes' : 'No');

export default formatBooleanAGGrid;
