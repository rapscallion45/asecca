import {
  CostsConfigCostSource,
  ICostsConfigSaveDataPayload,
} from '@/lib/api/api-types';
import { getCostsConfigSourceQueryString } from '../utils';

/**
 * API services for client application
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * GET request to /api/costs_config
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Services
 *
 * @param {CostsConfigCostSource} source - costs config source, i.e "Project"
 * @param {string | Array<(string | null)>} dataId - ID of the costs configuration
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getCostsConfig(
  source: CostsConfigCostSource,
  dataId: string | Array<string | null>
) {
  /* detemine which cost source this is, and build query string */
  const queryString: string = getCostsConfigSourceQueryString(
    source,
    dataId as string
  );

  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(`/api/costs_config?${queryString}`, requestOptions);
}

/**
 * POST request to /api/costs_config
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Services
 *
 * @param {ICostsConfigSaveDataPayload} body - Costs Config data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function setCostsConfig(body: ICostsConfigSaveDataPayload) {
  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /* send request and catch any errors */
  return fetch(`/api/costs_config`, requestOptions);
}

const costsConfigService = {
  getCostsConfig,
  setCostsConfig,
};

export default costsConfigService;
