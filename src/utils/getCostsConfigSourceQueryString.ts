/**
 * Helper function for formatting Costs Config query param string
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param source - can be any of 'collection', 'project', 'customer' or 'global'
 * @param dataId - ID number of the costs configuration
 * @returns {string} - resulting query string
 * @type {(source : string), (dataId : string | (string | null)[])}
 */
const getCostsConfigSourceQueryString = (
  source: string,
  dataId: string
): string => `${source.toLowerCase()}=${dataId}`;

export default getCostsConfigSourceQueryString;
