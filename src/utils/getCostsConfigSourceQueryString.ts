import { CostsConfigCostSource } from '@/lib/api/api-types';

/**
 * Helper function for formatting Costs Config query param string
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Utils
 *
 * @param {CostsConfigCostSource} source - costs config source, i.e. 'Project'
 * @param {string | Array<string | null>} dataId - ID number of the costs config
 * @returns {string} - resulting query string
 */
const getCostsConfigSourceQueryString = (
  source: CostsConfigCostSource,
  dataId: string
): string => `${source.toLowerCase()}=${dataId}`;

export default getCostsConfigSourceQueryString;
