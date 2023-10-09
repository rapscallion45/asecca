import base64 from 'base-64';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.15
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/* eslint-disable import/prefer-default-export */

/**
 * GET request to Asecca API /collection/enumerations/api/asset_category
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof AseccaAPI
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getEnumerationsAssetCategory() {
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

  /* fetch the asset categories */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/enumerations/api/asset_category`,
    requestOptions
  );
}
