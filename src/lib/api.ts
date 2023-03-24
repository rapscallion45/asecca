import base64 from 'base-64';

/* configuration params for staging DB */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

export default async function getCostsConfig(
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

  console.log(query);

  // return fetch(
  //   `${STAGING_DB_REST_API_URL}/api/costs_config?${encodeURIComponent(
  //     JSON.stringify(query)
  //   )}`,
  //   requestOptions
  // );
  return fetch(
    `${STAGING_DB_REST_API_URL}/api/costs_config?collection=66135000015737072`,
    requestOptions
  );
}
