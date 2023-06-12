import base64 from 'base-64';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.3
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /tables/api/devices
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 * @memberof AseccaAPI
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getDevices() {
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

  /* fetch the table data */
  return fetch(`${STAGING_DB_REST_API_URL}/tables/api/devices`, requestOptions);
}

export default getDevices;
