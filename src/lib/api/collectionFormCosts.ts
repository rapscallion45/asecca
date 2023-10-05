import base64 from 'base-64';
import { ICollectionFormCostsSaveDataPayload } from '@/lib/api/api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.13
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/costs/api/costs
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof AseccaAPI
 *
 * @param {string} collectionId - requested collection ID
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getCosts(collectionId: string | string[]) {
  /* setup GET request options with basic auth */
  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(
        `${STAGING_DB_USERNAME}:${STAGING_DB_PASSWORD}`
      )}`,
    }),
  };

  /* fetch the costs */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/costs/api/costs?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to Asecca API /collection/costs/api/costs
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof AseccaAPI
 *
 * @param {ICollectionFormCostsSaveDataPayload} body - data ID for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function setCosts(body: ICollectionFormCostsSaveDataPayload) {
  /* setup POST request options with basic auth */
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(
        `${STAGING_DB_USERNAME}:${STAGING_DB_PASSWORD}`
      )}`,
    }),
    body: JSON.stringify(body),
  };

  /* send the costs */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/costs/api/costs`,
    requestOptions
  );
}
