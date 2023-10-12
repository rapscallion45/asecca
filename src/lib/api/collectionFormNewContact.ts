import base64 from 'base-64';
import { ICollectionFormNewContactSaveDataPayload } from './api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.17
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/contact/api/create
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof AseccaAPI
 *
 * @param {ICollectionFormNewContactSaveDataPayload}
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function createNewContact(
  body: ICollectionFormNewContactSaveDataPayload
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

  /* send the new contact data */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/contact/api/create`,
    requestOptions
  );
}

export default createNewContact;
