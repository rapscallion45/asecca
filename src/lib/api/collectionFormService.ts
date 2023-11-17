import base64 from 'base-64';
import { ICollectionFormServiceSaveDataPayload } from './api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.14
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/service/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof AseccaAPI
 *
 * @param {string} collectionId - requested collection ID
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getService(collectionId: string | string[]) {
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

  /* fetch the service */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/service/api/get?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to Asecca API /collection/service/api/set
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof AseccaAPI
 *
 * @param {ICollectionFormServiceSaveDataPayload} body - data ID for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function setService(body: ICollectionFormServiceSaveDataPayload) {
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

  /* send the service */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/service/api/set`,
    requestOptions
  );
}

/**
 * GET request to Asecca API /collection/service/api/contacts
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof AseccaAPI
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getServiceContacts() {
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

  /* fetch the services contacts */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/service/api/contacts`,
    requestOptions
  );
}
