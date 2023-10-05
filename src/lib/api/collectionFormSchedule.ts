import base64 from 'base-64';
import { ICollectionFormScheduleSaveDataPayload } from './api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.13
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/schedule/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof AseccaAPI
 *
 * @param {string} collectionId - requested collection ID
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getSchedule(collectionId: string | string[]) {
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

  /* fetch the schedule */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/schedule/api/get?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to Asecca API /collection/schedule/api/set
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof AseccaAPI
 *
 * @param {ICollectionFormLogisticsSaveDataPayload} body - data ID for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function setSchedule(
  body: ICollectionFormScheduleSaveDataPayload
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

  /* send the schedule */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/schedule/api/set`,
    requestOptions
  );
}
