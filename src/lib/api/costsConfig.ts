import base64 from 'base-64';
import queryString from 'query-string';
import {
  ICostsConfigSaveDataPayload,
  ICostsConfigSaveDataSelection,
} from '@/lib/api/api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.0
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /costs-config
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof AseccaAPI
 *
 * @param {Partial<ICostsConfigSaveDataSelection>} query - request query
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getCostsConfig(
  query: Partial<ICostsConfigSaveDataSelection>
) {
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

  /* construct query param string from passed query object */
  const queryParamString = queryString.stringify(query);

  /* fetch the costs config */
  return fetch(
    `${STAGING_DB_REST_API_URL}/cost_config/api/cost_config?${queryParamString}`,
    requestOptions
  );
}

/**
 * POST request to Asecca API /costs-config
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof AseccaAPI
 *
 * @param {ICostsConfigSaveDataPayload} body - source and data ID for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function setCostsConfig(body: ICostsConfigSaveDataPayload) {
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

  /* send the costs config */
  return fetch(
    `${STAGING_DB_REST_API_URL}/cost_config/api/cost_config`,
    requestOptions
  );
}
