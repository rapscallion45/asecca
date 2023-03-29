import base64 from 'base-64';
import queryString from 'query-string';
import { ICostsConfigSaveDataPayload } from '@/api-types';

/* configuration params for staging DB */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

async function getCostsConfig(
  query: Partial<{
    [key: string]: string | string[];
  }>
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
    `${STAGING_DB_REST_API_URL}/api/costs_config?${queryParamString}`,
    requestOptions
  );
}

async function setCostsConfig(body: ICostsConfigSaveDataPayload) {
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
  return fetch(`${STAGING_DB_REST_API_URL}/api/costs_config`, requestOptions);
}

const api = {
  getCostsConfig,
  setCostsConfig,
};

export default api;
