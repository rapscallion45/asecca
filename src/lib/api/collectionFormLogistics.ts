import base64 from 'base-64';
import { ICollectionFormLogisticsSaveDataPayload } from './api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.13
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/logistics/api/logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof AseccaAPI
 *
 * @param {string} collectionId - requested collection ID
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getLogistics(collectionId: string | string[]) {
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
    `${STAGING_DB_REST_API_URL}/collection/logistics/api/logistics?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to Asecca API /collection/logistics/api/logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof AseccaAPI
 *
 * @param {ICollectionFormLogisticsSaveDataPayload} body - data ID for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function setLogistics(
  body: ICollectionFormLogisticsSaveDataPayload
) {
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
    `${STAGING_DB_REST_API_URL}/collection/logistics/api/logistics`,
    requestOptions
  );
}

/**
 * GET request to Asecca API /collection/logistics/api/compatible_facilities_for_logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof AseccaAPI
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getLogisticsTypes() {
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
    `${STAGING_DB_REST_API_URL}/collection/logistics/api/compatible_facilities_for_logistics`,
    requestOptions
  );
}
