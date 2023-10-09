import base64 from 'base-64';
import { ICollectionFormItinerarySaveDataPayload } from './api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.15
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/itinerary/api/itinerary
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof AseccaAPI
 *
 * @param {string} collectionId - requested collection ID
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getItinerary(collectionId: string | string[]) {
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

  /* fetch the itinerary */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/itinerary/api/itinerary?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * POST request to Asecca API /collection/itinerary/api/itinerary
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof AseccaAPI
 *
 * @param {ICollectionFormItinerarySaveDataPayload} body - data ID for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function setItinerary(
  body: ICollectionFormItinerarySaveDataPayload
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

  /* send the itinerary */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/itinerary/api/itinerary`,
    requestOptions
  );
}
