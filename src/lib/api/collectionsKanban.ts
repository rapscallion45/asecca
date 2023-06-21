import base64 from 'base-64';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.8
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection_kanban/api/collections
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof AseccaAPI
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getCollectionsKanban(query: string) {
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

  /* fetch the kanban data */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection_kanban_staging/api/collections?${query}`,
    requestOptions
  );
}

export default getCollectionsKanban;
