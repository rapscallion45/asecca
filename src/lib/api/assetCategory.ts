import base64 from 'base-64';
import { INewAssetCategoryDataPayload } from '@/lib/api/api-types';

/**
 * configuration param environment variables for staging DB
 *
 * @since 0.0.16
 */
const { STAGING_DB_USERNAME, STAGING_DB_PASSWORD, STAGING_DB_REST_API_URL } =
  process.env;

/**
 * GET request to Asecca API /collection/asset_category/api/facilities
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 * @memberof AseccaAPI
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function getAssetCategoryFacilities() {
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

  /* fetch the costs */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/asset_category/api/facilities`,
    requestOptions
  );
}

/**
 * POST request to Asecca API /collection/asset_category/api/new_asset_category
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 * @memberof AseccaAPI
 *
 * @param {INewAssetCategoryDataPayload} body - data for the request
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
export async function setNewAssetCategory(body: INewAssetCategoryDataPayload) {
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

  /* send the costs */
  return fetch(
    `${STAGING_DB_REST_API_URL}/collection/asset_category/api/new_asset_category`,
    requestOptions
  );
}
