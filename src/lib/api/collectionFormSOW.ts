import base64 from 'base-64';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.21
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/sow/preview
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 * @memberof AseccaAPI
 *
 * @param {string} collectionId - requested collection ID
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getSOW(collectionId: string | string[]) {
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

  /* fetch the SOW PDF Preview */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/sow/preview?collection=${collectionId}`,
    requestOptions
  );
}

/**
 * GET request to Asecca API /collection/sow/api/download
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 * @memberof AseccaAPI
 *
 * @param {string} collectionId - requested collection ID
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function downloadSOW(collectionId: string | string[]) {
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

  /* download the SOW PDF */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/sow/api/download?collection=${collectionId}`,
    requestOptions
  );
}
