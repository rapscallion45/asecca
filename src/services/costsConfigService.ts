import { ICostsConfigSaveDataPayload } from '@/lib/api/api-types';
import { getCostsConfigSourceQueryString } from '../utils';

/**
 * API services for client application
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */

/**
 * GET request to /api/costs_config
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param source - can be any of 'collection', 'project', 'customer' or 'global'
 * @param dataId - ID number of the costs configuration
 * @returns {Promise<any>} - resulting Promise of the fetch request
 * @type {(source : string), (dataId : string | (string | null)[])}
 */
async function getCostsConfig(
  source: string,
  dataId: string | (string | null)[]
) {
  /** detemine which cost source this is, and build query string */
  const queryString: string = getCostsConfigSourceQueryString(
    source,
    dataId as string
  );

  /** configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /** send request and catch any errors */
  return fetch(`/api/costs_config?${queryString}`, requestOptions);
}

/**
 * POST request to /api/costs_config
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param body - Costs Config data to be saved
 * @returns {Promise<any>} - resulting Promise of the fetch request
 * @type {(body: ICostsConfigSaveDataPayload)}
 */
async function setCostsConfig(body: ICostsConfigSaveDataPayload) {
  /** configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  /** send request and catch any errors */
  return fetch(`/api/costs_config`, requestOptions);
}

/**
 * Costs Config API service handlers
 *
 * @since - 0.0.0
 */
const costsConfigService = {
  getCostsConfig,
  setCostsConfig,
};

export default costsConfigService;
